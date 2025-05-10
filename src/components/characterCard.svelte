<script lang="ts">
    import { removeUserCharacter, elemGlams, type Affinities, type AffinityGlams, type Character, type ElementType, type FultimatorJson, convertToFultimatorJson, downloadFile } from "$lib/characterUtils";
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

    import { faBoltLightning, faFileExport, faFire, faHillRockslide, faHorse, faKhanda, faMagicWandSparkles, faPencil, faRunning, faShield, faSkullCrossbones, faSnowflake, faSun, faTrashCan, faWandMagicSparkles, faWind } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import CustomButton from "./customButton.svelte";

    import ProgressiveBar from "./progressiveBar.svelte";

    import { personaggiStore } from "../stores/characterStore";
    import { goto } from "$app/navigation";
    import ConfirmationModal from "./confirmationModal.svelte";
    

    export {traits};
    //export let elementalIcons = [ faKhanda,faWind, faBoltLightning, faHorse, faHillRockslide,faFire, faSnowflake,faSun, faSkullCrossbones]
    //export let elemenColor = ["text-gray-400","text-green-500","text-yellow-500","","text-amber-900","text-red-500","text-blue-500","text-cafe_noir-800","text-purple-700"]

    const awaitRemoval = async (id:string)=>{

        await removeUserCharacter(id);
    } 
    function handleRemove(id:string){
        awaitRemoval(id).then( () => {
            personaggiStore.removeCharacter(id);
        })
        
    }

    function handleModify(id:string){
        
        goto(`/fullSheet?id=${id}`);
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
    let showConfirmModal = false;
    let characterIdToRemove: string | null = null;
    let isDeleting = false; // Stato per feedback visivo durante l'eliminazione
    

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
    // export let dimensions ="w-140";
    // export let padding = "";
    export let car:Character;
    export let hidden = false;
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
                        <ProgressiveBar bgColor="carribean_current-600" color="bg-red-500" max={car.stats[1]} actual={car.stats[0]}/>

                        <ProgressiveBar bgColor="carribean_current-600" color="bg-blue-500" max={car.stats[3]} actual={car.stats[2]}/>
                        
                        <ProgressiveBar bgColor="carribean_current-600" color="bg-lion-700" max={car.stats[5]} actual={car.stats[4]}/>
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
                        {@render characterStats([car.characteristics[0],car.characteristics[2]],["Des","Vig"])}
                        {@render characterStats([car.characteristics[1],car.characteristics[3]],["Int","Vol"])}
                    </div>
                    <br>
                    <!-- statistiche difensive-->
                    <span class=" flex items-center justify-between px-4">
                        {@render derivedStats("DEF",car.characteristics[0],faShield,faKhanda)}
                        {@render derivedStats("M.DEF",car.characteristics[1],faShield,faMagicWandSparkles)}
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


<!-- Il nostro Modale di Conferma -->
{#if showConfirmModal}
    <ConfirmationModal title="Conferma Eliminazione"
        message="Sei sicuro di voler eliminare questo personaggio? L'azione è irreversibile."
        confirmButtonText="Elimina"
        cancelButtonText="Annulla"
        isProcessing={isDeleting}
        on:confirm={confirmRemove}
        on:cancel={closeModal}
    />
{/if}

{#snippet affinityTable(character:Character,glam:AffinityGlams)}
    <div class="grid grid-cols-9 border">
        {#each Object.entries(character.elementalAffinity) as [element,affinity]}
            <div class="flex items-center border-l pl-2">
                {#if affinity!="nu"}
                    <Fa icon= {glam[element as ElementType].icon} class={glam[element as ElementType].color}/>
                    {affinity}
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
<!-- 
{#snippet progressiveBar(color:string, actual:number, fixed:number)}
    
    <div class="{color} w-70 flex items-center justify-center" 
    style="background-image: {`linear-gradient(to right, transparent ${(fixed > 0) ? Math.min(100, Math.max(0, (actual / fixed) * 100)) : 0}$, gray-200 ${(fixed > 0) ? Math.min(100, Math.max(0, (actual / fixed) * 100)) : 0}$)`}
        background-size: 100% 100%; background-repeat: no-repeat;">
        {actual}/{fixed}
    </div>
{/snippet}   -->

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


