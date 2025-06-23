<script lang="ts">

    import GeneratorBox from "../Generators/generatorBox.svelte";
    import { elemGlams } from "$lib/characterUtils";
    import Fa from "svelte-fa";

    //props
    let{ 
        characteristics = $bindable([{name:"DES",value:8},{name:"INT",value:8},{name:"VIG",value:8},{name:"VOL",value:8}]),
        characterAffinitiesRaw = $bindable([0,0,0,0,0,0,0,0,0]),
        statuses = $bindable([false,false,false,false,false,false,false,false,false,false])
    } = $props();

    //Prima Box
    let standardStatSpread = $state(["Tuttofare: d8,d8,d8,d8","Standard: d10,d8,d8,d6","Specializzato: d10,d10,d6,d6"])
    //Seconda Box
    
    //uso la prop solo per comodità di passaggio dati
    let affinities = $state([
        {name:"Fisico",affinity:characterAffinitiesRaw[0],glam:elemGlams.physical},
        {name:"Fulmine",affinity:characterAffinitiesRaw[1],glam:elemGlams.bolt},
        {name:"Vento",affinity:characterAffinitiesRaw[2],glam:elemGlams.wind},
        {name:"Terra",affinity:characterAffinitiesRaw[3],glam:elemGlams.earth},
        {name:"Fuoco",affinity:characterAffinitiesRaw[4],glam:elemGlams.fire},
        {name:"Ghiaccio",affinity:characterAffinitiesRaw[5],glam:elemGlams.ice},
        {name:"Oscurità",affinity:characterAffinitiesRaw[6],glam:elemGlams.dark},
        {name:"Luce",affinity:characterAffinitiesRaw[7],glam:elemGlams.light},
        {name:"Veleno",affinity:characterAffinitiesRaw[8],glam:elemGlams.poison}
    ]);
    // $inspect(characteristics);
    // $inspect(affinities);
    // $inspect(characterAffinitiesRaw);
     
    function handleAffinitySliderChange(input:any){
        switch(input.name){
            case "Fisico": return characterAffinitiesRaw[0] = input.affinity;
            case "Fulmine": return characterAffinitiesRaw[1] = input.affinity;
            case "Vento": return characterAffinitiesRaw[2] = input.affinity;
            case "Terra": return characterAffinitiesRaw[3] = input.affinity;
            case "Fuoco": return characterAffinitiesRaw[4] = input.affinity;
            case "Ghiaccio": return characterAffinitiesRaw[5] = input.affinity;
            case "Oscurità": return characterAffinitiesRaw[6] = input.affinity;
            case "Luce": return characterAffinitiesRaw[7] = input.affinity;
            case "Veleno": return characterAffinitiesRaw[8] = input.affinity;

        }
    }
    
    //Terza Box
    let statusArray = $state([
        {name: "Lento",isSuffering: statuses[0],description: "Destrezza è diminuita di 2"},
        {name: "Confuso",isSuffering: statuses[1],description: "Intuito è diminuito di 2"},
        {name: "Furente",isSuffering: statuses[2],description: "Sia Destrezza che Intuito sono diminuiti di 2"},
        
        {name: "Scosso",isSuffering: statuses[3],description: "Volontà è diminuita di 2"},
        {name: "Debole",isSuffering: statuses[4],description: "Forza è diminuita di 2"},
        {name: "Avvelenato",isSuffering: statuses[5],description: "Sia Forza che Volontà sono diminuite di 2"},

        {name: "Destrezza Su",isSuffering: statuses[6],description: "Destrezza è aumentata di 2"},
        {name: "Intuito Su",isSuffering: statuses[7],description: "Intuito è aumentato di 2"},
        {name: "Forza Su",isSuffering: statuses[8],description: "Forza è aumentata di 2"},
        {name: "Volontà Su",isSuffering: statuses[9],description: "Volontà è aumentata di 2"}
        
    ]);
    
    function handleStatusChecked(input:any){
        switch(input.name){
            case "Lento": return statuses[0] = input.isSuffering;
            case "Confuso": return statuses[1] = input.isSuffering;
            case "Furente": return statuses[2] = input.isSuffering;
            case "Scosso": return statuses[3] = input.isSuffering;
            case "Debole": return statuses[4] = input.isSuffering;
            case "Avvelenato" : return statuses[5] = input.isSuffering
            case "Destrezza Su": return statuses[6] = input.isSuffering;
            case "Intuito Su": return statuses[7] = input.isSuffering;
            case "Forza Su": return statuses[8] = input.isSuffering;
            case "Volontà Su": return statuses[9] = input.isSuffering;

        }
    }
    $inspect(statuses);

