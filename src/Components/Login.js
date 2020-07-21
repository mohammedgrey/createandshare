import React, { useReducer } from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Alert from "./Generic/Alert";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dangerAlert, setDangerAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlelogin = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/users/login", { email, password }, { withCredentials: true })
      .then(
        (res) => {
          localStorage.setItem("userID", res.data.data.user._id);
          setLoading(false);

          props.history.replace("/");
          window.location.reload(true);
        },
        (error) => {
          setEmail("");
          setPassword("");
          console.log(error);
          if (error.response.status === 401) {
            setLoading(false);
            setDangerAlert(true);
            setTimeout(() => {
              setDangerAlert(false);
            }, 2000);
          }
        }
      );
  };

  if (loading) {
    return (
      <div className="center-horizontally">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className="Login">
        {/* <h1>Log in</h1> */}
        <form noValidate>
          <label for="email">
            <i class="far fa-envelope"></i> Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label for="password">
            <i class="fas fa-unlock-alt"></i> Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          {/* <p className="not-auth-message"> Wrong email or password</p> */}

          <button
            type="submit"
            onClick={handlelogin}
            id={email !== "" && password !== "" ? "" : "disabled-button"}
            disabled={email === "" || password === ""}
          >
            log in
          </button>
          <div>
            <Link to="/forgotpassword" className="fogot-password">
              Forgot password?
            </Link>
          </div>
        </form>

        <Alert
          visible={dangerAlert}
          type="danger-alert"
          message="Incorrect Email or Password"
        />
      </div>
    );
  }
};

export default withRouter(Login);
