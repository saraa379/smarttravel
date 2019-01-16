import {UPDATE_CURRENT_USER} from './constants.js';

export const actionUpdateCurrentUser = (user) => dispatch => {
      dispatch({
        type: UPDATE_CURRENT_USER,
        payload: user
      });
};
