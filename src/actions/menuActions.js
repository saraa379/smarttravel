import {TAB_CLICKED} from './constants.js';
//click event for tabs

export const actionClickTab = (tab) => dispatch => {
      dispatch({
        type: TAB_CLICKED,
        payload: tab
      });
};
