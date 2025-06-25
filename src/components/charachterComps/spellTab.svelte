<script lang="ts">
  import { elementalista, entropista, spiritista, type CharacterClass } from "$lib/characterClasses.svelte";
  import { spellLists, type Spell } from "$lib/spells";
  import { effect } from "zod";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
  import RunesButton from "../customHTMLElements/runesButton.svelte";

    let {spellsKnown = $bindable([]),classes = [entropista,elementalista,spiritista]} = $props();
    
    let characterSpellList = findSpellList(classes);
    let selectedList = $state({name:"Scegli una lista di Incantesimi", list:""})

    function findSpellList(classes:CharacterClass[]){
        return classes
        .flatMap(charClass => charClass.benefits.spellClasses)
        .map(spellClassName => spellLists.find(spell => spell.name === spellClassName))
        .filter(spell => spell !== undefined); // Rimuove gli undefined
    }
    function hasSpellFromList(spellList:Spell[], spell:Spell[]){
        return true
    }

    $inspect(spellsKnown);
    let selectedSpell = $state({name:"Scegli un'incantesimo dalla lista",effect:""});
</script>

<div>
    <GeneratorBox nameTag="Incantesimi">
        <div class="flex  items-center justify-between gap-10 p-5">
            <ModalSelector itemName={selectedList.name} itemList={characterSpellList}  bind:selectedItem = {selectedList} dimensions="w-40 border" />
            <ModalSelector itemList={selectedList.list} itemName = {selectedSpell.name} bind:selectedItem = {selectedSpell} dimensions="w-40 border" />
            <RunesButton text="Aggiungi Incantesimo" dimensions="w-25" color="bg-cafe_noir-600" clickFun={()=>spellsKnown.push(selectedSpell)}/>
        </div>

        
    </GeneratorBox>

    {#each characterSpellList as spellLists }
            {#if hasSpellFromList(spellLists.list,spellsKnown)}
                <GeneratorBox nameTag={"Incantesimi - " + spellLists.name}>
                    pino
                </GeneratorBox>
            {/if}                 
    {/each}

</div>