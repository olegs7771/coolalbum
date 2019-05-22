import { SEND_SMS } from "./types";
import axios from "axios";

//Send SMS Code to Requesting User

export const sendSmsCode = (data, history) => dispatch => {
  console.log("sms data", data);

  axios.post("/api/phone/send", data).then(res => {
    console.log("res.data", res.data);
  });
};
