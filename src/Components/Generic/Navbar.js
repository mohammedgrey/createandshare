import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";

const NavBar = (props) => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .get("/users/me", {
        withCredentials: true,
      })
      .then(
        (res) => {
          setLoading(false);
          const user = res.data.data.user;

          setImage(user.image);
          setName(user.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [loading]);

  return (
    <div className="nav-bar" id="nav-bar">
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand>
          <NavLink to="/">Home</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink to="/">Explore</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="/favorites">Favorites</NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              {!loading && (
                <NavLink to="/profile">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${image}`}
                    alt="user"
                  />
                  {name}
                </NavLink>
              )}
            </Nav.Link>
            <Nav.Link eventKey={2}>
              <button
                id="log-out-button"
                onClick={async () => {
                  const res = await axios.get("/users/logout", {
                    withCredentials: true,
                  });
                  localStorage.removeItem("userID");
                  props.history.push("/");
                  window.location.reload(true);
                }}
              >
                LOG Out
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(NavBar);
