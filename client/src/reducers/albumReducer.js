
// import { isEmpty } from "../utils/isEmpty";

const initialState = {
  albums: null,
  album: null,
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {

      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
