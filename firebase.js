import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/messaging";
import "firebase/compat/firestore";
import "firebase/compat/storage";   

const config = {
  apiKey: "AIzaSyA6mmqpgc6QONwMafJ-mLLZV33MpizwodQ", 
  authDomain: "merchanndise-8428f.firebaseapp.com",
  projectId: "merchanndise-8428f",
  storageBucket: "merchanndise-8428f.appspot.com",
  messagingSenderId: "563798608069",
  appId: "1:563798608069:web:468f62467d34ec5094c8ac",
  measurementId: "G-52MK2Z1GE4",
};

// Initialize Firebase
const firebaseConfig = config;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  try {
    firebase.firestore.setLogLevel("error");
  } catch (e) {}
}
export const database = firebase.firestore();
export const storage = firebase.storage();
export { firebase };
