import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import loginStatusReducer from "./loginStatusReducer";
import updateCurrentUserReducer from "./updateCurrentUserReducer";


export default combineReducers({
  currentTab: tabReducer,
  loginStatus: loginStatusReducer,
  currentUser: updateCurrentUserReducer
});
