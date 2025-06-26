<script lang="ts">
    import { faCoins, faFeather, faStar } from "@fortawesome/free-solid-svg-icons";
    import CharacterCard from "../charachterComps/characterCard.svelte";

    import Fa from "svelte-fa";
   
    //Prop richiesti
    let { character } = $props();
    
    //rendere un tuoi/classe perchè così fa pena
    let item = ["Punti Fabula","Punti Esperienza","Zenit"];
    let item2 = [character.fabulaPoints,character.exp,character.zenit];
    let item3 = [faFeather,faStar,faCoins];
    
    $inspect(character,character.zenit,character.exp,character.fabulaPoints,"[CharacterSheet] personaggio");

</script>


<div class="flex flex-col gap-6">
    <!-- CharacterCard -->
    <CharacterCard bind:car={character} hidden={true}/>
    
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
</div>

