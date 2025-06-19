<script lang="ts">

    import Fa from "svelte-fa";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
    import { faCoins, faFeather, faStar } from "@fortawesome/free-solid-svg-icons";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import RunesInput from "../customHTMLElements/runesInput.svelte";
    import Bond from "./bond.svelte";

    let characterName = $state("Pino");
    let characterGender = $state("Maschio Etero Cis");
    let characterLevel = $state(0);
    let characterDescription = $state("Nessuna Descrizione");
    let zenit = $state(0);
    let exp = $state(0);
    let fabulaPoints = $state(0); 


    async function urlUploader(){
        console.log("Impementami cazzo");
    }

    async function urlDeleter(){
        console.log("porca troia implementami");
    }
    
    //Seconda Box
    const THEMES = [{name:"Ambizione"},{name:"Ira"}, {name:"Appartenenza"}, {name:" Dubbio"} , {name:"Dovere"}, {name:"Colpa"} , {name:"Speranza"}, {name:"Giustizia"}, {name:"Vendetta"}];
    let selectedTheme = $state(THEMES[0]);


    //Terza Box
    let bondArray = $state([{name:"pino",bonds:["Ammirazione"]},{name:"pino",bonds:["Ammirazione"]},{name:"pino",bonds:["Ammirazione"]},{name:"pino",bonds:["Ammirazione"]},{name:"pino",bonds:["Ammirazione"]},{name:"pino",bonds:["Ammirazione"]}])
    let bonds = $state(["Ammirazione"]);
    $inspect(bonds,"Componente InfoTab");
    function deleteBond(){
        console.log();
    }
    
    //Quarta Box


</script>
    
<div class="grid grid-cols-2 gap-4">
    <!-- Prima Box: Informazioni Base -->
    <GeneratorBox nameTag="Informazioni Base">
        <div class="flex flex-col gap-4 p-2">
            <!-- Prima Riga: Nome, Genere e Livello -->
            <section class="flex gap-4 ">
                <input type="text" bind:value={characterName} class="w-40 border rounded">
                <input type="text" bind:value={characterGender} class="w-40 border rounded">
                <input type="number" bind:value={characterLevel} class="w-20 border rounded">
            </section>
            
            <!-- Seconda Riga: Descrizione Personaggio -->
            <section>
                <textarea class="border w-full" bind:value={characterDescription}></textarea>
            </section>

            <!-- Terza Riga: Punti Fabula, Punti Exp e Zenit -->
            <section class="flex justify-start gap-18">
                <RunesInput styleClass= "flex w-auto items-center border rounded p-2" bindValue={fabulaPoints} icon={faFeather} iconColor={"text-lion-600"}/>
                <RunesInput styleClass= "flex w-auto items-center border rounded p-2" bindValue={exp} icon={faStar} iconColor={"text-green-900"}/>
                <RunesInput styleClass= "flex w-auto items-center border rounded p-2" bindValue={zenit} icon={faCoins} iconColor={"text-yellow-500"}/>
            </section>

            <!-- Quarta Riga: URL Immagine, con pulsanti -->
            <section>
                <span class="flex items-center gap-6">
                    <input type="text" class="border rounded" placeholder="URL Immagine">
                    <RunesButton text="Aggiorna Immagine" textColor="text-white" dimensions={"w-20 h-12"} clickFun={urlUploader}/>
                    <RunesButton text="Rimuovi Immagine" textColor="text-white" dimensions={"w-20 h-12"} clickFun={urlDeleter}/>
                </span>
            </section>
        </div>
    </GeneratorBox>

    <!-- Seconda Box: Tratti -->
    <GeneratorBox nameTag="Tratti">
        <div class="flex flex-col gap-4 p-2">
            <input class="border rounded" type="text" placeholder="Identità">
            <section class="grid grid-cols-2 gap-2">
                <ModalSelector dimensions=" w-full border rounded" itemList={THEMES} itemName = {selectedTheme.name} bind:selectedItem = {selectedTheme} />
                <input class="border rounded" type="text" placeholder="Origine">
            </section>
        </div> 
    </GeneratorBox>

    <!-- Terza Box: Legami -->
    <GeneratorBox nameTag="Legami">
        <div class="flex flex-col gap-4">
            {#each bondArray as bond}
                <Bond bondName={bond.name} bind:bonds={bond.bonds} />    
                <hr class="w-full border-cafe_noir-600">
            {/each}

        </div>
    </GeneratorBox>


    <!-- Quarta Box: Peculiarità -->
    <GeneratorBox nameTag="Peculiarità">
        <div>
        </div>  
    </GeneratorBox>
</div>