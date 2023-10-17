import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM8nkbB6r0UIk4YYKfbdotbruvKamgI54",
  authDomain: "addonis---backup.firebaseapp.com",
  projectId: "addonis---backup",
  storageBucket: "addonis---backup.appspot.com",
  messagingSenderId: "221534459906",
  appId: "1:221534459906:web:44f4177f4556524f8daf1b"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);