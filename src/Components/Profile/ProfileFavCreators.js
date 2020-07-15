import React from "react";
import "./Profile.css";
import axios from "axios";
import formatDate from "../../Functions/formatDate";

class ProfileFavCreators extends React.Component {
  state = {
    image: "",
    name: "",
    email: "",
    birthdate: "",
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/users/me", {
        withCredentials: true,
      })
      .then(
        (res) => {
          this.setState({ loading: false });
          const user = res.data.data.user;

          user.birthdate = formatDate(user.birthdate);
          this.setState({
            image: user.image,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    if (this.state.loading) {
      return <i class="fas fa-spinner fa-spin" />;
    } else {
      return <div className="ProfileFavCreators"></div>;
    }
  }
}

export default ProfileFavCreators;
