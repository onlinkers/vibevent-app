import React from "react";
import { Switch, Route } from "react-router-dom";

import EventDashboard from "./EventDashboard";
import EventDetails from "./EventDetails";
import EventCreate from "./EventCreate";
import EventEdit from "./EventEdit";
import DesktopEventCardLarge from "../../components/cards/desktopEventCardLarge";

const Events = () => (
  <Switch>
    <Route path="/event/dashboard" component={EventDashboard} />
    <Route path="/event/create" component={EventCreate} />
    <Route path="/event/testcard" component={DesktopEventCardLarge} />
    <Route path="/event/:eventId/edit" component={EventEdit} />
    <Route path="/event/:eventId" component={EventDetails} />
    {/* testing */}
  </Switch>
);

export default Events;
