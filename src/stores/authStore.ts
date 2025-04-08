import {getAuth, onAuthStateChanged, type User} from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';
const auth = getAuth();

export const user:Writable<User | null> = writable(null);
export const loading :Writable<boolean>= writable(true);


onAuthStateChanged(auth, (firebaseUser) => {
  user.set(firebaseUser);
  loading.set(false);
});
