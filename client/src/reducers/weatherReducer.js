import { LOADING_CURRENT_WEATHER, GET_CURRENT_WEATHER } from "../actions/types";

const initialState = {
  weather: null,
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_CURRENT_WEATHER:
      return {
        ...state,
        loading: true
      };
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        weather: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
