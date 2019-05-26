import {
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING_PROFILE,
  GET_PROFILE,
  GET_MESSAGE,
  CLEAR_MESSAGE
  // GET_PROFILES
} from "./types";
import axios from "axios";
import store from "../store";
import { logoutUser } from "./userActions";

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
        store.dispatch(logoutUser());
        history.push("/login");
      }, 6000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Create new or Update Profile Avatar
export const updateAvatar = (fd, history) => dispatch => {
  console.log("fd", fd);

  axios
    .post("/api/uploads/update", fd)
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
        store.dispatch(logoutUser());
        history.push("/login");
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
export const getProfile = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/profiles/current", id)
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
