import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import loginStatusReducer from "./loginStatusReducer";


export default combineReducers({
  currentTab: tabReducer,
  loginStatus: loginStatusReducer
});
