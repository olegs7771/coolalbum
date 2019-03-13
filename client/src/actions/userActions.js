import { GET_ERRORS, GET_USER } from "./types";
import axios from "axios";

//Register New User
export const registerUser = userData => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Register New User with Facebook
export const registerUserFb = userData => dispatch => {
  axios
    .post("api/users/registerFb", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Login
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Get User
export const getUser = userData => dispatch => {
  console.log(userData);

  axios
    .post("api/users/current", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
