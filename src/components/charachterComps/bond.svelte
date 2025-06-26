<script lang="ts">
    import { faCancel } from "@fortawesome/free-solid-svg-icons";
    import RunesButton from "../customHTMLElements/runesButton.svelte";

    let {bondName= $bindable(""), bonds = $bindable({}), onDelete = ()=>{} } = $props();

    const BOND_RELATIONS = ["Ammirazione","Lealtà","Affetto","Inferiorità","Sfiducia","Odio"];

    //mettere in file ts
    function getEquivalentBond(bond:string):string{
        
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
    
    $inspect(bonds,"legami in Bonds.svelte");

    // Mapping da italiano a inglese per le chiavi dell'oggetto
    function translateBond(bond:string):string{
        
        switch(bond){
            case "Ammirazione": return "admiration";
            case "Lealtà": return "loyality";
            case "Affetto": return "affection";
            case "Inferiorità": return "inferiority";
            case "Sfiducia": return"mistrust";
            case "Odio": return"hatred"
        }
        return "";
    }

     // Funzione per verificare se un bond equivalente è già presente
    function isEquivalentBondPresent(relation: string): boolean {
        const equivalent = getEquivalentBond(relation);
        const equivalentKey = translateBond(equivalent);
        return bonds[equivalentKey] === true;
    }

    // Funzione per ottenere la chiave inglese dal nome italiano
    function getBondKey(relation: string): string {
        return translateBond(relation);
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
                <input 
                    type="checkbox" 
                    bind:checked={bonds[getBondKey(relation)]}
                    disabled={isEquivalentBondPresent(relation)}
                >
                {relation}
            </span>  
        {/each}
    </section>
</div>