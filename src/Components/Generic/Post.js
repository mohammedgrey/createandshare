import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Grid from "@material-ui/core/Grid";
import "./Post.css";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import { Button } from "@material-ui/core";
import axios from "axios";
import Alert from "./Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    // maxHeight: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    // marginLeft: "10px",
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = (props) => {
  const classes = useStyles();
  const [dangerAlert, setDangerAlert] = useState(false);

  return (
    <div
      className="post-main-class"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {/* <Grid container justify="center"> */}
      <Card
        className={classes.root}
        style={{
          background: "rgb(101, 101, 101)",
          background:
            "linear-gradient(90deg,rgba(101, 101, 101, 1) 0%,rgba(174, 166, 176, 1) 50%,rgba(205, 205, 205, 1) 100%)",
          // paddingLeft: "30px",
          // paddingRight: "30px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              alt="Apple"
              src={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${props.userImage}`}
              onClick={() => {
                props.history.push(`/users/${props.userId}`);
              }}
            />
          }
          action={
            props.me && (
              <button
                className="delete-post-button"
                onClick={() => {
                  axios.delete(`/posts/${props.id}`).then(
                    (res) => {
                      setDangerAlert(true);
                      setTimeout(() => {
                        setDangerAlert(false);
                        window.location.reload(true);
                      }, 1500);
                    },
                    (error) => {
                      alert("unexpected error");
                    }
                  );
                }}
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            )
          }
          title={props.name}
          subheader={moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}
        />
        {props.image !== "" && (
          <CardMedia
            className={classes.media}
            image={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/posts/${props.image}`}
            title="Paella dish"
          />
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>{props.content}</p>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <i
            class="fas fa-heart"
            onClick={() => {
              console.log("heart");
            }}
          ></i>
       
          <i
            class="far fa-comment"
            onClick={() => {
              console.log("comment");
            }}
          ></i> */}
        </CardActions>
      </Card>
      {/* </Grid> */}

      <Alert visible={dangerAlert} type="danger-alert" message="Deleted" />
    </div>
  );
};

export default withRouter(Post);
