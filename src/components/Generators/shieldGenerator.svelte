<script lang="ts">
    import { BASE_QUALITIES, type Item } from "$lib/types";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "./generatorBox.svelte";
    import { EquipList } from "$lib/equipment";
    import { displayName } from "$lib/utility";

    let imageUrl = $state(null);
    let customEquipName = $state("");
    let customQuality = $state("");
    let selectedEquip = $state(EquipList[0]);
    let selectedQuality = $state(BASE_QUALITIES[0]);

    let isChoosingEquip = $state(false);
    let isChoosingQual = $state(false);
 
    let displayEquipName = $derived(displayName(customEquipName,selectedEquip.name)) 
    let displayQuality = $derived(displayName(customQuality,selectedQuality.effect))

    //imageProcessor
    let tableHeader = ["DIFESA", "DIF.MAGICA"];
    let dataRow = $derived([selectedEquip.def,selectedEquip.mdef])




     //funzione per gestire il caricamento di un file weaponJson da parte dell'utente
    // async function handleFileSelect(event:Event){

    //     const target = event.target as HTMLInputElement;
    //     //recupero il file fornito dall'utente
    //     let selectedFile = target.files?.[0] || null;
        
    //     if(selectedFile == null)return new Error("il file non è valido!");
        
    //     // Controlla il tipo di file (opzionale ma buona pratica)
    //     if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json')) {
    //         target.value = "";
    //         errore = true;
    //         return;
    //     }
    //     //processo il file json
    //     const jsonImport = await processSelectedJsonFile(selectedFile);
        
    //     //controllo il tipo
    //     let result = WeaponScheme.safeParse(jsonImport);
        
    //     if(result.error){
    //         errore = true;
    //         target.value = "";
    //         console.log("errore");
    //     }
        
    //     //craftedWeapon = jsonImport as Weapon;
    //     console.log(jsonImport,"import");

    //     //modifico i campi di crafted weapon per farla cambiare reattivamente
    //     selectedWeapon = jsonImport as Weapon;
        
    //     [selectedChar1.name,selectedChar2.name] = retrieveAccuracy(jsonImport.accuracy);
        
    //     selectedHand.name = jsonImport.hands;
    //     selectedQuality.effect = jsonImport.quality;
        
    //     isMoreAccuracyChecked = checkAccuracyBonus(jsonImport.accuracy,parseInt(accuracyMod));
        
    //     imageUrl = jsonImport.pic;
    //     target.value = "";
    //     selectedFile = null;
    // }
    function handleFileSelect(){

    }

    function handleClearAll(){

    }

    function handleExport(){
        
    }
    //funzione per pulire tutti i campi del json -> IMPLEMENTARE
    // function handleClearAll(){
    //     selectedHand = hands[0];
    //     selectedWeapon = baseWeapons[0];
    //     selectedQuality = BASE_QUALITIES[0];
    //     selectedChar1.name = retrieveAccuracy(baseWeapons[0].accuracy)[0];
    //     selectedChar2.name = retrieveAccuracy(baseWeapons[0].accuracy)[1];
    //     imageUrl = null;
    //     isMoreAccuracyChecked = false;
    //     isMoreDamageChecked = false;
    //     oldWeapon = baseWeapons[0];

    // }

    // //funzione per esportare il weaponJson creato dall'utente
    // async function handleExport(){
    //     console.log(craftedWeapon.pic,"prima dell'export");
    //     const jsonExport = await weaponToJson(craftedWeapon);
    //     downloadFile(jsonExport,`${craftedWeapon.name.replace(/\s+/g, '') || 'arma'}.json`,'application/json')
    // }
   
</script>


<GeneratorBox nameTag={"Scudo"}>
    <!-- container principale -->
    <div class="flex flex-col gap-5 p-4">
        <!-- Prima Riga: Nome equipaggiamento e selezione Qualità standard -->
        <div class="flex gap-4 w-full justify-between items-center">
            <span class="border rounded flex-1">
                <ModalSelector itemList = {EquipList} itemName = {selectedEquip.name} bind:selectedItem = {selectedEquip} bind:isOpen = {isChoosingEquip}/>
            </span>
            <span class="border rounded flex-1">
                <ModalSelector itemName={selectedQuality.name} itemList={BASE_QUALITIES} bind:selectedItem={selectedQuality} bind:isOpen={isChoosingQual}/>
            </span>
            <span class="flex items-center gap-2">
                <input type="checkbox" class="flex-shrink-0">
                <input placeholder="Nome" bind:value={customEquipName} class="border rounded">
            </span>
        </div>

        <!-- Seconda Riga: Qualità -->
        <div class="flex items-center gap-4 justify-between w-full">
            <textarea bind:value={customQuality} class="border rounded w-auto flex-shrink-0" placeholder="Descrizione qualità custom..."></textarea>
        </div>

        <!-- Footer -->
         <hr class="w-full border-cafe_noir-600">


        <div class="flex gap-4 justify-center w-full h-8 text-white">
            <label class="bg-cafe_noir-600 rounded p-2 cursor-pointer">
                <input id="jsonFileSelector" type="file" class="hidden" onchange={handleFileSelect}/>
                Carica Json
            </label>
            <RunesButton text="Pulisci Campi" color="bg-cafe_noir-600" clickFun={handleClearAll}/>
            <RunesButton text="Scarica Json" color="bg-cafe_noir-600" clickFun={handleExport}/>
        </div>
    </div>
  <!-- Contenuto passato allo snippet 'imageProcessor' -->  
    {#snippet imageProcessor()}    
        <div  id={"pino"} class="bg-white">
            <div class="bg-cafe_noir-700 grid grid-cols-5">
                <p class="col-span-2">
                    {displayEquipName}
                </p>
                <span class="grid grid-cols-2  col-span-2 gap-30">
                    {#each tableHeader as header}
                        <p> {header} </p>
                    {/each}
                </span>
            </div>
            <div class=" grid grid-cols-5 gap-4">
                <div class="col-span-1">
                    <ImageUploader2 dimensions={"w-40 h-30"} fill={true} bind:imageUrl = {imageUrl}/>
                </div>
                <div class="col-span-4">
                    <div class="justify-around bg-cafe_noir-800 flex">
                        {#each dataRow as data}
                            <p> {data} </p>
                        {/each}
                    </div>
                    <hr>
                    <div>
                        {displayQuality}
                    </div>
                </div>
            </div>
        </div>
        <RunesButton text="scarica Json" clickFun={()=> exportHtmlToImage(displayEquipName)}/>
    {/snippet}
</GeneratorBox>