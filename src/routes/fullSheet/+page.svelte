<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { type Character, retrieveUserCharacter } from "$lib/characterUtils";
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/authUtility';
    import CharacterCard from '../../components/characterCard.svelte';
    
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

pippo
<CharacterCard car ={character}/>
