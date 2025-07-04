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
    import { addDoc, collection, getFirestore, Timestamp, getDocs, query, where, type DocumentData, QueryDocumentSnapshot, updateDoc, orderBy, deleteDoc, doc } from 'firebase/firestore';
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

        
        
    // Se usedIn è "avatar", cerca documenti esistenti con usedIn === "avatar"
    if (usedIn === "avatar") {
        // Cerca documenti esistenti con usedIn === "avatar"
        const avatarQuery = query(
          collection(db, 'users', userId, 'images'),
          where('usedIn', '==', 'avatar')
        );
        
        const querySnapshot = await getDocs(avatarQuery);
        
        if (!querySnapshot.empty) {
          // Se esiste già un avatar, aggiorna il primo documento trovato
          const docToUpdate = querySnapshot.docs[0];
          await updateDoc(docToUpdate.ref, uploadedImage);
          alert("Avatar aggiornato con successo");
        } else {
          // Se non esiste un avatar, crea un nuovo documento
          await addDoc(collection(db, 'users', userId, 'images'), uploadedImage);
          alert("Avatar caricato con successo");
        }
      } else {
        // Per altri tipi di immagini, aggiungi semplicemente un nuovo documento
        await addDoc(collection(db, 'users', userId, 'images'), uploadedImage);
        alert("Immagine caricata con successo");
      }
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

export interface RecentActivity{
    name:string
    path:string
    timestamp: Date
}

export async function manageRecentActivities(userId: string, newActivity: RecentActivity) {
    try {
      // Riferimento alla collezione delle attività recenti dell'utente
      const activitiesRef = collection(db, 'users', userId, 'recentactivities');
      
      // Ottiene tutte le attività recenti ordinate per timestamp (dal meno recente al più recente)
      const activitiesQuery = query(
        activitiesRef,
        orderBy('timestamp', 'asc')
      );
      
      const querySnapshot = await getDocs(activitiesQuery);
      const activities = querySnapshot.docs;
      
      // Aggiunge un timestamp alla nuova attività se non presente
      const activityToAdd = {
        ...newActivity,
        timestamp: newActivity.timestamp || new Date()
      };
      
      // Se ci sono già 8 o più attività, sovrascrive la meno recente
      if (activities.length >= 8) {
        // La prima attività è la meno recente a causa dell'ordinamento 'asc'
        const oldestActivityRef = activities[0].ref;
        
        // Aggiorna il documento più vecchio con i nuovi dati
        await updateDoc(oldestActivityRef, activityToAdd);
        
        console.log("Attività meno recente sovrascritta con successo");
      } else {
        // Altrimenti, aggiunge semplicemente una nuova attività
        await addDoc(activitiesRef, activityToAdd);
        
        console.log("Nuova attività aggiunta con successo");
      }
      
      return true;
    } catch (error) {
      console.error("Errore nella gestione delle attività recenti:", error);
      throw error;
    }
  }
  
export async function getRecentActivities(userId: string): Promise<RecentActivity[]> {
    try {
      // Riferimento alla collezione delle attività recenti dell'utente
      const activitiesRef = collection(db, 'users', userId, 'recentactivities');
      
      // Ottiene tutte le attività recenti ordinate per timestamp (dal più recente al meno recente)
      const activitiesQuery = query(
        activitiesRef,
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(activitiesQuery);
      
      // Converte i documenti in un array di oggetti RecentActivity
      const activities: RecentActivity[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        
        // Assicurati che il timestamp sia un oggetto Date
        const timestamp = data.timestamp instanceof Date 
          ? data.timestamp 
          : data.timestamp?.toDate?.() // Converte Firestore Timestamp in Date se necessario
          || new Date(data.timestamp); // Fallback se è una stringa o un numero
        
        return {
          id: doc.id,
          name: data.name || '',
          path: data.path || '',
          timestamp: timestamp
        };
      });
      
      return activities;
    } catch (error) {
      console.error("Errore nel recupero delle attività recenti:", error);
      throw error;
    }
  }
