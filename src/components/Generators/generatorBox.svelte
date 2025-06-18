<script>
    let {nameTag = "undefinedNameTag", imageProcessor, generateImage= true ,children} = $props();
</script>

<div  class="grid grid-cols-2 gap-4 p-4">
    <!-- Generator -->
    <div>
        <!-- nameTag -->
        <div class="border bg-cafe_noir-700 px-2">
            {nameTag}
        </div>

        <!-- children passato dal chiamante -->
        <div class="bg-white">
            {@render children?.()}
        </div>

    </div>

    <!-- Generated Image -->
    
    {#if generateImage}
        <div>
            {@render imageProcessor?.()}
        </div>
    {/if}
    
</div>
