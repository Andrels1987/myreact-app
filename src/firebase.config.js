import firebase from 'firebase/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyCwFhx_sDPSTfzM7cVfzrlmTWk-pQH_pgo",
    authDomain: "e-stock-33cd2.firebaseapp.com",
    databaseURL: "https://e-stock-33cd2.firebaseio.com",
    projectId: "e-stock-33cd2",
    storageBucket: "e-stock-33cd2.appspot.com",
    messagingSenderId: "254029130525",
    appId: "1:254029130525:web:7736f590d2adab37f80ff4",
    measurementId: "G-Q62MEVZ8G0"
  };

  let fb = firebase.initializeApp(config)
export default fb;