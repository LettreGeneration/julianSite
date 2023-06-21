// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const key = process.env.REACT_APP_API_KEY;


const firebaseConfig = {
  apiKey: key,
  authDomain: "website-julian.firebaseapp.com",
  projectId: "website-julian",
  storageBucket: "website-julian.appspot.com",
  messagingSenderId: "1037867180021",
  appId: "1:1037867180021:web:d2a34ae8aca6a5f5ce4abc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
