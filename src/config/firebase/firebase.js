// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp0cebcbBB3NLAgw02mfrjCUF5qVFBxfQ",
  authDomain: "estimate-front-end.firebaseapp.com",
  projectId: "estimate-front-end",
  storageBucket: "estimate-front-end.appspot.com",
  messagingSenderId: "428495465029",
  appId: "1:428495465029:web:b4197dc9d6546ab6e6112c",
  measurementId: "G-HRD68LB9C5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = firebase.auth();

export default app;