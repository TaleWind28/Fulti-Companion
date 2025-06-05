<script>
    import Modal from './modal.svelte';
    let { isOpen = $bindable(),itemName, itemList, selectedItem } = $props();

</script>


 <div class="relative">   
    <!-- <input placeholder="Armi" bind:value={isOpen}> -->
         <button onclick={() => {switch(isOpen){case true: isOpen = false;return; case false: isOpen = true; return;}}}> {itemName}</button>
        <!-- Lista a comparsa per scegliere il tipo di arma su cui basare la creazione -->
        <Modal modalText="pino" bind:showModal = {isOpen} relative={true}>
            <ul>
                {#each itemList as item }
                    <li>
                        <button onclick={() => {selectedItem = item; isOpen = false}}>
                            {item.name}
                        </button>
                    </li>
                {/each}
            </ul>
        </Modal>
    </div>
