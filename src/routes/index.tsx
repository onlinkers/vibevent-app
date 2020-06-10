import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

// Import all the parent routes
import Home from "./Home";
import Events from "./Event";
import Discover from "./Discover";
import Profile from "./Profile";
import Authentication from "./Authentication";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";

import AuthRoute from "./AuthRoute";
import { AppContext } from "context/AppContext";
import { saveUserData, saveCognitoUser } from "store/actions/userActions";

interface Props {
  saveUserData: Function;
  saveCognitoUser: Function;
}

const Routes: React.FunctionComponent<Props> = (props) => {

  const { saveUserData, saveCognitoUser } = props;

  const { session } = useContext(AppContext);
  const { isAuthenticating, isAuthenticated, setIsAuthenticating, setIsAuthenticated } = session;

  // Load user session
  useEffect(() => {
    const handleNoSession = () => {
      setIsAuthenticating(false);
      setIsAuthenticated(false);
    };

    const handleHasSession = () => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
    };

    try {
      // save session data to local storage (for API calls)
      const saveToLocalStorage = (session) => {
        if(session.accessToken) localStorage.setItem("cognitoAccessToken", session.accessToken.jwtToken);
        if(session.idToken) localStorage.setItem("cognitoIdToken", session.idToken.jwtToken);
        if(session.refreshToken) localStorage.setItem("cognitoRefreshToken", session.refreshToken.token);
      };

      // load the current session from Cognito and
      const loadSession = async () => {
        const session = await Auth.currentSession();
        return session;
      };

      const loadUser = async () => {
        const user = await Auth.currentAuthenticatedUser();
        saveUserData({
          _id: user.attributes["custom:mongoid"],
          email: user.attributes.email,
          firstName: user.attributes.name,
        });
        saveCognitoUser(user);
      };

      // Check if already authenticated
      if(!isAuthenticated) {
        // Run
        loadSession()
          .then(saveToLocalStorage)
          .then(loadUser)
          .then(handleHasSession)
          .catch(handleNoSession);
      }
    } catch(error) {
      // console.log("Not logged in!", error.message);
      handleNoSession();
    }
	}, []); // eslint-disable-line

  return isAuthenticating ? null : (
    <BrowserRouter>
      <Switch>
        {/* DOUBLE ROUTES */}
        <AuthRoute exact path="/" component={<Redirect to="/discover"/>} altComponent={<Home/>}/>
        <AuthRoute path="/profile" component={<Profile/>}/>

        {/* AUTHENTICATION */}
        <AuthRoute path="/auth" altComponent={<Authentication/>} redirect/>

        {/* PUBLIC ROUTES */}
        <Route path="/event" component={Events}/>
        <Route path="/discover" component={Discover}/>
        <Route path="/forbidden" component={Forbidden}/>
        <Route path="/empty" render={() => <div></div>}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData: (payload) => dispatch(saveUserData(payload)),
    saveCognitoUser: (payload) => dispatch(saveCognitoUser(payload))
  };
};

export default connect(null, mapDispatchToProps)(Routes);
