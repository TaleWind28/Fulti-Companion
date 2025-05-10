<script lang="ts">
    import { faDiceFive } from "@fortawesome/free-solid-svg-icons";
    import CharacterCard from "./characterCard.svelte";
    import CustomButton from "./customButton.svelte";
    import TabSelector from "./tabSelector.svelte";
    import type { Tab } from "$lib/utility";
    import Traits from "./traits.svelte";
    

    export let character;
    let i =0;
    let tabs:Tab[] = [
        {
            id:0,
            label:"InfoSheet",
            comp:Traits,
            props:{
                traits: character.traits
            }
        },
        {
        id:1,
        label:"BattleSheet",
        comp:Traits
    }
];
    $: activeComponent = tabs[0].comp;
    $: activeProps = tabs[0].props;
    //let msg = Module '"./characterCard.svelte"' has no exported member 'traits'. Did you mean to use 'import traits from "./characterCard.svelte"' instead
</script>

<div class="flex flex-col gap-6">
    <CharacterCard car ={character} hidden={true}/>
    <div>   
        pippo
        
    </div>
        <CustomButton text="Mostra Scheda di Battaglia" dimensions="w-50 h-8" color="bg-cafe_noir-600" on:click={() => {
            tabs = tabs.reverse();
            }}/> 
    <div class="flex  justify-center gap-4">
        <div>
            {#if activeProps}
                <svelte:component this={activeComponent} {...activeProps}/>
            {:else}
                <svelte:component this={activeComponent}/>    
            {/if}
        </div>
        <CustomButton text="roll" dimensions="w-15 h-8" color="bg-cafe_noir-600" textIcon={true} icon={faDiceFive}/>
    </div>
</div>

