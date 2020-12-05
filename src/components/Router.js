import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import SignIn from "./SignIn";
import Home from "./Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" exact to="/login" />
        <Route path="/login" exact component={SignIn} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
