// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhVMyv1WHoPcjlpPOm12MdC04v-jLFUgM",
  authDomain: "fir-blog-376b0.firebaseapp.com",
  projectId: "fir-blog-376b0",
  storageBucket: "fir-blog-376b0.appspot.com",
  messagingSenderId: "377298068517",
  appId: "1:377298068517:web:77468891765729a4e1cbcc",
  measurementId: "G-RBG71RCL49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export const storage = getStorage();
export const db = getFirestore(app);
