<script lang="ts">
    import { baseWeapons } from "$lib/weaponUtility";
    import GeneratorBox from "./generatorBox.svelte";
    import RunesButton from "./runesButton.svelte";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "./imageUploader2.svelte";
    import Modal from "./modal.svelte";
    import ModalSelector from "./modalSelector.svelte";
    import { DAMAGE_TYPES, type Item } from "$lib/types";
    import { accuracyFormula, damageFormula } from "$lib/combatUtility";

    //questo deve diventare un import
    let baseQuality = ["none"];
    let char:Item[] = [{name:"DES"},{name:"VIG"},{name:"INT"},{name:"VOL"}];


    //reattività per selezione
    //armi 
    let selectedWeapon = $state(baseWeapons[0]);
    let customWeaponName = $state(" ");
    
    //qualità base
    let selectedQuality = $state(baseQuality[0]);
    let qualityName = $derived(selectedQuality);
    
    //qualità custom    
    let customQuality = $state(" ");
    let qualityCost = $state(0);
    
    //caratteristiche
    let selectedChar1 = $state(char[0]);
    let selectedChar2 = $state(char[0]);

    //tipo di danno
    let selectedDamageType = $state(DAMAGE_TYPES[8]);
    let damageModifier = 0;


    //variabili per apertura modali    
    let isChoosingWeapon = $state(false);
    let isChoosingQual = $state(false);
    let isChoosingDamageType = $state(false);
    let isChoosingChar1 = $state(false);
    let isChoosingChar2 = $state(false);

    //funzione per mostrare il nome corretto
    function displayName(customName:string, originalName:string){
        if(customName.length <= 1)return originalName;
        else return customName;
    }

    //devo capire come aggiornarlo per tutte le mie variabili
    let displayWeaponName = $derived.by(() => {
        return displayName(customWeaponName,selectedWeapon.name);
    })
    
    $inspect(DAMAGE_TYPES[8].name);

</script>

<GeneratorBox nameTag="Arma" >
    <!-- Container che definisce le righe della  -->
    <div class="flex flex-col gap-5">
        
        <!-- Nome Arma  -->
        <div class="flex gap-4">
            <!-- scelta classe Arma -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>
            <input type="checkbox">
            <input placeholder="Nome" bind:value= {customWeaponName} class="border rounded">
        </div>

        <!-- Attributi e Tipi di danno -->
        <div class="flex flex-rows gap-5">
            <!-- Tipo di danno -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedDamageType.name} itemList = {DAMAGE_TYPES} bind:selectedItem = {selectedDamageType} bind:isOpen = {isChoosingDamageType}/>
            </span>
            
            <!-- Numero di Mani -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>
            
            <!-- Attributo Precisione 1 -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedChar1.name} itemList = {char} bind:selectedItem = {selectedChar1} bind:isOpen = {isChoosingChar1}/>
            </span>

            <!-- Attributo Precisione 1 -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedChar2.name} itemList = {char} bind:selectedItem = {selectedChar2} bind:isOpen = {isChoosingChar2}/>
            </span>

        </div>

        <!-- Qualità Standard -->
        <div class="flex flex-row gap-5 items-center">

            <!-- scelta classe Arma -->
            {@render qualitySelection()}
            
            <div class="flex flex-col gap-2">
                <span>
                    <input type="checkbox">
                    +1 Precisione
                </span>

                <span>
                    <input type="checkbox">
                    +4 Danno
                </span>
            </div>
        </div>

        <!-- Qualità Custom -->
        <div class="flex items-center gap-5">
            <input placeholder="Quality Custom" class="border rounded" bind:value={customQuality}>
            <input placeholder="Custom Cost" class="border rounded w-20" bind:value={qualityCost} >
        </div>
        
        <hr>

        <!-- pulsanti per resettare i campi -->
        <div>
            <RunesButton text="carica json" clickFun={()=> console.log("premuto")}/>
            <RunesButton text="Pulisci Campi" clickFun={()=> console.log("premuto")}/>
            <RunesButton text="pino" clickFun={()=> exportHtmlToImage(displayWeaponName)}/>
        </div>

    </div>

    {#snippet imageProcessor()}    
        <div  id={displayWeaponName} class="bg-white">
            <div class=" grid grid-cols-3 gap-4">
                <div class="col-span-1">
                    <ImageUploader2/>
                </div>
                <div class="col-span-2">
                    <div>
                        {displayWeaponName}, {accuracyFormula(selectedChar1.name,selectedChar2.name)}, {damageFormula(damageModifier)},
                    </div>
                    <div>
                        categoria arma * #mani* distance
                    </div>
                </div>
            </div>

            <div>
                qualità custom
            </div>
            
        </div>
    {/snippet}
    
</GeneratorBox>



{#snippet weaponSelection()}
<!--
    <div class="relative">   
     <input placeholder="Armi" bind:value={isOpen}> -->
        <!-- <button onclick={() => {switch(isOpen){case true: isOpen = false;return; case false: isOpen = true; return;}}}> {weaponName}</button> -->
        <!-- Lista a comparsa per scegliere il tipo di arma su cui basare la creazione -->
        <!-- <Modal modalText="pino" bind:showModal = {isOpen} relative={true}>
            <ul>
                {#each baseWeapons as weapon }
                    <li>
                        <button onclick={() => {selectedWeapon = weapon; isOpen = false}}>
                            {weapon.name}
                        </button>
                    </li>
                {/each}
            </ul>
        </Modal>
    </div>
     -->
{/snippet}

{#snippet qualitySelection()}
    <div class="relative">   
    <!-- <input placeholder="Armi" bind:value={isOpen}> -->
         <button onclick={() => {switch(isChoosingQual){case true: isChoosingQual = false;return; case false: isChoosingQual = true; return;}}} class="w-20 h-10 border rounded"> {qualityName}</button>
        <!-- Lista a comparsa per scegliere il tipo di arma su cui basare la creazione -->
        <Modal modalText="pino" bind:showModal = {isChoosingQual} relative={true}>
            <ul>
                {#each baseQuality as quality }
                    <li>
                        <button onclick={() => {selectedQuality = quality; isChoosingQual = false}}>
                            {quality}
                        </button>
                    </li>
                {/each}
            </ul>
        </Modal>
    </div>
{/snippet}



