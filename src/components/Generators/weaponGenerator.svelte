<script lang="ts">
    //import da file ts
    import { baseWeapons, weaponToJson, type Weapon} from "$lib/weaponUtility";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import { DAMAGE_TYPES, type Item } from "$lib/types";
    import { accuracyFormula, checkAccuracyBonus, damageFormula, retrieveAccuracy } from "$lib/combatUtility";
    import { BASE_QUALITIES } from "$lib/types";
    import { downloadFile, processSelectedJsonFile } from "$lib/utility";
    import { WeaponScheme } from "$lib/zodTypeChecking";
    //import di componenti
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import GeneratorBox from "./generatorBox.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import Modal from "../customHTMLElements/modal.svelte";

    //checkbox
    let isMoreDamageChecked = $state(false);
    let isMoreAccuracyChecked = $state(false);
    //imagSource
    let weaponImageUrl = $state(null);

    //questo deve diventare un import
    let char:Item[] = [{name:"DES"},{name:"VIG"},{name:"INT"},{name:"VOL"}];
    let hands:Item[] = [{name:"Una mano"},{name:"Due mani"}]
    let additionalDamage = 4;
    let accuracyMod = "1";
    let additionalAccuracy = $derived.by(()=>{
        if(isMoreAccuracyChecked)return accuracyMod;
        else return undefined;
    })
    //reattività per selezione
    //armi 
    let selectedWeapon = $state(baseWeapons[0]);
    //inizializzata a null per caricare la prima arma correttamente
    let oldWeapon:any = $state(null);

    let customWeaponName = $state("");
    
    //qualità base
    let selectedQuality = $state(BASE_QUALITIES[0]);
    
    //qualità custom    
    let customQuality = $state("");
    let qualityCost = $state(0);
    
    //caratteristiche
    let selectedChar1 = $state(char[0]);
    let selectedChar2 = $state(char[0]);
    
    
    //tipo di danno
    let selectedDamageType = $state(DAMAGE_TYPES[8]);
    let damageModifier = $derived.by( ()=>{
        if(isMoreDamageChecked)return selectedWeapon.damage + additionalDamage;
        else return selectedWeapon.damage;
    }
    );

    //Numero di Mani
    let selectedHand = $state(hands[0]);

    //variabili per apertura modali    
    let isChoosingWeapon = $state(false);
    let isChoosingQual = $state(false);
    let isChoosingDamageType = $state(false);
    let isChoosingChar1 = $state(false);
    let isChoosingChar2 = $state(false);
    let isChoosingHand = $state(false);
    let errore = $state(false);
    let isMartial = $state(false);

    //funzione per mostrare il dato corretto
    function displayName(customName:string, originalName:string){
        if(customName.length <= 1)return originalName;
        else return customName;
    }

    //mostro il nome custom se presente
    let displayWeaponName = $derived.by(() => {
        return displayName(customWeaponName,selectedWeapon.name);
    })

    //mostro la qualità custom presente
    let displayQuality = $derived.by( ()=> {
       return displayName(customQuality,selectedQuality.effect);
    })

    //effect è purtroppo necessario in quanto devo aggiornare i dati in conseguenza alla selezione dell'arma
    $effect( ()=>{
        //controllo che non sia stata selezionata due volte la stessa arma e che non sia la prima inizializzazione
        if(selectedWeapon === oldWeapon || oldWeapon === baseWeapons[0])return;
        selectedHand.name = selectedWeapon.hands;
        //console.log("sono dentro");  
        [selectedChar1.name,selectedChar2.name] = retrieveAccuracy(selectedWeapon.accuracy);
        oldWeapon = selectedWeapon;
    })

   
    //funzione per gestire il caricamento di un file weaponJson da parte dell'utente
    async function handleFileSelect(event:Event){

        const target = event.target as HTMLInputElement;
        //recupero il file fornito dall'utente
        let selectedFile = target.files?.[0] || null;
        
        if(selectedFile == null)return new Error("il file non è valido!");
        
        // Controlla il tipo di file (opzionale ma buona pratica)
        if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json')) {
            target.value = "";
            errore = true;
            return;
        }
        //processo il file json
        const jsonImport = await processSelectedJsonFile(selectedFile);
        
        //controllo il tipo
        let result = WeaponScheme.safeParse(jsonImport);
        
        if(result.error){
            errore = true;
            target.value = "";
            console.log("errore");
        }
        
        //craftedWeapon = jsonImport as Weapon;
        console.log(jsonImport,"import");

        //modifico i campi di crafted weapon per farla cambiare reattivamente
        selectedWeapon = jsonImport as Weapon;
        
        [selectedChar1.name,selectedChar2.name] = retrieveAccuracy(jsonImport.accuracy);
        
        selectedHand.name = jsonImport.hands;
        selectedQuality.effect = jsonImport.quality;
        
        isMoreAccuracyChecked = checkAccuracyBonus(jsonImport.accuracy,parseInt(accuracyMod));
        
        weaponImageUrl = jsonImport.pic;
        target.value = "";
        selectedFile = null;
    }

    //funzione per pulire tutti i campi del json -> IMPLEMENTARE
    function handleClearAll(){
        selectedHand = hands[0];
        selectedWeapon = baseWeapons[0];
        selectedQuality = BASE_QUALITIES[0];
        selectedChar1.name = retrieveAccuracy(baseWeapons[0].accuracy)[0];
        selectedChar2.name = retrieveAccuracy(baseWeapons[0].accuracy)[1];
        weaponImageUrl = null;
        isMoreAccuracyChecked = false;
        isMoreDamageChecked = false;
        oldWeapon = baseWeapons[0];

    }

    //funzione per esportare il weaponJson creato dall'utente
    async function handleExport(){
        console.log(craftedWeapon.pic,"prima dell'export");
        const jsonExport = await weaponToJson(craftedWeapon);
        downloadFile(jsonExport,`${craftedWeapon.name.replace(/\s+/g, '') || 'arma'}.json`,'application/json')
    }

    //arma craftata
    let craftedWeapon:Weapon = $derived.by( ()=> {
        return {
            name:displayWeaponName,
            cost:selectedWeapon.cost,
            accuracy:accuracyFormula(selectedChar1.name,selectedChar2.name,additionalAccuracy),
            damage: damageModifier,
            type: selectedWeapon.type,
            category: selectedWeapon.category,
            quality: displayQuality,
            distance: selectedWeapon.distance,
            hands: selectedHand.name,
            pic:  weaponImageUrl === null ? "" : weaponImageUrl
        }
    });
    
    let thirdRowElement = $derived([selectedWeapon.category,"*",craftedWeapon.hands,"*",selectedWeapon.distance]);
    let formulaRow = $derived([accuracyFormula(selectedChar1.name,selectedChar2.name,additionalAccuracy),damageFormula(damageModifier,selectedDamageType.name)]);
    let tableHeader = ["PRECISIONE","DANNO"];
    

