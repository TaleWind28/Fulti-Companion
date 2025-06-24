<script lang="ts">
    import { type CharacterClass } from "$lib/characterClasses.svelte";
  import { faPencil } from "@fortawesome/free-solid-svg-icons";
  import RunesButton from "../customHTMLElements/runesButton.svelte";

    import GeneratorBox from "../Generators/generatorBox.svelte";
    import SkillDescriptor from "./skillDescriptor.svelte";
    import Modal from "../customHTMLElements/modal.svelte";

    interface Props {
        chosenClass: CharacterClass;
    }
    let showHeroicModal = $state(false);
    let {chosenClass = $bindable()}: Props = $props();
    let modalHeroic = $state({name:"",description:""});
  
    $inspect(chosenClass,"classDescriptor");


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
        {#if chosenClass.lvl===10}
            <div class="flex flex-col p-2">
                <section class="bg-cafe_noir-700 flex items-center justify-between p-2">
                    <p>{chosenClass.heroic.name}</p>
                    <RunesButton icon={faPencil} color="" clickFun={()=> showHeroicModal = true}/>
                </section>
                <section>
                    {chosenClass.heroic.description}
                </section>
            </div>
        {/if}
    </div>

</GeneratorBox>

<!-- modale per creazione Abilità Eroica -->
<Modal bind:showModal={showHeroicModal} modalText="Chiudi" canClickOutside={true}>

    <div class="flex flex-col gap-4">
        <p class="bg-cafe_noir-700 rounded-2xl p-4"> Abilità Eroica ottenuta tramite la classe : {chosenClass.name} </p>
        <input bind:value={modalHeroic.name} placeholder="Nome Abilità Eroica" class="border">
        <textarea bind:value={modalHeroic.description} placeholder="Descrizione Abilità Eroica" class="border w-150 h-50">
        </textarea>
        <div class="flex flex-row items-center justify-end gap-4">
            <RunesButton text="Chiudi Senza Salvare" clickFun={()=>showHeroicModal = false} additionalStyle="w-20 h-15" color="bg-cafe_noir-600"/>
            <RunesButton text="Salva e Chiudi" clickFun={()=> {chosenClass.heroic = modalHeroic;showHeroicModal = false} } additionalStyle="w-20 h-15" color="bg-cafe_noir-600"/>
        </div>  
    </div>
    
</Modal>


<!-- Snippet per scrivere i benefici delle classi sul markdown -->
{#snippet benefit(description:string, value:number)}    
    {#if value !== 0}
       <p class=" flex  items-center py-2">
            {description} {value}
       </p>    
    {/if}
{/snippet}