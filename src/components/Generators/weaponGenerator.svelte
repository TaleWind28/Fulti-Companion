<script lang="ts">
    import { baseWeapons } from "$lib/weaponUtility";
    import GeneratorBox from "./generatorBox.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import Modal from "../customHTMLElements/modal.svelte";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import { DAMAGE_TYPES, type Item } from "$lib/types";
    import { accuracyFormula, damageFormula } from "$lib/combatUtility";
    import { BASE_QUALITIES } from "$lib/types";

    //questo deve diventare un import
    let char:Item[] = [{name:"DES"},{name:"VIG"},{name:"INT"},{name:"VOL"}];
    let hands:Item[] = [{name:"una mano"},{name:"due mani"}];


    //reattività per selezione
    //armi 
    let selectedWeapon = $state(baseWeapons[0]);
    let customWeaponName = $state(" ");
    
    //qualità base
    let selectedQuality = $state(BASE_QUALITIES[0]);
    let qualityName = $derived(selectedQuality.effect);
    
    //qualità custom    
    let customQuality = $state(" ");
    let qualityCost = $state(0);
    
    //caratteristiche
    let selectedChar1 = $state(char[0]);
    let selectedChar2 = $state(char[0]);

    //tipo di danno
    let selectedDamageType = $state(DAMAGE_TYPES[8]);
    let damageModifier = 0;

    //Numero di Mani
    let selectedHand = $state(hands[0]);

    //variabili per apertura modali    
    let isChoosingWeapon = $state(false);
    let isChoosingQual = $state(false);
    let isChoosingDamageType = $state(false);
    let isChoosingChar1 = $state(false);
    let isChoosingChar2 = $state(false);
    let isChoosingHand = $state(false);

    //funzione per mostrare il nome corretto
    function displayName(customName:string, originalName:string){
        if(customName.length <= 1)return originalName;
        else return customName;
    }

    //devo capire come aggiornarlo per tutte le mie variabili
    let displayWeaponName = $derived.by(() => {
        return displayName(customWeaponName,selectedWeapon.name);
    })

    let displayQuality = $derived.by( ()=> {
       return displayName(customQuality,selectedQuality.effect);
       //return customQuality;
    })
    
    // $inspect(DAMAGE_TYPES[8].name);
    // $inspect(BASE_QUALITIES);
</script>

<GeneratorBox nameTag="Arma" >
    <!-- Container che definisce le righe della  -->
    <div class="flex flex-col gap-5 justify-evenly items-center p-4">
        
        <!-- Nome Arma  -->
        <div class="flex gap-4 w-full justify-center items-center">
            <!-- scelta classe Arma -->
            <span class="border rounded flex-1 max-w-xsd">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>
            <input type="checkbox" class="flex-shrink-0">
            <input placeholder="Nome" bind:value= {customWeaponName} class="border rounded">
        </div>

        <!-- Attributi e Tipi di danno -->
        <div class="flex flex-row gap-5 justify-center items-center w-full">
            <!-- Tipo di danno -->
            <span class="border rounded flex-1 max-w-32">
                <ModalSelector itemName = {selectedDamageType.name} itemList = {DAMAGE_TYPES} bind:selectedItem = {selectedDamageType} bind:isOpen = {isChoosingDamageType}/>
            </span>
            
            <!-- Numero di Mani -->
            <span class="border rounded flex-1 max-w-32">
                <ModalSelector itemName = {selectedHand.name} itemList = {hands} bind:selectedItem = {selectedHand} bind:isOpen = {isChoosingHand}/>
            </span>
            
            <!-- Attributo Precisione 1 -->
            <span class="border rounded flex-1 max-w-32">
                <ModalSelector itemName = {selectedChar1.name} itemList = {char} bind:selectedItem = {selectedChar1} bind:isOpen = {isChoosingChar1}/>
            </span>

            <!-- Attributo Precisione 2 -->
            <span class="border rounded flex-1 max-w-32">
                <ModalSelector itemName = {selectedChar2.name} itemList = {char} bind:selectedItem = {selectedChar2} bind:isOpen = {isChoosingChar2}/>
            </span>

        </div>

        <!-- Qualità Standard -->
        <div class="flex flex-row gap-5 items-center justify-center w-full">

            <!-- scelta qualità standard-->
            <div class="border rounded flex-1 max-w-48">
                <ModalSelector itemName = {selectedQuality.name} itemList = {BASE_QUALITIES} bind:selectedItem = {selectedQuality} bind:isOpen = {isChoosingQual}/>
            </div>
            
            <div class="flex flex-col gap-2 flex-1 max-w-48">
                <span class="flex items-center gap-2">
                    <input type="checkbox">
                    +1 Precisione
                </span>

                <span class="flex items-center gap-2">
                    <input type="checkbox" >
                    +4 Danno
                </span>
            </div>
        </div>

        <!-- Qualità Custom -->
        <div class="flex items-center gap-50  justify-start w-full">
            <!-- <input placeholder="Quality Custom" class="border rounded flex-1 max-w-xs" bind:value={customQuality}> -->
            <textarea class="border rounded" bind:value={customQuality}>
                {displayQuality}
            </textarea>
            <input placeholder="Custom Cost" class="border rounded w-20 flex-shrink-0" bind:value={qualityCost} >
        </div>
        
      <hr class="w-full">        

        <!-- pulsanti per resettare i campi -->
        <div class="flex gap-4 justify-center">
            <RunesButton text="carica json" clickFun={()=> console.log("premuto")}/>
            <RunesButton text="Pulisci Campi" clickFun={()=> console.log("premuto")}/>
        </div>

    </div>

    {#snippet imageProcessor()}    
        <div  id={displayWeaponName} class="bg-white">
            <div class="bg-cafe_noir-700 grid grid-cols-5">
                <p class="col-span-2">
                    {displayWeaponName}
                </p>
                <span class="grid grid-cols-2  col-span-2 gap-30">
                    <p>PRECISIONE</p>
                    <p>DANNO</p>
                </span>
            </div>
            <div class=" grid grid-cols-3 gap-4">
                <div class="col-span-1">
                    <ImageUploader2 dimensions={"w-40 h-30"} fill={true}/>
                </div>
                <div class="col-span-2">
                    <div class="justify-around bg-cafe_noir-800 flex">
                        <p>
                            {accuracyFormula(selectedChar1.name,selectedChar2.name)}
                        </p>
                        <p>
                            {damageFormula(damageModifier)}
                        </p>
                    </div>
                    <hr>
                    <div class="flex flex-row items-center justify-between px-2 ">
                        <p>{selectedWeapon.category}</p>
                        <p>*</p>
                        <p>{selectedHand.name}</p>
                        <p>* </p>
                        <p>{selectedWeapon.distance}</p>
                    </div>
                    <hr>
                    <div>
                        {displayQuality}
                    </div>
                </div>
            </div>
        </div>
        <RunesButton text="pino" clickFun={()=> exportHtmlToImage(displayWeaponName)}/>
    {/snippet}
    
</GeneratorBox>

