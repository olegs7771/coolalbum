import { SEND_POST } from "./types";
import axios from "axios";

//Send post to another user

export const sendPost = data => dispatch => {
  console.log("data", data);
  axios
    .post("/api/posts/post", data)
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err", err);
    });
};
