import { GET_ERRORS, MESSAGE_MAIL_SENT, MESSAGE_MAIL_LOADING } from "./types";
import axios from "axios";
import { setAuthToken } from "../utils/setAuthToken";

export const sendEmailMessage = (emailData, history) => dispatch => {
  setAuthToken(localStorage.jwtToken);
  dispatch(mailMessageLoading());

  axios
    .post("api/email/sendEmail", emailData)
    .then(res => {
      dispatch({
        type: MESSAGE_MAIL_SENT,
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

//set mailMessage loading
export const mailMessageLoading = () => {
  return {
    type: MESSAGE_MAIL_LOADING
  };
};
