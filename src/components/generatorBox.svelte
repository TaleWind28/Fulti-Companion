<script>
    let {nameTag = "undefinedNameTag", children} = $props();
</script>

<div>
    <div class=" flex flex-rows gap-4">

        <!-- Generator -->
        <div class="border">
            <!-- nameTag -->
            <div class="border bg-cafe_noir-700 ">
                {nameTag}
            </div>

            <!-- children passato dal chiamante -->
            <div class=" flex">
                {@render children?.()}
            </div>

        </div>

        <!-- Generated Image -->
        <div class="border">
            pippo
        </div>
    
    </div>
</div>