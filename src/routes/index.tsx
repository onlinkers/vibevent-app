import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

// Import all the parent routes
// import Home from "./Home";
import Events from "./Event";
// import Discover from "./Discover";
// import Profile from "./Profile";
import Landing from "./Landing";

import Rooms from "./Rooms";
import Authentication from "./Authentication";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";
import Construction from "./Construction";

import AuthRoute from "./AuthRoute";
import { AppContext } from "context/AppContext";
import { saveCognitoUser, fetchUserData } from "store/actions/userActions";
import { saveSessionToLocalStorage, checkCognitoUser } from "./Authentication/_utils";

interface Props {
  saveCognitoUser: Function;
  fetchUserData: Function;
}

const Routes: React.FunctionComponent<Props> = (props) => {
  const { saveCognitoUser, fetchUserData } = props;

  const { session } = useContext(AppContext);
  const {
    isAuthenticating,
    isAuthenticated,
    setIsAuthenticating,
    setIsAuthenticated,
  } = session;

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

      // load the current session from Cognito and
      const loadSession = async () => {
        const session = await Auth.currentSession();
        return session;
      };

      const loadUser = async () => {
        const user = await Auth.currentAuthenticatedUser();

        // check the contents of the cognito user
        checkCognitoUser(user);

        // fetch user data from database and save into redux
        const userId = user.attributes["custom:mongoid"];
        fetchUserData(userId);
        saveCognitoUser(user);
      };

      // Check if already authenticated
      if (!isAuthenticated) {
        // Run
        loadSession()
          .then(saveSessionToLocalStorage)
          .then(loadUser)
          .then(handleHasSession)
          .catch(handleNoSession);
      }
    } catch (error) {
      // console.log("Not logged in!", error.message);
      handleNoSession();
    }
  }, []); // eslint-disable-line

  return isAuthenticating ? null : (
    <BrowserRouter>
      <Switch>
        {/* DOUBLE ROUTES */}
        <AuthRoute
          exact
          path="/"
          component={<Landing />}
          altComponent={<Landing />}
        />
        <AuthRoute path="/profile" component={<Construction />} /> {/*  TO CHANGE */}

        {/* AUTHENTICATION */}
        <AuthRoute path="/auth" altComponent={<Authentication />} redirect />

        {/* PUBLIC ROUTES */}
        <Route path="/event" component={Events} />
        <Route path="/room/:roomId" component={Rooms} />
        <Route path="/discover" component={Construction} /> {/* TO CHANGE */}
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/empty" render={() => <div></div>} />
        {/* <Route path="/home" component={Home} /> */} {/* FOR TESTING */}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCognitoUser: (payload) => dispatch(saveCognitoUser(payload)),
    fetchUserData: (userId) => dispatch(fetchUserData(userId))
  };
};

export default connect(null, mapDispatchToProps)(Routes);
