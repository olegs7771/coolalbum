import { MESSAGE_MAIL_SENT, MESSAGE_MAIL_LOADING } from "../actions/types";

const initialState = {
  message: null,
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_MAIL_LOADING:
      return {
        ...state,
        loading: true
      };

    case MESSAGE_MAIL_SENT:
      return {
        ...state,
        message: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
