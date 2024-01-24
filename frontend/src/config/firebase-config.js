// adding your firebase config here

import firebase from "firebase/app";
import "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCGNh_0Eke2Zbt_qQDNubcmjFf3qqJshSs",
  authDomain: "authentication-7fed7.firebaseapp.com",
  projectId: "authentication-7fed7",
  storageBucket: "authentication-7fed7.appspot.com",
  messagingSenderId: "271636444469",
  appId: "1:271636444469:web:639b732debd5cd1b53887c",
  measurementId: "G-9R42F9FWWG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
