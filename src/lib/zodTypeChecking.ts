
// 1. Importa Zod
import { z } from "zod";

// 2. Definisci lo schema `Item`
const ItemScheme = z.object({
  name: z.string()
});

// 3. Definisci lo schema `Weapon` come estensione di `Item`
export const WeaponScheme = ItemScheme.extend({
  cost: z.number(),
  accuracy: z.string(),
  damage: z.number(),
  type: z.string(),
  category: z.string(),
  quality: z.string(),
  distance: z.string(),
  hands: z.string(),
  pic: z.string()
});

// 4. Tipo TypeScript inferito (opzionale)
type Weapon = z.infer<typeof WeaponScheme>;

const ModifiersSchema = z.any();           // Sostituisci con uno schema preciso se disponibile
const AffinitiesSchema = z.any();          // Idem

export const CharacterSchema = z.object({
  name: z.string(),
  level: z.number(),
  stats: z.array(z.number()),
  characteristics: z.array(z.number()),
  traits: z.array(z.string()),
  statuses: z.array(z.boolean()),
  classes: z.array(z.any()),
  weapons: z.array(z.any()),
  armor: z.array(z.any()),
  notes: z.array(z.any()),
  modifiers: ModifiersSchema,
  elementalAffinity: AffinitiesSchema,
  pic: z.string(),
  id: z.string(),
  bonds: z.union([z.array(z.any()), z.null()]),
  shields: z.union([z.array(z.any()), z.null()]),
});

// Tipo TypeScript (opzionale)
type Character = z.infer<typeof CharacterSchema>;