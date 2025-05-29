// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1Enp1Da5KrOmLOSxviYvrWEIELCvgzMI",
  authDomain: "myfirstproject-db322.firebaseapp.com",
  projectId: "myfirstproject-db322",
  storageBucket: "myfirstproject-db322.appspot.com",
  messagingSenderId: "544271676826",
  appId: "1:544271676826:web:bbc955fe3da759fcaff623",
  measurementId: "G-H4NGN4HX7Z"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Auth and Firestore always safe to export
const auth: Auth = getAuth(app);
const db = getFirestore(app);

// Wrap analytics in support check for test environments
let analytics: ReturnType<typeof getAnalytics> | undefined;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { auth, db, analytics };
