<script lang="ts">
    import CustomButton from "../../components/customButton.svelte";
    import CharacterCard from "../../components/characterCard.svelte";
    import { addCharacter, type Character } from "$lib/utility";
    import { personaggiStore } from "../../stores/characterStore";

    function createCharacter(){
        alert("pino");
        let char:Character = {
            name: "",
            level: 5,
            stats:[6,6,6,6],
            traits:["","",""],
            statuses:[false],
            elementalAffinity:[0,0,0,0,0,0,0,0,0,],
            pic:""
        }
        personaggiStore.aggiungiPersonaggio(char);
        console.log(characters);
    }   
    
    function upload(){

    }

    export let characters = [{
        name:"Landon McCoy",
        stats:[
            12,
            8,
            8,
            6
        ],
        traits:["Duellante Spavaldo e Speranzoso","Giustizia","Diez Coronas"],
        elementalAffinity:[0,1,2,0,1,2,0,1,2],
        statuses:[false],
        level:25,
        pic:"src/images/Logo5.1.png"
    },{
        name:"Chroma Celsius",
        stats:[
            8,
            8,
            8,
            8
        ],
        traits:["Duellante Spavaldo e Speranzoso","Giustizia","Diez Coronas"],
        elementalAffinity:[0,1,2,0,1,2,0,1,2],
        statuses:[false],
        level:20,
        pic:"src/images/Logo5.1.png"
    }
    ];

    for(let i =0;i<characters.length;i++){
            personaggiStore.aggiungiPersonaggio(characters[i]);
    }
</script>
<div class="bg-cafe_noir-900">
    <br><br><br>
    <div class=" flex items-center justify-center gap-6 bg-white w-fit mx-auto h-20 px-8 rounded">
        <input placeholder="ricerca con il nome personaggio" class=" bg-cafe_noir-600 text-white rounded"/>
        <CustomButton text="Crea Personaggio" color="bg-cafe_noir-600" dimensions="w-35 h-10" on:click={createCharacter}/>
        <CustomButton text="importa da Json" color="bg-cafe_noir-600" dimensions="w-35 h-10" on:click{upload}/>
    </div>
    <CharacterCard dimensions="w-auto h-auto" padding = "px-8" caracters = {$personaggiStore} />
    
    <br><br><br>
</div>