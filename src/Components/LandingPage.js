import React from "react";
import "./LandingPage.css";
import "./Login";
import "./Signup";
import Login from "./Login";
import Signup from "./Signup";
import { Redirect } from "react-router-dom";

class LandingPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="LandingPage">
        <div className="log-in">
          <Login />
        </div>
        <hr />
        <div className="sign-up">
          <Signup />
        </div>
      </div>
    );
  }
}

export default LandingPage;
