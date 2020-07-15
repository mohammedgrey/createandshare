import React from "react";
import Modal from "react-bootstrap/Modal";
import "./Profile.css";

/** Function component EditPictureModal pops when the user clicks to change his/her profile picture
 * @func EditPictureModal
 */
const EditPictureModal = (props) => {
  return (
    <Modal
      className="modal-edit-picture-class"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body-edit-picture-class">
        <div
          style={{ float: props.newimage ? "left" : "none" }}
          className="profile-container-div"
        >
          <h4 className="your-old-new-prof-pic">Current Photo</h4>

          <img className="old-image-class" src={props.oldimage} alt="user" />
        </div>

        {props.newimage && (
          <div className="profile-container-div">
            <h4 className="your-old-new-prof-pic">New Photo</h4>
            <img className="old-image-class" src={props.newimage} alt="user" />
          </div>
        )}

        <h4 className="pick-up-a-new-photo">Pick up a new photo</h4>
        <input
          type="file"
          onChange={props.onChangeFile}
          data-buttonText="Your label here."
        />
      </Modal.Body>
      <Modal.Footer className="modal-footer-edit-picture-class">
        {props.photo ? (
          <button onClick={props.onSaveFile}>Change</button>
        ) : null}
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPictureModal;
