import {FETCH_TRAVELS} from './constants.js';
import firebase from '../firebase/firebase.js';

const databaseRef = firebase.database().ref();
const travelsRef = databaseRef.child("travels");

export const actionFetchTravels = () => async dispatch => {
    travelsRef.on("value", snapshot => {
      dispatch({
        type: FETCH_TRAVELS,
        payload: snapshot.val()
      });
    });
};
