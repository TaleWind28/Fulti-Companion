
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../stores/authStore";
import { faBoltLightning, faFire, faKhanda,  faMoon, faMountain, faSkullCrossbones, faSnowflake, faSun,  faWind } from "@fortawesome/free-solid-svg-icons";
import type { Affinities } from "./types";

import type {  IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Modifiers{

}

export interface Character{
    name:string;
    level:number;
    stats:number[];
    characteristics:number[];
    traits:string[];
    statuses:boolean[];
    classes: any[];
    weapons: any[];
    armor: any[];
    notes: any[];
    modifiers: Modifiers;
    elementalAffinity:Affinities;
    pic:string
    id:string
    bonds:any[]|null;
    shields:any[]|null;
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
  affinities:Affinities|null;
  bonds:any[]|null;
  shields:any[]|null;
  dataType: string;
}


export type Glam = {
  icon:IconDefinition,
  color:String,
}
export type ElementType = 'poison'| 'light'| 'dark'| 'ice'| 'fire'| 'earth'| 'wind'| 'bolt'| 'physical';

export type AffinityGlams = Record<ElementType,{
  icon:IconDefinition,
  color: string;
}>



export async function retrieveUserCharacters(){
  const user = getAuth().currentUser;
  if(!user)return [];
  const snapshot = await getDocs(collection(db,'users',user.uid,'characters'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Character[];

}
 
export async function retrieveUserCharacter(id:string):Promise<Character>{
  const user = getAuth().currentUser;
  if(!user)throw new Error("User not authenticated");
  const characterDocRef = doc(db, 'users', user.uid, 'characters', id); 
  const docSnap = await getDoc(characterDocRef);
    
  if (!docSnap.exists()) {
    throw new Error(`Character with ID "${id}" not found for user "${user.uid}".`);
  }

  return docSnap.data() as Character;
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
  const characteristicsArray = [
    original.attributes.dexterity,
    original.attributes.insight,
    original.attributes.might,
    original.attributes.willpower,
  ];

  const statsArray = [
    original.stats.hp.current,
    original.stats.hp.max,
    
    original.stats.mp.current,
    original.stats.mp.max,
    
    original.stats.ip.current,
    original.stats.ip.max,
  ]
  let rawAffinity:Affinities = {
    poison: "nu",
    light: "nu",
    dark: "nu",
    ice:"nu",
    fire: "nu",
    earth: "nu",
    wind: "nu",
    bolt: "nu",
    physical: "nu",
  };
  if(original.affinities)rawAffinity = updateAffinities(rawAffinity,original.affinities);
  //if(original.affinities)rawAffinity = original.affinities;
  const elementalAffinity = createObjectWithKeysInReversedOrder(rawAffinity);
  
  // Creiamo un array di traits basato sui dati disponibili
  const traitsArray = [];
  if (original.info.identity) traitsArray.push(original.info.identity);
  if (original.info.theme) traitsArray.push(original.info.theme);
  if (original.info.origin) traitsArray.push(original.info.origin);
  console.log(original.id);
  let id:string = "00";
  if(original.id)id = original.id.toString();
  let bonds = [];

// Controlla che bonds esista e sia un array
if (original.info.bonds!== null) {
  for(let i = 0; i < original.info.bonds.length; i++){
      let bond = {
        name: original.info.bonds[i].name,
        bonds: {...original.info.bonds[i]},
      }
      bonds.push(bond);
    }
  }
  /*
  // for(let i = 0;i<original.info.bonds.length;i++){
  //   let bond = {
  //     name:original.info.bonds[i].name,
  //     bond:{...original.info.bonds[i]}
  //   };
  //   bonds.push(bond);
  // }
  */
  return {
  name: original.name || "-",
  level: original.lvl,
  characteristics: characteristicsArray,
  stats: statsArray,
  traits: traitsArray,
  statuses: statusesArray,
  elementalAffinity: elementalAffinity,
  pic: original.info.imgurl || "",
  id: id, // Converti id da numero a stringa
  classes: [],
  weapons: [],
  armor: [],
  notes: [],
  modifiers: [],
  bonds: bonds,
  shields: null
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

export async function processSelectedFile(file: File): Promise<any> {
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
        const fultimatorData = jsonData;

        // // Esempio di validazione base (puoi espanderla)
        // if (!fultimatorData || typeof fultimatorData.uid !== 'string' || typeof fultimatorData.name !== 'string') {
        //     reject(new Error("Il file JSON non ha la struttura attesa per FultimatorJson (mancano uid o name)."));
        //     return;
        // }
        // console.log(fultimatorData.affinities);
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

export let elemGlams:AffinityGlams = {
  poison: {
    icon: faSkullCrossbones,
    color: 'text-purple-500', // Esempio di classe Tailwind per il colore
  },
  light: {
    icon: faSun,
    color: 'text-yellow-300',
  },
  dark: {
    icon: faMoon,
    color: 'text-indigo-500',
  },
  ice: {
    icon: faSnowflake,
    color: 'text-blue-300',
  },
  fire: {
    icon: faFire,
    color: 'text-red-500',
  },
  earth: {
    icon: faMountain,  // o faGlobeEurope, faSeedling
    color: 'text-yellow-700', // o 'text-lime-700'
  },
  wind: {
    icon: faWind,
    color: 'text-teal-400',
  },
  bolt: {
    icon: faBoltLightning,
    color: 'text-yellow-400',
  },
  physical: {
    icon: faKhanda, // o faShieldAlt, faFistRaised
    color: 'text-gray-500',
  },
}

function createObjectWithKeysInReversedOrder<T extends Record<string, any>>(
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

  // Funzione per eseguire l'aggiornamento
function updateAffinities(defaultAffinities: Affinities, newAffinitiesSource?: Affinities): Affinities {
  // Creiamo una copia superficiale dell'oggetto di default per non modificarlo direttamente
  const updatedAffinities: Affinities = { ...defaultAffinities };

  if (newAffinitiesSource) {
    // Iteriamo sulle chiavi dell'oggetto newAffinitiesSource
    for (const key in newAffinitiesSource) {
      if (Object.prototype.hasOwnProperty.call(newAffinitiesSource, key)) {
        // TypeScript ha bisogno di un aiuto qui per sapere che 'key' è una chiave valida per Affinities
        const affinityKey = key as keyof Affinities;
        const newValue = newAffinitiesSource[affinityKey];

        // Controlliamo se il nuovo valore esiste ed è diverso da "nu"
        if (newValue !== undefined && newValue !== "nu") {
          if (affinityKey in updatedAffinities) {
            updatedAffinities[affinityKey] = newValue;
          }
        }
      }
    }
  }
  return updatedAffinities;
}

export function downloadFile(data:any, filename:string, mimeType = 'application/octet-stream') {
  console.log(data,"data to download");
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


// La funzione inversa
export function convertToFultimatorJson(character: Character): FultimatorJson {
  // Ricostruisci l'oggetto statuses
  const fultimatorStatuses = {
    slow: character.statuses[0],
    dazed: character.statuses[1],
    enraged: character.statuses[2],
    weak: character.statuses[3],
    shaken: character.statuses[4],
    poisoned: character.statuses[5],
    dexUp: character.statuses[6],
    insUp: character.statuses[7],
    migUp: character.statuses[8],
    wlpUp: character.statuses[9],
  };

  // Ricostruisci l'oggetto attributes
  const fultimatorAttributes = {
    dexterity: character.characteristics[0],
    insight: character.characteristics[1],
    might: character.characteristics[2],
    willpower: character.characteristics[3],
  };

  // Ricostruisci l'oggetto stats
  const fultimatorStats = {
    hp: { current: character.stats[0], max: character.stats[1] },
    mp: { current: character.stats[2], max: character.stats[3] },
    ip: { current: character.stats[4], max: character.stats[5] },
  };

  // Ricostruisci affinities.
  // Applichiamo di nuovo createObjectWithKeysInReversedOrder per ripristinare
  // l'ordine delle chiavi che si presume avesse rawAffinity nella funzione originale.
  // Il risultato sarà un oggetto Affinities (non null), poiché Character.elementalAffinity è sempre un oggetto completo.
  const fultimatorAffinities: Affinities = createObjectWithKeysInReversedOrder(
    character.elementalAffinity
  ) as Affinities; // Cast esplicito perché createObjectWithKeysInReversedOrder è generico, ma sappiamo che il risultato è compatibile con Affinities

  // Ricostruisci l'oggetto info. Molti campi non sono presenti in Character
  // e necessitano di valori predefiniti.
  const fultimatorInfo = {
    pronouns: "", // Valore predefinito, non presente in Character
    identity: character.traits[0] || "", // Da Character.traits, default stringa vuota se non presente
    theme: character.traits[1] || "",    // Da Character.traits, default stringa vuota se non presente
    origin: character.traits[2] || "",   // Da Character.traits, default stringa vuota se non presente
    bonds: character.bonds, // Valore predefinito, non presente in Character
    description: "", // Valore predefinito, non presente in Character
    fabulapoints: 0, // Valore predefinito, non presente in Character
    exp: 0, // Valore predefinito, non presente in Character
    zenit: 0, // Valore predefinito, non presente in Character
    imgurl: character.pic, // Da Character.pic
  };

  // Ricostruisci l'oggetto modifiers (valori predefiniti)
  const fultimatorModifiers = {
    hp: 0,
    mp: 0,
    ip: 0,
    def: 0,
    mdef: 0,
    init: 0,
    meleePrec: 0,
    rangedPrec: 0,
    magicPrec: 0,
  };

  return {
    uid: `uid_placeholder_${character.id}`, // Valore predefinito/placeholder, non presente in Character
    name: character.name, // character.name è string; se era "-", rimane "-"
    lvl: character.level,
    info: fultimatorInfo,
    attributes: fultimatorAttributes,
    stats: fultimatorStats,
    statuses: fultimatorStatuses,
    classes: [], // Valore predefinito, non presente in Character
    weapons: [], // Valore predefinito, non presente in Character
    armor: [], // Valore predefinito, non presente in Character
    notes: [], // Valore predefinito, non presente in Character
    modifiers: fultimatorModifiers,
    id: parseInt(character.id, 10), // Converti string id da Character a number
    affinities: fultimatorAffinities, // Sarà un oggetto Affinities, non null
    bonds:character.bonds,
    shields: null, // Valore predefinito (come da tipo any[] | null), non presente in Character
    dataType: "FultimatorCharacterSheet", // Valore predefinito/placeholder, non presente in Character
  };
}

export function printCharacterInfo(character:Character){
  
  for(let i =0;i<4;i++)console.log(character.characteristics[i]);
  for(let i = 0;i<6;i++)console.log(character.stats[i])

}
