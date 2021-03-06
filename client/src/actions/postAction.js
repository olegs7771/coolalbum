import {
  GET_POSTS,
  GET_ERRORS,
  LOADING_POSTS,
  GET_MESSAGE,
  CLEAR_MESSAGE
} from "./types";
import axios from "axios";

//Send post to another user

export const sendPost = data => dispatch => {
  console.log("data", data);
  axios
    .post("/api/posts/post", data)
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

//Get Posts by logged user's ID from jwt
// Private Route
export const getPosts = () => dispatch => {
  dispatch(loadingPost());
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

//Delete post by id
export const deletePost = data => dispatch => {
  console.log("data", data);
  axios
    .post("/api/posts/delete", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
      //reload messages
      setTimeout(() => {
        dispatch(clearMessage());
        dispatch(loadingPost());
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
      }, 3000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loadingPost = () => {
  return {
    type: LOADING_POSTS
  };
};
export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE
  };
};
