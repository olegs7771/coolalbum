import {
  GET_ERRORS,
  // LOADING_PROFILE,
  GET_PROFILE,
  GET_MESSAGE
  // GET_PROFILES
} from "./types";
import axios from "axios";

// Create new Profile
export const createProfile = data => dispatch => {
  console.log("data", data);

  axios
    .post("/api/profiles/update", data)
    .then(res => {
      console.log("res.data", res.data);
      // dispatch({
      //   type: GET_PROFILE,
      //   payload: res.data
      // });
      dispatch({
        type: GET_MESSAGE,
        payload: res.data.msg
      });
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
export const deleteProfile = () => dispatch => {
  axios
    .delete("/api/profiles/delete")
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
