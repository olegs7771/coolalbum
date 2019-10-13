import {
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING_PROFILE,
  GET_PROFILE,
  GET_MESSAGE,
  CLEAR_MESSAGE,
  LOGOUT_USER,
  SET_CURRENT_USER
  // GET_PROFILES
} from "./types";
import axios from "axios";
// import configureStore from "../store/configureStore";
import setAuthToken from "../utils/setAuthToken";

import jwt_decode from "jwt-decode";
// const store = configureStore();

// Create new Profile or Update profile
export const createProfile = (data, history) => dispatch => {
  console.log("data", data);

  axios
    .post("/api/profiles/update", data)
    .then(res => {
      console.log("res.data", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    })
    .then(() => {
      setTimeout(() => {
        dispatch(clearMessages());
        // Remove jwtToken from localStorage
        localStorage.removeItem("jwtToken");
        //Remove auth header for future request
        setAuthToken(false);
        //Set current user to {} which will set isAuthenticated to false
        dispatch({
          type: LOGOUT_USER,
          payload: {}
        });
      }, 6000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// /set logged user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// Create new or Update Profile Avatar
export const updateAvatar = (fd, history, userData) => dispatch => {
  console.log("userData", userData);
  console.log("fd", fd);

  axios
    .post("/api/uploads/update", fd)
    .then(res => {
      console.log("res.data", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
      setTimeout(() => {
        dispatch(clearMessages());
        // Remove jwtToken from localStorage
        localStorage.removeItem("jwtToken");
        //Remove auth header for future request
        setAuthToken(false);
        //Set current user to {} which will set isAuthenticated to false
        dispatch({
          type: LOGOUT_USER,
          payload: {}
        });
        //login updated user
        // store.dispatch(loginUser(userData, history));
        axios.post("api/users/login", userData).then(res => {
          // Save to localStorage token
          const { token } = res.data;
          //Set token to localStorage
          localStorage.setItem("jwtToken", token);
          //Set token to Auth header (we crerate it in separate file)
          setAuthToken(token);
          // set the user (using user creds from token. but first we must to decode token with jwt-decode module)
          const decoded = jwt_decode(token);
          console.log("decoded", decoded);

          //set current user (we create separate function here)
          dispatch(setCurrentUser(decoded));
          history.push("/");
        });
      }, 6000);
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get Current Profile
export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/profiles/current")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Current Profile
export const deleteProfile = history => dispatch => {
  axios
    .delete("/api/profiles/delete")
    .then(res => {
      dispatch({
        type: GET_MESSAGE,
        payload: res.data.msg
      });
    })
    .then(() => {
      setTimeout(() => {
        dispatch(clearMessages());
        history.push("/");
      }, 6000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Profile Loading
export const setProfileLoading = () => {
  return {
    type: LOADING_PROFILE
  };
};

//Clear Messages
export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGE
  };
};
//Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
