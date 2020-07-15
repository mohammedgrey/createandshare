import React, { useReducer } from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Alert from "./Generic/Alert";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dangerAlert, setDangerAlert] = useState(false);
  const handlelogin = (e) => {
    e.preventDefault();
    console.log(email, password);

    axios
      .post("/users/login", { email, password }, { withCredentials: true })
      .then(
        (res) => {
          //redirect
          console.log(res.data.token);
          // console.log(props.history);
          props.history.replace("/");
          window.location.reload(true);
        },
        (error) => {
          console.log(error);
          if (error.response.status === 401) {
            setDangerAlert(true);
            setTimeout(() => {
              setDangerAlert(false);
            }, 2000);
          }
        }
      );
  };
  return (
    <div className="Login">
      <form noValidate>
        <label for="email">
          <i class="far fa-envelope"></i> Email
        </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label for="password">
          <i class="fas fa-unlock-alt"></i> Password
        </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {/* <p className="not-auth-message"> Wrong email or password</p> */}

        <button type="submit" onClick={handlelogin}>
          LOG IN
        </button>

        <p className="fogot-password">Forgot password?</p>
      </form>

      <Alert
        visible={dangerAlert}
        type="danger-alert"
        message="Incorrect Email or Password"
      />
    </div>
  );
};

export default withRouter(Login);
