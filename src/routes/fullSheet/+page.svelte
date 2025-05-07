<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { type Character, retrieveUserCharacter } from "$lib/characterUtils";
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/authUtility';
    import CharacterCard from '../../components/characterCard.svelte';
    import CustomButton from '../../components/customButton.svelte';
    import { faDiceD6, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';
    
    // Recupera l'ID dell'auto dal parametro di query
    $: id = $page.url.searchParams.get('id');
   
    let character:Character;


    onMount(() => {
		console.log('component mounted. Starting initial fetch.');

	});

    onAuthStateChanged(auth, (user) => {
    if (user) {
        // L'utente è loggato
        console.log("Utente loggato:", user.uid);
        handleRetrieval().then( () =>{
            console.log("characters loaded successfully",);
        })
        .catch(() =>{
            console.log("characters loading failed");
            }
        )
    }
});
const handleRetrieval = async () => {
    try{
        if(id){
            character = await retrieveUserCharacter(id);
            }
        }
        catch(e){
            console.log(e);
        }
} 
    
</script>

{#if character}
    <div class=" bg-cafe_noir-900 items-center flex flex-col px-28 gap-6 ">
        <br>
        <div class=" flex items-center justify-center">Infoboard</div>
        <CharacterCard car ={character} hidden={true}/>
        <div class="flex items-center justify-center gap-4">
            <CustomButton text="Mostra Scheda di Battaglia" dimensions="w-50 h-8" color="bg-cafe_noir-600"/> 
            <CustomButton text="roll" dimensions="w-15 h-8" color="bg-cafe_noir-600" textIcon={true} icon={faDiceFive}/>
        </div>
        
        <div class="flex items-center justify-center">Note</div>
        <br>
    </div>
    
{/if}