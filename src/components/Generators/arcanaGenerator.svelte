<script lang="ts">
    import { displayName } from "$lib/utility";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "./generatorBox.svelte";

    let customArcanumName = $state("");
    let displayArcanumName = $derived(displayName(customArcanumName,"Arcanum"));
    let isRework = $state(true);
    let customFusionBenefit = $state("");
    let customImpulseBenefit = $state("");
    let customDischargeBenefit = $state("")


    let displayFusionBenefit = $derived(displayName(customFusionBenefit,"Nessun Beneficio di Fusione"));
    let displayImpulseBenefit = $derived(displayName(customImpulseBenefit,"Nessun Effetto di Impulso"));
    let displayDischargeBenefit = $derived(displayName(customDischargeBenefit,"Nessun Beneficio di Congedo"));

    //imageProcessor
    let tableHeader = ["pippo"];
    let arcanumDescription = $state("Descrizione Arcanum");
    let domainDescription = $state("Domini");

    let arcanumImageUrl = $state(null);
</script>

<GeneratorBox nameTag="Arcanum">
    pino
  <!-- Contenuto passato allo snippet 'imageProcessor' -->  
    {#snippet imageProcessor()}    
        <div  id={displayArcanumName} class="bg-white">
            <div class="bg-cafe_noir-700 grid grid-cols-5">
                <p class="col-span-4">
                    {displayArcanumName}
                </p>
                <span class="grid grid-cols-1  col-span-1  gap-30">
                    {#each tableHeader as header}
                        <p> {header} </p>
                    {/each}
                </span>
            </div>
            <div class=" grid grid-cols-2 gap-4">
                <div class="col-span-1">
                    <ImageUploader2 padre="arcanumGenerator" dimensions={"w-40 h-30"} fill={true} bind:imageUrl = {arcanumImageUrl}/>
                </div>
                <div class="col-span-1">
                    <div class="items-center justify-end px-10  bg-cafe_noir-800 flex">
                        {arcanumDescription}
                    </div>
                    <hr>
                    <div>
                        {domainDescription}
                    </div>
                </div>
            </div>
            <!-- pensare come componente spalshabile o come snippet, forse megli come snippet -->
            {@render arcanaEffectBox("Fusione",displayFusionBenefit)}
            {#if isRework}
                {@render arcanaEffectBox("Impulso",displayImpulseBenefit)}
            {/if}
            {@render arcanaEffectBox("Congedo",displayDischargeBenefit)}
        </div>
        <RunesButton text="scarica Json" clickFun={()=> exportHtmlToImage(displayArcanumName)}/>
    {/snippet}
</GeneratorBox>

{#snippet arcanaEffectBox(headerName:string,description:string)}
    <div class="flex flex-col">
        <span class="bg-lion-900">
            <h class="bg-cafe_noir-700 text-white px-2">
                {headerName}
            </h>
        </span>
        {description}
    </div>
{/snippet}
