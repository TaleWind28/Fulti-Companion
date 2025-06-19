<script lang="ts">
    import { faCancel } from "@fortawesome/free-solid-svg-icons";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    let {bond = {name:"porcodio"}} = $props();

    const BOND_RELATIONS = ["Ammirazione","Lealtà","Affetto","Inferiorità","Sfiducia","Odio"];
    let bondGroup1 = $state(false);

</script>

<div>
    <!-- Riga 1: Nome Legame -->
    <span class="flex items-center justify-center gap-2 py-2">
        <RunesButton dimensions="w-auto h-auto" color="" icon={faCancel} clickFun={()=>{console.log("Cancella Legame")}}/>
        <input class="border rounded" placeholder="Nome Legame" bind:value={bond.name}>
    </span>

    <!-- Riga 2: Tipo di Legame -->
    <section class=" grid grid-cols-3 py-3">
        {#each BOND_RELATIONS as relation}
            <span>
                <input type="checkbox" bind:group={bondGroup1}>
                {relation}
            </span>  
        {/each}
    </section>

</div>