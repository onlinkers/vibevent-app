import React from "react";
import { Route } from "react-router-dom";

import EventDashboard from "./EventDashboard";
import EventDetails from "./EventDetails";

const Events = () => (
	<Route>
		<Route path="/event/dashboard" component={EventDashboard}/>
		<Route path="/event/:eventId" component={EventDetails}/>
	</Route>
);

export default Events;
