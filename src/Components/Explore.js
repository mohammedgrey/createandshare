import React from "react";
import "./Explore.css";
import axios from "axios";

class Explore extends React.Component {
  componentDidMount() {}

  render() {
    console.log(process.env);
    return (
      <div className="Explore">
        <button
          onClick={async () => {
            const res = await axios.get("/users/logout", {
              withCredentials: true,
            });
            console.log(res);
            window.location.reload(true);
          }}
        >
          LOG Out
        </button>
      </div>
    );
  }
}

export default Explore;
