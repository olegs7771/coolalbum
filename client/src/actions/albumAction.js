import {
  // GET_ERRORS,
  // CLEAR_ERRORS,
  // GET_MESSAGE,
  // CLEAR_MESSAGE,
  GET_USER_ALBUMS,
  LOADING_ALBUMS
} from "./types";
import axios from "axios";

//Get Users Albums bu uid
export const getUserAlbums = () => dispatch => {
  dispatch(loadingAlbum());
  axios
    .post("/api/albums/albums")
    .then(res => {
      dispatch({
        type: GET_USER_ALBUMS,
        payload: res.data
      });
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err:", err);
    });
};

//Create/update  Album
export const updateAlbum = FD => dispatch => {
  axios.post("api/albums/update", FD).then(res => {
    console.log("res.data", res.data);
  });
};

//Loading
export const loadingAlbum = () => {
  return {
    type: LOADING_ALBUMS
  };
};
