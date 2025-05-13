<script lang="ts">
    import { faDiceFive } from "@fortawesome/free-solid-svg-icons";
    import CharacterCard from "./characterCard.svelte";
    import CustomButton from "./customButton.svelte";
    import type { Tab } from "$lib/utility";
    import Traits from "./traits.svelte";
    import InfoSheet from "./infoSheet.svelte";
    import type { Component } from "svelte";
    

    let {character} = $props();
    console.log(character,"characterSheet");
    let tabs:Tab[] = [
        {
            id:0,
            label:"InfoSheet",
            comp:Traits,
            props:{
                identity: character.traits[0],
                    theme: character.traits[1],
                    origin: character.traits[2]
            }
        },
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
    let index = $state(0);
    let traits = {
        identity: character.traits[0],
        theme: character.traits[1],
        origin: character.traits[2]
    }

    let childProp ={
        traits:{
             identity: character.traits[0],
            theme: character.traits[1],
            origin: character.traits[2]
        },
        bonds:[{
                name:"Vorston",
                bonds:['Inferiorità','Lealtà','Odio']
            },
            {
                name:"Shuraigh",
                bonds:['Ammirazione','Sfiducia','Affetto']
            },
            {
                name:"Victor",
                bonds:['Ammirazione','Sfiducia','Odio'] 
            }
        ]
    }
    // let selected = $state(0);
    // let ActiveComponent:any = $derived(tabs[selected].comp);
    // let activeProps:any = $derived(tabs[selected].props);

    let ActiveComponent = $derived(tabs[index].comp);
    let activeProps = $derived(tabs[index].props);
    //let msg = Module '"./characterCard.svelte"' has no exported member 'traits'. Did you mean to use 'import traits from "./characterCard.svelte"' instead
</script>

<div class="flex flex-col gap-6">
    <CharacterCard car ={character} hidden={true}/>
    <div class="flex items-center justify-evenly border-2 border-amber-50 bg-amber-50 rounded">   
        <span class="flex gap-2">
            <p class=" font-bold">
                Punti Fabula:
            </p>
            0
        </span>
        <span class="flex gap-2">
            <p class=" font-bold"> Punti Esperienza: </p>
            0
        </span>
        <span class="flex gap-2">
            <p class=" font-bold">
                Zenit:
            </p>
            0
        </span>
    </div>
        <span class="flex items-center justify-center gap-4">
            <CustomButton text="Mostra Scheda di Battaglia" dimensions="w-200 h-8" color="bg-cafe_noir-600" on:click={() => {
                switch(index){
                    case 0: index = 1;break;
                    case 1: index = 0;break;
                }
                }}/> 
            <CustomButton text="roll" dimensions="w-15 h-8" color="bg-cafe_noir-600" textIcon={true} icon={faDiceFive}/>
        </span>

        <div class="flex  justify-center gap-4">
            <!-- <div>
                <ActiveComponent {...activeProps}></ActiveComponent>
            </div> -->
            <!-- identity = {traits.identity} theme= {traits.theme} origin = {traits.origin} -->
            <InfoSheet {...childProp}/>
            
        </div>
        <!-- <ActiveComponent {...activeProps}/> -->
</div>

