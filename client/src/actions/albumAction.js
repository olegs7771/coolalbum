import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_MESSAGE,
  CLEAR_MESSAGE,
  GET_USER_ALBUMS,
  LOADING_ALBUMS
} from "./types";
import axios from "axios";

export const getUserAlbums = () => dispatch => {
  axios
    .post("/api/albums/albums")
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err:", err);
    });
};
