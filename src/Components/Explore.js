import React from "react";
import Post from "../Components/Generic/Post";
import { useState, useRef, useCallback } from "react";
import usePagination from "../Components/Generic/UsePagination";
import "./Explore.css";
import CreatePost from "./Generic/CreatePost";

const Explore = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { items, hasMore, loading, error } = usePagination(
    "/posts",
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
    <div className="explore-main-class">
      <CreatePost />
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
              />
            </div>
          );
        }
      })}

      <div>{loading && <i class="fas fa-spinner fa-spin" />}</div>
      <div>{error && "Error"}</div>
    </div>
  );
  // }
};

export default Explore;
