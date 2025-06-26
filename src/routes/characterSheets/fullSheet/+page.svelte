<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import { Tabs, type Tab } from '$lib/utility';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/authUtility';
    import { type Character, retrieveUserCharacter } from "$lib/characterUtils";
    import CharacterSheet from '../../../components/sheets/characterSheet.svelte';
    import RunesTab from '../../../components/customHTMLElements/runesTab.svelte';
    import InfoTab from '../../../components/charachterComps/tabs/InfoTab.svelte';
    import StatTab from '../../../components/charachterComps/tabs/statTab.svelte';
    import NotesTab from '../../../components/charachterComps/tabs/notesTab.svelte';
    import ClassTab from '../../../components/charachterComps/tabs/classTab.svelte';
    import SpellTab from '../../../components/charachterComps/tabs/spellTab.svelte';
    import EquipTab from '../../../components/charachterComps/tabs/equipTab.svelte';
    
    // Recupera l'ID dell'auto dal parametro di query
    const id = page.url.searchParams.get('id');
    let canLoad= $state(false);
    let character:Character | null = $state(null);
    let tabs = new Tabs([]);

    let proxyCharacter = $state({});
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
                proxyCharacter = character;
                
            }
            }
            catch(e){
            }
    }
    $inspect(proxyCharacter,"proxy");
</script>


{#if character}
    <div class=" bg-cafe_noir-900 items-center flex  pt-6 pb-6  flex-col px-28 gap-6 ">
        <RunesTab  tabs = {tabs.tabs} />
    </div>
{/if}

{#if proxyCharacter !== character}
    pino
{/if}