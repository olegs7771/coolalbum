import { GET_ALL_USERS, LOADING_ALL_USERS } from "../actions/types";
const initialState = {
  loading: false,
  users: null
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_ALL_USERS:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: actions.payload,
        loading: false
      };

    default:
      return state;
  }
}
