import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import loginStatusReducer from "./loginStatusReducer";
import updateCurrentUserReducer from "./updateCurrentUserReducer";
import fetchUsersReducer from "./fetchUsersReducer";
import updateDepartureCityErrorMsgReducer from "./updateDepartureCityErrorMsgReducer";


export default combineReducers({
  currentTab: tabReducer,
  loginStatus: loginStatusReducer,
  currentUser: updateCurrentUserReducer,
  users: fetchUsersReducer,
  departureCityErrorMsg: updateDepartureCityErrorMsgReducer
});
