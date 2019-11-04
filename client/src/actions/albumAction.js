import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_MESSAGE,
  // CLEAR_MESSAGE,
  GET_USER_ALBUMS,
  LOADING_ALBUMS,
  SELECT_ALBUM,
  GET_GALLERY
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
export const addImageToGallery = (fd, data) => dispatch => {
  console.log("fd", fd);
  console.log("data", data);

  axios
    .post("/api/albums/add_gallery_img", fd)
    .then(res => {
      console.log("image loaded to the gallery");
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
      setTimeout(() => {
        data.history.push(`/albums`);
      }, 5000);
    })
    .catch(err => {
      console.log("error :", err.response.data);
    });
};

//Get All Gallery from Album by id
export const getGallery = data => dispatch => {
  console.log("data", data);

  axios
    .post("/api/albums/get_gallery_all", data)
    .then(res => {
      // console.log("res.data", res.data);
      dispatch({
        type: GET_GALLERY,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error :", err);
    });
};

//Delete Album by id
export const deleteAlbum = (data, history) => dispatch => {
  axios.post("/api/albums/delete", data).then(res => {
    console.log("res.data", res.data);
    setTimeout(() => {
      history.push("/albums");
    }, 3000);
  });
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
