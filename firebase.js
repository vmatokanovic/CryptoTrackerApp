// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6w-FcRKYnoJ4sbZSVcFgsZHEzg7ynVRE",
  authDomain: "cryptotrackerfirebase.firebaseapp.com",
  projectId: "cryptotrackerfirebase",
  storageBucket: "cryptotrackerfirebase.appspot.com",
  messagingSenderId: "274820530124",
  appId: "1:274820530124:web:3bee1d8d2cc7027b7ae769",
  storageBucket: 'gs://cryptotrackerfirebase.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};