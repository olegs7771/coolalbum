import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import errorsReducer from "./errorsReducer";
import mailReducer from "./mailReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorsReducer,
  message: messageReducer,
  mail: mailReducer
});
