import type { Item } from "./types";
import { blobUrlToBase64 } from "./utility";

export type Arcanum = {
    domain:string,
    description:string,
    fusion:{
        name:string ,
        effect: string
    },
    impulse:{
        name: string ,
        effect: string
    },
    discharge:{
        name: string,
        effect:string
    },
    reworked:boolean,
    pic?:string
}& Item

export async function arcanumToJson(arcanum:Arcanum){
    if(arcanum.pic)arcanum.pic = await blobUrlToBase64(arcanum.pic) as string;
    return JSON.stringify(arcanum,null,2);
}