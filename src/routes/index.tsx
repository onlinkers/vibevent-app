import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Import all the route wrappers
import Home from "./Home";
import Events from "./Events";
import Discover from "./Discover";
import NotFound from "./Authentication/NotFound";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/discover" component={Discover}/>
				<Route path="/events" component={Events}/>
				<Route path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;