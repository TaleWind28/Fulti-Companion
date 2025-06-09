import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged, type User} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { writable, type Writable } from 'svelte/store';
import 'dotenv/config'
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth();

export const user:Writable<User | null> = writable(null);
export const loading :Writable<boolean>= writable(true);


onAuthStateChanged(auth, (firebaseUser) => {
  user.set(firebaseUser);
  loading.set(false);
});
