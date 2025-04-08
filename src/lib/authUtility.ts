// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {updateProfile } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC3TKMg8Vk7dXxm150_lqnaxSUF4WlXMQ0",
  authDomain: "fulti-companion.firebaseapp.com",
  projectId: "fulti-companion",
  storageBucket: "fulti-companion.firebasestorage.app",
  messagingSenderId: "95100721227",
  appId: "1:95100721227:web:7ccd483748a453dfb215ce",
  measurementId: "G-3QKCNSCCMW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function login(email:string, password:string){
  return signInWithEmailAndPassword(auth, email,password);
}


export async function registerUser(email: string, password: string, username: string) {
  try {
    // Crea l'utente con email e password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Aggiorna il profilo con l'username
    await updateProfile(userCredential.user, {
      displayName: username
    });
    
    return userCredential;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
      await signOut(auth);
      return true;
  } catch (error) {
      console.error("Errore durante il logout:", error);
      throw error;
  }
}