import { GET_MESSAGE, CLEAR_MESSAGE, GET_ERRORS, CLEAR_ERRORS } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/userActions";

//Send SMS Code to Requesting User

export const sendSmsCode = (data, history) => dispatch => {
  console.log("sms data", data);
  //data:{phone,email,text}

  dispatch(clearErrors());
  dispatch(clearMessages());

  axios
    .post("/api/phone/send", data)
    .then(res => {
      console.log("res.data", res.data);

      dispatch({
        type: GET_MESSAGE,
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

//Send  Code for authentication and logs in user
export const sendCode = (data, history) => dispatch => {
  console.log("code data", data);
  //data:{code:000000}

  dispatch(clearErrors());
  dispatch(clearMessages());

  axios
    .post("/api/phone/code", data)
    .then(res => {
      console.log("res.data", res.data);
      if (res.data.code === data.code) {
        console.log("code does match");
        dispatch(clearErrors());
        // code is valid , user logs in

        //Set token to localStorage
        localStorage.setItem("jwtToken", res.data.token);
        //Set token to Auth header (we crerate it in separate file)
        setAuthToken(res.data.token);
        // set the user (using user creds from token. but first we must to decode token with jwt-decode module)
        const decoded = jwt_decode(res.data.token);
        console.log("decoded", decoded);

        //set current user (we create separate function here)
        dispatch(setCurrentUser(decoded));
        dispatch(clearErrors());
        history.push("/");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//checks if email valid onChange
export const isEmailvalid = data => dispatch => {
  dispatch(clearErrors());
  dispatch(clearMessages());
  axios
    .post("/api/phone/isEmailValid", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
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

//checks if phone valid onChange
export const isPhonevalid = data => dispatch => {
  dispatch(clearErrors());
  dispatch(clearMessages());

  axios
    .post("/api/phone/isPhoneValid", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
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

// Clear Errors
export const clearErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_ERRORS
  });
};
// Clear Messages
export const clearMessages = () => dispatch => {
  return dispatch({
    type: CLEAR_MESSAGE
  });
};
