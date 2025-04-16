import { type Character } from "$lib/utility";
import { writable } from "svelte/store";

function createCharacterStore(){
    const {subscribe, update, set} = writable<Character[]>([]);
    return{
        subscribe,
        //aggiungere personaggio
        aggiungiPersonaggio: (char:Character) => {
            if(char !== null){
                update( characters => {
                    return [...characters, char];
                })
            }
        },
        //rimuovo un personaggio 
        removeCharacter:(id:string) =>{
            
            update(characters =>characters.filter(p=> p.id!== id));
        },
        // Function to reset the store
        reset: () => set([])
    }
}

export const personaggiStore = createCharacterStore();

 