// Import the functions you need from the SDKs you need
const { initializeApp } = require( "firebase/app");
const {getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6c3f3bnPPQIyDUzNOaXv2X-szZKBCfwA",
    authDomain: "teyvatcommissionboard.firebaseapp.com",
    databaseURL: "https://teyvatcommissionboard-default-rtdb.firebaseio.com",
    projectId: "teyvatcommissionboard",
    storageBucket: "teyvatcommissionboard.appspot.com",
    messagingSenderId: "905375623243",
    appId: "1:905375623243:web:3397b08f05ff73dedf05ce",
    measurementId: "G-SNBHPDC43N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
exports.db = getFirestore(app);
