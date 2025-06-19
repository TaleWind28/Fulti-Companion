<script lang="ts">
    import type { Item } from "$lib/types";
    import Modal from "./modal.svelte";
    let { 
        itemName, 
        itemList, 
        selectedItem = $bindable(), 
        isOpen = $bindable(), 
        dimensions = "w-auto h-auto",
        maxVisibleItems = 5
    } = $props();
    
    // Calcola l'altezza dinamicamente (circa 40px per elemento)
    let maxHeight = $derived(`${maxVisibleItems * 40}px`);
    
    function selectItem(item: Item) {
        console.log("selezione item: " + item.name);
        selectedItem = item;
        isOpen = false;
    }
</script>

<div class="relative">   
    <button onclick={() => isOpen = !isOpen} class="{dimensions}">
        {itemName}
    </button>
    
    <Modal modalText="pino" bind:showModal={isOpen} relative={true} ariaLabel="Menu opzioni" ariaDescribedBy="menu-description">
        <div class="overflow-y-auto border border-gray-300 rounded" style="max-height: {maxHeight}">
            <ul class="divide-y divide-gray-200">
                {#each itemList as item}
                    <li>
                        <button 
                            onclick={() => selectItem(item)}
                            class="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                            {item.name}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    </Modal>
</div>