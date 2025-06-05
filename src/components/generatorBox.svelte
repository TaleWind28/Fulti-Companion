<script>
    let {nameTag = "undefinedNameTag", imageProcessor ,children} = $props();
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
            <div class=" flex bg-white">
                {@render children?.()}
            </div>

        </div>

        <!-- Generated Image -->
        <div class="border">
           {@render imageProcessor?.()}
        </div>
        
    </div>
</div>