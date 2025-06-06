

export type UploadFunction<TData, TResult = void> = (data: TData) => Promise<TResult>;
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
export type bond = {
        legame1:('Ammirazione' | 'Inferiorità' | 'none'), 
        legame2:('Lealtà'| 'Sfiducia'| 'none'),
        legame3: ('Affetto'|'Odio' | 'none')
};

export type Item = {
        name:string
}

export type Affinity = "im" | "rs" | "ab" | "wk" | "nu"; // Immunità, Resistenza, Assorbimento, Debolezza, Normale
  

//provo una cosa figa
export const AFFINITY_CONFIG = {
  poison: { label: "Veleno", color: "#8B5CF6" },
  light: { label: "Luce", color: "#FCD34D" },
  dark: { label: "Buio", color: "#374151" },
  ice: { label: "Ghiaccio", color: "#60A5FA" },
  fire: { label: "Fuoco", color: "#F87171" },
  earth: { label: "Terra", color: "#A78BFA" },
  wind: { label: "Vento", color: "#34D399" },
  bolt: { label: "Fulmine", color: "#FBBF24" },
  physical: { label: "Fisico", color: "#9CA3AF" }
} as const;

// Deriva automaticamente solo i valori delle label
export type DamageType = {
  name: typeof AFFINITY_CONFIG[keyof typeof AFFINITY_CONFIG]['label'];
} & Item;
//creo una costante con tutti i tipi disponibili
export const DAMAGE_TYPES: DamageType[] = Object.values(AFFINITY_CONFIG).map(a => ({
  name: a.label
}));

//per le affinità vengono usati i nomi inglesi per compatibilità con fultimator
export type Affinities = Partial<Record<keyof typeof AFFINITY_CONFIG, Affinity>>;

export const QUALITIES_CONFIG = {
  antistatus:{ effect:"Sei immune a un singolo status", price: 500},
  resistenza:{
    effect:"Sei resistente a un singolo tipo di danno (eccetto fisico)",
    price:700
  },
  amuleto:{
    effect:"Ottieni +1 bonus alla Difesa Magica",
    price:800
  },
  baluardo:{
    effect:"Ottieni un bonus di +1 alla Difesa.",
    price:800
  },
  doppia_resistenza:{
    effect:"Sei resistente a due tipi di danno (eccetto fisico)",
    price:1000
  },
  spezzaspade:{
    effect:"Sei resistente al danno fisico",
    price:1000
  },
  immunita:{
    effect:"Sei immune a un singolo tipo di danno (eccetto fisico)",
    price:1500
  },
  omniscudo:{
    effect:"Ottieni +1 bonus in Difesa e alla Difesa Magica",
    price:2000
  },
  salute_perfetta:{
    effect:"Sei immune a tutti gli status",
    price: 2000
  },
  magica:{
    effect:"L'arma bersaglia la Difesa Magica invece della Difesa",
    price:100
  },
  cacciatrice:{
    effect:"L'arma infligge 5 danni extra alle creature di una determinata Specie",
    price:300
  },
  perrforante:{
    effect:"I danni dall'arma ignorano le Resistenze",
    price:400
  },
  doppia_cacciatrice:{
    effect:"L'arma infligge 5 danni extra alle creature di due determinate Specie",
    price:500
  },
  multi:{
    effect:"Gli attacchi con l'arma hanno proprietà multi (2)",
    price:1000
  },
  status:{
    effect:"Ogni bersaglio colpito dall'arma subisce lo status (scegli uno: confuso, debole, lento, scosso)",
    price:1500
  },
  status_plus:{
    effect:"Ogni bersaglio colpito dall'arma subisce lo status (scegli uno: avvelenato, furente)",
    price:2000
  } 
}

export type QualityKey = keyof typeof QUALITIES_CONFIG;

export type QualityFromBase = typeof QUALITIES_CONFIG[QualityKey] & Item;

export const BASE_QUALITIES: QualityFromBase[] = Object.entries(QUALITIES_CONFIG).map(
  ([name, { effect, price }]) => ({
    name: name as QualityKey,
    effect,
    price
    // aggiungi altri campi da `Item` se necessari
  })
);