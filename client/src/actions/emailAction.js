import { GET_ERRORS } from "./types";
import axios from "axios";
import { setAuthToken } from "../utils/setAuthToken";

export const sendEmailMessage = (emailData, history) => dispatch => {
  setAuthToken(localStorage.jwtToken);

  axios
    .post("api/email/sendEmail", emailData)
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
