import { GET_PROFILE } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  profiles: null,
  profile: null,
  loading: true
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
