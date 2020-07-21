import React, { useState } from "react";
import "./ForgotPassword.css";
import validateEmail from "../Functions/validateEmail";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Alert from "./Generic/Alert";
const createbackground = require("../Assets/Imagaes/createbackground.jpg");

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [dangerAlert, setDangerAlert] = useState(false);
  const [safeAlert, setSafeAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    setLoading(true);
    axios
      .post(
        "/users/forgotpassword",
        {
          email: email,
          resetURL: `${window.location.origin.toString()}/resetpassword`,
        },
        { withCredentials: true }
      )
      .then(
        (res) => {
          console.log(res.data);

          setLoading(false);
          setSafeAlert(true);
          setTimeout(() => {
            setSafeAlert(false);
          }, 2500);
        },
        (error) => {
          console.log(error);
          if (error.response.status === 404) {
            setLoading(false);
            setDangerAlert(true);
            setTimeout(() => {
              setDangerAlert(false);
            }, 2500);
          }
        }
      );
  };
  return (
    <div
      className="forgot-password-class"
      style={{ backgroundImage: "url(" + createbackground + ")" }}
    >
      <div id="center-middle">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <label for="email">
              <i class="far fa-envelope"></i> Your Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div>
              <button
                onClick={handleForgotPassword}
                id={validateEmail(email) ? "" : "disabled-button"}
                disabled={!validateEmail(email)}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      <Alert
        visible={safeAlert}
        type="safe-alert"
        message={`Email sent \n(Expires in 10 mins)`}
      />

      <Alert
        visible={dangerAlert}
        type="danger-alert"
        message="No user with this Email"
      />
    </div>
  );
};

export default ForgotPassword;
