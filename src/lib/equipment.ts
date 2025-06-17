import type { Item, QualityFromBase } from "./types";
import { BASE_QUALITIES } from "$lib/types";
import { blobUrlToBase64 } from "./utility";

export type Shield = {
    def: number,
    mdef:number,
    quality: QualityFromBase,
    martial:boolean,
    data:string,
    pic?:string
} & Item

export type Armor = {
    def:string,
    mdef:string,
    quality: QualityFromBase,
    martial:boolean,
    data:string,
    pic?:string    
} & Item

export const ShieldList:Shield[] = [
    {
        name:"Scudo di Bronzo",
        def: 2,
        mdef:0,
        quality:BASE_QUALITIES[0],
        martial:false,
        data:"shield"
        
    },
    {
        name:"Scudo Runico",
        def: 2,
        mdef:2,
        quality:BASE_QUALITIES[0],
        martial:false,
        data:"shield"
    },
]

export const ArmorList: Armor[] = [
    {
        name:"Camicia di Seta",
        def: "Taglia DES",
        mdef:"Taglia INT",
        quality:BASE_QUALITIES[0],
        martial:false,
        data:"armor"
        
    },
    {
        name:"Abito da Viaggio",
        def: "Taglia DES + 1",
        mdef:"Taglia INT + 1",
        quality:BASE_QUALITIES[0],
        martial:false,
        data:"armor"
    },
        {
        name:"Tunica da Lotta",
        def: "Taglia DES + 2",
        mdef:"Taglia INT",
        quality:BASE_QUALITIES[0],
        martial:false,
        data:"armor"
    },
        {
        name:"Veste del Saggio",
        def: "Taglia DES + 1",
        mdef:"Taglia INT + 2",
        quality:BASE_QUALITIES[0],
        martial:false,
        data:"armor"
    },
        {
        name:"Brigantina",
        def: "10",
        mdef:"Taglia INT",
        quality:BASE_QUALITIES[0],
        martial:true,
        data:"armor"
    },
        {
        name:"Corazza di Bronzo",
        def: "11",
        mdef:"Taglia INT",
        quality:BASE_QUALITIES[0],
        martial:true,
        data:"armor"
    },
    {
        name:"Corazza Runica",
        def: "11",
        mdef:"Taglia INT + 1",
        quality:BASE_QUALITIES[0],
        martial:true,
        data:"armor"
    },        {
        name:"Corazza d'Acciaio",
        def: "12",
        mdef:"Taglia INT",
        quality:BASE_QUALITIES[0],
        martial:true,
        data:"armor"
    },
]

export const EquipList =  [...ShieldList,...ArmorList]


export async function equipToJson(equip:any){
    if(equip.pic)equip.pic = await blobUrlToBase64(equip.pic) as string;
    else equip.pic = undefined;
    return JSON.stringify(equip,null,2);
}