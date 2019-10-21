import { GET_PROFILE, LOADING_PROFILE } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  albums: null,
  album: null,
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PROFILE:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
