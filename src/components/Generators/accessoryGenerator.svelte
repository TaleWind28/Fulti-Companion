<script lang="ts">
    import { BASE_QUALITIES, QUALITIES_CONFIG } from "$lib/types";
    import { displayName, downloadFile, processSelectedJsonFile } from "$lib/utility";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import { effect } from "zod";
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "./generatorBox.svelte";
    import { accessoryToJson } from "$lib/equipment";
    import { AccessoryScheme } from "$lib/zodTypeChecking";

    //qualità selezionata
    let selectedQuality = $state(BASE_QUALITIES[0]);
    
    //campi custom personalizzabili dall'utente
    let customName = $state("");
    let customCost = $state(0);
    let customQuality = $state("");
    let accessoryImageUrl = $state(null);
    
    //Dati da mostrare a schermo
    let displayQuality = $derived( displayName(customQuality,selectedQuality.effect));
    let displayAccessoryName = $derived(displayName(customName,"Accessorio"));
    let displayCost = $derived(selectedQuality.price + customCost);

    //qualità craftata
    let craftedQuality = $derived.by(()=>{
        return {
            name:selectedQuality.name,
            effect:displayQuality,
            price:selectedQuality.price
        }
    })

    //accessorio craftato
    let craftedAccessory = $derived.by(()=>{
        return {
            name:displayAccessoryName,
            quality: craftedQuality,
            price: displayCost
        }
    });

    $inspect(selectedQuality.price);

    //funzioni pulsanti

    async function handleFileSelect(event:Event){
         const target = event.target as HTMLInputElement;
        //recupero il file fornito dall'utente
        let selectedFile = target.files?.[0] || null;
        
        if(selectedFile == null)return new Error("il file non è valido!");
        
        // Controlla il tipo di file (opzionale ma buona pratica)
        if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json')) {
            target.value = "";
            return;
        }
        //processo il file json
        const jsonImport = await processSelectedJsonFile(selectedFile);

        console.log("provo a parsare");

        //configurare Zod type checking
        let result = AccessoryScheme.safeParse(jsonImport);
        if(result.error){
            //aggiungere modale di errore
            //errore = true;
            target.value = "";
            console.log("file Json non parsato correttamente",jsonImport);
            return;
        }

        //resetto i campi dell'equipaggiamento
        handleClearAll();

        //carico i campi dell'oggetto nei campi reattivi dell'oggetto che 
        customName = jsonImport.name;
        selectedQuality = jsonImport.quality;
        customCost = jsonImport.price;
        accessoryImageUrl= jsonImport.pic;
        
        selectedFile = null;
    }

    function handleClearAll(){
        customName = "";
        customCost = 0;
        customQuality = "";
        accessoryImageUrl = null;
        selectedQuality = BASE_QUALITIES[0];
    }

    async function handleExport(){
        console.log("esporto: "+ craftedAccessory);
        const jsonExport = await accessoryToJson(craftedAccessory);
        downloadFile(jsonExport,`${craftedAccessory.name.replace(/\s+/g,'') || 'accessorio'}.json`,'application.json');
    }

    //imageProcessor
    let tableHeader = ["Costo"];
    let dataRow = $derived([craftedAccessory.price+"z"]);
</script>

<GeneratorBox nameTag={"Accessorio"}>
    <!-- container principale -->
    <div class="flex flex-col gap-5 p-4">
        <!-- Prima Riga: Nome e Quaità base -->
        <div class="flex items-center gap-4">
            <span class="border rounded">
                <input placeholder="Nome accessorio" bind:value={customName}/>
            </span>
            <span class="border rounded">
                <ModalSelector itemName={selectedQuality.name} itemList={BASE_QUALITIES}  bind:selectedItem = {selectedQuality}/>
            </span>
        </div>

        <!-- Seconda Riga: Qualità Custom e Costo -->
        <div class="flex items-center justify-between gap-4">
            <textarea class="border" placeholder="Qualità Custom" bind:value={displayQuality}></textarea>
            <input  class="border rounded w-10" type="number" placeholder="costo" bind:value={customCost}>            
        </div>

        <!-- Footer -->
        <hr class="w-full border-cafe_noir-600">

        <!-- Terza Riga: Pulsanti -->
        <div class="flex gap-4 justify-center w-full h-8 text-white">
            <label class="bg-cafe_noir-600 rounded p-2 cursor-pointer">
                <input id="jsonFileSelector" type="file" class="hidden" onchange={handleFileSelect}/>
                Carica Json
            </label>
            <RunesButton text="Pulisci Campi" color="bg-cafe_noir-600" clickFun={handleClearAll}/>
            
        </div>
    </div>
    
  <!-- Contenuto passato allo snippet 'imageProcessor' -->  
    {#snippet imageProcessor()}    
        <div  id={displayAccessoryName} class="bg-white">
            <div class="bg-cafe_noir-700 grid grid-cols-5">
                <p class="col-span-4">
                    {displayAccessoryName}
                </p>
                <span class="grid grid-cols-1  col-span-1  gap-30">
                    {#each tableHeader as header}
                        <p> {header} </p>
                    {/each}
                </span>
            </div>
            <div class=" flex gap-4">
                <div class="flex-shrink-0">
                    <ImageUploader2 padre="accessoryGenerator" dimensions={"w-20 h-20"} fill={true} bind:imageUrl = {accessoryImageUrl}/>
                </div>
                <div class="flex-1">
                    <div class="items-center justify-end px-10  bg-cafe_noir-800 flex">
                        {#each dataRow as data}
                            <p> {data} </p>
                        {/each}
                    </div>
                    <hr>
                    <div>
                        {craftedAccessory.quality.effect}
                    </div>
                </div>
            </div>
        </div>
        <RunesButton text="scarica Json" clickFun={()=> exportHtmlToImage(displayAccessoryName)}/>
        <RunesButton text="Scarica Json" color="bg-cafe_noir-600" clickFun={handleExport}/>
    {/snippet}
</GeneratorBox>