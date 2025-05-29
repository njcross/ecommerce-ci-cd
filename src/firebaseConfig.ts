// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1Enp1Da5KrOmLOSxviYvrWEIELCvgzMI",
  authDomain: "myfirstproject-db322.firebaseapp.com",
  projectId: "myfirstproject-db322",
  storageBucket: "myfirstproject-db322.firebasestorage.app",
  messagingSenderId: "544271676826",
  appId: "1:544271676826:web:bbc955fe3da759fcaff623",
  measurementId: "G-H4NGN4HX7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db, analytics };