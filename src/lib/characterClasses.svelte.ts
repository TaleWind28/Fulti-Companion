import fury from "../additionalFiles/fury.json";
import entropist from "../additionalFiles/entropist.json";
import arcanist from "../additionalFiles/arcanist.json";
import tinkerer from "../additionalFiles/tinkerer.json";
import darkblade from "../additionalFiles/darkblade.json";
import elementalist from "../additionalFiles/elementalist.json";
import guardian from "../additionalFiles/guardian.json";
import loremaster from "../additionalFiles/loremaster.json";
import orator from "../additionalFiles/orator.json";
import rogue from "../additionalFiles/rogue.json";
import sharpshooter from "../additionalFiles/sharpshooter.json";
import spiritist from "../additionalFiles/spiritist.json";
import wayfarer from "../additionalFiles/wayfarer.json";
import weaponmaster from "../additionalFiles/weaponmaster.json";
import chimerist from "../additionalFiles/chimerist.json";


export interface Skill {
  skillName: string;
  currentLvl: number;
  maxLvl: number;
  description: string;
  specialSkill: string;
}

export interface Benefits {
  hpplus: number;
  mpplus: number;
  ipplus: number;
  isCustomBenefit: boolean;
  martials: {
    armor: boolean;
    shields: boolean;
    melee: boolean;
    ranged: boolean;
  };
  rituals: {
    ritualism: boolean;
  };
  spellClasses: string[]; // assumendo array di stringhe
}

export interface Heroic {
  name: string;
  description: string;
}

export interface CharacterClass {
  name: string;
  lvl: number;
  benefits: Benefits;
  skills: Skill[];
  heroic: Heroic;
  spells: unknown[]; // da tipizzare in base alla struttura degli spell
  isHomebrew: boolean;
  dataType: 'class';
}

export const furia = safeParseCharacterClass(fury);
export const entropista = safeParseCharacterClass(entropist);
export const arcanista = safeParseCharacterClass(arcanist);
export const lama_oscura = safeParseCharacterClass(darkblade);
export const elementalista = safeParseCharacterClass(elementalist);
export const guardiano = safeParseCharacterClass(guardian);
export const sapiente = safeParseCharacterClass(loremaster);
export const oratore = safeParseCharacterClass(orator);
export const canaglia = safeParseCharacterClass(rogue);
export const tiratore = safeParseCharacterClass(sharpshooter);
export const spiritista = safeParseCharacterClass(spiritist);
export const viandante = safeParseCharacterClass(wayfarer);
export const maestro_armi = safeParseCharacterClass(weaponmaster);
export const artefice = safeParseCharacterClass(tinkerer);
export const chimerista = safeParseCharacterClass(chimerist);

//classi del Manuale Base
export const baseBookClasses = [
  {name:"arcanista",class:arcanista},
  {name:"artefice",class:artefice},
  {name:"canaglia",class:canaglia},
  {name:"chimerista",class:chimerista},
  {name:"elementalista",class:elementalista},
  {name:"entropista",class:entropista},
  {name:"furia",class:furia},
  {name:"guardiano",class:guardiano},
  {name:"lama oscura",class:lama_oscura},
  {name:"maestro d'armi",class:maestro_armi},
  {name:"oratore",class:oratore},
  {name:"sapiente",class:sapiente},
  {name:"spiritista",class:spiritista},
  {name:"tiratore",class:tiratore},
  {name:"viandante",class:viandante}
];
// Type guard per validazione runtime
export function isCharacterClass(obj: unknown): obj is CharacterClass {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'lvl' in obj &&
    'benefits' in obj &&
    'skills' in obj &&
    'heroic' in obj &&
    'spells' in obj &&
    'isHomebrew' in obj &&
    'dataType' in obj
  );
}

// Utility types per casi specifici
export type SkillName = 'Adrenaline' | 'Frenzy' | 'Indomitable Spirit' | 'Provoke' | 'Withstand';
export type DataType = 'class';

// Factory function per creare istanze con valori di default
export function createEmptyCharacterClass(): CharacterClass {
  return {
    name: '',
    lvl: 1,
    benefits: {
      hpplus: 0,
      mpplus: 0,
      ipplus: 0,
      isCustomBenefit: false,
      martials: {
        armor: false,
        shields: false,
        melee: false,
        ranged: false
      },
      rituals: {
        ritualism: false
      },
      spellClasses: []
    },
    skills: [],
    heroic: {
      name: '',
      description: ''
    },
    spells: [],
    isHomebrew: false,
    dataType: 'class'
  };
}

 // Esempio di utilizzo in Svelte 5 Runes
  export function createClassRune(initialData?: Partial<CharacterClass>) {
      let character_class = $state<CharacterClass>({
          ...createEmptyCharacterClass(),
          ...initialData
      });

      return {
          get data() { return character_class; },
          set data(value: CharacterClass) { character_class = value; },
          updateSkill(skillName: string, level: number) {
          const skill = fury.skills.find(s => s.skillName === skillName);
          if (skill) {
              skill.currentLvl = Math.min(level, skill.maxLvl);
          }
          },
          levelUp() {
          fury.lvl += 1;
          }
      };
  }


