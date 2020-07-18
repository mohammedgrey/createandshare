import axios from "axios";
const isLoggedIn = async () => {
  try {
    await axios.get("/users/loggedin", {
      withCredentials: true,
    });
    return true;
  } catch {
    return false;
  }
};

export default isLoggedIn;
