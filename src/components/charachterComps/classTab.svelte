<script lang="ts">
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
  
    import { createClassRune, baseBookClasses, type CharacterClass } from "$lib/characterClasses.svelte";
    import ClassDescriptor from "./classDescriptor.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
  import Modal from "../customHTMLElements/modal.svelte";

    //debug
    //[createClassRune(furia),createClassRune(arcanista),createClassRune(entropista),createClassRune(lama_oscura),createClassRune(elementalista),createClassRune(guardiano),createClassRune(sapiente),createClassRune(oratore),createClassRune(canaglia),createClassRune(tiratore),createClassRune(spiritista),createClassRune(viandante),createClassRune(maestro_armi),createClassRune(artefice)]
    let {classList = $bindable([])} = $props();

    let selectedClass = $state({name:"Scegli una classe",class:""});
    let classNumberExceeded = $state(false);
    let classAlreadyPresent = $state(false);
    let classAddedSuccessfully = $state(false);

    function addClassToCharacter(){
        if(classList.length>4){
            classNumberExceeded = true;
            return;
        }
        if(classList.includes(selectedClass.class)){
            //modale errore
            classAlreadyPresent = true;
            return;
        }
        classList.push(selectedClass.class);
        //modale aggiunta
        classAddedSuccessfully = true;
    }
    $inspect(classList);
    $inspect(classAlreadyPresent,classNumberExceeded)
</script>
<div class="flex flex-col gap-4 ">


<GeneratorBox nameTag={"Classi"}>
    <!-- Selettore per aggiungere classi al personaggio -->
    {#if selectedClass}
        <div class="flex items-center justify-between gap-10 p-4">
            <span class="border">
                <ModalSelector itemName={selectedClass.name} itemList={baseBookClasses} bind:selectedItem={selectedClass} dimensions="w-40" />
            </span>
            <RunesButton text="Aggiungi" clickFun={addClassToCharacter}/>
        </div>
    {/if}
</GeneratorBox>

<!-- Mostro le Classi del personaggio -->
    {#each {length:classList.length}, index }
        <hr class="w-full border-cafe_noir-600">
        <ClassDescriptor bind:chosenClass={classList[index]}/>
    {/each}
</div>

<Modal bind:showModal={classNumberExceeded} modalText={"errore"} divStyle={"flex flex-col gap-4"}>
    <div>
        <h1 class="text-red-400 text-2xl">
           Hai raggiunto il numero Massimo di Classi
        </h1>
        <h2>
            premi sulla pagina per chiudere questa finestra
        </h2>
    </div>
</Modal>

<Modal bind:showModal={classAlreadyPresent} modalText={"errore"} divStyle={"flex flex-col gap-4"}>
    <div>
        <h1 class="text-red-400 text-2xl">
           Hai già questa classe
        </h1>
    </div>
</Modal>

<Modal bind:showModal={classAddedSuccessfully} modalText={"chiudi"} divStyle={"flex flex-col gap-4"}>
    <div>
        <h1 class="text-green-400 text-2xl">
           Classe Aggiunta con successo
        </h1>
    </div>
</Modal>
