<script lang="ts">
    import { type Character } from "$lib/utility";
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

    import { faBoltLightning, faFire, faHillRockslide, faHorse, faKhanda, faRunning, faShield, faSkullCrossbones, faSnowflake, faSun, faWandMagicSparkles, faWind } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let dimensions ="";
    export let padding = "";
    //script typescript per importare i personaggi dal database
    export let caracters:Character[] = [];

    export let elementalIcons = [ faKhanda,faWind, faBoltLightning, faHorse, faHillRockslide,faFire, faSnowflake,faSun, faSkullCrossbones]
    export let elemenColor = ["text-gray-400","text-green-500","text-yellow-500","","text-amber-900","text-red-500","text-blue-500","text-cafe_noir-800","text-purple-700"]
</script>

<br>
<div class="{dimensions} {padding} flex grid-cols-2 gap-4">
    {#each caracters as car}    
        <div class= "bg-white rounded">

            <!--nome e livello-->
            <header class="bg-cafe_noir-600 flex items-center justify-around text-white text-2xl" >
                <div>{car.name}</div>
                <div>LV {car.level}</div>
            </header>

            <!-- Character Info-->
            <div class="flex flex-row gap-2">
                <!-- lato sx-->
                <div class="bg-white flex-col">
                    <!-- Avatar --> 
                    <img src={car.pic} alt="character pic" class=" border border-white w-70 h-70">
                    <!-- Information Bars-->
                    <div class="flex  flex-col justify-start items-start">
                        <div>   
                            {@render progressiveBar("bg-red-500",60,60)}
                        </div>
                        <div>   
                            {@render progressiveBar("bg-blue-500",60,60)}
                        </div>
                        <div>   
                            {@render progressiveBar("bg-gray-500",60,60)}
                        </div>
                    </div>
                </div>

                <!-- lato dx-->
                <div class="bg-white px-4 gap-4">
                    <br>
                    <!-- tratti -->
                    <div class="border rounded flex ">
                        <p class="bg-cafe_noir text-white  px-1 py-1 rounded flex-shrink-0 [writing-mode:vertical-lr] rotate-180 text-center">
                            TRATTI
                        </p>
                        <div class="flex items-center justify-around px-2">
                            {@render traits(car.traits)}
                        </div>
                    </div>
                    <br>
                    <!-- stats -->
                    <div class="flex items-center justify-around px-4 text-2xl">
                        <p>Des: d{car.stats[0]}</p>
                        <p>Int: d{car.stats[1]}</p>
                        <p>Vig: d{car.stats[2]}</p>
                        <p>Vol: d{car.stats[3]}</p>
                    </div>
                    <br>
                    <!-- statistiche difensive-->
                    <span class=" flex items-center justify-between px-4">
                        {@render derivedStats("DEF",car.stats[0],faShield, faKhanda)}
                        {@render derivedStats("MDEF",car.stats[1],faShield, faWandMagicSparkles)}
                        {@render derivedStats("INIT",0,faRunning, null)}
                    </span>
                    <br>
                    <!-- affinità elementale-->
                    <footer class="flex justify-end items-end">
                        {@render affinityTable(car, elementalIcons, elemenColor)}
                    </footer>
                </div>
            </div>
        </div>
    {/each}
</div>

{#snippet affinityTable(character:Character, elements:IconDefinition[], elementsColour:string[])}
    
    <div class="grid grid-cols-9 border">
        {#each character.elementalAffinity as elem, i }
            <div class="border flex flex-row justify-around">
                <Fa icon= {elements[i]} class={elementsColour[i]}/>
            <div>
                {#if elem == 1}
                    res
                {:else if elem ==2}
                    im
                {/if}
            </div>
            </div>
        {/each}
    </div>

{/snippet}

{#snippet traits(traits:string[])}
    <div>
        <div>
            Identità:{traits[0]}
        </div>
        <div class="flex items-center justify-evenly">
            <p>Tema:{traits[1]}</p>
            <p>Origine:{traits[2]}</p>
        </div>
    </div>
{/snippet}

{#snippet iconComposer(icon1:IconDefinition, icon2:IconDefinition | null)}
    <span class="relative inline-block">    
        <Fa icon={icon1} class="text-4xl " />
        {#if icon2 !== null}
            <Fa icon={icon2} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white" />
        {/if}
    </span>
{/snippet}

{#snippet derivedStats(statName:string, stat:number, icon:IconDefinition, innerIcon:IconDefinition | null)}
    <div>
        {@render iconComposer(icon, innerIcon)}
        <p>{statName}: {stat}</p>
    </div>
{/snippet}

{#snippet progressiveBar(color:string, actual:number, fixed:number)}
    <div class="{color} w-70 flex items-center justify-center">
        {actual}/{fixed}
    </div>
{/snippet}  