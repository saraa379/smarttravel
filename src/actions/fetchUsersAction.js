import {FETCH_USERS} from './constants.js';
import firebase from '../firebase/firebase.js';

const databaseRef = firebase.database().ref();
const usersRef = databaseRef.child("users");

export const actionFetchUsers = () => async dispatch => {
    usersRef.on("value", snapshot => {
      dispatch({
        type: FETCH_USERS,
        payload: snapshot.val()
      });
    });
};
