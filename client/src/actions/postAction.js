import { SEND_POST, GET_POSTS, GET_ERRORS } from "./types";
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

//Get Posts by logged user's ID from jwt
// Private Route
export const getPosts = () => dispatch => {
  axios
    .post("/api/posts/get_posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
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
