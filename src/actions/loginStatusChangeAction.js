import {CHANGE_LOGIN_STATUS} from './constants.js';
//click event for tabs

export const actionChangeLoginStatus = (status) => dispatch => {
      dispatch({
        type: CHANGE_LOGIN_STATUS,
        payload: status
      });
};
