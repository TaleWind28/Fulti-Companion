<script lang="ts">
    import type { Item } from "$lib/types";
    import Modal from "./modal.svelte";
    let { itemList,selector = $bindable(), selectedItem = $bindable(), isOpen = $bindable() } = $props();
    
    function selectItem(item:Item) {
        console.log("selezione item: "+ item.name);
        selectedItem = item; // Questo dovrebbe triggerare la reattività
        isOpen = false;
    }
    $inspect(selector,"ModalSelector");
</script>


 <div class="relative">   
    <!-- <input placeholder="Armi" bind:value={isOpen}> -->
        <button onclick={() => isOpen = !isOpen}>
            {selectedItem.name}
        </button>     <!-- Lista a comparsa per scegliere il tipo di arma su cui basare la creazione -->
        <Modal modalText="none" bind:showModal = {isOpen} relative={true} ariaLabel="Menu opzioni"  ariaDescribedBy="menu-description">
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



