<script lang="ts">
    import CustomButton from "../../components/customHTMLElements/customButton.svelte";
    import CharacterCard from "../../components/charachterComps/characterCard.svelte";
    import { addUserCharacter, type Character ,convertToCharacterFormat,retrieveUserCharacters ,processSelectedFile} from "$lib/characterUtils";
    import { personaggiStore } from "../../stores/characterStore";
    import { onDestroy, onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/authUtility";
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import CustomInput from "../../components/customHTMLElements/customInput.svelte";

    let selectedFile:File|null = null; 
    let previewUrl = '';
    let uploadError = '';
    $: rows = Math.floor($personaggiStore.length);
      // Esegui prima della navigazione
    beforeNavigate(({ to, from, cancel }) => {
        // Cancella i dati qui
        console.log('Sto per navigare da', from?.url.pathname, 'a', to?.url.pathname);
        //personaggiStore.reset();
    });

    afterNavigate(({ to, from }) => {
        // Cancella i dati qui
        console.log('ho navigato da', from?.url.pathname, 'a', to?.url.pathname);

    });
    function createCharacter(){
        let char:Character = {
            name: "",
            level: 5,
            stats: [60, 60, 60, 60, 60, 60],
            characteristics: [6, 6, 6, 6],
            traits: ["", "", ""],
            statuses: [false],
            elementalAffinity: {},
            pic: "",

            id: "",
            classes: [],
            weapons: [],
            armor: [],
            notes: [],
            modifiers: [0,0,0,0],
            bonds: null,
            shields: null
        }
        
        handleAdd(char).then(() => {
            personaggiStore.aggiungiPersonaggio(char);
            console.log("character successfully added");
        })
        .catch( () => {
            console.log("character couldn't be added");
        }
       
        );
        

    }   
    
    function removeCharacter(name:string){
        personaggiStore.removeCharacter(name);
    }

    async function handleFileSelect(event:Event){
        const target = event.target as HTMLInputElement;
        selectedFile = target.files?.[0] || null;
        if(selectedFile == null)return;
        if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json'))return;
        
        const jsonImport = await processSelectedFile(selectedFile);

        const jsonCharacter = convertToCharacterFormat(jsonImport);
        // addUserCharacter(jsonCharacter);
        console.log(jsonCharacter.bonds)
        handleAdd(jsonCharacter).then(()=>{
            personaggiStore.aggiungiPersonaggio(jsonCharacter);
        })
        selectedFile = null;
    }

    export let characters: Character[] = [];

    const handleAdd = async (character:Character) => {
        await addUserCharacter(character);
    }
    
    const handleRetrieval = async () => {
        try{
            characters = await retrieveUserCharacters();
        }
        catch(e){
            console.log(e);
        }
        
    }

    onMount(() => {
		console.log('component mounted. Starting initial fetch.');

	});

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // L'utente è loggato
            console.log("Utente loggato:", user.uid);
            handleRetrieval().then( () =>{
                for(let i =0;i<characters.length;i++){
                    personaggiStore.aggiungiPersonaggio(characters[i]);
                }
                console.log("characters loaded successfully",);
            })
            .catch(() =>{
                console.log("characters loading failed");
                }
            )
        }
    });
    onDestroy(()=>{
        console.log("component destroyed. Starting cleanup");
        personaggiStore.reset();
        console.log("store reset");
        console.log("-------------------------------");
    })

function handleSearch(){

}
    

</script>
<div class="bg-cafe_noir-900 gap-5">
    <br><br><br>
    
    <div class=" grid grid-cols-3 items-center justify-center gap-6 bg-white w-fit mx-auto h-20 px-8 rounded">
        <CustomInput text="Ricerca con il nome personaggio" type="text" name="character finder" color="bg-cafe_noir-600" dimensions="w-auto h-auto" additionalStyle="" placeholder="Ricerca con il nome personaggio" on:change= {handleSearch}/>
        <CustomButton text="Crea Personaggio" color="bg-cafe_noir-600" dimensions="w-50 h-10" on:click={createCharacter}/>
        <CustomInput text="Importa da Json" type="file" name="jsonImporter" hidden={true} color="bg-cafe_noir-600" on:change= {handleFileSelect}/>
    </div>
    <br><br><br>
    <div class="w- px-8 grid grid-cols-2 {`grid-rows-${rows}`} gap-4">
        {#each $personaggiStore as car}    
            <CharacterCard car = {car} />
        {/each}
    </div>
    
    <br><br><br>
</div>