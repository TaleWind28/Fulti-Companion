<script lang="ts">
    import { arcanumToJson } from "$lib/arcanum";
    import { displayName, downloadFile, processSelectedJsonFile } from "$lib/utility";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import { ArcanumScheme } from "$lib/zodTypeChecking";
    import { faDownload, faFileExport } from "@fortawesome/free-solid-svg-icons";
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "./generatorBox.svelte";

    let customArcanumName = $state("");

    let isRework = $state(false);
    let customFusionName = $state("");
    let customFusionBenefit = $state("");
    let customImpulseName = $state("");
    let customImpulseBenefit = $state("");
    let customDischargeName = $state("");
    let customDischargeBenefit = $state("");
    let customArcanumDomain = $state("");
    let customArcanumDescription = $state("");

    let displayFusionBenefit = $derived(displayName(customFusionBenefit,"Nessun Beneficio di Fusione"));
    let displayImpulseBenefit = $derived(displayName(customImpulseBenefit,"Nessun Effetto di Impulso"));
    let displayDischargeBenefit = $derived(displayName(customDischargeBenefit,"Nessun Beneficio di Congedo"));
    let displayArcanumName = $derived(displayName(customArcanumName,"Arcanum"));
    let displayArcanumDomain = $derived(displayName(customArcanumDomain,"Nessun Dominio"));
    let displayArcanumDescription = $derived(displayName(customArcanumDescription,"Nessuna Descrizione"));
    let arcanumImageUrl = $state(undefined);

    let craftedArcanum = $derived.by(()=>{ 
        return{
            name:displayArcanumName,
            domain:displayArcanumDomain,
            description:displayArcanumDescription,
            fusion:{
                name: customFusionName,
                effect: displayFusionBenefit
            },
            impulse:{
                name: customImpulseName,
                effect: customImpulseBenefit
            },
            discharge:{
                name: customDischargeName,
                effect: customDischargeBenefit
            },
            reworked:isRework,
            pic:arcanumImageUrl
        }   
    })

    //imageProcessor
    

    //gestisco la selezione dei file
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

        let result = ArcanumScheme.safeParse(jsonImport);
        if(result.error){
            //aggiungere modale di errore
            //errore = true;
            target.value = "";
            console.log("file Json non parsato correttamente");
            return;
        }

        //resetto i campi dell'equipaggiamento
        handleClearAll();

        //carico i campi dell'oggetto nei campi reattivi dell'oggetto che intendo craftare
        customArcanumName = jsonImport.name;
        customArcanumDomain = jsonImport.domain;
        customArcanumDescription = jsonImport.description;
        customFusionName = jsonImport.fusion.name;
        customFusionBenefit = jsonImport.fusion.effect;
        customImpulseName = jsonImport.impulse.name;
        customImpulseBenefit = jsonImport.impulse.effect;
        customDischargeName = jsonImport.discharge.name;
        customDischargeBenefit = jsonImport.discharge.effect;
        isRework = jsonImport.reworked;
        arcanumImageUrl = jsonImport.pic;

        selectedFile = null;
    }

    //resetto i campi reattivi dell'oggetto
    function handleClearAll(){
        customArcanumName = "";
        customFusionName = "";
        customFusionBenefit = "";
        customImpulseName = "";
        customImpulseBenefit = "";
        customDischargeName = "";
        customDischargeBenefit = "";
        customArcanumDomain = "";
        customArcanumDescription = "";
        arcanumImageUrl = undefined;
        isRework = false;
    }

    //esporto in json
    async function handleExport(){
        const jsonExport = await arcanumToJson(craftedArcanum);
        downloadFile(jsonExport,`${craftedArcanum.name.replace(/\s+/g, '') || 'arcanum'}.json`,'application/json')
        
    }

</script>

<GeneratorBox nameTag="Arcanum">
    <div class="flex flex-col gap-5 p-4">
        <span class="flex justify-between">
            <input placeholder="Nome" class="border rounded w-50" bind:value={customArcanumName}>
            <input placeholder="Dominio" class="border rounded w-40" bind:value={customArcanumDomain}>
        </span>
        
        <input placeholder="Descrizione"class="border rounded" bind:value={customArcanumDescription}>
        <!-- Fusione -->
        <input placeholder="Nome Fusione" class="border rounded" bind:value={customFusionName}>
        <textarea placeholder="Benefici di Fusione" class="border rounded" bind:value={customFusionBenefit}></textarea>
        <!-- Impulso -->
        {#if isRework}
        <input placeholder="Nome Impulso" class="border rounded" bind:value={customImpulseName}>
        <textarea placeholder="Effetto di Impulso" class="border rounded" bind:value={customImpulseBenefit}></textarea>
        {/if}
        <!-- Congedo -->
        <input placeholder="Nome Congedo" class="border rounded" bind:value={customDischargeName}>
        <textarea placeholder="Benefici di Congedo" class="border rounded" bind:value={customDischargeBenefit}></textarea>

        <hr class="w-full border-cafe_noir-600">
        
        <!-- Terza Riga: Pulsanti -->
        <div class="flex gap-4 justify-center w-full h-8 text-white">
            <label class="bg-cafe_noir-600 rounded p-2 cursor-pointer">
                <input id="jsonFileSelector" type="file" class="hidden" onchange={handleFileSelect}/>
                Carica Json
            </label>
            <RunesButton text="Pulisci Campi" color="bg-cafe_noir-600" clickFun={handleClearAll}/>
            
            <span class="flex text-black items-center">
                <input type="checkbox" bind:checked={isRework}>
                Rework attivo?
            </span>
            
        </div>
    </div>

  <!-- Contenuto passato allo snippet 'imageProcessor' -->  
    {#snippet imageProcessor()}    
        <div  id={displayArcanumName} class="bg-white border">
            <div class="bg-cafe_noir-700 grid grid-cols-5">
                <p class="col-span-4 px-2">
                    {displayArcanumName}
                </p>
            </div>
            <div class="flex">
                <div class="flex-shrink-0">
                    <ImageUploader2 padre="arcanumGenerator" dimensions={"w-20 h-20 border-r border-b"} fill={true} bind:imageUrl = {arcanumImageUrl}/>
                </div>
                <div class="flex-1">
                    <div class="items-center justify-start px-2 bg-cafe_noir-800 flex">
                        {displayArcanumDescription}
                    </div>
                    <hr>
                    <div class="px-2">
                        {displayArcanumDomain}
                    </div>
                </div>
            </div>
            <!-- pensare come componente spalshabile o come snippet, forse megli come snippet -->
            {@render arcanaEffectBox("Fusione",customFusionName,displayFusionBenefit)}
            {#if isRework}
                {@render arcanaEffectBox("Impulso",customImpulseName,displayImpulseBenefit)}
            {/if}
            {@render arcanaEffectBox("Congedo",customDischargeName,displayDischargeBenefit)}
        </div>
        <RunesButton text="" icon={faDownload} style="cursor-pointer px-2" additionalStyle="w-auto" color= "" clickFun={()=>exportHtmlToImage(displayArcanumName)}/>
        <RunesButton text="" icon={faFileExport} style="cursor-pointer px-2" additionalStyle="w-auto" color= "" clickFun={handleExport}/>
    {/snippet}
</GeneratorBox>

{#snippet arcanaEffectBox(headerName:string,headerText:string,description:string)}
    <div class="flex flex-col">
        <span class="bg-lion-900">
            <h class="bg-cafe_noir-700 text-white px-2">
                {headerName}
            </h>
            {headerText}
        </span>
        {description}
    </div>
{/snippet}
