// Here we gonna set default path for axios.
// it will on every http request to api put token from localStorage to the header
import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    // Apply to every request

    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
