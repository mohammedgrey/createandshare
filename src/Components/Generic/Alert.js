import React from "react";
import "./Alert.css";
const Alert = (props) => {
  return (
    <div
      style={{ display: props.visible ? "block" : "none" }}
      className={`center-alert ${props.type} animate__animated animate__fadeInDown`}
    >
      {props.type === "safe-alert" ? (
        <i class="fas fa-check"></i>
      ) : (
        <i class="fas fa-times"></i>
      )}

      {props.message}
    </div>
  );
};

export default Alert;
