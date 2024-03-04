// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 authDomain: "bytebard-5332a.firebaseapp.com",
 projectId: "bytebard-5332a",
 storageBucket: "bytebard-5332a.appspot.com",
 messagingSenderId: "704542645058",
 appId: "1:704542645058:web:dc44089c3bc31e7604c6db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

