import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_MESSAGE,
  // CLEAR_MESSAGE,
  GET_USER_ALBUMS,
  LOADING_ALBUMS,
  SELECT_ALBUM,
  ADD_IMAGE_TO_GALLERY
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
    })
    .catch(err => {
      console.log("err:", err);
    });
};

//Create/update  Album
export const updateAlbum = (FD, history) => dispatch => {
  axios
    .post("api/albums/update", FD)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
      setTimeout(() => {
        history.push("/albums");
      }, 3000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
  // .then(() => {
  //   history.push("/albums");
  // });
};
//Get Album by id
//@Private Route
export const selectAlbum = data => dispatch => {
  axios.post("/api/albums/fetchAlbum", data).then(res => {
    dispatch({
      type: SELECT_ALBUM,
      payload: res.data
    });
  });
};

//Add Image To the Gallery
export const addImageToGallery = data => dispatch => {
  console.log("data", data);
};

//Loading
export const loadingAlbum = () => {
  return {
    type: LOADING_ALBUMS
  };
};
//Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
