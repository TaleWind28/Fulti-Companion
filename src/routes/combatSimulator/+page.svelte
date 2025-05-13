<!-- Combat Simulator -->


<script lang="ts">
    import {Tabs} from "$lib/utility";
    import RunesTab from "../../components/runesTab.svelte";
    import Traits from "../../components/traits.svelte";
    import CustomInput from "../../components/customInput.svelte";


    let tabs = new Tabs([{
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
    

</script>

<RunesTab tabs = {tabs.tabs}></RunesTab>
