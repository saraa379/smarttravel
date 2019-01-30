import {UPDATE_DEPARTURE_CITY_ERROR_MSG} from './constants.js';
//click event for tabs

export const updateDepartureCityErrorMsgAction = (bool) => dispatch => {
      dispatch({
        type: UPDATE_DEPARTURE_CITY_ERROR_MSG,
        payload: bool
      });
};
