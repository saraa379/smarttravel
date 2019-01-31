import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import loginStatusReducer from "./loginStatusReducer";
import updateCurrentUserReducer from "./updateCurrentUserReducer";
import fetchUsersReducer from "./fetchUsersReducer";
import fetchTravelsReducer from "./fetchTravelsReducer";
import updateDepartureCityErrorMsgReducer from "./updateDepartureCityErrorMsgReducer";


export default combineReducers({
  currentTab: tabReducer,
  loginStatus: loginStatusReducer,
  currentUser: updateCurrentUserReducer,
  users: fetchUsersReducer,
  travels: fetchTravelsReducer,
  departureCityErrorMsg: updateDepartureCityErrorMsgReducer
});
