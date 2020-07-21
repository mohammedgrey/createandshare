import React from "react";
import "./LandingPage.css";
import "./Login";
import "./Signup";
import FrontPage from "./FrontPage";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { Switch, Route } from "react-router-dom";

class LandingPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/resetpassword" component={ResetPassword} />
      </Switch>
    );
  }
}

export default LandingPage;
