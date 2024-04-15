// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUDV9NmRulUYnxfOadfYYCmSskaEpa0Xo",
  authDomain: "qmip1-c02c9.firebaseapp.com",
  databaseURL: "https://qmip1-c02c9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "qmip1-c02c9",
  storageBucket: "qmip1-c02c9.appspot.com",
  messagingSenderId: "23175470990",
  appId: "1:23175470990:web:e12ff62f0baf9875a0cedf",
  measurementId: "G-T4FGF0E3YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);