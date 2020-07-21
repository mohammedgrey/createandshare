import React from "react";
import Modal from "react-bootstrap/Modal";
import "./LikesModal.css";
import Comment from "../Generic/Comment";
import { useState, useRef, useCallback } from "react";
import usePagination from "../Generic/UsePagination";
import CircularProgress from "@material-ui/core/CircularProgress";

const CommentsModal = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { items, hasMore, loading, error } = usePagination(
    `/posts/${props.postID}/comment`,
    pageNumber,
    "postComments"
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
      <Modal.Body className="modal-comment-body">
        <div className="container-comments-model">
          {props.loadingComment ? (
            <div className="center-horizontally">
              <CircularProgress />
            </div>
          ) : !items.length && !loading ? (
            <h6>No comments to show...</h6>
          ) : (
            <div className="likes-modal">
              {items.map((comment, index) => {
                if (items.length === index + 1) {
                  return (
                    <div ref={lastItemElementRef}>
                      <Comment
                        name={comment.user.name}
                        image={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${comment.user.image}`}
                        userID={comment.user._id}
                        id={comment._id}
                        key={comment._id}
                        date={comment.createdAt}
                        text={comment.text}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <Comment
                        name={comment.user.name}
                        image={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${comment.user.image}`}
                        userID={comment.user._id}
                        id={comment._id}
                        key={comment._id}
                        date={comment.createdAt}
                        text={comment.text}
                      />
                    </div>
                  );
                }
              })}

              <div>{loading && <CircularProgress />}</div>
              <div>{error && "Error"}</div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-comment-footer">
        <div className="text-area">
          <textarea
            placeholder="Add a comment"
            type="text area"
            value={props.content}
            onChange={(e) => props.setContent(e.target.value)}
          ></textarea>
          <i class="fas fa-pen"></i>
        </div>
        <button
          onClick={props.handleAddComment}
          id={props.content === "" ? "disabled-button" : ""}
          disabled={props.content === ""}
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