export async function loadClassFromFile(filepath:string){
    const response = await fetch(filepath);
    const jsonData = await response.json();
    return safeParseCharacterClass(jsonData);
}


// 2. CONVERSIONE CON VALIDAZIONE COMPLETA
export function safeParseCharacterClass(jsonData: unknown): CharacterClass {
  if (!jsonData || typeof jsonData !== 'object') {
    throw new Error('Invalid JSON data');
  }

  const data = jsonData as Record<string, unknown>;

  // Valida e converte ogni campo
  const characterClass: CharacterClass = {
    name: validateString(data.name, 'name'),
    lvl: validateNumber(data.lvl, 'lvl'),
    benefits: parseBenefits(data.benefits),
    skills: parseSkills(data.skills),
    heroic: parseHeroic(data.heroic),
    spells: Array.isArray(data.spells) ? data.spells : [],
    isHomebrew: Boolean(data.isHomebrew),
    dataType: data.dataType === 'class' ? 'class' : 'class'
  };

  return characterClass;
}

// 3. CONVERSIONE CON FALLBACK E MERGE
export function parseCharacterClassWithDefaults(
  jsonData: unknown, 
  defaults?: Partial<CharacterClass>
): CharacterClass {
  try {
    const parsed = safeParseCharacterClass(jsonData);
    return defaults ? { ...parsed, ...defaults } : parsed;
  } catch (error) {
    console.warn('Failed to parse JSON, using defaults:', error);
    return createEmptyCharacterClass();
  }
}

// FUNZIONI DI SUPPORTO

function isValidJsonStructure(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.name === 'string' &&
    typeof obj.lvl === 'number' &&
    typeof obj.benefits === 'object' &&
    Array.isArray(obj.skills) &&
    typeof obj.heroic === 'object' &&
    Array.isArray(obj.spells) &&
    typeof obj.isHomebrew === 'boolean' &&
    obj.dataType === 'class'
  );
}

function validateString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string') {
    throw new Error(`Field '${fieldName}' must be a string`);
  }
  return value;
}

function validateNumber(value: unknown, fieldName: string): number {
  if (typeof value !== 'number') {
    throw new Error(`Field '${fieldName}' must be a number`);
  }
  return value;
}

function parseBenefits(data: unknown): Benefits {
  if (!data || typeof data !== 'object') {
    throw new Error('Benefits must be an object');
  }
  
  const benefits = data as Record<string, unknown>;
  
  return {
    hpplus: validateNumber(benefits.hpplus, 'benefits.hpplus'),
    mpplus: validateNumber(benefits.mpplus, 'benefits.mpplus'),
    ipplus: validateNumber(benefits.ipplus, 'benefits.ipplus'),
    isCustomBenefit: Boolean(benefits.isCustomBenefit),
    martials: {
      armor: Boolean(benefits.martials),
      shields: Boolean(benefits.martials),
      melee: Boolean(benefits.martials),
      ranged: Boolean(benefits.martials)
    },
    rituals: {
      ritualism: Boolean(benefits.rituals)
    },
    spellClasses: Array.isArray(benefits.spellClasses) ? benefits.spellClasses : []
  };
}

function parseSkills(data: unknown): Skill[] {
  if (!Array.isArray(data)) {
    throw new Error('Skills must be an array');
  }
  
  return data.map((skill, index) => {
    if (!skill || typeof skill !== 'object') {
      throw new Error(`Skill at index ${index} must be an object`);
    }
    
    const s = skill as Record<string, unknown>;
    
    return {
      skillName: validateString(s.skillName, `skills[${index}].skillName`),
      currentLvl: validateNumber(s.currentLvl, `skills[${index}].currentLvl`),
      maxLvl: validateNumber(s.maxLvl, `skills[${index}].maxLvl`),
      description: validateString(s.description, `skills[${index}].description`),
      specialSkill: validateString(s.specialSkill, `skills[${index}].specialSkill`)
    };
  });
}

function parseHeroic(data: unknown) {
  if (!data || typeof data !== 'object') {
    throw new Error('Heroic must be an object');
  }
  
  const heroic = data as Record<string, unknown>;
  
  return {
    name: validateString(heroic.name, 'heroic.name'),
    description: validateString(heroic.description, 'heroic.description')
  };
}