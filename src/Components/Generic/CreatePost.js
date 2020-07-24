import React, { useRef, useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import createbackground from "../../Assets/Imagaes/createbackground.jpg";
const createbackground = require("../../Assets/Imagaes/createbackground.jpg");

const CreatePost = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");
  const inputFile = useRef(null);
  const [loaded, setLoaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const onFileUpload = () => {
    inputFile.current.click();
  };

  const onSaveFile = () => {
    setLoading(true);
    let fd = new FormData();
    // fd.append('image', selectedPhoto,selectedPhoto.name);
    if (selectedPhoto) {
      fd.append("photo", selectedPhoto);
      fd.append("name", selectedPhoto.name);
    }

    fd.append("content", content);

    fd.append("createdAt", moment().format());
    // fd.append("createdAt", new Date().toLocaleString());
    axios
      .post("/posts/me", fd, {
        onUploadProgress: (ProgressEvent) => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then(
        (res) => {
          setLoading(false);
          window.location.reload(true);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          alert("Unexpected error");
        }
      );
  };
  const onChangeFile = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      if (
        !(
          event.target.files[0].type.startsWith("image") ||
          event.target.files[0].type.startsWith("video")
        )
      ) {
        console.log("invalid image");

        setSelectedPhoto(null);
        setImagePreview(null);
        alert("Please enter a valid file. Valid files are images and videos");
      } else {
        console.log("valid image");
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = (event) => {
          console.log(event.target.result);
          setImagePreview(event.target.result);
        };
        setSelectedPhoto(event.target.files[0]);
        console.log(event.target.files[0]);
      }
    }
  };

  if (loading) {
    return <CircularProgressWithLabel value={loaded} />;
  } else {
    return (
      <div
        className="create-post"
        style={{ backgroundImage: "url(" + createbackground + ")" }}
      >
        <h1>New Creation</h1>
        <div className="text-area">
          <textarea
            type="text area"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <i class="fas fa-pen"></i>
        </div>
        {imagePreview ? (
          selectedPhoto.type.startsWith("image") ? (
            <img src={imagePreview} alt="not found"></img>
          ) : (
            <p className="video-preview-text">Video Uploaded</p>
          )
        ) : null}
        <div className="file-upload">
          <input
            onChange={onChangeFile}
            style={{ display: "none" }}
            type="file"
            ref={inputFile}
          ></input>
          <button onClick={onFileUpload}>Upload media</button>
        </div>

        <button
          id="save-new-creation-button"
          style={{
            display: !selectedPhoto && content === "" ? "none" : "block",
          }}
          onClick={onSaveFile}
        >
          Alrigt
        </button>
      </div>
    );
  }
};

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default CreatePost;
