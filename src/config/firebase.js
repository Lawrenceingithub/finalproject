// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm5wjxOFPij2gi_1Oim7CjGy1eQLnyW-A",
  authDomain: "finalproject-acfcc.firebaseapp.com",
  projectId: "finalproject-acfcc",
  storageBucket: "finalproject-acfcc.appspot.com",
  messagingSenderId: "1082112588475",
  appId: "1:1082112588475:web:add2e76dc5b8abde70079e",
  measurementId: "G-3KQ8WWT9F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);