import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Profile from "./Components/Profile";
import Explore from "./Components/Explore";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/explore" component={Explore} />
      </Switch>
    </div>
  );
}

export default App;
