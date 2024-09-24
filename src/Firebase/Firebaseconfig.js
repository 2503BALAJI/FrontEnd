import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import for Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAwuKxSfHiZW7WIPJVnDyyHIG3qesUn5_0",
  authDomain: "newfirebase-af75c.firebaseapp.com",
  databaseURL: "https://newfirebase-af75c-default-rtdb.firebaseio.com",
  projectId: "newfirebase-af75c",
  storageBucket: "newfirebase-af75c.appspot.com",
  messagingSenderId: "756560672991",
  appId: "1:756560672991:web:7dd633ab09a85bd731516a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage, app };
// Import the functions you need from the SDKs you need
