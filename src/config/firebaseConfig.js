import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Add your Firebase configuration details here (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, etc.)
const firebaseConfig = {
  apiKey: "AIzaSyDe4x-6DdaCvBLF5fmmUXNwevbRaClHQD8",
  authDomain: "simpleevent-db483.firebaseapp.com",
  projectId: "simpleevent-db483",
  storageBucket: "simpleevent-db483.firebasestorage.app",
  messagingSenderId: "413069390865",
  appId: "1:413069390865:web:57532f3a00f02b60c76db0",
};

let app, auth;

if (!getApps().length) {
  try {
    // Initialize Firebase app if not already initialized
    app = initializeApp(firebaseConfig);

    // Initialize Firebase Authentication with AsyncStorage persistence for React Native
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing Firebase app: " + error);
  }
} else {
  // If Firebase is already initialized, just use the existing app instance
  app = getApp();

  // Get the existing Auth instance
  auth = getAuth(app);
}

// Initialize the Firebase Firestore
const db = getFirestore(app);

export { auth, db };
