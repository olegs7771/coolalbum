// import { isEmpty } from "../utils/isEmpty";
import { LOADING_ALBUMS, GET_USER_ALBUMS } from "../actions/types";

const initialState = {
  albums: null,
  album: null,
  loading: false
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

    default:
      return state;
  }
}
