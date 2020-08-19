import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import isLoggedIn from "./Functions/isLoggedIn";
import { useState, useEffect } from "react";
import InsidePages from "./Components/InsidePages";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  // chrome.cookies.get(
  //   { url: process.env.REACT_APP_BACKEND_DOMAIN, name: "jwt" },
  //   (cookie) => {
  //     console.log(cookie);
  //   }
  // );
  console.log();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    console.log("entered useEffect");
    // setLoading(true);
    isLoggedIn().then((res) => {
      console.log("loading should be fasle");
      setLoading(false);
      setLoggedIn(res);
    });
  }, []);
  if (loading) {
    return (
      <div className="centered-div-spinner">
        <CircularProgress />
      </div>
    );
  } else {
    if (loggedIn) {
      return (
        <div className="App">
          <InsidePages />
        </div>
      );
    } else {
      return <LandingPage />;
    }
  }
}

export default App;
