import React from "react";
import { Switch, Route } from "react-router-dom";

import EventDashboard from "./EventDashboard";
import EventDetails from "./EventDetails";
import EventCreate from "./EventCreate";

const Events = () => (
  <Switch>
    <Route path="/event/dashboard" component={EventDashboard}/>
    <Route path="/event/create" component={EventCreate}/>
    <Route path="/event/:eventId" component={EventDetails}/>
  </Switch>
);

export default Events;
