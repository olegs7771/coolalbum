import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import errorsReducer from "./errorsReducer";
import mailReducer from "./mailReducer";
import messageReducer from "./messageReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  users: userReducer,
  errors: errorsReducer,
  message: messageReducer,
  mail: mailReducer,
  weather: weatherReducer
});
