import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthRedirect from "./AuthRedirect";

const Auth = () => {
	return (
		<Switch>
			<Route path={"/auth/signup"} component={SignupForm}/>
			<Route path={"/auth/login"} component={LoginForm}/>
			<Route path={"/auth/redirect"} component={AuthRedirect}/>
			<Redirect from="/auth" to="/auth/login"/>
		</Switch>
	
	);
};

export default Auth;
