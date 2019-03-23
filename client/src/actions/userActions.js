import { GET_ERRORS, GET_USER, SET_CURRENT_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

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
    .then(res => {
      console.log(res.data.token);
      // Save to localStorage token
      const { token } = res.data;
      //Set token to localStorage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header (we crerate it in separate file)
      setAuthToken(token);
      // set the user (using user creds from token. but first we must to decode token with jwt-decode module)
      const decoded = jwt_decode(token);

      //set current user (we create separate function here)
      dispatch(setCurrentUser(decoded));
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Logout
export const logoutUser = history => dispatch => {
  // Remove jwtToken from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future request
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch({
    type: LOGOUT_USER,
    payload: {}
  });
};

//set logged user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Get User
export const getUserfb = userData => dispatch => {
  console.log(userData);

  axios
    .post("api/users/currentfb", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Kickof whole facebook process
export const authFacebook = () => dispatch => {
  fetch("/api/users/auth/facebook", {
    method: "HEAD",
    mode: "no-cors"
  });
};
