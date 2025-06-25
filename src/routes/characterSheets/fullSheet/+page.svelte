<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import { Tabs, type Tab } from '$lib/utility';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/authUtility';
    import { type Character, retrieveUserCharacter } from "$lib/characterUtils";
    import CharacterSheet from '../../../components/sheets/characterSheet.svelte';
    import RunesTab from '../../../components/customHTMLElements/runesTab.svelte';
    import InfoTab from '../../../components/charachterComps/InfoTab.svelte';
    import StatTab from '../../../components/charachterComps/statTab.svelte';
    import NotesTab from '../../../components/charachterComps/notesTab.svelte';
    import ClassTab from '../../../components/charachterComps/classTab.svelte';
    import SpellTab from '../../../components/charachterComps/spellTab.svelte';
    import EquipTab from '../../../components/charachterComps/equipTab.svelte';
    
    // Recupera l'ID dell'auto dal parametro di query
    const id = page.url.searchParams.get('id');
    let canLoad= $state(false);
    let character:Character | null = $state(null);
    let tabs = new Tabs([
    {
        id:0,
        label:"Informazioni",
        comp: InfoTab,
        props:{

        }
    },
    {
        id:1,
        label:"Statistiche",
        comp: StatTab,
        props:{
       
        }
    }
    ,{
        id:2,
        label:"Classi",
        comp: ClassTab,
    }
    ,{
        id:3,
        label:"Incantesimi",
        comp: SpellTab,
    },{
        id:4,
        label:"Equipaggiamento",
        comp: EquipTab,
    },{
        id:5,
        label:"Note",
        comp: NotesTab,
    }]);

    onMount(() => {
		console.log('component mounted. Starting initial fetch.');
    
            // L'utente è loggato
            handleRetrieval().then( () =>{
                
                console.log("characters loaded successfully",);
            })
            .catch(() =>{
                console.log("characters loading failed");
                }
            )
            .finally(() =>{
                canLoad = true;
            })
        
	});

    onAuthStateChanged(auth, (user) => {
        if (user &&  canLoad) {
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
                // console.log(tabs);
                // console.log(character);
                }
            }
            catch(e){
                console.log(e);
            }
    }
    $inspect(character);
</script>


{#if character}
    <div class=" bg-cafe_noir-900 items-center flex  pt-6 pb-6  flex-col px-28 gap-6 ">
        <RunesTab show={5}  tabs = {tabs.tabs} />
    </div>
{/if}