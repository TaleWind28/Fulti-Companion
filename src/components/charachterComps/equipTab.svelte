<script>
  import Modal from "../customHTMLElements/modal.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
  import AccessoryGenerator from "../Generators/accessoryGenerator.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
  import ShieldGenerator from "../Generators/shieldGenerator.svelte";
  import WeaponGenerator from "../Generators/weaponGenerator.svelte";

    let { weaponList = $bindable(), accessoryList = $bindable(),armorList = $bindable(),shieldList = $bindable()} = $props(); 
    let createWeapon = $state(false);
    let createAccessory = $state(false);
    let createArmor = $state(false);
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
        {#each weaponList as weapon }
            {weapon}
        {/each}
    </GeneratorBox>

    <GeneratorBox nameTag="Armature">
        {#each armorList as armor }
            {armor}
        {/each}
    </GeneratorBox>

    <GeneratorBox nameTag="Scudi">
        {#each shieldList as shield }
            {shield}
        {/each}
    </GeneratorBox>

    <GeneratorBox nameTag="Accessori">
        {#each accessoryList as accessory }
            {accessory}
        {/each}
    </GeneratorBox>

</div>

<Modal bind:showModal={createWeapon} modalText="Creazione Arma" canClickOutside={true}>
    <WeaponGenerator></WeaponGenerator>
    <span class="flex items-center justify-end gap-5">
        <RunesButton text="Salva ed esci" clickFun={()=>createWeapon = false} color="bg-cafe_noir-600" dimensions="w-30 h-7" ></RunesButton>
        <RunesButton text="Esci senza Salvare" clickFun={()=>createWeapon = false} color="bg-cafe_noir-600" dimensions="w-40 h-7"></RunesButton>
    </span>
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
