import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged, type User} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { writable, type Writable } from 'svelte/store';
export const firebaseConfig = {
  apiKey: "AIzaSyC3TKMg8Vk7dXxm150_lqnaxSUF4WlXMQ0",
  authDomain: "fulti-companion.firebaseapp.com",
  projectId: "fulti-companion",
  storageBucket: "fulti-companion.firebasestorage.app",
  messagingSenderId: "95100721227",
  appId: "1:95100721227:web:7ccd483748a453dfb215ce",
  measurementId: "G-3QKCNSCCMW"
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
