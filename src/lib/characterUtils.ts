import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { storage } from "./utility";
import { db } from "../stores/authStore";

export interface Character{
    name:string;
    level:number;
    stats:number[];
    traits:string[];
    statuses:boolean[];
    elementalAffinity:number[]
    pic:string
    id:string
  }


export async function retrieveUserCharacters(){
    const user = getAuth().currentUser;
    if(!user)return [];
    const snapshot = await getDocs(collection(db,'users',user.uid,'characters'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as Character[];
  
  }
  
  export async function addUserCharacter(character:Character){
    const user = getAuth().currentUser;
    if(!user)throw new Error("Utente non autenticato");
    const characterToAdd = {...character,} 
  
    try{
        const docRef = await addDoc(collection(db,'users',user.uid,'characters'),characterToAdd);
        // Poi aggiorna il documento includendo il suo ID
        await updateDoc(docRef, { id: docRef.id });
        character.id = docRef.id;
    }
    catch(error){
        alert("Something went wrong..."+error);
    }
  }
  
  export async function removeUserCharacter(characterId: string) {
    const user = getAuth().currentUser;
    if (!user) throw new Error("Utente non autenticato");
    
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'characters', characterId));
      console.log("Personaggio eliminato con successo");
    } catch (error) {
      alert("Si è verificato un errore durante l'eliminazione: " + error);
    }
  }