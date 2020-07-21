import React, { useState } from "react";
import Alert from "./Generic/Alert";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const createbackground = require("../Assets/Imagaes/createbackground.jpg");

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [safeAlert, setSafeAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);

  const handleResetPassword = () => {
    const resetToken = window.location.pathname.split("/")[2];
    setLoading(true);
    axios
      .patch(`/users/resetpassword/${resetToken}`, {
        password: password,
      })
      .then(
        (res) => {
          setLoading(false);
          localStorage.setItem("userID", res.data.data.user._id);
          setSafeAlert(true);
          setTimeout(() => {
            setSafeAlert(false);
          }, 500);

          props.history.replace("/");
          window.location.reload(true);
        },
        (error) => {
          console.log(error);
          if (error.response.status === 400) {
            setLoading(false);
            setDangerAlert(true);
            setTimeout(() => {
              setDangerAlert(false);
            }, 2500);
          } else {
            alert("unexpected error");
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
            <label for="password" style={{ color: "rgb(2,1,7)" }}>
              <i class="fas fa-unlock-alt"></i> Enter a new password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <label for="confirmpassword" style={{ color: "rgb(2,1,7)" }}>
              <i class="fas fa-lock"></i> Confirm password
            </label>
            <input
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <div>
              <button
                onClick={handleResetPassword}
                id={
                  password === confirmPassword && password.length >= 8
                    ? ""
                    : "disabled-button"
                }
                disabled={
                  !(password === confirmPassword && password.length >= 8)
                }
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      <Alert visible={safeAlert} type="safe-alert" message={`Password Reset`} />

      <Alert
        visible={dangerAlert}
        type="danger-alert"
        message="Expired Token"
      />
    </div>
  );
};

export default withRouter(ResetPassword);
