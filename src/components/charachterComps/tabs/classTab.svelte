<script lang="ts">
    import ModalSelector from "../../customHTMLElements/modalSelector.svelte";
    import GeneratorBox from "../../Generators/generatorBox.svelte";
  
    import {baseBookClasses} from "$lib/characterClasses.svelte";
    import ClassDescriptor from "../classDescriptor.svelte";
    import RunesButton from "../../customHTMLElements/runesButton.svelte";
  import Modal from "../../customHTMLElements/modal.svelte";
  import RunesInput from "../../customHTMLElements/runesInput.svelte";

    //debug
    let {character = $bindable({})} = $props();

    let selectedClass = $state({name:"Scegli una classe",class:""});
    let classNumberExceeded = $state(false);
    let classAlreadyPresent = $state(false);
    let classAddedSuccessfully = $state(false);
    let classNotSelected = $state(false);
    function addClassToCharacter(){
        if(selectedClass.name === "Scegli una classe"){
            classNotSelected = true;
            return;
        }
        if(character.classes.length>4){
            classNumberExceeded = true;
            return;
        }
        if(character.classes.includes(selectedClass.class)){
            //modale errore
            classAlreadyPresent = true;
            return;
        }
        character.classes.push(selectedClass.class);
        //modale aggiunta
        classAddedSuccessfully = true;
    }
    $inspect(character.classes);
    $inspect(classAlreadyPresent,classNumberExceeded)
    
    function removeClass(clas:any){
        character.classes = character.classes.filter(cls => cls !== clas);
    }
    $inspect(selectedClass,"classe",character.classes);
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
    {#each {length:character.classes.length}, index }
        <hr class="w-full border-cafe_noir-600">
        <ClassDescriptor bind:chosenClass={character.classes[index]}/>
        <RunesButton text="Rimuovi" color="bg-red-500" clickFun={()=>removeClass(character.classes[index])}/>
    {/each}
</div>

<!-- Errore: Superato il Numero Massimo di Classi -->
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

<!-- Errore: Classe già Posseduta -->
<Modal bind:showModal={classAlreadyPresent} modalText={"errore"} divStyle={"flex flex-col gap-4"}>
    <div>
        <h1 class="text-red-400 text-2xl">
           Hai già questa classe
        </h1>
    </div>
</Modal>

<!-- Errore: Classe già Posseduta -->
<Modal bind:showModal={classNotSelected} modalText={"errore"} divStyle={"flex flex-col gap-4"}>
    <div>
        <h1 class="text-red-400 text-2xl">
           Seleziona una classe
        </h1>
    </div>
</Modal>

<!-- Conferma: Classe Aggiunta con Successo -->
<Modal bind:showModal={classAddedSuccessfully} modalText={"chiudi"} divStyle={"flex flex-col gap-4"}>
    <div>
        <h1 class="text-green-400 text-2xl">
           Classe Aggiunta con successo
        </h1>
    </div>
</Modal>
