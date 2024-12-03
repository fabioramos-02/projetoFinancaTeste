import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4mwmhqN555Sx7eR4zScGJ4HtIGsHnJpI",
  authDomain: "teste-30727.firebaseapp.com",
  projectId: "teste-30727",
  storageBucket: "teste-30727.firebasestorage.app",
  messagingSenderId: "706061568048",
  appId: "1:706061568048:web:8b5b9ebf865e04ea0d05f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);