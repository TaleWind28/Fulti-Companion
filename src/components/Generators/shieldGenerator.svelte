<script lang="ts">
    import { BASE_QUALITIES} from "$lib/types";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "./generatorBox.svelte";
    import { EquipList, equipToJson } from "$lib/equipment";
    import { displayName, downloadFile, processSelectedJsonFile } from "$lib/utility";
    import { EquipScheme } from "$lib/zodTypeChecking";
    import { faDownload, faFileExport } from "@fortawesome/free-solid-svg-icons";

    //variabili reattive per la creazione dell'equipaggiamento
    let equipImageUrl = $state(null);
    let customEquipName = $state("");
    let customQuality = $state("");
    let selectedEquip = $state(EquipList[0]);
    let selectedQuality = $state(BASE_QUALITIES[0]);
    let customQualityCost = $state(0);
    
    //variabili per i modalSelector
    let isChoosingEquip = $state(false);
    let isChoosingQual = $state(false);

    //variabili per scegliere cosa mostrare all'utente
    let displayEquipName = $derived(displayName(customEquipName,selectedEquip.name)) 
    let displayQuality = $derived(displayName(customQuality,selectedQuality.effect))
        
    //imageProcessor
    let tableHeader = ["DIFESA", "DIF.MAGICA","COSTO"];
    let dataRow = $derived([selectedEquip.def,selectedEquip.mdef,selectedQuality.price+customQualityCost+"z"])

    //Creo la qualità da passare all'equip
    let craftedQuality = $derived.by(()=>{
        return {
            name: selectedEquip.quality.name,
            effect: displayQuality,
            cost:0
        }
    })
    
    //Creo l'oggetto Equip che poi potrà essere scaricato
    let craftedEquip = $derived.by(()=>{
        return {
                name:displayEquipName,
                def:selectedEquip.def,
                mdef:selectedEquip.mdef,
                quality: craftedQuality,
                martial:selectedEquip.martial,
                data:selectedEquip.data,
                pic:equipImageUrl,
            }
        }
    )

    //processo il file dato in input dall'utente
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
        let result = EquipScheme.safeParse(jsonImport);
        if(result.error){
            //aggiungere modale di errore
            //errore = true;
            target.value = "";
            console.log("file Json non parsato correttamente");
            return;
        }

        //resetto i campi dell'equipaggiamento
        handleClearAll();
        //carico i campi dell'oggetto nei campi reattivi dell'oggetto che 
        selectedEquip = jsonImport;
        selectedQuality = jsonImport.quality;
        equipImageUrl = jsonImport.pic;
        
        selectedFile = null;

    }

    //resetto i campi dell'oggetto
    function handleClearAll(){
        selectedEquip = EquipList[0];
        selectedQuality = BASE_QUALITIES[0];
        customQuality = "";
        customEquipName = "";
        equipImageUrl = null;
        customQualityCost = 0;
    }

    //esporto l'equipaggiamento craftato
    async function handleExport(){
        console.log("esporto");
        const jsonExport = await equipToJson(craftedEquip);
        downloadFile(jsonExport,`${craftedEquip.name.replace(/\s+/g, '') || 'equipaggiamento'}.json`,'application/json');
    }
   

    let {onCreation = undefined} = $props();
    // Aggiungi questa nuova funzione per ssalvare l'arma nell'array
    function handleSaveWeapon() {
        if (onCreation) {
            onCreation(craftedEquip);
        }
    }
</script>


<GeneratorBox nameTag={"Scudo"} border="border">
    <!-- container principale -->
    <div class="flex flex-col gap-5 p-4">
        <!-- Prima Riga: Nome equipaggiamento e selezione Qualità standard -->
        <div class="flex gap-4 w-full justify-between items-center">
            <span class="border rounded flex-1">
                <ModalSelector itemList = {EquipList} itemName = {selectedEquip.name} bind:selectedItem = {selectedEquip} bind:isOpen = {isChoosingEquip} maxVisibleItems={3}/>
            </span>
            
            <span class="flex items-center gap-2">
                <input placeholder="Nome" bind:value={customEquipName} class="border rounded">
            </span>
        </div>

        <!-- Seconda Riga: Qualità -->
        <div class="flex items-center gap-4 justify-between w-full">
            
            <textarea bind:value={customQuality} class="border rounded w-auto flex-shrink-0" placeholder="Descrizione qualità custom..."></textarea>
            <span class="border rounded">
                <ModalSelector dimensions="w-35" itemName={selectedQuality.name} itemList={BASE_QUALITIES} bind:selectedItem={selectedQuality} bind:isOpen={isChoosingQual} maxVisibleItems={3}/>
            </span>
            <input type="number" bind:value={customQualityCost} class="border rounded w-20 justify-center items-center">
        </div>

        <!-- Footer -->
        <hr class="w-full border-cafe_noir-600">


        <div class="flex gap-4 justify-center w-full h-8 text-white">
            <label class="bg-cafe_noir-600 rounded p-2 cursor-pointer items-center flex">
                <input id="jsonFileSelector" type="file" class="hidden" onchange={handleFileSelect}/>
                Carica Json
            </label>
            <RunesButton text="Pulisci Campi" color="bg-cafe_noir-600" clickFun={handleClearAll}/>
            {#if onCreation}
                <RunesButton text="Salva Modifiche" clickFun={handleSaveWeapon} color="bg-cafe_noir-600" dimensions="w-30"/>
            {/if}
        </div>
    </div>

  <!-- Contenuto passato allo snippet 'imageProcessor' -->  
    {#snippet imageProcessor()}    
        <div  id={displayEquipName} class="bg-white border">
            <div class="bg-cafe_noir-700 grid grid-cols-6">
                <p class="col-span-2 px-2">
                    {craftedEquip.name}
                </p>
                <span class="flex col-span-4 justify-between px-1">
                    {#each tableHeader as header}
                        <p> {header} </p>
                    {/each}
                </span>
            </div>
            <div class="flex">
                <div class="flex-shrink-0">
                    <ImageUploader2 padre="shieldGenerator" dimensions={"w-35 h-20 border-r"} fill={true} bind:imageUrl = {equipImageUrl}/>
                </div>
                <div class="flex-1">
                    <div class="justify-between bg-cafe_noir-800 flex px-8">
                        {#each dataRow as data}
                            <p> {data} </p>
                        {/each}
                    </div>
                    <hr>
                    <div class="px-2">
                        {displayQuality}
                    </div>
                </div>
            </div>
        </div>
        <RunesButton text="" icon={faDownload} style="cursor-pointer px-2" additionalStyle="w-auto" color= "" clickFun={()=>exportHtmlToImage(displayEquipName)}/>
        <RunesButton text="" icon={faFileExport} style="cursor-pointer px-2" additionalStyle="w-auto" color= "" clickFun={handleExport}/>
    {/snippet}
</GeneratorBox>