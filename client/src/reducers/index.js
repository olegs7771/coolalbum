import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import errorsReducer from "./errorsReducer";
import mailReducer from "./mailReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorsReducer,
  mail: mailReducer
});
