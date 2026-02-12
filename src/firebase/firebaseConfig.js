import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtOiNJ04cBzjzhSCptQ44fWkk2gYBw-v0",
  authDomain: "fluentfire-97baf.firebaseapp.com",
  projectId: "fluentfire-97baf",
  storageBucket: "fluentfire-97baf.firebasestorage.app",
  messagingSenderId: "817757863012",
  appId: "1:817757863012:web:d9c72a60d2ef96ecfa7371",
  measurementId: "G-6HKT49RPTV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
