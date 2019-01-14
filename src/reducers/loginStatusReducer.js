import {CHANGE_LOGIN_STATUS} from '../actions/constants.js';
const initialState = {
	loginStatus: false
}
let loginStatusReducer = (state = initialState, action) => {
	switch( action.type ) {

		case CHANGE_LOGIN_STATUS:
		return {
			...state,
			loginStatus: action.payload
		};

		default:
			return state;
	}
}

export default loginStatusReducer;
