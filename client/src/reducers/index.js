/**
 *
 * @Component index.js
 * @Description Combines reducers in folder and exports
 *
 */

import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";
import itemReducer from "./itemReducer";
import modalReducer from "./modalReducer";
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  group: groupReducer,
  item: itemReducer,
  modal: modalReducer,
});
