<script lang="ts">
    import InfoBox from "./infoBox.svelte";
    let { statusArray, bonds} = $props();

    let status = ["Lento","Furente","Confuso","skip","Scosso","Avvelenato","Debole"]
    


    function handleChange(){
        console.log(statusArray);
        return undefined;
    }
</script>

<div class="flex flex-col gap-y-4 ">
    
    <!-- Status -->
    <InfoBox dimension = "w-220"  background = "bg-amber-50">
        {#snippet headerName()} STATUS{/snippet}
        <div class=" grid grid-rows-4 grid-cols-2 gap-x-100 mx-20">
            {#each {length:7}, i }
                <div class="flex gap-x-4 ">
                    {#if status[i]!=="skip"}
                    <input type="checkbox" bind:checked={statusArray[i]} onchange={handleChange()}>
                    <p class="font-bold">{status[i]}</p>
                    {/if}
                </div>
            {/each}
        </div>
        
    </InfoBox>

    <!-- Legami -->
    {#if bonds}
        <InfoBox dimension = "w-220" background = "bg-amber-50">
            {#snippet headerName()} LEGAMI {/snippet}
                <div class="px-8 grid grid-cols-2 {`grid-rows-${Math.floor(bonds.lenght)}`} justify-between items-center gap-4">
                    {#each bonds as bond }
                        {@const trueBonds = Object.entries(bond.bond).filter(([_, value]) => value === true).map(([key]) => key)}
                        <span class="flex">
                            <p class="font-bold mx-2">{bond.name}:</p> 
                            {#each trueBonds as key, index}
                                <span class="flex">
                                        <p class={`${(key === "affection" || key ==="loyality" || key ==="admiration" ) ? 'text-green-800 font-bold' : 'text-red-800 font-bold'}`}>
                                            {key.toLocaleUpperCase()}
                                        </p>
                                        {#if index < trueBonds.length-1}
                                            <p>,</p>
                                        {/if}
                                </span>
                            {/each}
                        </span>
                    {/each}
                </div>    
        </InfoBox>
    {/if}
</div>


