<script>
    let {headerName, dimension, background,children} = $props();
</script>

<article>
    <div class="border rounded flex {dimension} {background}">
        {#if headerName}
            <span class="bg-cafe_noir text-white  px-1 py-1 rounded flex-shrink-0 [writing-mode:vertical-lr] rotate-180 text-center h-25">
                {@render headerName()}
            </span>
        {:else}
            <span class="missing">
                Unknown name
            </span>
        {/if}
        <div class="flex items-center justify-center">
            {@render children?.()}
        </div>
    </div>
</article>
