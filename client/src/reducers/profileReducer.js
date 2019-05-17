import { GET_PROFILE, LOADING_PROFILE } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  profiles: null,
  profile: null,
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PROFILE:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
