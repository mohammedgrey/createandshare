import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import isLoggedIn from "./Functions/isLoggedIn";
import { useState, useEffect } from "react";
import InsidePages from "./Components/InsidePages";

function App() {
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
  });
  if (loading) {
    return <i class="fas fa-spinner fa-spin center-spinner" />;
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
