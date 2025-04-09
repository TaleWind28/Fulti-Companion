<script lang="ts">
    import Fa from 'svelte-fa'
    import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
    
    interface gridElement{
        icon:IconDefinition;
        iconColor:string
        title:string;
        description:string
    }
    export let grid:gridElement[] = [];
    
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 sm:mx-0">
    {#each grid as elem}
        <div class="bg-white p-3 rounded-lg shadow flex flex-col justify-center">
            <Fa class="flex {elem.iconColor} text-2xl " icon={elem.icon}/>
            <br>
            <h3 class="font-bold text-xl">{elem.title}</h3>

            <p class="flex-grow">{elem.description}</p>
        </div>
    {/each}
</div>