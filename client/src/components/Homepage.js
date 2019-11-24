import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./AppNavbar";
import VisitorForm from "./Form";
import Host from "./Host";
import Visitor from "./Visitor";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <VisitorForm />
          </Route>
          <Route path="/host">
            <Host />
          </Route>
          <Route path="/visit">
            <Visitor />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Homepage;
