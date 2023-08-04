// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4FzJCZoqLpwZSjb5TV2oy-9Pp5g8Guu4",
    authDomain: "practice001-80517.firebaseapp.com",
    projectId: "practice001-80517",
    storageBucket: "practice001-80517.appspot.com",
    messagingSenderId: "130630412861",
    appId: "1:130630412861:web:92b14f5e3135114c34d854"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
