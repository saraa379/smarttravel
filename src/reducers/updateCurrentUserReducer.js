import {UPDATE_CURRENT_USER} from '../actions/constants.js';
const initialState = {
	currentUser: {}
}
let updateCurrentUserReducer = (state = initialState, action) => {
	switch( action.type ) {

		case UPDATE_CURRENT_USER:
		return {
			...state,
			currentUser: action.payload
		};

		default:
			return state;
	}
}

export default updateCurrentUserReducer;
