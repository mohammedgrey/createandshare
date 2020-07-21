import React from "react";
import { Link } from "react-router-dom";
import "./Comment.css";
import * as moment from "moment";

const Comment = (props) => {
  return (
    <div className="container-comment-component-class">
      <p id="talkbubble" class="bubble speech">
        {props.text}
      </p>
      <div className="comment-component-class">
        <Link
          className="comment-to-profile-img"
          to={
            localStorage.getItem("userID") === props.userID
              ? "/profile"
              : `/users/${props.userID}`
          }
        >
          <img src={props.image} alt="comment" />
        </Link>
        <div className="comment-info">
          <Link
            to={
              localStorage.getItem("userID") === props.userID
                ? "/profile"
                : `/users/${props.userID}`
            }
          >
            {props.name}
          </Link>
          <p>{moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
