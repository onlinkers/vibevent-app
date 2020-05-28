import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthRoute from "./AuthRoute";

// Import all the parent routes
import Home from "./Home";
import Events from "./Event";
import Discover from "./Discover";
import Auth from "./Authentication";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<AuthRoute exact path="/" component={<Discover/>} altComponent={<Home/>}/>
				<AuthRoute path="/discover" component={<Discover/>}/>
				<AuthRoute path="/event" component={<Events/>}/>
				<AuthRoute path="/auth" component={<NotFound/>} altComponent={<Auth/>}/>
				<Route path="/forbidden" component={Forbidden}/>
				<Route path="*" component={NotFound}/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;