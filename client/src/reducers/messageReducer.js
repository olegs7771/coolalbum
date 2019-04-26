import { GET_MESSAGE } from "../actions/types";
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  message: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
