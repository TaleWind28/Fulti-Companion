<script lang="ts">
  import { damageFormula } from "$lib/combatUtility";
  import Modal from "../../customHTMLElements/modal.svelte";
    import RunesButton from "../../customHTMLElements/runesButton.svelte";
  import AccessoryGenerator from "../../Generators/accessoryGenerator.svelte";
    import GeneratorBox from "../../Generators/generatorBox.svelte";
  import ShieldGenerator from "../../Generators/shieldGenerator.svelte";
  import WeaponGenerator from "../../Generators/weaponGenerator.svelte";

    let {
            weaponList = $bindable([]),
            accessoryList = $bindable([]),
            shieldList = $bindable([])
        } = $props(); 
        
    let createWeapon = $state(false);
    let createAccessory = $state(false);
    let createArmor = $state(false);

    function addWeapon(weapon:any) {
        weaponList.push(weapon);
        createWeapon = false;
    }

     function addAccessory(accessory:any) {
        accessoryList.push(accessory);
        createAccessory = false;
    }

    function addShield(shield:any) {
        shieldList.push(shield);
        console.log(shield);
        createArmor = false;
    }

    // Funzioni per rimuovere gli oggetti
    function removeWeapon(index:any) {
        weaponList.splice(index,1);
        
    }

    function removeAccessory(index:any) {
       accessoryList.splice(index,1);
    }

    function removeShield(index:any) {
        shieldList.splice(index,1);
    }
</script>

<div class="flex flex-col gap-5">
    <GeneratorBox nameTag="Equipaggiamento">
        <div class="flex gap-5 p-5">
            <RunesButton text="Nuova Arma" color="bg-cafe_noir-600" dimensions="w-35 h-10" clickFun = {()=> createWeapon = true}/>
            <RunesButton text="Nuova Armatura/Scudo" color="bg-cafe_noir-600" dimensions="w-35" clickFun = {()=> createArmor = true}/>
            <RunesButton text="Nuovo Accessorio" color="bg-cafe_noir-600" dimensions="w-35" clickFun = {()=> createAccessory = true}/>
        </div>
    </GeneratorBox>

    <GeneratorBox nameTag="Armi">
         {#if weaponList.length === 0}
            <p class="p-4 text-gray-500">Nessuna arma presente</p>
        {:else}
            <div class="flex flex-col gap-2 p-4">
                {#each weaponList as weapon, index}
                        <div  id={weapon.name} class="bg-white border">
                            <div class="bg-cafe_noir-700 grid grid-cols-6">
                                <strong>{weapon.name}</strong>
                                <span class="grid grid-cols-3  col-span-5 gap-30 px-10">
                                    {#each ["PRECISIONE","DANNO","COSTO"] as header}
                                        <p> {header} </p>
                                    {/each}
                                </span>
                            </div>
                            <div class=" flex">

                                <div class="flex-1">
                                    <div class="justify-around bg-cafe_noir-800 flex ">
                                        {#each [weapon.accuracy,damageFormula(weapon.damage,weapon.type),weapon.cost] as formula}
                                            <p> {formula} </p>
                                        {/each}
                                    </div>
                                    <hr>
                                    <div class="flex flex-row items-center justify-between px-2 ">
                                        {#each [weapon.category,"*",weapon.hands,"*",weapon.distance] as element }
                                            <p> {element} </p>
                                        {/each}
                                    </div>
                                    <hr>
                                    <div class="px-2">
                                        {weapon.quality}
                                    </div>
                                </div>
                            </div>
                        </div>
                         
                        <span class="flex items-center justify-end">
                            <RunesButton text="Rimuovi" color="bg-red-600" dimensions="w-20 h-8" clickFun={() => removeWeapon(index)}/>
                        </span>
                        
                {/each}
            </div>
        {/if}
    </GeneratorBox>

    <GeneratorBox nameTag="Scudi">
        {#if shieldList.length === 0}
            <p class="p-4 text-gray-500">Nessuna armatura/scudo presente</p>
        {:else}
            <div class="flex flex-col gap-2 p-4">
                {#each shieldList as shield, index}
                    
                            <div  id={shield.name} class="bg-white border">
                                <div class="bg-cafe_noir-700 grid grid-cols-6">
                                    <p class="col-span-2 px-2">
                                        {shield.name}
                                    </p>
                                    <span class="flex col-span-4 justify-between px-1">
                                        {#each ["DIFESA", "DIF.MAGICA","COSTO"] as header}
                                            <p> {header} </p>
                                        {/each}
                                    </span>
                                </div>
                                <div class="flex">
                                    <div class="flex-1">
                                        <div class="justify-between bg-cafe_noir-800 flex px-8">
                                            {#each [shield.def,shield.mdef,shield.quality.cost] as data}
                                                <p> {data} </p>
                                            {/each}
                                        </div>
                                        <hr>
                                        <div class="px-2">
                                            {shield.quality.effect}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    <span class="flex items-center justify-end">
                            <RunesButton 
                            text="Rimuovi" 
                            color="bg-red-600" 
                            dimensions="w-20 h-8" 
                            clickFun={() => removeShield(index)}
                        />
                        </span>
                {/each}
            </div>
        {/if}
    </GeneratorBox>

    <GeneratorBox nameTag="Accessori">
       {#if accessoryList.length === 0}
            <p class="p-4 text-gray-500">Nessun accessorio presente</p>
        {:else}
            <div class="flex flex-col gap-2 p-4">
                {#each accessoryList as accessory, index}
                    <div  id={accessory.name} class="bg-white border">
                        <div class="bg-cafe_noir-700 grid grid-cols-5">
                            <p class="col-span-4 px-2">
                                {accessory.name}
                            </p>
                            <span class="flex justify-end px-4 gap-30">
                                {#each ["Costo"] as header}
                                    <p> {header} </p>
                                {/each}
                            </span>
                        </div>
                        <div class="flex">
    
                            <div class="flex-1">
                                <div class="items-center justify-end px-5  bg-cafe_noir-800 flex">
                                    {#each [accessory.price+"z"] as data}
                                        <p> {data} </p>
                                    {/each}
                                </div>
                                <hr>
                                <div class="px-2">
                                    {accessory.quality.effect}
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="flex items-center justify-end">
                        <RunesButton text="Rimuovi" color="bg-red-600" dimensions="w-20 h-8" clickFun={() => removeAccessory(index)}/>
                    </span>
                    
                {/each}
            </div>
        {/if}   
    </GeneratorBox>

</div>

<Modal bind:showModal={createWeapon} modalText="Creazione Arma" canClickOutside={true}>
    <WeaponGenerator onCreation={addWeapon}></WeaponGenerator>
    </Modal>

<Modal bind:showModal={createArmor} modalText="Creazione Armatura" canClickOutside={true}>
    <ShieldGenerator onCreation={addShield}>
        
    </ShieldGenerator>
   
</Modal>

<Modal bind:showModal={createAccessory} modalText="Creazione Accessorio" canClickOutside={true}>
    <AccessoryGenerator onCreation={addAccessory}></AccessoryGenerator>
   
</Modal>

