<script>
    let {nameTag = "undefinedNameTag", imageProcessor= null,additionalHeaderThings= null,additionalStyle = "" ,nameTagStyle ="",children} = $props();
</script>

{#if imageProcessor !== null}
    <div  class="grid grid-cols-2 gap-4 p-4">
        <!-- Generator -->
        <div>
            <!-- nameTag -->
            <div class="border bg-cafe_noir-700 px-2">
                <p class={nameTagStyle}>{nameTag}</p>
            </div>

            <!-- children passato dal chiamante -->
            <div class="bg-white">
                {@render children?.()}
            </div>

        </div>

        <!-- Generated Image -->
        
        <div>
            {@render imageProcessor?.()}
        </div>
        
    </div>
{:else}
    <div>
            <!-- nameTag -->
            <div class="border bg-cafe_noir-700 px-2 {additionalStyle}">
                <p class={nameTagStyle}>{nameTag}</p>
                {@render additionalHeaderThings?.()}
            </div>

            <!-- children passato dal chiamante -->
            <div class="bg-white">
                {@render children?.()}
            </div>

        </div>
{/if}
