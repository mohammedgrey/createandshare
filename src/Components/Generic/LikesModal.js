import React from "react";
import Modal from "react-bootstrap/Modal";
import "./LikesModal.css";
import User from "../Generic/User";
import { useState, useRef, useCallback } from "react";
import usePagination from "../Generic/UsePagination";
import { CircularProgress } from "@material-ui/core";

const LikesModal = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { items, hasMore, loading, error } = usePagination(
    `/posts/${props.postID}/likes`,
    pageNumber,
    "usersLikes"
  );

  const observer = useRef();
  const lastItemElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-edit-picture-class"
    >
      <Modal.Body className="">
        <div className="likes-modal">
          {items.map((user, index) => {
            if (items.length === index + 1) {
              return (
                <div ref={lastItemElementRef}>
                  <User
                    name={user.user.name}
                    image={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${user.user.image}`}
                    id={user.user._id}
                    key={user.user._id}
                    size="small"
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <User
                    name={user.user.name}
                    image={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${user.user.image}`}
                    id={user.user._id}
                    key={user.user._id}
                    size="small"
                  />
                </div>
              );
            }
          })}

          <div>{loading && <CircularProgress />}</div>
          <div>{error && "Error"}</div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer-edit-picture-class">
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default LikesModal;
