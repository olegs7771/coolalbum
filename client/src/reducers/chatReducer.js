import {} from "../actions/types";
const initialState = {
  chatMessage: null,
  chatLoader: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
