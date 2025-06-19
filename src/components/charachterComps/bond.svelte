<script lang="ts">
    import { faCancel } from "@fortawesome/free-solid-svg-icons";
    import RunesButton from "../customHTMLElements/runesButton.svelte";

    let {bondName= $bindable(""), bonds = $bindable([]), onDelete = ()=>{} } = $props();

    const BOND_RELATIONS = ["Ammirazione","Lealtà","Affetto","Inferiorità","Sfiducia","Odio"];

    //mettere in file ts
    function getEquivalentBond(bond:string){
        
        switch(bond){
            case "Ammirazione":return"Inferiorità";
            case "Lealtà": return "Sfiducia";
            case "Affetto": return "Odio";
            case "Inferiorità": return "Ammirazione";
            case "Sfiducia":return "Lealtà";
            case "Odio": return "Affetto";
        }
        return "";
    }

    function handleDelete() {
        console.log("entra");
        onDelete(); // Chiama la funzione del padre
    }
</script>

<div>
    <!-- Riga 1: Nome Legame -->
    <span class="flex items-center justify-center gap-2 py-2">
        <RunesButton dimensions="w-auto h-auto" color="" icon={faCancel} clickFun={handleDelete}/>
        
        <input class="border rounded" placeholder="Nome Legame" bind:value={bondName}>
    </span>

    <!-- Riga 2: Tipo di Legame -->
    <section class=" grid grid-cols-3 py-3">
        {#each BOND_RELATIONS as relation}
            <span class="flex items-center justify-start w-auto gap-2 px-2">
                <input type="checkbox" bind:group={bonds} value={relation} disabled={bonds.includes(getEquivalentBond(relation)) ? true : false}>
                {relation}
            </span>  
        {/each}
    </section>
</div>