import { GET_PROFILE, GET_ERRORS } from "../actions/types";
import { isEmpty } from "../utils/isEmpty";

const initialState = {
  profiles: null,
  profile: null,
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
