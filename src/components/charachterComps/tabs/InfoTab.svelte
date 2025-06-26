<script lang="ts">
    import RunesButton from "../../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "../../Generators/generatorBox.svelte";
    import { faCoins, faFeather, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
    import ModalSelector from "../../customHTMLElements/modalSelector.svelte";
    import RunesInput from "../../customHTMLElements/runesInput.svelte";
    import Bond from "../bond.svelte";
    import Modal from "../../customHTMLElements/modal.svelte";

    //prop reattivi
    let {
        characterName = $bindable(""), 
        characterGender = $bindable(""),
        characterLevel = $bindable(0),
        characterDescription = $bindable("Nessuna Descrizione"),
        zenit = $bindable(0),
        exp = $bindable(0),
        fabulaPoints = $bindable(0),
        imageStringUrl=$bindable(""),
        bondArray = $bindable([]),
        character = $bindable({}),

    } = $props();

    //Prima Box
    async function urlDeleter(){
        
        character.pic = "";
        imageStringUrl ="";
    
    }
    
    //Seconda Box
    const THEMES = [{name:"Ambizione"},{name:"Ira"}, {name:"Appartenenza"}, {name:" Dubbio"} , {name:"Dovere"}, {name:"Colpa"} , {name:"Speranza"}, {name:"Giustizia"}, {name:"Vendetta"}];

    let selectedTheme = $state({name:character.traits[1]});

    //Terza Box
    function createBond(){
        if(bondArray.length>5){
            ////gestire con modale di errore
            error = true
            return;
        }

        bondArray.push({name:"",bonds:{}});
    }

    let error = $state(false);

    function deleteBond(name:string){
        console.log("bondArray deleting..."+name);
        let index = bondArray.findIndex(bond => bond.name === name);
        console.log("deleting at index", index);
        bondArray.splice(index,1);
    }

</script>
    
<div class="grid grid-cols-2 gap-4">
    <!-- Prima Box: Informazioni Base -->
    <GeneratorBox nameTag="Informazioni Base">
        <div class="flex flex-col gap-4 p-2">
            <!-- Prima Riga: Nome, Genere e Livello -->
            <section class="flex gap-4 ">
                <input type="text" bind:value={character.name} class="w-40 border rounded" placeholder="Nome Personaggio">
                <input type="text" bind:value={character.gender} class="w-40 border rounded" placeholder="Genere">
                <input type="number" bind:value={character.level} class="w-20 border rounded" placeholder="Descrizione">
            </section>
            
            <!-- Seconda Riga: Descrizione Personaggio -->
            <textarea class="border w-full" bind:value={character.description}></textarea>
            
            <!-- Terza Riga: Punti Fabula, Punti Exp e Zenit -->
            <section class="flex justify-start gap-18">
                <RunesInput styleClass = "flex w-auto items-center border rounded p-2" bind:bindValue={character.fabulaPoints} icon={faFeather} iconColor={"text-lion-900"}/>
                <RunesInput styleClass = "flex w-auto items-center border rounded p-2" bind:bindValue={character.exp} icon={faStar} iconColor={"text-green-900"}/>
                <RunesInput styleClass = "flex w-auto items-center border rounded p-2" bind:bindValue={character.zenit} icon={faCoins} iconColor={"text-yellow-500"}/>
            </section>

            <!-- Quarta Riga: URL Immagine, con pulsanti -->
            <span class="flex items-center gap-6">
                <input type="text" class="border rounded" placeholder="URL Immagine" bind:value={imageStringUrl} >
                <RunesButton text="Aggiorna Immagine" textColor="text-white" dimensions={"w-20 h-12"} color="bg-cafe_noir-600" clickFun={()=>character.pic = imageStringUrl}/>
                <RunesButton text="Rimuovi Immagine" textColor="text-white" dimensions={"w-20 h-12"} color="bg-cafe_noir-600" clickFun={()=>urlDeleter()}/>
            </span>

        </div>
    </GeneratorBox>

    <!-- Seconda Box: Tratti -->
    <GeneratorBox nameTag="Tratti">
        <div class="flex flex-col gap-4 p-2">
            <input class="border rounded" type="text" placeholder="Identità" bind:value={character.traits[0]}>
            <section class="grid grid-cols-2 gap-2">
                <ModalSelector dimensions=" w-full border rounded" itemList={THEMES} itemName = {selectedTheme.name} bind:selectedItem = {selectedTheme} />
                <input class="border rounded" type="text" placeholder="Origine" bind:value={character.traits[2]}>
            </section>
        </div> 
    </GeneratorBox>

    <!-- Terza Box: Legami --> 
    <GeneratorBox nameTag="Legami" additionalStyle="flex items-center justify-between">
        {#snippet additionalHeaderThings()}
            <RunesButton dimensions ="w-auto" icon={faPlus} color="" clickFun={createBond}/>
        {/snippet}
        <div class="flex flex-col gap-4">
            {#each bondArray as bond}
                <Bond bind:bondName={bond.name} bind:bonds={bond.bonds} onDelete={ ()=> deleteBond(bond.name)}/>    
                <hr class="w-full border-cafe_noir-600">
            {/each}
        </div>  
    </GeneratorBox>

    <!-- Modale di Errore -->
    <Modal bind:showModal={error} modalText="Errore">
        <h1 class="text-red-500 text-2xl"> Numero massimo di Legami Raggiunto</h1>
    </Modal>
</div>