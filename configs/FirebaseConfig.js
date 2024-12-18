// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6NRb0ck9zmC771SzadrgX_xD77OTU8zk",
  authDomain: "bizhub-a24ae.firebaseapp.com",
  projectId: "bizhub-a24ae",
  storageBucket: "bizhub-a24ae.firebasestorage.app",
  messagingSenderId: "578733877094",
  appId: "1:578733877094:web:77c10888e712a3d5210aa7",
  measurementId: "G-PYENNT3N7H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
