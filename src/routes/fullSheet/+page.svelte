<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { type Affinities, type Character, retrieveUserCharacter } from "$lib/characterUtils";
    import TabSelector from '../../components/tabSelector.svelte';
    import { Tabs, type Tab } from '$lib/utility';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/authUtility';
    import CustomInput from '../../components/customInput.svelte';
    import CharacterSheet from '../../components/characterSheet.svelte';
    // Recupera l'ID dell'auto dal parametro di query
    $: id = $page.url.searchParams.get('id');
    
    let character:Character | null = null;
    let tabs = new Tabs([{
        id:1,
        label:"Informazioni",
        comp: CustomInput,
        props:{

        }
    },{
        id:2,
        label:"Statistiche",
        comp: CustomInput,
    }
    ,{
        id:3,
        label:"Classi",
        comp: CustomInput,
    }
    ,{
        id:4,
        label:"Incantesimi",
        comp: CustomInput,
    },{
        id:5,
        label:"Equipaggiamento",
        comp: CustomInput,
    },{
        id:6,
        label:"Note",
        comp: CustomInput,
    }]);

    onMount(() => {
		console.log('component mounted. Starting initial fetch.');
        //handleRetrieval();
        
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
                    comp:CharacterSheet,
                    props:{
                        character:character,
                    }
                }
                tabs.addTab(charachterTab,0);
                }
            }
            catch(e){
                console.log(e);
            }
    }

</script>


{#if character}
    <div class=" bg-cafe_noir-900 items-center flex  pt-6 pb-6  flex-col px-28 gap-6 ">
        <TabSelector tabs = {tabs.tabs} px="px-0"/>
    </div>
{/if}