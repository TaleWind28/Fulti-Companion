
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
  export function createFuryRune(initialData?: Partial<CharacterClass>) {
      let fury = $state<CharacterClass>({
          ...createEmptyCharacterClass(),
          ...initialData
      });

      return {
          get data() { return fury; },
          set data(value: CharacterClass) { fury = value; },
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