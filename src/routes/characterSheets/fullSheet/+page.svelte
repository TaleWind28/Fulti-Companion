<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import { Tabs, type Tab } from '$lib/utility';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/authUtility';
    import { type Character, retrieveUserCharacter, updateUserCharacter } from "$lib/characterUtils";
    import CharacterSheet from '../../../components/sheets/characterSheet.svelte';
    import RunesTab from '../../../components/customHTMLElements/runesTab.svelte';
    import InfoTab from '../../../components/charachterComps/tabs/InfoTab.svelte';
    import StatTab from '../../../components/charachterComps/tabs/statTab.svelte';
    import NotesTab from '../../../components/charachterComps/tabs/notesTab.svelte';
    import ClassTab from '../../../components/charachterComps/tabs/classTab.svelte';
    import SpellTab from '../../../components/charachterComps/tabs/spellTab.svelte';
    import EquipTab from '../../../components/charachterComps/tabs/equipTab.svelte';
    import { personaggiStore } from '../../../stores/characterStore';
  import { beforeNavigate } from '$app/navigation';
    
    // Recupera l'ID dell'utente dal parametro di query
    const id = page.url.searchParams.get('id');
    let canLoad= $state(false);
    let character:Character | null = $state(null);
    let initialCharacter:Character | null = $state(null);
    let tabs = new Tabs([]);

     let hasChanged = $derived(
        character && initialCharacter 
            ? JSON.stringify(character) !== JSON.stringify(initialCharacter)
            : false
    );

    beforeNavigate(({ to, from, cancel }) => {
        // Cancella i dati qui          
        console.log('Sto per navigare da', from?.url.pathname, 'a', to?.url.pathname);
        personaggiStore.reset();
        //personaggiStore.reset();
    });


    onMount(() => {
		console.log('component mounted. Starting initial fetch.');
    
            // // L'utente è loggato
            // handleRetrieval().then( () =>{
                
            //     console.log("characters loaded successfully",);
            // })
            // .catch(() =>{
            //     console.log("characters loading failed");
            //     }
            // )
            // .finally(() =>{
            //     canLoad = true;
            // })
        
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

    const handleUpdate = async (character:Character) => {
        await updateUserCharacter(character);
    }

    async function saveData(character:Character){
        handleUpdate(character).then(() => {
            personaggiStore.updateCharacter(character);
            console.log("character successfully added");
     })
     .catch( () => {
            console.log("character couldn't be added");
        })
    }
    const handleRetrieval = async () => {
        try{
            if(id){
                character = await retrieveUserCharacter(id);
                initialCharacter = $state.snapshot(character);
                const charachterTab:Tab = {
                    id:0,
                    label:"Scheda Personaggio",
                    comp:CharacterSheet,
                    props:{
                        character:character,
                    }
                }

                const infoTab:Tab = {
                    id:0,
                    label:"Informazioni",
                    comp: InfoTab,
                    props:{
                        characterName:character.name,
                        characterLevel:character.level,
                        bondArray:character.bonds,
                        imageStringUrl:character.pic,
                        zenit:character.zenit,
                        exp: character.exp,
                        fabulaPoints:character.fabulaPoints,
                        character:character,
                    }
                }
                const statTab:Tab = {
                    id:1,
                    label:"Statistiche",
                    comp: StatTab,
                    props:{
                        characteristics:character.characteristics,
                        characterAffinitiesRaw:character.elementalAffinity,
                        statuses:character.statuses,
                        character:character
                    }
                }

                const classTab = {
                    id:2,
                    label:"Classi",
                    comp: ClassTab,
                    props:{
                        classList: character.classes

                    }
                }
                
                const spellTab:Tab = {
                    id:3,
                    label:"Incantesimi",
                    comp: SpellTab,
                    props:{
                        spellsKnown:character.spell
                    }
                }

                const equipTab:Tab = {
                    id:4,
                    label:"Equipaggiamento",
                    comp: EquipTab,
                    props: {
                        weaponList:character.weapons,
                        shieldList:character.armor,
                        accessoryList:character.accessories
                    }
                }

                const notesTab:Tab = {
                    id:5,
                    label:"Note",
                    comp: NotesTab,
                    props:{
                        charactherNotes:character.notes
                    }
                }
                tabs.addTab(charachterTab);
                tabs.addTab(infoTab);
                tabs.addTab(statTab);
                tabs.addTab(classTab);
                tabs.addTab(spellTab);
                tabs.addTab(equipTab);
                tabs.addTab(notesTab);
                
            }
            }
            catch(e){
            }
    }
</script>


{#if character}
   {#if hasChanged}
    <div class="flex gap-2 ml-auto">
            <button 
                class="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
                onclick={() => {
                    // Scarta le modifiche
                    // character = structuredClone(initialCharacter);
                    //implementare
                }}
            >
                Annulla         
            </button>
            <button 
                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                onclick={() => {
                    // Qui aggiungi la logica per salvare
                    console.log('Salvataggio...', character);
                    if(!character){
                        alert("personggio non valido");
                        return;
                    }
                    console.log(character);
                    saveData(character);
                    // Dopo il salvataggio, aggiorna initialCharacter
                    initialCharacter = $state.snapshot(character);
                    
                }}
            >
                Salva
            </button>
        </div>
{/if}
    <div class=" bg-cafe_noir-900 items-center flex  pt-6 pb-6  flex-col px-28 gap-6 ">
        <RunesTab  tabs = {tabs.tabs} />
    </div>
{/if}

