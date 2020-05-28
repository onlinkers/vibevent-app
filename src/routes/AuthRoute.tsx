import React, { useContext, FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";

import { AppContext } from "context/AppContext";

interface Props {
    component: JSX.Element;
    altComponent?: JSX.Element;
    [x: string]: any;
}

// Route Wrapper that checks first if the user has been authenticated
const AuthRoute: React.FunctionComponent<Props> = ({ component, altComponent, ...rest }) => {

  const { session } = useContext(AppContext);
  const { isAuthenticated } = session;
 
  return (
    <Route {...rest} render={() => (
      isAuthenticated === true
        ? component
        : altComponent ? altComponent : <Redirect to='/' />
    )} />
  );
};
  
export default AuthRoute;