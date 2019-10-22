import { combineReducers } from "redux";
import authReducer from "./authReducer";
import albumReducer from "./albumReducer";
import userReducer from "./userReducer";
import errorsReducer from "./errorsReducer";
import mailReducer from "./mailReducer";
import messageReducer from "./messageReducer";
import weatherReducer from "./weatherReducer";
import postReducer from "./postReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  auth: authReducer,
  album: albumReducer,
  users: userReducer,
  errors: errorsReducer,
  message: messageReducer,
  mail: mailReducer,
  weather: weatherReducer,
  post: postReducer,
  chat: chatReducer
});
