<script>
    import { baseWeapons } from "$lib/weaponUtility";
    import GeneratorBox from "./generatorBox.svelte";
    import RunesButton from "./runesButton.svelte";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "./imageUploader2.svelte";
    let weaponName = $state("");
    let selectedWeapon = $state();
    let isOpen = $state(false);
</script>

<GeneratorBox nameTag="Arma">
    <div class="flex flex-col ">
        <div class="flex gap-4">
            {@render weaponSelection()}
            <input type="checkbox">
            <input placeholder="Nome" bind:value= {weaponName}>
        </div>
        <div>
            <input placeholder="Tipo">
            <input placeholder="# mani">
            <input placeholder="Attributo 1">
            <input placeholder="Attributo 2">
        </div>
        <div class="flex flex-row">
            <input placeholder="select quality">
            <div class="flex flex-col gap-2">
                <span>
                    <input type="checkbox">
                    testo
                </span>
                <span>
                    <input type="checkbox">
                    testo
                </span>
            </div>
        </div>
        <div>
            <input placeholder="Quality Custom">
            <input placeholder="Custom Cost">
        </div>
        <hr>
        <div>
            <RunesButton text="carica json" clickFun={()=> console.log("premuto")}/>
            <RunesButton text="Pulisci Campi" clickFun={()=> console.log("premuto")}/>
        </div>
    </div>

    {#snippet imageProcessor()}    
        <div  id={weaponName} class="bg-white">
            <div class="flex gap-4">
                <div>
                    <ImageUploader2/>
                </div>
                <div>
                    <div>
                        {weaponName}, costo, formula prec, formula danno,
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
<RunesButton text="pino" clickFun={()=> exportHtmlToImage(weaponName)}/>

{#snippet weaponSelection()}
    {#if !isOpen}
        <!-- <input placeholder="Armi" bind:value={isOpen}> -->
         <button onclick={() => {switch(isOpen){case true: isOpen = false;return; case false: isOpen = true; return;}}}> scegli un'arma</button>
    {:else}
        mino
    {/if}
{/snippet}