</script>






<div class="grid grid-cols-2 gap-4">
    <!-- Prima Box: Selettore di Caratteristiche -->
    <GeneratorBox nameTag={"Caratteristiche"}>
        <div class=" grid grid-cols-2 items-center justify-center p-2">
            <!-- Sezione Sx: Selettori di Caratteristiche -->
            <section class="">
                {#each characteristics as char,i}
                    
                    <div class="flex items-center justify-start">
                        <p class="w-15">{char.name}</p>
                        <span>
                            <input type="range" max="12" min="6" step="2" bind:value={char.value} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider">
                            {#if i === 3}
                                <!-- Scale markers -->
                                <footer class="flex justify-between mt-1 px-1">
                                    {#each [6, 8, 10, 12] as mark} 
                                        <span class=" text-xs text-black text-center w-4">d{mark}</span>
                                    {/each}   
                                </footer>
                            {/if}
                        </span>
                    </div>
                {/each}

            </section>
            <!-- Sezione Dx: Spiegazione Spread iniziali -->
            <section class="pr-10 ">
                <div class="bg-cafe_noir-800 p-2">
                    {#each standardStatSpread as line}
                        <p>{line}</p>
                    {/each}
                    <hr class="w-full border-cafe_noir-600">
                    <p class="w-auto">Quando il Personaggio raggiunge i livelli 20 e 40, il giocatore può aumentare una caratteristica a scelta di 1 taglia di dado</p>
                </div>
            </section>
        </div>
    </GeneratorBox>

    <!-- Seconda Box: Affinità Elementali -->
    <GeneratorBox nameTag={"Affinità elementali"}>
            <section class="grid grid-cols-[auto_1fr] p-2 gap-x-2 gap-y-1 items-center">
                {#each affinities as aff}
                    <span class="flex gap-2">
                        <Fa icon={aff.glam.icon} class={aff.glam.color} /> 
                        <p>{aff.name}</p>
                    </span>
                    <input type="range" min="0" max ="4" bind:value={aff.affinity} oninput={()=>handleAffinitySliderChange(aff)} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider">
                    
                {/each}
                <!-- questo div serve per mettere a dx il footer -->
                <div></div>
                <!-- Scale markers -->
                <footer class="w-full flex justify-between mt-1 px-1 gap-2">
                    {#each ["Vulnerabilità","Normale","Resistenza", "Immunità", "Assorbimento"] as mark}
                        <span class=" text-xs text-black text-center w-auto ">{mark}</span>
                    {/each}   
                </footer>
            </section>
    </GeneratorBox>
    
    <!-- Terza Box: Status -->
    <GeneratorBox nameTag={"Status"}>
        <div class="grid grid-cols-2 items-centert gap-4 p-2">
            
            {#each statusArray as status }
                <section class="flex gap-4 items-center">
                    <input type="checkbox" bind:checked={status.isSuffering} onchange={()=>handleStatusChecked(status)}>
                    <p>{status.name}</p>
                    <p class="text-sm">{status.description}</p>
                </section>
            {/each}
        </div>
    </GeneratorBox>

    <!-- Quarta Box: Modifiche Manuali -->
    <!-- <GeneratorBox nameTag={"Modifica Manuale delle Statistiche"}>
        <div>
            
        </div>
    </GeneratorBox> -->

</div>