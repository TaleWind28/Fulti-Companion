<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { type Affinities, type Character, retrieveUserCharacter } from "$lib/characterUtils";
    import TabSelector from '../../components/tabSelector.svelte';
    import type { Tab } from '$lib/utility';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/authUtility';
    import CharacterCard from '../../components/characterCard.svelte';
    import CustomButton from '../../components/customButton.svelte';
    import { faDiceFive } from '@fortawesome/free-solid-svg-icons';
    import CustomInput from '../../components/customInput.svelte';
    import CharacterSheet from '../../components/characterSheet.svelte';
    
    // Recupera l'ID dell'auto dal parametro di query
    $: id = $page.url.searchParams.get('id');
    let defaultAffinities:Affinities = {}; 
    let defaultCharacter:Character = {
        name:"Shuraigh",
        level:25,
        stats:[12,8,8,8],
        characteristics:[],
        traits:[],
        statuses:[],
        elementalAffinity:defaultAffinities,
        pic:"",
        id:""

    }

    // $: character =  id?retrieveUserCharacter(id):defaultCharacter;
    let character:Character | null = null;
    
    let tabs = [{
        id:1,
        label:"Informazioni",
        component: CustomInput,
    },{
        id:2,
        label:"Statistiche",
        component: CustomInput,
    }
    ,{
        id:3,
        label:"Classi",
        component: CustomInput,
    }
    ,{
        id:4,
        label:"Incantesimi",
        component: CustomInput,
    },{
        id:5,
        label:"Equipaggiamento",
        component: CustomInput,
    },{
        id:6,
        label:"Note",
        component: CustomInput,
    }];
    onMount(() => {
		console.log('component mounted. Starting initial fetch.');
        handleRetrieval();
        
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
            const charachterTab:Tab = {
                id:0,
                label:"Scheda Personaggio",
                component:CharacterSheet,
                props:{
                    character:character,
                }
            } 
            tabs.unshift(charachterTab);
            }
        }
        catch(e){
            console.log(e);
        }
} 
    
</script>

{#if character}
    <div class=" bg-cafe_noir-900 items-center flex  pt-6  flex-col px-28 gap-6 ">
        <TabSelector tabs = {tabs} px="px-0"/>
        <br>
    </div>
    
{/if}