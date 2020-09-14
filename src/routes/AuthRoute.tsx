import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import NotFound from "./NotFound";
import Forbidden from "./Forbidden";

import { AppContext } from "context/AppContext";
import popup from "popup";

interface Props {
    component?: JSX.Element;
    altComponent?: JSX.Element;
    redirect?: boolean;
    [x: string]: any;
}

// Route Wrapper that checks first if the user has been authenticated
const AuthRoute: React.FunctionComponent<Props> = ({ component, altComponent, redirect, ...rest }) => {

  const { session } = useContext(AppContext);
  const { isAuthenticated } = session;

  const alreadyAuthenticated = () => {
    popup.success("You are logged in!");
    return <Redirect to='/event/dashboard' />;
  };

  const notAuthenticated = () => {
    popup.success("You are not yet logged in!");
    return <Redirect to='/event/dashboard' />;
  };
 
  // Do not load authenticated routes if:
  // 1) user is not authenticated
  // 2) user is currently still authenticating
  // TODO: There is probably a better way of doing this
  return (
    <Route {...rest} render={() => (
      isAuthenticated === true
        ? component
          ? component
          : redirect ? alreadyAuthenticated() : <NotFound />
        : altComponent
          ? altComponent 
          : redirect ? notAuthenticated() : <Forbidden />
    )} />
  );
};
  
export default AuthRoute;