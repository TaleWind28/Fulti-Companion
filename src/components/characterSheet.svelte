<script lang="ts">
    import { faCoins, faDiceFive, faFeather, faStar } from "@fortawesome/free-solid-svg-icons";
    import CharacterCard from "./characterCard.svelte";
    import CustomButton from "./customButton.svelte";
    import type { Tab } from "$lib/utility";
    import InfoSheet from "./infoSheet.svelte";
    import Fa from "svelte-fa";

    //Prop richiesti
    let { character } = $props();
    
    console.log(character,"characterSheet");
    //Tabs che rappresentano le due schede: Informativa e Battaglia
    let tabs:Tab[] = [
        //InfoSheet
        {
            id:0,
            label:"InfoSheet",
            comp:InfoSheet,
            props:{
                statusArray:character.statuses,
                bonds:character.bonds
            }
        },
        //BattleSheet
        {
            id:1,
            label:"BattleSheet",
            comp:CharacterCard,
            props: {
                car: character,
                hidden:false
            }
        }
    ];
    //rendere un tuoi/classe perchè così fa pena
    let item = ["Punti Fabula","Punti Esperienza","Zenit"];
    let item2 = [0,0,0];
    let item3 = [faFeather,faStar,faCoins];

    //variabili reattive per rendering della scheda richiesta
    let index = $state(0);
    let ActiveComponent = $derived(tabs[index].comp);
    let activeProps = $derived(tabs[index].props);
    console.log(character.bonds);

</script>


<div class="flex flex-col gap-6">
    <!-- CharacterCard -->
    <CharacterCard car ={character} hidden={true}/>
    
    <!-- Barra Punti -->
    <div class="flex items-center justify-evenly border-2 border-amber-50 bg-amber-50 rounded">   
        {#each {length:3}, i}
            <div class="flex items-center gap-2">
                <span class="flex gap-2">
                    <p class=" font-bold">
                        {item[i]}:
                    </p>
                    {item2[i]}
                    
                </span>
                <Fa icon={item3[i]}></Fa>
            </div>
        {/each}
    </div>
    <!-- Barra intermedia -->
    <span class="flex items-center justify-center gap-4">
        <!-- Pulsante per rendering dinamico tra schede  -->
        <CustomButton text="Mostra Scheda di Battaglia" dimensions="w-200 h-8" color="bg-cafe_noir-600" on:click={() => {
            switch(index){
                case 0: index = 1;break;
                case 1: index = 0;break;
            }
            }}/>
        <!-- Pulsante Dice Roller -->
        <CustomButton text="roll" dimensions="w-15 h-8" color="bg-cafe_noir-600" textIcon={true} icon={faDiceFive}/>
    </span>

    <!-- Componente Dinamico per visualizzazione Scheda -->
    <div class="flex  justify-center gap-4">
        <ActiveComponent {...activeProps}/> 
    </div>

</div>

