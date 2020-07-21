import React from "react";
import { Link } from "react-router-dom";
import "./User.css";

const User = (props) => {
  return (
    <div className="user-component-class" id={props.size + "-user"}>
      <Link
        className="user-to-profile-img"
        to={
          localStorage.getItem("userID") === props.id
            ? "/profile"
            : `/users/${props.id}`
        }
      >
        <img src={props.image} alt="user" />
      </Link>
      <div className="user-info">
        <Link
          to={
            localStorage.getItem("userID") === props.id
              ? "/profile"
              : `/users/${props.id}`
          }
        >
          {props.name}
        </Link>
      </div>
    </div>
  );
};

export default User;
