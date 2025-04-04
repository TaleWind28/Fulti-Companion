<script lang="ts">
    interface gridElement{
        iconUri:string
        title:string;
        description:string
    }
    export let grid:gridElement[] = [];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each grid as elem}
        <div class="bg-white p-4 rounded-lg shadow aspect-square">
            <p class="flex justify-center"><img src={elem.iconUri} alt="immagine" class="object-contain"></p>
            <h3 class="font-bold text-2xl">{elem.title}</h3>
            <br>
            <p class="flex-grow">{elem.description}</p>
        </div>
    {/each}
</div>