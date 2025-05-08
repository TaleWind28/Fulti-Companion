<script>
    import { faDiceFive } from "@fortawesome/free-solid-svg-icons";
    import CharacterCard from "./characterCard.svelte";
    import CustomButton from "./customButton.svelte";
    export let character;

</script>

<div class="flex flex-col gap-6">
    <CharacterCard car ={character} hidden={true}/>
    <div class="flex items-center justify-center gap-4">
        <CustomButton text="Mostra Scheda di Battaglia" dimensions="w-50 h-8" color="bg-cafe_noir-600"/> 
        <CustomButton text="roll" dimensions="w-15 h-8" color="bg-cafe_noir-600" textIcon={true} icon={faDiceFive}/>
    </div>
    <div class="flex items-center justify-center">Note</div>
</div>