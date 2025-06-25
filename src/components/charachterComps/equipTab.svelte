<script>
  import Modal from "../customHTMLElements/modal.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
  import AccessoryGenerator from "../Generators/accessoryGenerator.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
  import ShieldGenerator from "../Generators/shieldGenerator.svelte";
  import WeaponGenerator from "../Generators/weaponGenerator.svelte";

    let { equip = $bindable()} = $props(); 
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
    none
    </GeneratorBox>

    <GeneratorBox nameTag="Armature">
    none
    </GeneratorBox>

    <GeneratorBox nameTag="Scudi">
    none
    </GeneratorBox>

    <GeneratorBox nameTag="Accessori">
    none
    </GeneratorBox>

</div>

<Modal bind:showModal={createWeapon} modalText="Creazione Arma">
    <WeaponGenerator></WeaponGenerator>
    
</Modal>

<Modal bind:showModal={createArmor} modalText="Creazione Armatura">
    <ShieldGenerator>
        
    </ShieldGenerator>
</Modal>

<Modal bind:showModal={createAccessory} modalText="Creazione Accessorio">
    <AccessoryGenerator></AccessoryGenerator>
</Modal>
