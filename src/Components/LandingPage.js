import React from "react";
import "./LandingPage.css";
import "./Login";
import "./Signup";
import Login from "./Login";
import Signup from "./Signup";
const createbackground = require("../Assets/Imagaes/createbackground.jpg");

class LandingPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div
        className="LandingPage"
        style={{ backgroundImage: "url(" + createbackground + ")" }}
      >
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
