import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export async function uploadImage(file:File, path:string){
    const storage = getStorage();
    const storageRef = ref(storage,path);
    await uploadBytes(storageRef,file);
    return getDownloadURL(storageRef);
}

import { initializeApp } from 'firebase/app';
    import { addDoc, collection, getFirestore, Timestamp, getDocs, query, where, type DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
    import {firebaseConfig} from '$lib/authUtility';
    import { getAuth } from 'firebase/auth';
    

export interface News{
        title:string
        iconImg:string
        bigImg:string
        timestamp:Date
        author:string
        content:string
    }

export async function publishNews(news:News){
    const user = getAuth().currentUser;
    if(!user)throw new Error("Utente non autenticato");
    const newsToPublish = {...news,timestamp:Timestamp.fromDate(news.timestamp)} 

    try{
        await addDoc(collection(db,'users',user.uid,'news'),newsToPublish);
    }
    catch(error){
        alert("Something went wrong..."+error);
    }
}

export interface Image extends DocumentData{
    name:string;
    url:string;
    uploadTimestamp:Date;
    path:string;
    size:number;
    contentType:string;
    usedIn:string;
}

export async function uploadImages(userId:string,file:File, usedIn:string){
    try {
        // 1. Crea un riferimento a Storage
        const storageRef = ref(storage, `users/${userId}/images/${file.name}`);
        
        // Converti il file in una stringa Base64
        const reader = new FileReader();
        
        const base64Promise = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        reader.readAsDataURL(file);
        
        const base64String = await base64Promise;
        
        const uploadedImage = {
            name:file.name,
            data:base64String,
            uploadTimstamp: new Date(),
            size:file.size,
            contentType:file.type,
            usedIn:usedIn
        }
        await addDoc(collection(db,'users',userId,'images'),uploadedImage);
        alert("immagine caricata con successo ");
        //return {downloadURL, docId: docRef.id };
    } catch (error) {
        console.error("Errore nel caricamento:", error);
        throw error;
    }
}

export async function getUserAvatar(userId: string): Promise<Image | null> {
    try {
      // Crea una query sulla collezione images dell'utente
      const imagesRef = collection(db, 'users', userId, 'images');
      const q = query(imagesRef, where("usedIn", "==", "avatar"));
      
      // Esegue la query
      const querySnapshot = await getDocs(q);
      
      // Se non ci sono risultati, restituisce null
      if (querySnapshot.empty) {
        console.log("Nessun avatar trovato per questo utente");
        return null;
      }
      
      // Prendi il primo documento che corrisponde (dovrebbe essercene solo uno)
      const avatarDoc: QueryDocumentSnapshot<DocumentData> = querySnapshot.docs[0];
      
      // Restituisci i dati dell'immagine con l'ID del documento
      return {
          id: avatarDoc.id,
          ...avatarDoc.data()
      } as unknown as Image;
    } catch (error) {
      console.error("Errore nella ricerca dell'avatar:", error);
      throw error;
    }
  }

export async function getNewsPerUtente(){
    const user = getAuth().currentUser;
    if (!user) return [];
    const snapshot = await getDocs(collection(db, 'users', user.uid, 'news'));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(), // conversione inversa
    })) as unknown as News[];
}
