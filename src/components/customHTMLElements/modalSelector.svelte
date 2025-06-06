<script lang="ts">
    import type { Item } from "$lib/types";
    import Modal from "./modal.svelte";
    let { itemName, itemList, selectedItem = $bindable(), isOpen = $bindable() } = $props();
    
    function selectItem(item:Item) {
        selectedItem = item; // Questo dovrebbe triggerare la reattività
        isOpen = false;
    }
</script>


 <div class="relative">   
    <!-- <input placeholder="Armi" bind:value={isOpen}> -->
        <button onclick={() => isOpen = !isOpen}>
            {itemName}
        </button>     <!-- Lista a comparsa per scegliere il tipo di arma su cui basare la creazione -->
        <Modal modalText="pino" bind:showModal = {isOpen} relative={true}>
            <ul>
                {#each itemList as item }
                    <li>
                        <button onclick={() => selectItem(item)}>
                            {item.name}
                        </button>
                    </li>
                {/each}
            </ul>
        </Modal>
    </div>



