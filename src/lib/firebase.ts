// Project: mandm-batters (M and M Batters)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2GYy1eP94YAaN8kWJLml2xZ-4ZEqvex4",
  authDomain: "mandm-batters.firebaseapp.com",
  projectId: "mandm-batters",
  storageBucket: "mandm-batters.firebasestorage.app",
  messagingSenderId: "604854466296",
  appId: "1:604854466296:web:df3894d992ccc5f6c86d0d",
  databaseURL: "https://mandm-batters-default-rtdb.firebaseio.com"
};

// Initialize Firebase (prevent duplicate app initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Analytics (only in browser environments that support it)
export const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);

export default app;
