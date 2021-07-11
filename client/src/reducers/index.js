import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  group: groupReducer,
});
