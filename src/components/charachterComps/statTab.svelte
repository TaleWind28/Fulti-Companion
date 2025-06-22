<script lang="ts">
    import { elemGlams } from "$lib/characterUtils";
    import { AFFINITY_CONFIG } from "$lib/types";
    import { parseActionCodeURL } from "firebase/auth";
    import GeneratorBox from "../Generators/generatorBox.svelte";
    import { parse } from "dotenv";
    import { object } from "zod";

//Prima Box
    let characteristics = $state([{name:"DES",value:0},{name:"INT",value:0},{name:"VIG",value:0},{name:"VOL",value:0}]);
    let standardStatSpread = $state(["Tuttofare: d8,d8,d8,d8","Standard: d10,d8,d8,d6","Specializzato: d10,d10,d6,d6"])
//Seconda Box

    //<!-- [icona, nome, variabile slider] -->
    let elementalAffinity = $state({
        poison: "nu",
        light: "nu",
        dark: "nu",
        ice: "nu",
        fire: "nu",
        earth: "nu",
        wind: "nu",
        bolt: "nu",
        physical: "nu"
    });
    const affinityLevels = ["wk", "nu", "rs", "im", "ab"];

     const translations = {
        poison: "Veleno",
        light: "Luce",
        dark: "Oscurità",
        ice: "Ghiaccio",
        fire: "Fuoco",
        earth: "Terra",
        wind: "Vento",
        bolt: "Fulmine",
        physical: "Fisico"
    };

    $inspect(elementalAffinity);
</script>




//Terza Box

//Quarta Box

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
        <div>
            <section class="flex flex-col">
                {#each Object.entries(elementalAffinity).reverse() as [name, currentStringValue]}
                    <div class="flex items-center gap-4 justify-start px-2">
                        <label class="w-20" for={name}>{translations[name]}</label>
                        <input
                            class="w-full"
                            type="range"
                            id={name}
                            min="0"
                            max={affinityLevels.length - 1}
                            value={affinityLevels.indexOf(currentStringValue)}
                            oninput={(event) => {
                                elementalAffinity[name] = affinityLevels[event.target.value];
                            }}
                        />

                        <!-- Mostriamo il valore testuale attuale, che è quello che conta -->
                        <!-- <strong>{currentStringValue}</strong> -->
                    </div>
                {/each}

            </section>
            <!-- Scale markers -->
            <footer class="flex justify-evenly px-1">
                {#each ["Vulnerabilità","Normale","Resistenza", "Immunità", "Assorbimento"] as mark}
                    <span class=" text-xs text-black text-center w-auto ">{mark}</span>
                {/each}   
            </footer>
        </div>
    </GeneratorBox>
    
    <!-- Terza Box: Status -->
    <GeneratorBox nameTag={"Status"}>
        <div>
            
        </div>
    </GeneratorBox>

    <!-- Quarta Box: Modifiche Manuali -->
    <GeneratorBox nameTag={"Modifica Manuale delle Statistiche"}>
        <div>
            
        </div>
    </GeneratorBox>

</div>