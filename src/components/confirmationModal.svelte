<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let title: string = 'Conferma';
    export let message: string = 'Sei sicuro di voler procedere?';
    export let confirmButtonText: string = 'Conferma';
    export let cancelButtonText: string = 'Annulla';
    export let isProcessing: boolean = false; // Per disabilitare i bottoni durante l'attesa

    const dispatch = createEventDispatcher<{ confirm: void; cancel: void }>();

    function handleConfirm() {
        if (!isProcessing) {
            dispatch('confirm');
        }
    }

    function handleCancel() {
        if (!isProcessing) {
            dispatch('cancel');
        }
    }

    // Opzionale: chiudi il modale se si preme il tasto Esc
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            handleCancel();
        }
    }
</script>

<!-- Listener per il tasto Esc -->
<svelte:window on:keydown={handleKeydown}/>

<!-- Overlay scuro per lo sfondo -->
<div
    class="fixed inset-0 bg-opacity-60 z-40 flex justify-center items-center p-4"
    on:click={handleCancel}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-message">
    <!-- Contenitore del Modale (impedisce la chiusura cliccando qui dentro) -->
    <div
        class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full z-50"
        on:click|stopPropagation
    >
        <h3 id="modal-title" class="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p id="modal-message" class="text-gray-600 mb-6">{message}</p>

        <div class="flex justify-end gap-3">
            <button
                on:click={handleCancel}
                disabled={isProcessing}
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
                {cancelButtonText}
            </button>
            <button
                on:click={handleConfirm}
                disabled={isProcessing}
                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
                {#if isProcessing}
                    <!-- Semplice spinner SVG per indicare il caricamento -->
                    <svg class="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Attendere...
                {:else}
                    {confirmButtonText}
                {/if}
            </button>
        </div>
    </div>
</div>