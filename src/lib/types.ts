

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