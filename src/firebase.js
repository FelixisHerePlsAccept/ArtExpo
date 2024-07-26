import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "fir-testing-7bc99.firebaseapp.com",
  projectId: "fir-testing-7bc99",
  storageBucket: "fir-testing-7bc99.appspot.com",
  messagingSenderId: "2178880883",
  appId: "1:2178880883:web:9f8a64dea0b53d64fca106"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

setPersistence(auth, browserSessionPersistence)
.catch(err => console.error(err))