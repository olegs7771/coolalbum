import { GET_POSTS } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  post: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
}
