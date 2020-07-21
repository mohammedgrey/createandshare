import React, { useEffect } from "react";
import Post from "../Components/Generic/Post";
import { useState, useRef, useCallback } from "react";
import usePagination from "../Components/Generic/UsePagination";
import axios from "axios";
import "./UserPage.css";

const UserPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [followed, setFollowed] = useState(undefined);
  const [loadingFollow, setLoadingFollow] = useState(true);

  const { items, hasMore, loading, error } = usePagination(
    `/posts${window.location.pathname}`,
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
  useEffect(() => {
    // console.log(window.location.pathname);
    // console.log(window.location.pathname.split("/")[2]);
    // setLoadingProfile(true);
    axios.get(window.location.pathname).then(
      (res) => {
        setLoadingProfile(false);
        console.log(res.data.data.user);
        const user = res.data.data.user;
        setName(user.name);
        setBio(user.bio);
        setImage(user.image);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [name, bio, image]);

  useEffect(() => {
    // console.log(window.location.pathname);
    const id = window.location.pathname.split("/")[2];
    // setLoadingProfile(true);
    axios.get(`/users/isfollowed/${id}`).then(
      (res) => {
        console.log(res.data.message);

        if (res.data.message === "followed") setFollowed(true);
        else setFollowed(false);

        setLoadingFollow(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [followed]);

  const handleFollow = () => {
    const id = window.location.pathname.split("/")[2];
    setLoadingFollow(true);
    if (followed) {
      console.log(id);
      axios.delete(`/users/follow/${id}`).then(
        (res) => {
          setFollowed(false);
          setLoadingFollow(false);
        },
        (error) => {
          console.log(error.response);
        }
      );
    } else {
      axios
        .post("/users/follow", {
          toFollowId: id,
        })
        .then(
          (res) => {
            setFollowed(true);
            setLoadingFollow(false);
          },
          (error) => {
            console.log(error.response);
          }
        );
    }
  };
  return (
    <div className="user-page">
      {loadingProfile ? (
        <i class="fas fa-spinner fa-spin" />
      ) : (
        <div className="other-user-profile-data">
          <h1>
            {name}{" "}
            {!loadingFollow && (
              <i
                class="fas fa-star"
                id={followed ? "favored" : "not-favored"}
                onClick={handleFollow}
              ></i>
            )}
          </h1>
          <img
            src={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${image}`}
            alt="user"
          ></img>
          <p className="other-user-bio-text">{bio}</p>
        </div>
      )}
      <h1>Creations</h1>
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

      <div>{loading && <i class="fas fa-spinner fa-spin" />}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};
export default UserPage;
