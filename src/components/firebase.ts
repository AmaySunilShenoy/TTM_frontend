// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-ckg-klAzsFa1Uvv_N3oybUup7nYuQ4E",
  authDomain: "talking-time-8c1a7.firebaseapp.com",
  projectId: "talking-time-8c1a7",
  storageBucket: "talking-time-8c1a7.appspot.com",
  messagingSenderId: "194025960021",
  appId: "1:194025960021:web:fb52a88eb00ffa046d1adc",
  measurementId: "G-T9GH31HMF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
