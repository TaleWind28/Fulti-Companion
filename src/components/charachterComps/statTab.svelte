<script lang="ts">

    import GeneratorBox from "../Generators/generatorBox.svelte";
    import { elemGlams } from "$lib/characterUtils";
    import Fa from "svelte-fa";

    //props
    let{ 
        characteristics = $bindable([8,8,8,8]),
        characterAffinitiesRaw = $bindable([0,0,0,0,0,0,0,0,0]),
        statuses = $bindable([false,false,false,false,false,false,false,false,false,false])
    } = $props();

    //Prima Box
    let standardStatSpread = $state(["Tuttofare: d8,d8,d8,d8","Standard: d10,d8,d8,d6","Specializzato: d10,d10,d6,d6"])

    function updateRealchars(){
        characteristics = [characteristicTranslated[0].value,characteristicTranslated[1].value,characteristicTranslated[2].value,characteristicTranslated[3].value,]
    }
    //Seconda Box

    
    const valoreMapping: Record<string, number> = {
        "vu": 0,
        "nu": 1,
        "rs": 2,
        "im": 3,
        "ab": 4
        };
    const reverseMapping: Record<number, string> = {
        0:"vu",
        1:"nu",
        2:"rs",
        3:"im",
        4:"ab"
        };
    


    const translatedAffinities= Object.values(characterAffinitiesRaw).map(str => valoreMapping[str]);
    console.log(translatedAffinities,"translated");

    //uso la prop solo per comodità di passaggio dati
    let affinities = $state([
        {name:"Fisico",affinity:translatedAffinities[0],glam:elemGlams.physical},
        {name:"Fulmine",affinity:translatedAffinities[1],glam:elemGlams.bolt},
        {name:"Vento",affinity:translatedAffinities[2],glam:elemGlams.wind},
        {name:"Terra",affinity:translatedAffinities[3],glam:elemGlams.earth},
        {name:"Fuoco",affinity:translatedAffinities[4],glam:elemGlams.fire},
        {name:"Ghiaccio",affinity:translatedAffinities[5],glam:elemGlams.ice},
        {name:"Oscurità",affinity:translatedAffinities[6],glam:elemGlams.dark},
        {name:"Luce",affinity:translatedAffinities[7],glam:elemGlams.light},
        {name:"Veleno",affinity:translatedAffinities[8],glam:elemGlams.poison}
    ]);
    $inspect(characteristics,"chars");
    $inspect(affinities,"affinity");
    $inspect(characterAffinitiesRaw,"affinity Raw");

    let characteristicTranslated = $state([{name:"DES",value:characteristics[0]},{name:"INT",value:characteristics[0]},{name:"VIG",value:characteristics[2]},{name:"VOL",value:characteristics[3]}])
     
    function handleAffinitySliderChange(input:any){
        switch(input.name){
            case "Fisico":  translatedAffinities[0] = input.affinity;break;
            case "Fulmine": translatedAffinities[1] = input.affinity;break;
            case "Vento":   translatedAffinities[2] = input.affinity;break;
            case "Terra":   translatedAffinities[3] = input.affinity;break;
            case "Fuoco":   translatedAffinities[4] = input.affinity;break;
            case "Ghiaccio":  translatedAffinities[5] = input.affinity;break;
            case "Oscurità":  translatedAffinities[6] = input.affinity;break;
            case "Luce":    translatedAffinities[7] = input.affinity;break;
            case "Veleno":  translatedAffinities[8] = input.affinity;break;
        }


        //questo aggiorna la reattività di svelte
        const reverseMap = translatedAffinities.map(nbr => reverseMapping[nbr]);

        characterAffinitiesRaw.physical = reverseMap[0];
        characterAffinitiesRaw.bolt = reverseMap[1];
        characterAffinitiesRaw.wind = reverseMap[2];
        characterAffinitiesRaw.earth = reverseMap[3];
        characterAffinitiesRaw.fire = reverseMap[4];
        characterAffinitiesRaw.ice = reverseMap[5];
        characterAffinitiesRaw.light = reverseMap[6];
        characterAffinitiesRaw.dark = reverseMap[7];
        characterAffinitiesRaw.poison = reverseMap[8];
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
            case "Furente": return statuses[1] = input.isSuffering;
            case "Confuso": return statuses[2] = input.isSuffering;
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
                {#each characteristicTranslated as char,i}
                    
                    <div class="flex items-center justify-start">
                        <p class="w-15">{char.name}</p>
                        <span>
                            <input type="range" max="12" min="6" step="2" bind:value={char.value} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" onchange={updateRealchars}>
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