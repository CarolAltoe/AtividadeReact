// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKiEpqphaZbfPjui7JJ7tw9YFJ7U-ZgSk",
  authDomain: "testebdrn-b820d.firebaseapp.com",
  projectId: "testebdrn-b820d",
  storageBucket: "testebdrn-b820d.appspot.com",
  messagingSenderId: "65510891253",
  appId: "1:65510891253:web:6a4aca3c316409f9f8afbc",
  measurementId: "G-6SMRRCTJC5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_STORAGE = getStorage(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
