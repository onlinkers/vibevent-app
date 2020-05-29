import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Import all the route wrappers
import Home from "./Home";
import Events from "./Event";
import Discover from "./Discover";
import Auth from "./Authentication";
import NotFound from "./Authentication/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/discover" component={Discover}/>
        <Route path="/event" component={Events}/>
        <Route path="/auth" component={Auth}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;