import { type Character } from "./characterUtils";

export function addCharacter(character:Character[],personaggio:Character):void {
  character.push(personaggio);
}

export type Tab = {
  id: number;
  label: string;
  comp: any; // Tipo del componente Svelte
  props?: Object; // Oggetto opzionale per le props

};

export class Tabs{
  tabs:Tab[];

  constructor(tabs:Tab[] = []){
    this.tabs = tabs;
  } 

  //aggiunge una tab all'array
  addTab(tab:Tab,index:number = this.tabs.length){
    //se index non è stato fornito aggiunge in fondo
    this.tabs.splice(index,0,tab);
    this.indexTabs();
    return;    
  }

  indexTabs(){
    for(let i =0;i<this.tabs.length;i++){
      this.tabs[i].id = i;
    }
  }

}


export const blobToBase64Compact = async (blob:Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


export function downloadFile(data:any, filename:string, mimeType = 'application/octet-stream') {
  // console.log(data,"data to download");
  // 1. Crea un Blob se i dati sono una stringa
  const blob = (data instanceof Blob) ? data : new Blob([data], { type: mimeType });

  // 2. Crea un Object URL per il Blob
  const url = URL.createObjectURL(blob);

  // 3. Crea un elemento <a> temporaneo
  const a = document.createElement('a');

  // 4. Imposta gli attributi del link
  a.href = url;
  a.download = filename;

  // 5. Aggiungi il link al documento (necessario per Firefox in alcuni casi),
  //    simula il click e rimuovilo.
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // 6. Revoca l'Object URL per liberare risorse
  URL.revokeObjectURL(url);
}


export function createObjectWithKeysInReversedOrder<T extends Record<string, any>>(
  originalObject: T
): T {
  const keys = Object.keys(originalObject) as (keyof T)[];
  const reversedKeys = keys.reverse(); // Inverte l'array delle chiavi

  const newObject = {} as T;
  for (const key of reversedKeys) {
    newObject[key] = originalObject[key];
  }
  return newObject;
}

//
export async function processSelectedJsonFile(file: File | null): Promise<any> {
  return new Promise((resolve, reject) => {
    if(file == null)return new Error("il file non è valido!");
    // Controlla il tipo di file (opzionale ma buona pratica)
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      reject(new Error("Il file selezionato non sembra essere un file JSON. Assicurati che l'estensione sia .json o il tipo MIME sia application/json."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;
        if (!fileContent) {
          reject(new Error("Il contenuto del file è vuoto o illeggibile."));
          return;
        }
        // console.log(fileContent);
        const jsonData = JSON.parse(fileContent);
        
        // console.log(jsonData,"jsonData processSelectedFile")
        resolve(jsonData);
      } catch (e) {
        reject(new Error(`Errore durante il parsing del JSON:`+ e ));
      }
    };

    reader.onerror = (error) => {

      reject(new Error(`Errore durante la lettura del file: ${error}`));
    };
    console.log(file)
    reader.readAsText(file); // Legge il file come testo
  });
}

//funzione per mostrare il dato corretto
export function displayName(customName:string, originalName:string){
  if(customName.length <= 1)return originalName;
  else return customName;
}



export function blobUrlToBase64(blobUrl:any) {
  return new Promise((resolve, reject) => {
    // 1. Usa fetch per recuperare i dati dall'URL Blob
    fetch(blobUrl)
      .then(response => {
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        // 2. Ottieni l'oggetto Blob dalla risposta
        return response.blob();
      })
      .then(blob => {
        
        const reader = new FileReader();
        reader.onload = () => {
          // La lettura è completata, risolviamo la promise con il risultato
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          // C'è stato un errore durante la lettura
          reject(new Error("Errore durante la lettura del Blob: " + error));
        };
        // 3. Usa FileReader per convertire il Blob in Base64 (Data URL)
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        // C'è stato un errore nel fetch
        reject(new Error("Errore nel fetch dell'URL Blob: " + error));
      });
  });
}

