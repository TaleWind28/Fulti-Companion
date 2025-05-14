
<script lang="ts">
    import { fade } from "svelte/transition";

	let { showModal = $bindable(), modalText, children, divStyle = "m-auto" } = $props();

	let modalVisible = $derived(showModal);

	function closeModal() {
		showModal = false;
	}

	function handleOverlayClick(e:any) {
		if (e.target === e.currentTarget) closeModal();
	}

	function handleOverlayKey(e:any) {
		if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
			e.preventDefault();
			closeModal();
		}
	}
	
</script>


{#if modalVisible}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		role="button"
		tabindex="0"
		onclick={handleOverlayClick}
		onkeydown={handleOverlayKey}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}
	>
		<!-- Modal box -->
		<div
			class={`bg-white rounded-md p-4 shadow-lg ${divStyle}`}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
		>
			{@render children?.()}

			<button
				class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				onclick={closeModal}
			>
				{modalText}
			</button>
		</div>
	</div>
{/if}