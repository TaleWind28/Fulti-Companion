<script lang="ts">
    import InfoBox from "./infoBox.svelte";
    let { statusArray = $bindable(), bonds} = $props();

    let status = ["Lento","Furente","Confuso","skip","Scosso","Avvelenato","Debole"];
    $inspect(bonds,"bonds Raw");
    function getTrueBonds(bondObject:any[]) {
        $inspect(bondObject);
        if (bondObject == undefined) return null;
        let bonding = [];
        $inspect(bondObject,"bobj")  
        for(let i = 0;i<bondObject.length;i++){
            // $inspect(bondObject[i],"mio");
            // $inspect(bondObject[i].bonds,"dentro for");
            // $inspect(Object.entries(bondObject[i].bonds).filter(([key,value]) => key!== 'name' && value === true),"filter");
            // $inspect(bondObject[i].bonds, "obj");
            bonding.push({
                    name: bondObject[i].name,
                    bond: Object.entries(bondObject[i].bonds).filter(([key,value]) => key!== 'name' && value === true).map( ([key]) => key )
                })
        }
        return bonding;    
    }

    let trueBonds = getTrueBonds(bonds);
    $inspect(trueBonds, "legami");
</script>

<div class="flex flex-col gap-y-4 ">
    
    <!-- Status -->
    <InfoBox dimension = "w-220"  background = "bg-amber-50">
        {#snippet headerName()} STATUS{/snippet}
        <div class=" grid grid-rows-4 grid-cols-2 gap-x-100 mx-20">
            {#each {length:7}, i }
                <div class="flex gap-x-4 ">
                    {#if status[i]!=="skip"}
                        <input type="checkbox" bind:checked={statusArray[i]} >
                        <p class="font-bold">{status[i]}</p>
                    {/if}
                </div>
            {/each}
        </div>
        
    </InfoBox>

    <!-- Legami -->
    {#if trueBonds}
        <InfoBox dimension = "w-220" background = "bg-amber-50">
            {#snippet headerName()} LEGAMI {/snippet}
                <div class="px-8 grid grid-cols-3 {`grid-rows-${Math.floor(bonds.lenght)}`} justify-evenly items-center gap-4">
                    {#each trueBonds as tBond }
                        <span class="flex">
                            <p class="font-bold mx-2">{tBond.name}:</p> 
                            {#each tBond.bond as elem, index}
                                <span class="flex">
                                        <p class={`${(elem === "affection" || elem ==="loyality" || elem ==="admiration" ) ? 'text-green-800 font-bold' : 'text-red-800 font-bold'}`}>
                                            {elem.toLocaleUpperCase()}
                                        </p>
                                        {#if index<tBond.bond.length-1}
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


