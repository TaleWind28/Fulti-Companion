<script lang="ts">
    import { baseWeapons } from "$lib/weaponUtility";
    import GeneratorBox from "./generatorBox.svelte";
    import RunesButton from "./runesButton.svelte";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "./imageUploader2.svelte";
    import Modal from "./modal.svelte";
    import ModalSelector from "./modalSelector.svelte";
    let baseQuality = ["none"];

    //fare con calma ed attenzione perchè sono linkati -> il primo che cambia fa cambiare l'altro
    let selectedWeapon = $state(baseWeapons[0]);
    let customWeaponName = $state(" ");
    let selectedQuality = $state(baseQuality[0]);
    let qualityName = $derived(selectedQuality);
    
    let displayWeaponName = $derived.by(() => {
        return displayName(customWeaponName,selectedWeapon.name);
    })

    let isChoosingWeapon = $state(false);
    let isChoosingQual = $state(false);

    function displayName(customName:string, originalName:string){
        if(customName.length <= 1)return originalName;
        else return customName;
    }

    // $inspect(customWeaponName, customWeaponName.length);
</script>

<GeneratorBox nameTag="Arma">
    <div class="flex flex-col gap-5">
        <div class="flex gap-4">
            <!-- scelta classe Arma -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>
            <input type="checkbox">
            <input placeholder="Nome" bind:value= {customWeaponName} class="border rounded">
        </div>
        <div class="flex flex-rows gap-5">
            <!-- Tipo di danno -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>
            
            <!-- Numero di Mani -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>
            
            <!-- Attributo Precisione 1 -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>

            <!-- Attributo Precisione 1 -->
            <span class="border rounded">
                <ModalSelector itemName = {selectedWeapon.name} itemList = {baseWeapons} bind:selectedItem = {selectedWeapon} bind:isOpen = {isChoosingWeapon}/>
            </span>

        </div>
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
        <div>
            <input placeholder="Quality Custom" class="border rounded">
            <input placeholder="Custom Cost" class="border rounded" >
        </div>
        <hr>
        <div>
            <RunesButton text="carica json" clickFun={()=> console.log("premuto")}/>
            <RunesButton text="Pulisci Campi" clickFun={()=> console.log("premuto")}/>
        </div>
    </div>

    {#snippet imageProcessor()}    
        <div  id={displayWeaponName} class="bg-white">
            <div class="flex gap-4">
                <div>
                    <ImageUploader2/>
                </div>
                <div>
                    <div>
                        {displayWeaponName}, costo, formula prec, formula danno,
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

<RunesButton text="pino" clickFun={()=> exportHtmlToImage(displayWeaponName)}/>

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



