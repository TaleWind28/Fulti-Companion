<script lang="ts">
    import { createEmptyCharacterClass, type CharacterClass } from "$lib/characterClasses.svelte";
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
    import SkillDescriptor from "./skillDescriptor.svelte";


    interface Props {
        chosenClass: CharacterClass;
    }

    let {chosenClass = $bindable()}: Props = $props();

</script>

<GeneratorBox nameTag={chosenClass.name} nameTagStyle="text-white text-2xl" additionalStyle="flex items-center justify-between">
    
    {#snippet additionalHeaderThings()}
        <div class="flex flex-row items-center gap-5">
            <p class="text-white text-2xl">Livello Classe</p>
            <div class="bg-amber-50 border-2 border-amber-200 rounded-lg shadow-sm">
                <input type="number" min="0" max="10" placeholder="0" bind:value={chosenClass.lvl} class="bg-transparent text-2xl font-bold text-amber-900 text-center w-16 py-3 px-2 outline-none">
            </div>
            <div class="text-5xl font-extrabold text-amber-700 rotate-12">/</div>
            <div class="bg-amber-50 border-2 border-amber-200 rounded-lg px-4 py-3 shadow-sm">
                <span class="text-2xl font-bold text-amber-900">10</span>
            </div>
        </div> 
    {/snippet}
    
    <span>
        {@render benefit("-Aumenti permanentemente i tuoi punti vita di",chosenClass.benefits.hpplus)}
        {@render benefit("-Aumenti permanentemente i tuoi punti mente di",chosenClass.benefits.mpplus)}
        {@render benefit("-Aumenti permanentemente i tuoi punti inventario di",chosenClass.benefits.ipplus)}
    </span>
    
    <hr class="w-full border-black">
    
    <div class="flex flex-col gap-5">
        {#each {length:chosenClass.skills.length}, index}
            <SkillDescriptor bind:skill={chosenClass.skills[index]}/>
        {/each}
    </div>

</GeneratorBox>

{#snippet benefit(description:string, value:number)}
    {#if value !== 0}
       <p class=" flex  items-center py-2">
            {description} {value}
       </p>    
    {/if}
{/snippet}