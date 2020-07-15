import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./Profile/Profile";
import Home from "./Home";

class LandingPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="InsidePages">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default LandingPage;
