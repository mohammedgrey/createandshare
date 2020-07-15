import React from "react";
import Explore from "./Explore";
import Favorites from "./Favorites";
import Navbar from "../Components/Generic/Navbar";
import axios from "axios";

import { Switch, Route, Redirect } from "react-router-dom";
import UserPage from "./UserPage";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Explore} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/users" component={UserPage} />

          {/* TODO: ADD MORE ROUTES */}
          {/* <Redirect to="/explore" /> */}
        </Switch>
      </div>
    );
  }
}

export default Home;
