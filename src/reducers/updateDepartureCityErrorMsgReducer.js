import {UPDATE_DEPARTURE_CITY_ERROR_MSG} from '../actions/constants.js';
const initialState = {
	departureCityErrorMsg: false
}
let updateDepartureCityErrorMsgReducer = (state = initialState, action) => {
	switch( action.type ) {

		case UPDATE_DEPARTURE_CITY_ERROR_MSG:
		return {
			...state,
			departureCityErrorMsg: action.payload
		};

		default:
			return state;
	}
}

export default updateDepartureCityErrorMsgReducer;
