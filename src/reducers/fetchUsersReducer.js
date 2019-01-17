import {FETCH_USERS} from '../actions/constants.js';


const initialState = {
	users: {}
}
let fetchUsersReducer = (state = initialState, action) => {
	switch( action.type ) {

		case FETCH_USERS:
		return {
			...state,
			users: action.payload
		};

		default:
			return state;
	}
}

export default fetchUsersReducer;
