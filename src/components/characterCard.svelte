<script lang="ts">
    import { removeUserCharacter, elemGlams, type AffinityGlams, type Character, type ElementType, convertToFultimatorJson, downloadFile } from "$lib/characterUtils";
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

    import {  faFileExport, faKhanda, faMagicWandSparkles, faPencil, faRunning, faShield, faTrashCan } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import CustomButton from "./customButton.svelte";

    import ProgressiveBar from "./progressiveBar.svelte";

    import { personaggiStore } from "../stores/characterStore";
    import { goto } from "$app/navigation";
    import Modal from "./modal.svelte";
    import RunesButton from "./runesButton.svelte";
    
    export {traits};

    const awaitRemoval = async (id:string)=>{

        await removeUserCharacter(id);
    } 
    function handleRemove(id:string){
        awaitRemoval(id).then( () => {
            personaggiStore.removeCharacter(id);
        })
        
    }

    function handleModify(id:string){
        
        goto(`./characterSheets/fullSheet?id=${id}`);
    }
    
    function handleExport(id:string){
        console.log("entro con id: ",id);
        const character = personaggiStore.searchCharacter(id);
        if(!character){
            console.log("Nessun personaggio trovato");
            return;
        } 
        const fultimatorObject = convertToFultimatorJson(character);
        if (!fultimatorObject) {
            console.error("Nessun dato Fultimator da scaricare.");
            return;
        }    
        const jsonData = JSON.stringify(fultimatorObject, null, 2); // null, 2 per formattare il JSON
        const fileName = `${character.name.replace(/\s+/g, '_') || 'personaggio'}_fultimator.json`; // Es. "Nome_Personaggio_fultimator.json"
        console.log("bella");
        downloadFile(jsonData, fileName, 'application/json');
    }
    
    let showConfirmModal = $state(false);
    let characterIdToRemove: string | null = null;
    let isDeleting = $state(false); // Stato per feedback visivo durante l'eliminazione
    let elementOrder:ElementType[] = ['poison','light', 'dark', 'ice', 'fire', 'earth', 'wind', 'bolt', 'physical']
    elementOrder.reverse();
    //chiedo conferma all'utente della rimozione
    function requestRemoveConfirmation(id: string) {
        characterIdToRemove = id;
        showConfirmModal = true;
        isDeleting = false; // Resetta lo stato di eliminazione
    }

    //se l'utente conferma rimuovo
    async function confirmRemove() {
        if (!characterIdToRemove) return;

        isDeleting = true;

        try {
            await awaitRemoval(characterIdToRemove);
            personaggiStore.removeCharacter(characterIdToRemove);
            console.log('Personaggio rimosso con successo!');
        } catch (error) {
            console.error("Errore durante la rimozione:", error);
        } finally {
            closeModal();
        }
    }

    // 3. Funzione per chiudere/annullare
    function closeModal() {
        showConfirmModal = false;
        characterIdToRemove = null;
        isDeleting = false;
    }
 
    let {
        car = $bindable(),
        hidden = false
    } = $props();

    let actualStats:number[] = $derived.by(()=>{

        let des = car.characteristics[0];
        let int = car.characteristics[1];
        let vig = car.characteristics[2];
        let vol = car.characteristics[3];
        
        //avvelenato
        if(car.statuses[5] == true){ vig -= 2;vol -= 2};
        //furente
        if(car.statuses[1] == true){ des -= 2;int -= 2}
        //lento
        if(car.statuses[0] == true) des = des -2;
        //confuso
        if(car.statuses[2] == true) int = int -2;
        //scosso
        if(car.statuses[4] == true) vig = vig -2;
        //debole
        if(car.statuses[6] == true)  vol = vol-2;

        
        return [des, int, vig, vol].map(stat => Math.max(stat, 6));
    })

    let additionalDef = 0;
    let additionalMdef = 0;
    let classBonus = {
        hp:0,
        mp:0,
        ip:0
    }
    let maxHp = $derived( car.characteristics[2]*5 + car.level + classBonus.hp);
    let maxMp = $derived( car.characteristics[3]*5 + car.level + classBonus.hp);
    let maxIp = $derived( 6 + classBonus.ip);
    let hp = $derived({
        max:car.characteristics[2]*5 + car.level + classBonus.hp,
        actual:car.characteristics[2]*5 + car.level + classBonus.hp
    });
    
    let mp = {
        max:car.characteristics[3]*5 + car.level + classBonus.hp,
        actual:car.characteristics[3]*5 + car.level + classBonus.mp
    }
    let ip = {
        max: 6 + classBonus.ip,
        actual: 6 + classBonus.ip
    }
    let defensiveStats:number[] = $derived.by(()=>{
        
        let def = actualStats[0] + additionalDef;
        let mdef= actualStats[1] + additionalMdef;

        //aggiungere considerazioni per armature che forniscono difesa flat
        return [def,mdef];
    })

</script>

