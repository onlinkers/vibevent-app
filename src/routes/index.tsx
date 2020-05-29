import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import { saveUserData } from "store/actions/userActions";

interface Props {
	saveUserData: Function;
}

const Routes: React.FunctionComponent<Props> = ({ saveUserData }) => {

  const { session } = useContext(AppContext);
  const { isAuthenticating, isAuthenticated, setIsAuthenticating, setIsAuthenticated } = session;

  // Load user session
  useEffect(() => {

    // save session data to local storage (for API calls)
    const saveToLocalStorage = (session) => {
      if(session.accessToken) localStorage.setItem("cognitoAccessToken", JSON.stringify(session.accessToken));
      if(session.idToken) localStorage.setItem("cognitoIdToken", JSON.stringify(session.idToken));
      if(session.refreshToken) localStorage.setItem("cognitoRefreshToken", JSON.stringify(session.refreshToken));
    };

    // load the current session from Cognito and
    const loadSession = async () => {
      const session = await Auth.currentSession();
      return session;
    };

    const loadUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      saveUserData({ data:
        {
          _id: user.attributes["custom:mongoid"],
          email: user.attributes.email,
          firstName: user.attributes.name,
        }
      });
    };

    const handleNoSession = () => {
      setIsAuthenticating(false);
      setIsAuthenticated(false);
    };

    const handleHasSession = () => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
    };
	
    // Check if already authenticated
    if(!isAuthenticated) {
      setIsAuthenticating(true);
	
      // Run
      loadSession()
        .then(saveToLocalStorage)
        .then(loadUser)
        .then(handleHasSession)
        .catch(handleNoSession);
    }

	}, []); // eslint-disable-line

  return isAuthenticating ? null : (
    <BrowserRouter>
      <Switch>
        {/* DOUBLE ROUTES */}
        <AuthRoute exact path="/" component={<Discover/>} altComponent={<Home/>}/>
        <AuthRoute path="/profile" component={<Profile/>}/>

        {/* AUTHENTICATION */}
        <AuthRoute path="/auth" altComponent={<Authentication/>} redirect/>

        {/* PUBLIC ROUTES */}
        <Route path="/event" component={Events}/>
        <Route path="/discover" component={Discover}/>
        <Route path="/forbidden" component={Forbidden}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData: (payload) => dispatch(saveUserData(payload))
  };
};

export default connect(null, mapDispatchToProps)(Routes);