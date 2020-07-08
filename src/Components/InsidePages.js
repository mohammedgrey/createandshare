import React from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import Explore from "./Explore";

class LandingPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="InsidePages">
        <Switch>
          <Route exact path="/" component={Explore} />
          <Route path="/profile" component={Profile} />
          <Route path="/explore" component={Explore} />
        </Switch>
      </div>
    );
  }
}

export default LandingPage;
