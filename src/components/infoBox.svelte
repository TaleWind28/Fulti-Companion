<script>
    let {headerName, children} = $props();
</script>

<article>
    <h2>
        {#if headerName}
            <span>{@render headerName()}</span>
        {:else}
            <span class="missing">Unknown name</span>
        {/if}
    </h2>
    {@render children()}
</article>