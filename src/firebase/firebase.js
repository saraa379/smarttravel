import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDlj2ZCsAOlT15iw1PHzEOKmwi0W3bFyAU",
    authDomain: "smarttravel-efe20.firebaseapp.com",
    databaseURL: "https://smarttravel-efe20.firebaseio.com",
    projectId: "smarttravel-efe20",
    storageBucket: "smarttravel-efe20.appspot.com",
    messagingSenderId: "127658161332"
  };

	firebase.initializeApp(config);

	export default firebase;
