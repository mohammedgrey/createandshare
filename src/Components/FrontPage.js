import React from "react";
import Login from "./Login";
import Signup from "./Signup";
const createbackground = require("../Assets/Imagaes/createbackground.jpg");

const FrontPage = () => {
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
};

export default FrontPage;
