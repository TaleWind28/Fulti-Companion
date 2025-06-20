<script>
    import GeneratorBox from "../Generators/generatorBox.svelte";

//Prima Box
    let characteristics = $state([{name:"DES",value:0},{name:"INT",value:0},{name:"VIG",value:0},{name:"VOL",value:0}]);
    let standardStatSpread = $state(["Tuttofare: d8,d8,d8,d8","Standard: d10,d8,d8,d6","Specializzato: d10,d10,d6,d6"])
//Seconda Box

//Terza Box

//Quarta Box

//Quinta Box

</script>
<div class="grid grid-cols-2 gap-4">
    <!-- Prima Box: Selettore di Caratteristiche -->
    <GeneratorBox nameTag={"Caratteristiche"}>
        <div class=" grid grid-cols-2 p-2">
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
                    Quando il Personaggio raggiunge i livelli 20 e 40, il giocatore può aumentare una caratteristica a scelta di 1 taglia di dado
                </div>
            </section>
        </div>
    </GeneratorBox>

    <!-- Seconda Box: Statistiche Personaggio -->
    <GeneratorBox nameTag={"Statistiche Personaggio"}>
        <div>
            <!-- creare con un {#each} i componenti per modificare PV PM e PI -->            
        </div>
    </GeneratorBox>

    <!-- Terza Box: Affinità Elementali -->
    <GeneratorBox nameTag={"Affinità elementali"}>
        <div>
            
        </div>
    </GeneratorBox>
    
    <!-- Quarta Box: Status -->
    <GeneratorBox nameTag={"Status"}>
        <div>
            
        </div>
    </GeneratorBox>

    <!-- Quinta Box: Modifiche Manuali -->
    <GeneratorBox nameTag={"Modifica Manuale delle Statistiche"}>
        <div>
            
        </div>
    </GeneratorBox>

</div>