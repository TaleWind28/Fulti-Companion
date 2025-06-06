<script>
    let {nameTag = "undefinedNameTag", imageProcessor ,children} = $props();
</script>

<div  class="grid grid-cols-2 gap-4 p-4">
    <!-- Generator -->
    <div>
        <!-- nameTag -->
        <div class="border bg-cafe_noir-700">
            {nameTag}
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