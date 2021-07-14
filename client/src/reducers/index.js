import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";
import itemReducer from "./itemReducer";
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  group: groupReducer,
  item: itemReducer,
});
