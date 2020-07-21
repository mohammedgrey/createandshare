import React from "react";
import "./Profile.css";
import User from "../Generic/User";
import { useState, useRef, useCallback } from "react";
import usePagination from "../Generic/UsePagination";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProfileFavCreators = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { items, hasMore, loading, error } = usePagination(
    "/users/me/following",
    pageNumber,
    "following"
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
    <div className="ProfileFavCreators">
      {items.map((user, index) => {
        if (items.length === index + 1) {
          return (
            <div ref={lastItemElementRef}>
              <User
                name={user.followee.name}
                image={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${user.followee.image}`}
                id={user.followee._id}
                key={user.followee._id}
              />
            </div>
          );
        } else {
          return (
            <div>
              <User
                name={user.followee.name}
                image={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${user.followee.image}`}
                id={user.followee._id}
                key={user.followee._id}
              />
            </div>
          );
        }
      })}

      <div>{loading && <CircularProgress />}</div>
      <div>{error && "Error"}</div>
    </div>
  );
  // }
};

export default ProfileFavCreators;
