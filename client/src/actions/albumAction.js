import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_MESSAGE,
  // CLEAR_MESSAGE,
  GET_USER_ALBUMS,
  LOADING_ALBUMS,
  SELECT_ALBUM,
  SELECT_IMAGE,
  GET_GALLERY
} from "./types";
import axios from "axios";

//Get Users Albums with user id form token
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
//Get Users Albums with user id from UserItems.js
export const getUserAlbumsById = data => dispatch => {
  console.log("data", data);

  dispatch(loadingAlbum());
  axios
    .post("/api/albums/albumsById", data)
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

//Select Image from Gallery To Display As A Theme
export const selectImage = data => dispatch => {
  console.log("data", data);
  dispatch({
    type: SELECT_IMAGE,
    payload: data
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
//Delete Gallery Image by id
export const deleteImage = (data, history) => dispatch => {
  console.log("data", data);

  axios.post("/api/albums/delete_image", data).then(res => {
    console.log("res.data", res.data);
    dispatch({
      type: GET_MESSAGE,
      payload: res.data
    });
    setTimeout(() => {
      history.push(`/album_edit/${data.album_id}`);
    }, 5000);
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
