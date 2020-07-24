import React from "react";
import Post from "../Components/Generic/Post";
import { useState, useRef, useCallback } from "react";
import usePagination from "../Components/Generic/UsePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
// import "./Favorites.css";

const Favorites = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { items, hasMore, loading, error } = usePagination(
    "/posts/follow",
    pageNumber
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
    <div className="ProfileCreations" style={{ paddingTop: "10px" }}>
      {!items.length && !loading ? (
        <h3 className="nothing-to-show">No Creations to show yet...</h3>
      ) : (
        <div>
          {items.map((post, index) => {
            if (items.length === index + 1) {
              return (
                <div ref={lastItemElementRef}>
                  <Post
                    content={post.content}
                    key={post._id}
                    id={post._id}
                    image={post.image}
                    userImage={post.user.image}
                    userId={post.user._id}
                    name={post.user.name}
                    date={post.createdAt}
                    likes={post.likes}
                    comments={post.comments}
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <Post
                    content={post.content}
                    key={post._id}
                    id={post._id}
                    image={post.image}
                    userImage={post.user.image}
                    userId={post.user._id}
                    name={post.user.name}
                    date={post.createdAt}
                    likes={post.likes}
                    comments={post.comments}
                  />
                </div>
              );
            }
          })}
        </div>
      )}

      <div>{loading && <CircularProgress />}</div>
      <div>{error && "Error"}</div>
    </div>
  );
  // }
};

export default Favorites;
