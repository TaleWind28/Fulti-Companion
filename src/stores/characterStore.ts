import { type Character } from "$lib/characterUtils";
import { get, writable } from "svelte/store";

function createCharacterStore(){
    const internalStore = writable<Character[]>([]);

    const {subscribe, update, set} = internalStore;
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

        searchCharacter:(id:string): Character | undefined =>{
            const currentChars = get(internalStore);
            for(let i = 0;i<currentChars.length;i++){
                console.log(currentChars[i].id);
            }
            return currentChars.find(char => char.id===id);
        },
        // Function to reset the store
        reset: () => set([])
    }
}

export const personaggiStore = createCharacterStore();
