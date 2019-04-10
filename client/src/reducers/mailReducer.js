import {} from "../actions/types";
import { isEmpty } from "../utils/isEmpty";

const initialState = {
  message: ""
};
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
