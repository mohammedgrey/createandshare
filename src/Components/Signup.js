import React, { useState, useEffect } from "react";
import "./Signup.css";
import validateEmail from "../Functions/validateEmail";
import Alert from "./Generic/Alert";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [signupDisabled, setSignupDisabled] = useState(true);
  const [dangerAlert, setDangerAlert] = useState(false);

  const validateInput = () => {
    //CHECK
    // 1- the name field is not empty
    // 2- valid email
    // 3- passwords match
    // 4- valid date of birth
    if (
      name !== "" &&
      password === confirmPassword &&
      validateEmail(email) &&
      password.length >= 8 &&
      birthdate !== ""
    )
      setSignupDisabled(false);
    else setSignupDisabled(true);
  };
  useEffect(() => {
    validateInput();
  }, [name, email, password, confirmPassword, birthdate]);

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post(
        "/users/signup",
        { name, email, password, birthdate },
        { withCredentials: true }
      )
      .then(
        (res) => {
          //redirect
          console.log(res.data.token);
          // console.log(props.history);
          props.history.replace("/");
          window.location.reload(true);
        },
        (error) => {
          console.log(error.response);
          if (error.response.data.message.includes("duplicate")) {
            setDangerAlert(true);
            setTimeout(() => {
              setDangerAlert(false);
            }, 3000);
          } else {
            alert("unexpected Error");
          }
        }
      );
  };

  return (
    <div className="Signup">
      <h1>
        {" "}
        <i class="fas fa-info-circle"></i> Sign Up if you don't have an account
        yet!
      </h1>
      <form noValidate>
        <div className="signup-data">
          <h6>
            {" "}
            <i class="fas fa-user-circle"></i> Name
          </h6>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            value={name}
          ></input>

          <h6>
            {" "}
            <i class="far fa-envelope"></i> Email
          </h6>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            value={email}
          ></input>

          <h6>
            <i class="fas fa-unlock-alt"></i> Password{" "}
            <span>(at least 8 chars)</span>
          </h6>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
          ></input>

          <h6>
            {" "}
            <i class="fas fa-lock"></i> Confirm Password
          </h6>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            value={confirmPassword}
          ></input>

          <h6>
            {" "}
            <i class="far fa-calendar-alt"></i> Birthdate
          </h6>
          <input
            onChange={(e) => {
              setBirthdate(e.target.value);
            }}
            type="date"
            value={birthdate}
          ></input>

          <button
            onClick={handleSignup}
            id={signupDisabled ? "disabled-button" : ""}
            disabled={signupDisabled}
          >
            Sign up
          </button>
        </div>
      </form>
      <Alert
        visible={dangerAlert}
        type="danger-alert"
        message="There is a user with this email"
      />
    </div>
  );
};

export default withRouter(Signup);
