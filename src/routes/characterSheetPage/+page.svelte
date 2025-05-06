<script lang="ts">
    import CustomButton from "../../components/customButton.svelte";
    import CharacterCard from "../../components/characterCard.svelte";
    import CustomInput from "../../components/customInput.svelte";
    import { addUserCharacter, type Character ,convertToCharacterFormat,importCharacterToFirestore,retrieveUserCharacters ,processSelectedFile, type FultimatorJson} from "$lib/characterUtils";
    import { personaggiStore } from "../../stores/characterStore";
    import { onDestroy, onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/authUtility";
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { json } from "@sveltejs/kit";

    let selectedFile:File|null = null; 
    let previewUrl = '';
    let uploadError = '';
      // Esegui prima della navigazione
    beforeNavigate(({ to, from, cancel }) => {
        // Cancella i dati qui
        console.log('Sto per navigare da', from?.url.pathname, 'a', to?.url.pathname);
        personaggiStore.reset();
    });

    afterNavigate(({ to, from }) => {
        // Cancella i dati qui
        console.log('Sto per navigare da', from?.url.pathname, 'a', to?.url.pathname);
        personaggiStore.reset();
    });
    function createCharacter(){
        let char:Character = {
            name: "",
            level: 5,
            stats:[60,60,60,60,60,60],
            characteristics:[6,6,6,6],
            traits:["","",""],
            statuses:[false],
            elementalAffinity:{},
            pic:"",
            id:""
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
        handleAdd(jsonCharacter).then(()=>{
            personaggiStore.aggiungiPersonaggio(jsonCharacter);
        })
        selectedFile = null;
    }

    export let characters: Character[] = [];
    // export let characters = [{
    //     name:"Landon McCoy",
    //     stats:[
    //         12,
    //         8,
    //         8,
    //         6
    //     ],
    //     traits:["Duellante Spavaldo e Speranzoso","Giustizia","Diez Coronas"],
    //     elementalAffinity:[0,1,2,0,1,2,0,1,2],
    //     statuses:[false],
    //     level:25,
    //     pic:"src/images/Logo5.1.png"
    // },{
    //     name:"Chroma Celsius",
    //     stats:[
    //         8,
    //         8,
    //         8,
    //         8
    //     ],
    //     traits:["FareVhin","Dovere","Diez Coronas"],
    //     elementalAffinity:[0,1,2,0,1,2,0,1,2],
    //     statuses:[false],
    //     level:20,
    //     pic:"src/images/Logo5.1.png"
    // },
    
    // ];
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
            console.log(characters.length)
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

    

</script>
<div class="bg-cafe_noir-900">
    <br><br><br>
    <div class=" flex items-center justify-center gap-6 bg-white w-fit mx-auto h-20 px-8 rounded">
        <input placeholder="ricerca con il nome personaggio" class=" bg-cafe_noir-600 text-white rounded"/>
        <CustomButton text="Crea Personaggio" color="bg-cafe_noir-600" dimensions="w-35 h-10" on:click={createCharacter}/>
        <CustomInput type="file" name="jsonImporter" hidden="true" color="bg-cafe_noir-600" on:change= {handleFileSelect}/>
        <!-- <CustomButton text="importa da Json" color="bg-cafe_noir-600" dimensions="w-35 h-10"/> -->
    </div>
    <CharacterCard dimensions="w-auto h-auto" padding = "px-8" caracters = {$personaggiStore}/>
    
    <br><br><br>
</div>