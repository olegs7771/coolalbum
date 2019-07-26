import { CHAT_TYPING_LOADER } from "../actions/types";
const initialState = {
  chatMessage: null,
  chatLoader: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CHAT_TYPING_LOADER:
      return {
        ...state,
        chatLoader: true
      };
    default:
      return state;
  }
}
