
import type { DamageType, Item } from './types';

export type Weapon = Item &{
    cost: number,
    accuracy: string,
    damage: number,
    type:  DamageType,
    category: string,
    quality: string,
    distance: string,
    hands:string,
    pic?:string
}

// Definisco l'oggetto per il danno fisico per non ripeterlo
const physicalDamage: DamageType = { name: "Fisico" };


// Armi dalla prima immagine - AGGIORNATE
const weaponsPage1: Weapon[] = [
    // Pesanti
    {
        name: "Martello di Ferro",
        cost: 200,
        accuracy: "[VIG + VIG]",
        damage: 6,
        type: physicalDamage, // <-- MODIFICATO
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "una mano"
    },
    {
        name: "Ascia",
        cost: 250,
        accuracy: "[VIG + VIG]",
        damage: 10,
        type: physicalDamage, // <-- MODIFICATO
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "una mano"
    },
    {
        name: "Ascia da Guerra",
        cost: 250,
        accuracy: "[VIG + VIG]",
        damage: 14,
        type: physicalDamage, // <-- MODIFICATO
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Due mani"
    },
    
    // Pugnali
    {
        name: "Pugnale d'Acciaio",
        cost: 150,
        accuracy: "[DES + INT] +1",
        damage: 4,
        type: physicalDamage,
        category: "Pugnali",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "una mano"
    },
    
    // Da Rissa
    {
        name: "Colpo Senz'Armi",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 0,
        type: physicalDamage,
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "una mano"
    },
    {
        name: "Improvvisata (Misc.)",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 2,
        type: physicalDamage,
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "una mano"
    },
    {
        name: "Tirapugni di Ferro",
        cost: 150,
        accuracy: "[DES + VIG]",
        damage: 6,
        type: physicalDamage,
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "una mano"
    },
    
    // Spada
    {
        name: "Katana",
        cost: 200,
        accuracy: "[DES + INT] +1",
        damage: 10,
        type: physicalDamage,
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Due mani"
    },
    {
        name: "Spada di Bronzo",
        cost: 200,
        accuracy: "[DES + VIG] +1",
        damage: 6,
        type: physicalDamage,
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Una mano"
    },
    {
        name: "Spadone",
        cost: 200,
        accuracy: "[DES + VIG] +1",
        damage: 10,
        type: physicalDamage,
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Due mani"
    },
    {
        name: "Stocco",
        cost: 200,
        accuracy: "[DES + INT] +1",
        damage: 6,
        type: physicalDamage,
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Una mano"
    }
];

// Armi dalla seconda immagine - AGGIORNATE
const weaponsPage2: Weapon[] = [
    // Arcana
    {
        name: "Bastone",
        cost: 100,
        accuracy: "[VOL + VOL]",
        damage: 6,
        type: physicalDamage,
        category: "Arcana",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Due mani"
    },
    {
        name: "Tomo",
        cost: 100,
        accuracy: "[INT + INT]",
        damage: 6,
        type: physicalDamage,
        category: "Arcana",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Due mani"
    },
    
    // Arco
    {
        name: "Balestra",
        cost: 150,
        accuracy: "[DES + INT]",
        damage: 8,
        type: physicalDamage,
        category: "Arco",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands: "Due mani"
    },
    {
        name: "Arco Corto",
        cost: 200,
        accuracy: "[DES + DES]",
        damage: 8,
        type: physicalDamage,
        category: "Arco",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands: "Due mani"
    },
    
    // Flagello
    {
        name: "Frusta-Catena",
        cost: 150,
        accuracy: "[DES + DES]",
        damage: 8,
        type: physicalDamage,
        category: "Flagello",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Due mani"
    },
    
    // Da Fuoco
    {
        name: "Pistola",
        cost: 250,
        accuracy: "[DES + INT]",
        damage: 8,
        type: physicalDamage,
        category: "Da Fuoco",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands: "Una mano"
    },
    
    // Lancia
    {
        name: "Lancia Leggera",
        cost: 200,
        accuracy: "[DES + VIG]",
        damage: 8,
        type: physicalDamage,
        category: "Lancia",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Una mano"
    },
    {
        name: "Lancia Pesante",
        cost: 200,
        accuracy: "[DES + VIG]",
        damage: 12,
        type: physicalDamage,
        category: "Lancia",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands: "Due mani"
    },
    
    // Da Lancio
    {
        name: "Improvvisata (Dist.)",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 2,
        type: physicalDamage,
        category: "Da Lancio",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands: "Una mano"
    },
    {
        name: "Shuriken",
        cost: 150,
        accuracy: "[DES + INT]",
        damage: 4,
        type: physicalDamage,
        category: "Da Lancio",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands: "Una mano"
    }
];
export let baseWeapons:Weapon[] = [...weaponsPage2, ...weaponsPage1];

