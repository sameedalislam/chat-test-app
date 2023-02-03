import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwe7s-4vCXKJYvJcPwMWs8Ewfxamhbvrc",
    authDomain: "fir-test-1-ed8f7.firebaseapp.com",
    projectId: "fir-test-1-ed8f7",
    storageBucket: "fir-test-1-ed8f7.appspot.com",
    messagingSenderId: "265232811246",
    appId: "1:265232811246:web:774436d98d96d52ac99fff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)