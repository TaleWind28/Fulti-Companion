<script lang="ts">
  import Modal from "../customHTMLElements/modal.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
  import AccessoryGenerator from "../Generators/accessoryGenerator.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
  import ShieldGenerator from "../Generators/shieldGenerator.svelte";
  import WeaponGenerator from "../Generators/weaponGenerator.svelte";

    let { weaponList = $bindable([]), accessoryList = $bindable([]),armorList = $bindable([]),shieldList = $bindable([])} = $props(); 
    let createWeapon = $state(false);
    let createAccessory = $state(false);
    let createArmor = $state(false);

    function addWeapon(weapon:any) {
        console.log(weapon);
        weaponList = [...weaponList,weapon];
        createWeapon = false; // Chiude il modale
    }

     function addAccessory(accessory:any) {
        accessoryList = [...accessoryList, accessory];
        createAccessory = false;
    }

    function addShield(shield:any) {
        shieldList = [...shieldList, shield];
        createArmor = false;
    }

    // Funzioni per rimuovere gli oggetti
    function removeWeapon(index:any) {
        weaponList = weaponList.filter((_, i) => i !== index);
    }

    function removeAccessory(index:any) {
        accessoryList = accessoryList.filter((_, i) => i !== index);
    }

    function removeShield(index:any) {
        shieldList = shieldList.filter((_, i) => i !== index);
    }
</script>

<div class="flex flex-col gap-5">
    <GeneratorBox nameTag="Equipaggiamento">
        <div class="flex gap-5 p-5">
            <RunesButton text="Nuova Arma" color="bg-cafe_noir-600" dimensions="w-35 h-10" clickFun = {()=> createWeapon = true}/>
            <RunesButton text="Nuova Armatura" color="bg-cafe_noir-600" dimensions="w-35" clickFun = {()=> createArmor = true}/>
            <RunesButton text="Nuovo Accessorio" color="bg-cafe_noir-600" dimensions="w-35" clickFun = {()=> createAccessory = true}/>
        </div>
    </GeneratorBox>

    <GeneratorBox nameTag="Armi">
         {#if weaponList.length === 0}
            <p class="p-4 text-gray-500">Nessuna arma presente</p>
        {:else}
            <div class="flex flex-col gap-2 p-4">
                {#each weaponList as weapon, index}
                    <div class="flex justify-between items-center p-2 border rounded">
                        <div>
                            <strong>{weapon.name}</strong>
                            <span class="text-sm text-gray-600">- {weapon.cost}z</span>
                        </div>
                        <RunesButton 
                            text="Rimuovi" 
                            color="bg-red-600" 
                            dimensions="w-20 h-8" 
                            clickFun={() => removeWeapon(index)}
                        />
                    </div>
                {/each}
            </div>
        {/if}
    </GeneratorBox>

    <GeneratorBox nameTag="Armature">
        {#each armorList as armor }
            {armor}
        {/each}
    </GeneratorBox>

    <GeneratorBox nameTag="Scudi">
        {#if shieldList.length === 0}
            <p class="p-4 text-gray-500">Nessuna armatura/scudo presente</p>
        {:else}
            <div class="flex flex-col gap-2 p-4">
                {#each shieldList as shield, index}
                    <div class="flex justify-between items-center p-2 border rounded">
                        <div>
                            <strong>{shield.name}</strong>
                            <span class="text-sm text-gray-600">- Def: {shield.def}, MDef: {shield.mdef}</span>
                        </div>
                        <RunesButton 
                            text="Rimuovi" 
                            color="bg-red-600" 
                            dimensions="w-20 h-8" 
                            clickFun={() => removeShield(index)}
                        />
                    </div>
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
                    <div class="flex justify-between items-center p-2 border rounded">
                        <div>
                            <strong>{accessory.name}</strong>
                            <span class="text-sm text-gray-600">- {accessory.price}z</span>
                        </div>
                        <RunesButton 
                            text="Rimuovi" 
                            color="bg-red-600" 
                            dimensions="w-20 h-8" 
                            clickFun={() => removeAccessory(index)}
                        />
                    </div>
                {/each}
            </div>
        {/if}   
    </GeneratorBox>

</div>

<Modal bind:showModal={createWeapon} modalText="Creazione Arma" canClickOutside={true}>
    <WeaponGenerator onCreation={addWeapon}></WeaponGenerator>
    </Modal>

<Modal bind:showModal={createArmor} modalText="Creazione Armatura" canClickOutside={true}>
    <ShieldGenerator>
        
    </ShieldGenerator>
    <span class="flex items-center justify-end gap-5">
        <RunesButton text="Salva ed esci" clickFun={()=>createArmor = false} color="bg-cafe_noir-600" dimensions="w-30 h-7" ></RunesButton>
        <RunesButton text="Esci senza Salvare" clickFun={()=>createArmor = false} color="bg-cafe_noir-600" dimensions="w-40 h-7"></RunesButton>
    </span>
</Modal>

<Modal bind:showModal={createAccessory} modalText="Creazione Accessorio" canClickOutside={true}>
    <AccessoryGenerator></AccessoryGenerator>
   <span class="flex items-center justify-end gap-5">
        <RunesButton text="Salva ed esci" clickFun={()=>createAccessory = false} color="bg-cafe_noir-600" dimensions="w-30 h-7" ></RunesButton>
        <RunesButton text="Esci senza Salvare" clickFun={()=>createAccessory = false} color="bg-cafe_noir-600" dimensions="w-40 h-7"></RunesButton>
    </span>
</Modal>
