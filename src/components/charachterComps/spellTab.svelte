<script lang="ts">
    import { elementalista, entropista, spiritista, type CharacterClass } from "$lib/characterClasses.svelte";
    import { spellLists, type Spell } from "$lib/spells";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
  import Modal from "../customHTMLElements/modal.svelte";

    let {spellsKnown = $bindable([]),classes = [entropista,elementalista,spiritista]} = $props();
    
    let characterSpellList = findSpellList(classes);
    let selectedList = $state({name:"Scegli una lista di Incantesimi", list:""})
    let spellAlreadyKnown = $state(false);

    function findSpellList(classes:CharacterClass[]){
        return classes
        .flatMap(charClass => charClass.benefits.spellClasses)
        .map(spellClassName => spellLists.find(spell => spell.name === spellClassName))
        .filter(spell => spell !== undefined); // Rimuove gli undefined
    }

     // Funzione per verificare se hai almeno una spell da una specifica lista
    function hasSpellFromList(spellList:Spell[], knownSpells:Spell[]){
        return knownSpells.some(knownSpell => 
            spellList.some(listSpell => listSpell.name === knownSpell.name)
        );
    }

    // Funzione per ottenere le spell conosciute da una specifica lista
    function getSpellsFromList(spellList:Spell[], knownSpells:Spell[]){
        return knownSpells.filter(knownSpell => 
            spellList.some(listSpell => listSpell.name === knownSpell.name)
        );
    }

    function addSpell(spell:any){
        if(spellsKnown.find(sp => sp === spell)) {
            spellAlreadyKnown = true;
            return;
        }
        spellsKnown.push(spell);
        return;
    }
    $inspect(spellsKnown);
    let selectedSpell = $state({name:"Scegli un'incantesimo dalla lista",effect:""});
</script>

<div class=" flex flex-col gap-5">
    <GeneratorBox nameTag="Incantesimi">
        
        <div class="flex  items-center justify-between gap-10 p-5">
            <ModalSelector itemName={selectedList.name} itemList={characterSpellList}  bind:selectedItem = {selectedList} dimensions="w-40 border" />
            <ModalSelector itemList={selectedList.list} itemName = {selectedSpell.name} bind:selectedItem = {selectedSpell} dimensions="w-40 border" />
            <RunesButton text="Aggiungi Incantesimo" dimensions="w-25" color="bg-cafe_noir-600" clickFun={()=>addSpell(selectedSpell)}/>
        </div>

        
    </GeneratorBox>

     <!-- Visualizza le spell conosciute per ogni lista -->
    {#each characterSpellList as spellListObj }
        {#if hasSpellFromList(spellListObj.list, spellsKnown)}
            <GeneratorBox nameTag={"Incantesimi - " + spellListObj.name}>
                <div class="p-4">
                     {#each getSpellsFromList(spellListObj.list, spellsKnown) as spell, index}
                        <div class="mb-4 p-3 border rounded-lg bg-gray-50">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-bold text-lg text-cafe_noir-700">{spell.name}</h3>
                                <div class="flex items-center gap-2">
                                    <div class="text-sm text-gray-600">
                                        MP: {spell.mpPerTarget} | Max Target: {spell.maxTargets}
                                    </div>
                                    <RunesButton 
                                        text="Rimuovi" 
                                        dimensions="w-20 h-6" 
                                        color="bg-red-600" 
                                        textColor="text-white"
                                        additionalStyle="text-xs"
                                        clickFun={() => {
                                            const spellIndex = spellsKnown.findIndex(s => s.name === spell.name);
                                            if (spellIndex !== -1) {
                                                spellsKnown.splice(spellIndex, 1);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-2 text-sm mb-2">
                                <div><strong>Bersaglio:</strong> {spell.targetDescription}</div>
                                <div><strong>Durata:</strong> {spell.duration}</div>
                                <div><strong>Controllo:</strong> {spell.accuracyCheck}</div>
                                <div>
                                    <span class="inline-block px-2 py-1 rounded text-xs {spell.offensive ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}">
                                        {spell.offensive ? 'Offensivo' : 'Supporto'}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="text-sm text-gray-700">
                                <strong>Effetto:</strong> {spell.spellDescription}
                            </div>
                        </div>
                    {/each}
                </div>
            </GeneratorBox>
        {/if}                 
    {/each}

</div>

<Modal modalText="Errore" bind:showModal={spellAlreadyKnown}>
    <h1 class="text-red-500 text-3xl"> Possiedi già quest'incantesimo </h1>
</Modal>