import { toPng } from 'html-to-image';


export function exportHtmlToImage(elementId: string) {
  const node = document.getElementById(elementId);

  if (!node) {
    console.error('Elemento non trovato');
    return;
  }

  toPng(node)
    .then((dataUrl:any) => {
      const img = new Image();
      img.src = dataUrl;
      // Per scaricarla automaticamente:
      const link = document.createElement('a');
      link.download = elementId+'.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error:any) => {
      console.error('Errore nella conversione:', error);
    });
}

// Type guard per verificare se un oggetto è un Item valido
function isItem(obj: any): obj is Item {
  return obj && typeof obj.name === 'string';
}

// Type guard per verificare se un oggetto è una Weapon valida
function isWeapon(obj: any): obj is Weapon {
        return typeof obj.name === 'string' && 
        typeof obj.cost === 'number' &&    
        typeof obj.accuracy === 'string' &&
        typeof obj.damage === 'number' &&
        typeof obj.type === 'string' &&
        typeof obj.category === 'string' &&
        typeof obj.quality === 'string' &&
        typeof obj.distance === 'string' &&
        typeof obj.hands === 'string';
}

// Parser sicuro per Weapon, da correggere
export function parseWeapon(json: string): Weapon | null {
  try {
    const obj = JSON.parse(json);
    if (isWeapon(obj)) {
      return obj;
    }
    console.error('Oggetto non valido come Weapon:', obj);
    return null;
  } catch (error) {
    console.error('Errore nel parsing JSON:', error);
    return null;
  }
}

export async function weaponToJson(weapon:Weapon){
    if( weapon.pic !== undefined){
        console.log(weapon.pic,"prova blob");
        weapon.pic = await blobUrlToBase64(weapon.pic) as string;
        console.log(weapon.pic,"stringa base 64");
    }else console.log("non ho un'immagine");
    return JSON.stringify(weapon, null, 2);
}

export type FultimatorWeapon = {
    name:string,
    att1: string,
    att2: string,
    martial: true,
    type: string,
    hands: number,
    category: string,
    melee: true,
    cost: number,
    damage:number,
    prec: number,
    quality: string,
    qualityCost: number,
    damageBonus: boolean,
    damageReworkBonus: boolean,
    precBonus: boolean,
    rework: boolean,
    dataType: string
}

export function weaponToFultimatorWeapon(weapon:Weapon, accuracyMod:number,damageMod:number){
    let prec = accuracyMod;let precBonus:boolean = false;
    let [att1, att2, precString] = weapon.accuracy.replaceAll("[","").replaceAll("]","").replaceAll(" ","").split("+");

    if(precString !== null && precString!== undefined) precBonus = true;
    else prec = 0;

    switch(att1){
        case "VOL": att1 = "will"
        case "VIG": att1 = "might"
        case "DES": att1 = "dexterity"
        case "INT": att1 = "insight"
    }

    switch(att2){
        case "VOL": att2 = "will"
        case "VIG": att2 = "might"
        case "DES": att2 = "dexterity"
        case "INT": att2 = "insight"
    }

    let bonusDamage:boolean = false;    
    let baseDamage:number = weapon.damage - damageMod;
    if((baseDamage - damageMod)>=2)bonusDamage = true;
    
    let hands:number = 0;
     
    console.log(weapon.quality);

    return {
        base:{
            category:weapon.category,
            name:weapon.name,
            cost:weapon.cost,
            att1:att1,
            att2:att2,
            prec:prec,
            damage:weapon.damage,
            type:weapon.type,
            hands:hands,
            melee:true,
            martial:true
        },
        name: weapon.name,
        att1: att1,
        att2: att2,
        martial: true,
        type: weapon.type,
        hands: hands,
        category: weapon.category,
        melee: true,
        cost: weapon.cost,
        damage: weapon.damage,
        prec: prec,
        quality: weapon.quality     ,
        qualityCost: 0,
        damageBonus: bonusDamage,
        damageReworkBonus: false,
        precBonus: precBonus,
        rework: false,
        dataType: "weapon"
    };
}

function blobUrlToBase64(blobUrl:any) {
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

