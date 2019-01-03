import {TAB_CLICKED} from '../actions/constants.js';
const initialState = {
	currentTab: "Home"
}
let tabReducer = (state = initialState, action) => {
	switch( action.type ) {

		case TAB_CLICKED:
		return {
			...state,
			currentTab: action.payload
		};

		default:
			return state;
	}
}

export default tabReducer;
