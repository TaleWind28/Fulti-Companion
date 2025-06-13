<script>
    import ModalSelector from "./modalSelector.svelte";
    let {selector} = $props();
    
</script>
<div class="flex flex-row gap-5 justify-between items-center w-full">
            
            {#each selector as singleSelector}
                <span class="border rounded flex-1 max-w-32">
                    <ModalSelector selector={singleSelector} itemList={selector.itemList} bind:selectedItem={selector.selectedBind} bind:isOpen={selector.modalShower}/>
                </span>
            {/each}
        </div>