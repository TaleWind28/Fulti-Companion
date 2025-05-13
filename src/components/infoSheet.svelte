<script lang="ts">
    import Traits from "./traits.svelte";
    import InfoBox from "./infoBox.svelte";
    let { traits, bonds} = $props();

    
</script>

<div class="flex flex-col gap-y-4 ">
    <InfoBox dimension = "w-220" background = "bg-amber-50">
        {#snippet headerName()} TRATTI {/snippet}
        <Traits {...traits}/>
    </InfoBox>
    <InfoBox dimension = "w-220" background = "bg-amber-50">
        {#snippet headerName()} Legami {/snippet}
        <div class="px-8 grid grid-cols-2 {`grid-rows-${Math.floor(bonds.lenght)}`} justify-between items-center gap-4">
            {#each bonds as bond }
                <span class="flex gap-2"><p class="font-bold">{bond.name}:</p> 
                {#each bond.bonds as type}
                    <p class={`${(type === 'Ammirazione' || type === 'Lealtà' || type === 'Affetto') ? 'text-green-800 font-bold' : 'text-red-800 font-bold'}`}>
                        {type}
                    </p>
                {/each}
                </span>
            {/each}
        </div>

    </InfoBox>
    <InfoBox dimension = "w-220" background = "bg-amber-50">
        {#snippet headerName()} Status {/snippet}
        <Traits {...traits}/>
    </InfoBox>
</div>


