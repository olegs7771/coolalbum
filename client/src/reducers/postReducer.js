import { GET_POSTS, LOADING_POSTS } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  loading: false,
  post: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
