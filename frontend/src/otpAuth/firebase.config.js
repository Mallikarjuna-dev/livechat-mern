// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1lUjNlCYNS6p3clWLmYHcwTMEIgF4DyQ",
  authDomain: "livechat-app-9a86a.firebaseapp.com",
  projectId: "livechat-app-9a86a",
  storageBucket: "livechat-app-9a86a.appspot.com",
  messagingSenderId: "205756423895",
  appId: "1:205756423895:web:33f571810a2afe64501a92",
  measurementId: "G-TNX6KKBNXG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
