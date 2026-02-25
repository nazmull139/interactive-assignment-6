// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// ... existing auth and db exports
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj25zxJe3w2pOwoMrW4b6uho3JXUMYQNY",
  authDomain: "interactive-assignment-6f46d.firebaseapp.com",
  projectId: "interactive-assignment-6f46d",
  storageBucket: "interactive-assignment-6f46d.firebasestorage.app",
  messagingSenderId: "613420314524",
  appId: "1:613420314524:web:59ed6b80afe41378282259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);