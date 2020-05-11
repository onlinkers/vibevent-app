import React from "react";
import { Route } from "react-router-dom";

import EventDashboard from "./EventDashboard";
import EventDetails from "./EventDetails";
import EventCreate from "./EventCreate";

const Events = () => (
    <Route>
        <Route path="/event/dashboard" component={EventDashboard}/>
        <Route path="/event/create" component={EventCreate}/>
        <Route path="/event/:eventId" component={EventDetails}/>
    </Route>
);

export default Events;
