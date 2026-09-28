import { Platform } from "react-native";
import { getApp, getApps, initializeApp } from "firebase/app";
import * as FirebaseAuth from "firebase/auth";
import { getAuth, initializeAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isFirebaseConfigured = Boolean(
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyCHno4H1pWgVekSQufKXCIo9_xwp179Els"
);

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyCHno4H1pWgVekSQufKXCIo9_xwp179Els",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "ecommerce-78a9f.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "ecommerce-78a9f",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "ecommerce-78a9f.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "662358090514",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:662358090514:web:2b3264dbe1f38e72f089cb",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// initializeAuth throws if called twice (e.g. on Fast Refresh), so fall back to getAuth.
let auth: Auth;
try {
  let persistence;
  if (Platform.OS === "web") {
    persistence = FirebaseAuth.browserLocalPersistence;
  } else {
    const getReactNativePersistence = (FirebaseAuth as Record<string, any>).getReactNativePersistence;
    if (typeof getReactNativePersistence === "function") {
      persistence = getReactNativePersistence(AsyncStorage);
    }
  }

  auth = initializeAuth(app, persistence ? { persistence } : undefined);
} catch {
  auth = getAuth(app);
}

const db: Firestore = getFirestore(app);

export { app, auth, db };
export default app;
