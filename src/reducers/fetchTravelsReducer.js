import {FETCH_TRAVELS} from '../actions/constants.js';


const initialState = {
	travels: ""
}
let fetchTravelsReducer = (state = initialState, action) => {
	switch( action.type ) {

		case FETCH_TRAVELS:
		return {
			...state,
			travels: action.payload
		};

		default:
			return state;
	}
}

export default fetchTravelsReducer;
