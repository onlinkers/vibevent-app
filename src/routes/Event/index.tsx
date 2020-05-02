import React from "react";
import { Route } from "react-router-dom";

import EventDashboard from "./EventDashboard";
import EventDetails from "./EventDetails";
import EventCreate from "./EventCreate";

const Events = () => (
	<Route>
		<Route path="/event/dashboard" component={EventDashboard}/>
		<Route path="details" component={EventDetails}/>
		<Route path="/event/create" component={EventCreate}/>
	</Route>
);

export default Events;