</script>

<GeneratorBox nameTag="Arma">
    
    <!-- Contenuto passato allo slot 'children' del GeneratorBox -->
    <!-- Ho rimosso 'justify-evenly' e 'items-center' per un allineamento più standard -->
    <div class="flex flex-col gap-5 p-4">
        <!-- Riga 1: Nome Arma -->         <!-- Sostituito 'justify-center' con 'justify-between' per distribuire gli elementi. -->
        <div class="flex gap-4 w-full justify-between items-center">
            <span class="border rounded flex-1 max-w-xsd">
                <ModalSelector itemName={selectedWeapon.name} itemList={baseWeapons} bind:selectedItem={selectedWeapon} bind:isOpen={isChoosingWeapon}/>
            </span>
            <div class="flex items-center gap-2">
                <input type="checkbox" class="flex-shrink-0" bind:checked={isMartial}>
                <input placeholder="Nome" bind:value={customWeaponName} class="border rounded">
            </div>
        </div>

        <!-- Riga 2: Attributi e Tipi di danno --> <!-- 'justify-between' distribuirà i 4 selettori in modo uniforme su tutta la larghezza. -->
        <div class="flex flex-row gap-5 justify-between items-center w-full">
            <span class="border rounded flex-1 max-w-32">

                <ModalSelector itemName={selectedDamageType.name} itemList={DAMAGE_TYPES} bind:selectedItem={selectedDamageType} bind:isOpen={isChoosingDamageType}/>
            </span>
            <span class="border rounded flex-1 max-w-32">
                <ModalSelector itemName={selectedHand.name} itemList={hands} bind:selectedItem={selectedHand} bind:isOpen={isChoosingHand}/>
            </span>
            <span class="border rounded flex-1 max-w-32">
                <ModalSelector itemName={selectedChar1.name} itemList={char} bind:selectedItem={selectedChar1} bind:isOpen={isChoosingChar1}/>
            </span>
            <span class="border rounded flex-1 max-w-32">
                <ModalSelector itemName={selectedChar2.name} itemList={char} bind:selectedItem={selectedChar2} bind:isOpen={isChoosingChar2}/>
            </span>
        </div>

        <!-- Riga 3: Qualità Standard --> <!-- 'justify-between' spingerà il selettore a sinistra e il gruppo di checkbox a destra. -->
        
        <div class="flex flex-row gap-5 items-center justify-between w-full">
            <div class="border rounded flex-1 max-w-48">
                <ModalSelector itemName={selectedQuality.name} itemList={BASE_QUALITIES} bind:selectedItem={selectedQuality} bind:isOpen={isChoosingQual}/>
            </div>
            <div class="flex flex-col gap-2 flex-1 max-w-48 items-start">
                <span class="flex items-center gap-2">
                    <input type="checkbox" bind:checked={isMoreAccuracyChecked}>
                    +1 Precisione
                </span>
                <span class="flex items-center gap-2">
                    <input type="checkbox" bind:checked={isMoreDamageChecked}>
                    +4 Danno
                </span>
            </div>
        </div>

        <!-- Riga 4: Qualità Custom --> <!-- 'justify-between' e 'flex-1' sulla textarea per l'allineamento desiderato. -->
        
        <div class="flex items-center gap-4 justify-between w-full">
            <textarea class="border rounded flex-1" bind:value={customQuality} placeholder="Descrizione qualità custom...">{displayQuality}</textarea>
            <input placeholder="Custom Cost" class="border rounded w-20 flex-shrink-0" bind:value={qualityCost}>
        </div>
        
        <hr class="w-full border-cafe_noir-600">


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
        <div  id={displayWeaponName} class="bg-white">
            <div class="bg-cafe_noir-700 grid grid-cols-5">
                <p class="col-span-2">
                    {displayWeaponName}
                </p>
                <span class="grid grid-cols-2  col-span-2 gap-30">
                    {#each tableHeader as header}
                        <p> {header} </p>
                    {/each}
                </span>
            </div>
            <div class=" grid grid-cols-3 gap-4">
                <div class="col-span-1">
                    <ImageUploader2 padre="weaponGenerator" dimensions={"w-40 h-30"} fill={true} bind:imageUrl = {weaponImageUrl}/>
                </div>
                <div class="col-span-2">
                    <div class="justify-around bg-cafe_noir-800 flex">
                        {#each formulaRow as formula}
                            <p> {formula} </p>
                        {/each}
                    </div>
                    <hr>
                    <div class="flex flex-row items-center justify-between px-2 ">
                        {#each thirdRowElement as element }
                            <p> {element} </p>
                        {/each}
                    </div>
                    <hr>
                    <div>
                        {displayQuality}
                    </div>
                </div>
            </div>
        </div>
        <RunesButton text="scarica Json" clickFun={()=> exportHtmlToImage(displayWeaponName)}/>
        <RunesButton text="Scarica Json" color="bg-cafe_noir-600" clickFun={handleExport}/>
    {/snippet}  
    
    <Modal showModal={errore} modalText={"errore"} divStyle={"flex flex-col gap-4"}>
        <div>
            <h1 class="text-red-400 text-2xl">
                È stato selezionato un formato di file non supportato, sono accettati solo file in formato Json
            </h1>
            <h2>
                premi sulla pagina per chiudere questa finestra
            </h2>
        </div>
        
    </Modal>
</GeneratorBox> 

