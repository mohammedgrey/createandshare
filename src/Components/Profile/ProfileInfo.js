import React from "react";
import "./Profile.css";
import axios from "axios";
import formatDate from "../../Functions/formatDate";
import validateEmail from "../../Functions/validateEmail";
import EditPictureModal from "./EditPictureModal";
import Alert from "../Generic/Alert";

class ProfileInfo extends React.Component {
  state = {
    image: "",
    name: "",
    email: "",
    birthdate: "",
    loading: false,
    modalShow: false,
    selectedPhoto: null,
    imagePreview: null,
    saveDisabled: true,
    dangerAlert: false,
    safeAlert: false,
    oldPassword: "",
    newPassword: "",
    cnewPassword: "",
    changeDisabled: true,
    dangerAlertPass: false,
    safeAlertPass: false,
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

  handleSaveUserInfo = () => {
    this.setState({ loading: true });
    axios({
      method: "PATCH",
      url: "/users/me/update",
      data: {
        name: this.state.name,
        email: this.state.email,
        birthdate: this.state.birthdate,
      },
    }).then(
      (res) => {
        this.setState({ loading: false });
        this.setState({ saveDisabled: true });
        this.setState({ safeAlert: true }, () => {
          setTimeout(() => {
            this.setState({ safeAlert: false });
          }, 1500);
        });
        // window.location.reload(true);
      },
      (error) => {
        this.setState({ loading: false });
        this.setState({ saveDisabled: true });
        if (error.response.data.message.includes("duplicate")) {
          this.setState({ dangerAlert: true }, () => {
            setTimeout(() => {
              this.setState({ dangerAlert: false });
            }, 3000);
          });
        } else {
          alert("unexpected Error");
        }
      }
    );
  };

  handleChangePassword = () => {
    this.setState({ loading: true });
    axios({
      method: "PATCH",
      url: "/users/me/updatepassword",
      data: {
        currentPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      },
    }).then(
      (res) => {
        this.setState({ loading: false });
        this.setState({ changeDisabled: true });
        this.setState({ oldPassword: "" });
        this.setState({ newPassword: "" });
        this.setState({ cnewPassword: "" });
        this.setState({ safeAlertPass: true }, () => {
          setTimeout(() => {
            this.setState({ safeAlertPass: false });
          }, 1500);
        });
        // window.location.reload(true);
      },
      (error) => {
        this.setState({ loading: false });
        this.setState({ changeDisabled: true });
        if (error.response.status === 401) {
          this.setState({ dangerAlertPass: true }, () => {
            setTimeout(() => {
              this.setState({ dangerAlertPass: false });
            }, 3000);
          });
        } else {
          alert("unexpected Error");
        }
      }
    );
  };

  validatePasswords = () => {
    if (
      this.state.newPassword.length >= 8 &&
      this.state.cnewPassword.length >= 8 &&
      this.state.oldPassword.length >= 8
    ) {
      if (this.state.newPassword === this.state.cnewPassword) {
        this.setState({ changeDisabled: false });
      } else {
        this.setState({ changeDisabled: true });
      }
    } else {
      this.setState({ changeDisabled: true });
    }
  };

  render() {
    if (this.state.loading) {
      return <i class="fas fa-spinner fa-spin" />;
    } else {
      return (
        <div className="ProfileInfo">
          <div className="my-profile-info">
            <EditPictureModal
              oldimage={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${this.state.image}`}
              newimage={this.state.imagePreview}
              show={this.state.modalShow}
              onHide={() => {
                this.setState({ modalShow: false });
                this.setState({ selectedPhoto: null });
                this.setState({ imagePreview: null });
              }}
              onSaveFile={() => {
                let fd = new FormData();
                // fd.append('image', selectedPhoto,selectedPhoto.name);
                fd.append("photo", this.state.selectedPhoto);
                fd.append("name", this.state.selectedPhoto.name);
                this.setState({ loading: true });
                axios({
                  method: "PATCH",
                  url: "/users/me/photo",
                  data: fd,
                }).then(
                  (res) => {
                    this.setState({ loading: false });
                    this.setState({ modalShow: false });
                    window.location.reload(true);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }}
              onChangeFile={(event) => {
                console.log(event.target.files[0]);
                if (event.target.files[0]) {
                  if (
                    !(
                      event.target.files[0].type === "image/jpeg" ||
                      event.target.files[0].type === "image/png"
                    )
                  ) {
                    console.log("valid image");
                    this.setState({ selectedPhoto: null });
                    this.setState({ imagePreview: null });
                    alert(
                      "Please enter a valid image. Valid extentions are .jpeg or .png"
                    );
                  } else {
                    console.log("invalid image");
                    var reader = new FileReader();
                    reader.readAsDataURL(event.target.files[0]);
                    reader.onloadend = (event) => {
                      console.log(event.target.result);
                      this.setState({ imagePreview: event.target.result });
                    };
                    this.setState({ selectedPhoto: event.target.files[0] });
                  }
                }
              }}
              photo={this.state.selectedPhoto}
            />
            <div className="my-picture-info">
              <img
                src={`${process.env.REACT_APP_BACKEND_DOMAIN}/images/users/${this.state.image}`}
                alt="user"
              />
              <button onClick={() => this.setState({ modalShow: true })}>
                CHANGE
              </button>
            </div>
            <div className="my-text-info">
              <h6>Name</h6>
              <input
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                  this.setState({ saveDisabled: false });
                }}
                type="text"
                value={this.state.name}
              ></input>
              {/* <p>{this.state.name}</p> */}
              <h6>Email</h6>
              <input
                onChange={(e) => {
                  this.setState({ email: e.target.value }, () => {
                    this.setState({
                      saveDisabled: !validateEmail(this.state.email),
                    });
                  });
                }}
                type="email"
                value={this.state.email}
              ></input>
              {/* <p>{this.state.email}</p> */}
              <h6>Birthdate</h6>
              <input
                onChange={(e) => {
                  this.setState({ birthdate: e.target.value });
                  this.setState({ saveDisabled: false });
                }}
                type="date"
                value={this.state.birthdate}
              ></input>
              {/* <p>{formatDate(this.state.birthdate)}</p> */}

              <button
                onClick={this.handleSaveUserInfo}
                id={this.state.saveDisabled ? "disabled-button" : ""}
                disabled={this.state.saveDisabled}
              >
                SAVE
              </button>
            </div>
          </div>

          <div className="change-password-block">
            <h6>Old password</h6>
            <input
              onChange={(e) => {
                this.setState({ oldPassword: e.target.value }, () => {
                  this.validatePasswords();
                });
                // this.setState({ changeDisabled: false });
              }}
              type="password"
              value={this.state.oldPassword}
            ></input>
            <h6>
              New Password <span>(at least 8 chars)</span>
            </h6>
            <input
              onChange={(e) => {
                this.setState({ newPassword: e.target.value }, () => {
                  this.validatePasswords();
                });
                // this.setState({ changeDisabled: false });
              }}
              type="password"
              value={this.state.newPassword}
            ></input>

            <h6>Confirm New Password</h6>
            <input
              onChange={(e) => {
                this.setState({ cnewPassword: e.target.value }, () => {
                  this.validatePasswords();
                });
                // this.setState({ changeDisabled: false });
              }}
              type="password"
              value={this.state.cnewPassword}
            ></input>

            <button
              onClick={this.handleChangePassword}
              id={this.state.changeDisabled ? "disabled-button" : ""}
              disabled={this.state.changeDisabled}
            >
              Change
            </button>
          </div>

          <Alert
            visible={this.state.safeAlert}
            type="safe-alert"
            message="Saved Successfully"
          />

          <Alert
            visible={this.state.dangerAlert}
            type="danger-alert"
            message="There is a user with this email"
          />

          <Alert
            visible={this.state.safeAlertPass}
            type="safe-alert"
            message="Changed Successfully"
          />

          <Alert
            visible={this.state.dangerAlertPass}
            type="danger-alert"
            message="Wrong Old Password"
          />
        </div>
      );
    }
  }
}

export default ProfileInfo;
