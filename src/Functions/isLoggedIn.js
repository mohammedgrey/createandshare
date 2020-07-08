import axios from "axios";
const isLoggedIn = async () => {
  try {
    await axios.get("http://127.0.0.1:8000/api/v1/users/loggedin", {
      withCredentials: true,
    });
    return true;
  } catch {
    return false;
  }
};

export default isLoggedIn;
