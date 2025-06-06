<script>
    let {headerName, flipped = true,dimension, background,children} = $props();
</script>

<article>
    <div class="border rounded flex {dimension} {background}">
        {#if headerName && flipped}
            <span class="bg-cafe_noir text-white  px-1 py-1 rounded flex-shrink-0 [writing-mode:vertical-lr] rotate-180 text-center h-25">
                {@render headerName()}
            </span>
            <div class="flex items-center justify-center">
                {@render children?.()}
            </div>

            {:else}
            <span class="">
                {@render headerName()}
                {@render children?.()}
            </span>
        
            {/if}
            </div>
</article>
