
import type { Item } from './types';

export type Weapon = Item &{
    cost: number,
    accuracy: string,
    damage: number,
    type: string,
    category: string,
    quality: string,
    distance: string
}

// Armi dalla prima immagine
const weaponsPage1: Weapon[] = [
    // Pesanti
    {
        name: "Martello di Ferro",
        cost: 200,
        accuracy: "[VIG + VIG]",
        damage: 6,
        type: "fisico",
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Ascia",
        cost: 250,
        accuracy: "[VIG + VIG]",
        damage: 10,
        type: "fisico",
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Ascia da Guerra",
        cost: 250,
        accuracy: "[VIG + VIG]",
        damage: 14,
        type: "fisico",
        category: "Pesanti",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    
    // Pugnali
    {
        name: "Pugnale d'Acciaio",
        cost: 150,
        accuracy: "[DES + INT] +1",
        damage: 4,
        type: "fisico",
        category: "Pugnali",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    
    // Da Rissa
    {
        name: "Colpo Senz'Armi",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 0,
        type: "fisico",
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Improvvisata (Misc.)",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 2,
        type: "fisico",
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Tirapugni di Ferro",
        cost: 150,
        accuracy: "[DES + VIG]",
        damage: 6,
        type: "fisico",
        category: "Da Rissa",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    
    // Spade
    {
        name: "Katana",
        cost: 200,
        accuracy: "[DES + INT] +1",
        damage: 10,
        type: "fisico",
        category: "Spade",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Spada di Bronzo",
        cost: 200,
        accuracy: "[DES + VIG] +1",
        damage: 6,
        type: "fisico",
        category: "Spade",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Spadone",
        cost: 200,
        accuracy: "[DES + VIG] +1",
        damage: 10,
        type: "fisico",
        category: "Spade",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Stocco",
        cost: 200,
        accuracy: "[DES + INT] +1",
        damage: 6,
        type: "fisico",
        category: "Spade",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    }
];

// Armi dalla seconda immagine
const weaponsPage2: Weapon[] = [
    // Arcane
    {
        name: "Bastone",
        cost: 100,
        accuracy: "[VOL + VOL]",
        damage: 6,
        type: "fisico",
        category: "Arcane",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Tomo",
        cost: 100,
        accuracy: "[INT + INT]",
        damage: 6,
        type: "fisico",
        category: "Arcane",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    
    // Archi
    {
        name: "Balestra",
        cost: 150,
        accuracy: "[DES + INT]",
        damage: 8,
        type: "fisico",
        category: "Archi",
        quality: "Nessuna Qualità",
        distance: "Distanza"
    },
    {
        name: "Arco Corto",
        cost: 200,
        accuracy: "[DES + DES]",
        damage: 8,
        type: "fisico",
        category: "Archi",
        quality: "Nessuna Qualità",
        distance: "Distanza"
    },
    
    // Flagelli
    {
        name: "Frusta-Catena",
        cost: 150,
        accuracy: "[DES + DES]",
        damage: 8,
        type: "fisico",
        category: "Flagelli",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    
    // Da Fuoco
    {
        name: "Pistola",
        cost: 250,
        accuracy: "[DES + INT]",
        damage: 8,
        type: "fisico",
        category: "Da Fuoco",
        quality: "Nessuna Qualità",
        distance: "Distanza"
    },
    
    // Lance
    {
        name: "Lancia Leggera",
        cost: 200,
        accuracy: "[DES + VIG]",
        damage: 8,
        type: "fisico",
        category: "Lance",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    {
        name: "Lancia Pesante",
        cost: 200,
        accuracy: "[DES + VIG]",
        damage: 12,
        type: "fisico",
        category: "Lance",
        quality: "Nessuna Qualità",
        distance: "Mischia"
    },
    
    // Da Lancio
    {
        name: "Improvvisata (Dist.)",
        cost: 0,
        accuracy: "[DES + VIG]",
        damage: 2,
        type: "fisico",
        category: "Da Lancio",
        quality: "Nessuna Qualità",
        distance: "Distanza"
    },
    {
        name: "Shuriken",
        cost: 150,
        accuracy: "[DES + INT]",
        damage: 4,
        type: "fisico",
        category: "Da Lancio",
        quality: "Nessuna Qualità",
        distance: "Distanza"
    }
];

export let baseWeapons:Weapon[] = [...weaponsPage1, ...weaponsPage2];

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

