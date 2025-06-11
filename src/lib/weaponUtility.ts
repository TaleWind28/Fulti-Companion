
import type { Item } from './types';

export type Weapon = Item &{
    cost: number,
    accuracy: string,
    damage: number,
    type: string,
    category: string,
    quality: string,
    distance: string,
    hands:string
}

// Armi dalla prima immagine
const weaponsPage1: Weapon[] = [
    // Pesanti
    {
        name: "Martello di Ferro",
        cost: 200,
        accuracy: "[VIG + VIG]",
        damage: 6,
        type: "Fisico",
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"una mano"

    },
    {
        name: "Ascia",
        cost: 250,
        accuracy: "[VIG + VIG]",
        damage: 10,
        type: "Fisico",
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"una mano"
    },
    {
        name: "Ascia da Guerra",
        cost: 250,
        accuracy: "[VIG + VIG]",
        damage: 14,
        type: "Fisico",
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Due mani"
    },
    
    // Pugnali
    {
        name: "Pugnale d'Acciaio",
        cost: 150,
        accuracy: "[DES + INT] +1",
        damage: 4,
        type: "Fisico",
        category: "Pugnali",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"una mano"
    },
    
    // Da Rissa
    {
        name: "Colpo Senz'Armi",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 0,
        type: "Fisico",
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"una mano"
    },
    {
        name: "Improvvisata (Misc.)",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 2,
        type: "Fisico",
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"una mano"
    },
    {
        name: "Tirapugni di Ferro",
        cost: 150,
        accuracy: "[DES + VIG]",
        damage: 6,
        type: "Fisico",
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"una mano"
    },
    
    // Spada
    {
        name: "Katana",
        cost: 200,
        accuracy: "[DES + INT] +1",
        damage: 10,
        type: "Fisico",
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Due mani"
    },
    {
        name: "Spada di Bronzo",
        cost: 200,
        accuracy: "[DES + VIG] +1",
        damage: 6,
        type: "Fisico",
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Una mano"
    },
    {
        name: "Spadone",
        cost: 200,
        accuracy: "[DES + VIG] +1",
        damage: 10,
        type: "Fisico",
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Due mani"
    },
    {
        name: "Stocco",
        cost: 200,
        accuracy: "[DES + INT] +1",
        damage: 6,
        type: "Fisico",
        category: "Spada",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Una mano"
    }
];

// Armi dalla seconda immagine
const weaponsPage2: Weapon[] = [
    // Arcana
    {
        name: "Bastone",
        cost: 100,
        accuracy: "[VOL + VOL]",
        damage: 6,
        type: "Fisico",
        category: "Arcana",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Due mani"
    },
    {
        name: "Tomo",
        cost: 100,
        accuracy: "[INT + INT]",
        damage: 6,
        type: "Fisico",
        category: "Arcana",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Due mani"
    },
    
    // Arco
    {
        name: "Balestra",
        cost: 150,
        accuracy: "[DES + INT]",
        damage: 8,
        type: "Fisico",
        category: "Arco",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands:"Due mani"
    },
    {
        name: "Arco Corto",
        cost: 200,
        accuracy: "[DES + DES]",
        damage: 8,
        type: "Fisico",
        category: "Arco",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands:"Due mani"
    },
    
    // Flagello
    {
        name: "Frusta-Catena",
        cost: 150,
        accuracy: "[DES + DES]",
        damage: 8,
        type: "Fisico",
        category: "Flagello",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Due mani"
    },
    
    // Da Fuoco
    {
        name: "Pistola",
        cost: 250,
        accuracy: "[DES + INT]",
        damage: 8,
        type: "Fisico",
        category: "Da Fuoco",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands:"Una mano"
    },
    
    // Lancia
    {
        name: "Lancia Leggera",
        cost: 200,
        accuracy: "[DES + VIG]",
        damage: 8,
        type: "Fisico",
        category: "Lancia",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Una mano"
    },
    {
        name: "Lancia Pesante",
        cost: 200,
        accuracy: "[DES + VIG]",
        damage: 12,
        type: "Fisico",
        category: "Lancia",
        quality: "Nessuna Qualità",
        distance: "Mischia",
        hands:"Due mani"
    },
    
    // Da Lancio
    {
        name: "Improvvisata (Dist.)",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 2,
        type: "Fisico",
        category: "Da Lancio",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands:"Una mano"
    },
    {
        name: "Shuriken",
        cost: 150,
        accuracy: "[DES + INT]",
        damage: 4,
        type: "Fisico",
        category: "Da Lancio",
        quality: "Nessuna Qualità",
        distance: "Distanza",
        hands:"Una mano"
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
    .then((dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      // Per scaricarla automaticamente:
      const link = document.createElement('a');
      link.download = elementId+'.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
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

export function weaponToJson(weapon:Weapon):string{
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
    let prec = 1;let precBonus:boolean = false;
    let [att1, att2, precString] = weapon.accuracy.replace("[","").replace("]","").replace(" ","").replace(" ","").split("+");

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