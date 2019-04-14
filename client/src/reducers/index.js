import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import mailReducer from "./mailReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  mail: mailReducer
});
