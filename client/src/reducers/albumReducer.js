// import { isEmpty } from "../utils/isEmpty";
import {
  LOADING_ALBUMS,
  GET_USER_ALBUMS,
  SELECT_ALBUM,
  GET_GALLERY
} from "../actions/types";

const initialState = {
  albums: null,
  album: null,
  loading: false,
  gallery: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_ALBUMS:
      return {
        ...state,
        loading: true
      };
    case GET_USER_ALBUMS:
      return {
        ...state,
        albums: action.payload,
        loading: false
      };
    case SELECT_ALBUM:
      return {
        ...state,
        album: action.payload
      };

    default:
      return state;
  }
}