<div class= "bg-white rounded w-min-140 w-max-140">
    <!--nome e livello-->
    <header class="bg-cafe_noir-600 flex items-center justify-around text-white text-2xl">
        <div>{car.name}</div>
        <div>LV {car.level}</div>
    </header>

    <!-- Character Info-->
    <div class="flex flex-row gap-2">
        <!-- lato sx-->
        <div class="bg-white flex-col">
            <!-- Avatar --> 
            <img src={car.pic} alt="character pic" class=" border border-white w-70 h-70">
            
            <!-- Information Bars-->
            <div class="flex  flex-col justify-start items-start">
                <ProgressiveBar bgColor="carribean_current-600" color="bg-red-500" label="HP"  max={hp.max} actual={hp.actual}/>

                <ProgressiveBar bgColor="carribean_current-600" color="bg-blue-500" label="MP" max={mp.max} actual={mp.actual}/>
                
                <ProgressiveBar bgColor="carribean_current-600" color="bg-lion-700" label="IP" max={ip.max} actual={ip.max}/>
            </div>
        </div>

        <!-- lato dx-->
        <div class="bg-white px-4 gap-4">
            <br>
            <!-- tratti -->
            <div class="border rounded flex ">
                <p class="bg-cafe_noir text-white  px-1 py-1 rounded flex-shrink-0 [writing-mode:vertical-lr] rotate-180 text-center">
                    TRATTI
                </p>
                <div class="flex items-center justify-around px-2">
                    {@render traits(car.traits)}
                </div>
            </div>
            <br>
            <!-- stats -->
            <div class="items-center justify-around px-4">
                {@render characterStats([actualStats[0],actualStats[2]],["Des","Vig"])}
                {@render characterStats([actualStats[1],actualStats[3]],["Int","Vol"])}
            </div>
            <br>
            <!-- statistiche difensive-->
            <span class=" flex items-center justify-between px-4">
                {@render derivedStats("DEF",defensiveStats[0],faShield,faKhanda)}
                {@render derivedStats("M.DEF",defensiveStats[1],faShield,faMagicWandSparkles)}
                {@render derivedStats("INIT",0,faRunning,null)}
            </span>
            <br>
            <!-- affinità elementale-->
            <footer class="flex justify-end items-end">
                {@render affinityTable(car, elemGlams)}
            </footer>
        </div>
    </div>

    <!-- footer con interazione scheda -->
    {#if !hidden}    
        <footer class="flex justify-start items-center">
            <p>
                <CustomButton text="" icon={faPencil} style ="cursor-pointer px-2" additionalStyle="" dimensions="w-auto" color="" on:click={ () => handleModify(car.id)}/>
            </p>
            <p>
                <CustomButton text="" icon={faTrashCan} style ="cursor-pointer px-2" additionalStyle="" dimensions="w-auto" color="" on:click={ () => requestRemoveConfirmation(car.id)}/>
            </p>
            <p>
                <CustomButton text="" icon={faFileExport} style ="cursor-pointer px-2" additionalStyle="" dimensions="w-auto" color="" on:click={ () => handleExport(car.id)}/>
            </p>
        </footer>
    {/if}    
</div>

<Modal bind:showModal={showConfirmModal} modalText ="Chiudi" divStyle={"flex flex-col gap-4"}>
    
    <h1 class="font-bold">
        Conferma Eliminazione
    </h1>
    <p>
        Sei sicuro di voler eliminare questo personaggio? Questa azione è irreversibile.
    </p>
    <span class="flex justify-end gap-5">

        <RunesButton text={"Annulla"} clickFun={closeModal} color={"bg-gray-500"}/>

        <RunesButton text={"Elimina"} clickFun={confirmRemove} color={"bg-red-500"}/>
    </span>

    
</Modal>




{#snippet affinityTable(character:Character,glam:AffinityGlams)}
    <div class="grid grid-cols-9 border">
        {#each elementOrder as element }
            <div class="flex items-center border-l pl-2">
                {#if character.elementalAffinity[element]!="nu"}
                    <Fa icon={glam[element as ElementType].icon} class={glam[element as ElementType].color} />
                    {character.elementalAffinity[element]}
                {:else}
                    <span class="flex items-center justify-start w-12"> 
                        <Fa icon={glam[element as ElementType].icon} class="text-gray-500" />
                    </span>
                {/if}
            </div>
        {/each}
    </div>
{/snippet}

{#snippet traits(traits:string[])}
    <div class="flex flex-col w-full">
        <div class="flex">
            <p class="font-bold">Identità: </p>{ traits[0]}
        </div>
        <div class="flex">
            <p class="font-bold">Tema: </p>{traits[1]}
        </div>
        <div class="flex">
            <p class="font-bold">Origine:</p> 
            {traits[2]}
        </div>
    </div>
{/snippet}

{#snippet iconComposer(icon1:IconDefinition|null, icon2:IconDefinition | null)}
    <span class="relative inline-block">
        {#if icon1!=null}
            <Fa icon={icon1} class="text-4xl " />
            {#if icon2 !== null}
                <Fa icon={icon2} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white" />
            {/if}
        {/if}
    </span>
{/snippet}


{#snippet derivedStats(statName:string|null, stat:number|null, icon:IconDefinition|null, innerIcon:IconDefinition | null)}
    {#if stat!=null}
        <div>
            {@render iconComposer(icon, innerIcon)}
            <p>{statName}: {stat}</p>
        </div>
    {:else}
        <div>

        </div>
    {/if}

{/snippet}

{#snippet characterStats(stats:number[],statNames:string[])}
    <div class="flex justify-between">
        <div class="flex px-2 text-2xl font-semi-bold">
            <p>{statNames[0]}</p>:
            d{stats[0]}
        </div>
        <div class="flex px-2 text-2xl font-semi-bold">
            <p>{statNames[1]}</p>:
            d{stats[1]}
        </div>
    </div>
{/snippet}