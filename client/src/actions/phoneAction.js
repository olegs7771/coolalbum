import { GET_MESSAGE, CLEAR_MESSAGE, GET_ERRORS, CLEAR_ERRORS } from "./types";
import axios from "axios";

//Send SMS Code to Requesting User

export const sendSmsCode = (data, history) => dispatch => {
  console.log("sms data", data);
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
