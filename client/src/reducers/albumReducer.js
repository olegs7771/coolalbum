import { GET_USER_ALBUMS, LOADING_ALBUMS } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

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
<<<<<<< HEAD:client/src/reducers/albumReducer.js

=======
    case GET_USER_ALBUMS:
      return {
        ...state,
        album: action.payload,
        loading: false
      };
>>>>>>> 175de00e6e372553cd0e937cb2c5b39566bd7a20:client/src/reducers/profileReducer.js
    default:
      return state;
  }
}
