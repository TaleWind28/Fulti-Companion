<script lang="ts">
    import CustomInput from "../../components/customInput.svelte";
    import Pippo from "../../components/Pippo.svelte";
    import {Tabs} from "$lib/utility";
    import Traits from "../../components/traits.svelte";
    import RunesButton from "../../components/runesButton.svelte";
    let show = $state(0)

    let tabs = new Tabs([{
        id:0,
        label:"Informazioni",
        comp: RunesButton,
        props:{
            text:"Default Text",
            style :"cursor-pointer rounded",
            additionalStyle:"text-white",
            color:"bg-blue-500",
            dimensions:"w-24 h-8",
            icon:undefined,
            textIcon:"false",
            iconStyle:"",
        }
    },{
        id:1,
        label:"Statistiche",
        comp: Traits,
        props:{
            identity:"Michele",
            theme:"vuole",
            origin:"morire"
        }
    }
    ,{
        id:2,
        label:"Classi",
        comp: CustomInput,
    }
    ,{
        id:3,
        label:"Incantesimi",
        comp: CustomInput,
    },{
        id:4,
        label:"Equipaggiamento",
        comp: CustomInput,
    },{
        id:5,
        label:"Note",
        comp: CustomInput,
    }]);
    let ActiveComponent = $derived(tabs.tabs[show].comp);
    let activeProps = $derived(tabs.tabs[show].props);

    let props = $state({
        text:"topolino"
    });

    $effect(()=> {
        if(show!=0)props.text = "pluto";
        else props.text = "topolino";
    })
    

</script>
<div class="flex justify-center rounded items-center bg-cafe_noir-700 gap-6 p-3 mx-80 my-10">
    {#each tabs.tabs as tab }
        <button class={`${show === tab.id ? 'bg-red-500' : ''}`} onclick={() => (show= tab.id)}> {tab.label} </button>
    {/each}
</div>
<div class="pb-200 justify-center items-center">
    <ActiveComponent {...activeProps}></ActiveComponent>
</div>
