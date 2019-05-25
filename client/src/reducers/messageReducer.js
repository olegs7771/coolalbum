import { GET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  message: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: {}
      };
    default:
      return state;
  }
}
