import React, { useRef, useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import moment from "moment";
import LinearProgress from "@material-ui/core/LinearProgress";
// import createbackground from "../../Assets/Imagaes/createbackground.jpg";
const createbackground = require("../../Assets/Imagaes/createbackground.jpg");

const CreatePost = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");
  const inputFile = useRef(null);
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
    axios({
      method: "POST",
      url: "/posts/me",
      data: fd,
    }).then(
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
          event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type === "image/png"
        )
      ) {
        console.log("invalid image");

        setSelectedPhoto(null);
        setImagePreview(null);
        alert("Please enter a valid image. Valid extentions are .jpeg or .png");
      } else {
        console.log("valid image");
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = (event) => {
          console.log(event.target.result);
          setImagePreview(event.target.result);
        };
        setSelectedPhoto(event.target.files[0]);
      }
    }
  };
  if (loading) {
    return <LinearProgress />;
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
        {imagePreview && <img src={imagePreview} alt="not found"></img>}
        <div className="file-upload">
          <input
            onChange={onChangeFile}
            style={{ display: "none" }}
            type="file"
            ref={inputFile}
          ></input>
          <button onClick={onFileUpload}>pick a file</button>
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

export default CreatePost;
