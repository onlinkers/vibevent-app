import React, { useContext, FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";

import NotFound from "./NotFound";
import Forbidden from "./Forbidden";

import { AppContext } from "context/AppContext";
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
 
  return (
    <Route {...rest} render={() => (
      isAuthenticated === true
        ? component
          ? component
          : redirect ? <Redirect to='/' /> : <NotFound />
        : altComponent
          ? altComponent 
          : redirect ? <Redirect to='/' /> : <Forbidden />
    )} />
  );
};
  
export default AuthRoute;