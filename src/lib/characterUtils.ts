import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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

  export interface FultimatorJson{
    uid: string;
    name: string;
    lvl: number;
    info: {
      pronouns: string;
      identity: string;
      theme: string;
      origin: string;
      bonds: string[];
      description: string;
      fabulapoints: number;
      exp: number;
      zenit: number;
      imgurl: string;
    };
    attributes: {
      dexterity: number;
      insight: number;
      might: number;
      willpower: number;
    };
    stats: {
      hp: { max: number; current: number };
      mp: { max: number; current: number };
      ip: { max: number; current: number };
    };
    statuses: {
      slow: boolean;
      dazed: boolean;
      enraged: boolean;
      weak: boolean;
      shaken: boolean;
      poisoned: boolean;
      dexUp: boolean;
      insUp: boolean;
      migUp: boolean;
      wlpUp: boolean;
    };
    classes: any[];
    weapons: any[];
    armor: any[];
    notes: any[];
    modifiers: {
      hp: number;
      mp: number;
      ip: number;
      def: number;
      mdef: number;
      init: number;
      meleePrec: number;
      rangedPrec: number;
      magicPrec: number;
    };
    id: number;
    affinities:any[]|null;
    shields:any[]|null;
    dataType: string;
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

  export function convertToCharacterFormat(original: FultimatorJson): Character {
    // Estrai gli stati come array di boolean nell'ordine desiderato
    const statusesArray = [
      original.statuses.slow,
      original.statuses.dazed,
      original.statuses.enraged,
      original.statuses.weak,
      original.statuses.shaken,
      original.statuses.poisoned,
      original.statuses.dexUp,
      original.statuses.insUp, 
      original.statuses.migUp,
      original.statuses.wlpUp
    ];
    
    // Estrai gli attributi come array di numeri
    const statsArray = [
      original.attributes.dexterity,
      original.attributes.insight,
      original.attributes.might,
      original.attributes.willpower,
      original.stats.hp.current,
      original.stats.hp.max,
      
      original.stats.mp.current,
      original.stats.mp.max,
      
      original.stats.ip.current,
      original.stats.ip.max,
      
    ];

    
    
    // Per elementalAffinity, poiché non è presente nel JSON originale,
    // possiamo creare un array vuoto o con valori di default
    const elementalAffinityArray = [0, 0, 0, 0]; // Esempio con 4 elementi a 0
    
    // Creiamo un array di traits basato sui dati disponibili
    const traitsArray = [];
    if (original.info.identity) traitsArray.push(original.info.identity);
    if (original.info.theme) traitsArray.push(original.info.theme);
    if (original.info.origin) traitsArray.push(original.info.origin);
    
    return {
      name: original.name || "-",
      level: original.lvl,
      stats: statsArray,
      traits: traitsArray,
      statuses: statusesArray,
      elementalAffinity: elementalAffinityArray,
      pic: original.info.imgurl || "",
      id: original.id.toString() // Converti id da numero a stringa
    };
  }

  export async function importCharacterToFirestore(jsonData: FultimatorJson) {
    try {
      // Converti i dati nel formato dell'interfaccia Character
      const characterData = convertToCharacterFormat(jsonData);
      
      // Riferimento alla collezione "characters"
      const charactersCollectionRef = collection(db, "characters");
      
      // Crea un documento con l'ID specificato
      await setDoc(doc(charactersCollectionRef, characterData.id), characterData);
      
      console.log(`Personaggio "${characterData.name}" importato con successo con ID: ${characterData.id}`);
      return true;
    } catch (error) {
      console.error("Errore durante l'importazione del personaggio:", error);
      return false;
    }
  }

  export async function processSelectedFile(file: File): Promise<FultimatorJson> {
    return new Promise((resolve, reject) => {
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
          const jsonData = JSON.parse(fileContent);
  
          // A questo punto, jsonData è di tipo 'any'.
          // Facciamo un type assertion per trattarlo come FultimatorJson.
          // ATTENZIONE: Questo non valida la struttura! Se il JSON non corrisponde
          // all'interfaccia, potresti avere errori a runtime più avanti.
          // Per una maggiore robustezza, potresti aggiungere una funzione di validazione.
          const fultimatorData = jsonData as FultimatorJson;
  
          // Esempio di validazione base (puoi espanderla)
          if (!fultimatorData || typeof fultimatorData.uid !== 'string' || typeof fultimatorData.name !== 'string') {
              reject(new Error("Il file JSON non ha la struttura attesa per FultimatorJson (mancano uid o name)."));
              return;
          }
  
          resolve(fultimatorData);
        } catch (e) {
          reject(new Error(`Errore durante il parsing del JSON:`));
        }
      };
  
      reader.onerror = (error) => {
        reject(new Error(`Errore durante la lettura del file: ${error}`));
      };
  
      reader.readAsText(file); // Legge il file come testo
    });
  }