<script lang="ts">
    import Traits from "./traits.svelte";
    import InfoBox from "./infoBox.svelte";
    let { traits, bonds} = $props();

    let slow = $state(false);
    let dazed = $state(false);
    let weak = $state(false);
    let shaken = $state(false);
    let enraged = $state(false);
    let poisoned = $state(false);
    let statusArray = $state([false,false,false,false,false,false]);
    let status = ["Lento","Furente","Confuso","skip","Scosso","Avvelenato","Debole"]

    
</script>

<div class="flex flex-col gap-y-4 ">
    
    <!-- Status -->
    <InfoBox dimension = "w-220"  background = "bg-amber-50">
        {#snippet headerName()} STATUS{/snippet}
        <div class=" grid grid-rows-4 grid-cols-2 gap-x-100 mx-20">
            {#each {length:7}, i }
                <div class="flex">
                    {#if status[i]!=="skip"}
                    <input type="checkbox" bind:checked={statusArray[i]}>
                    <p class="font-bold">{status[i]}</p>
                    {/if}
                </div>
            {/each}
        </div>
        
    </InfoBox>
    
    <!-- Legami -->
    <InfoBox dimension = "w-220" background = "bg-amber-50">
        {#snippet headerName()} LEGAMI {/snippet}
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
</div>


