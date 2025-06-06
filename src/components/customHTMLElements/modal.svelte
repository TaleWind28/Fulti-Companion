
<script lang="ts">
    import { fade } from "svelte/transition";

	let { showModal = $bindable(), count = $bindable(), modalText,relative = false ,divPosition = "flex items-center justify-center", children, divStyle = "m-auto" } = $props();

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
	<!-- Modal container - cambia solo le classi CSS basandosi su relative -->
	<div
		class={relative 
			? "absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-max" 
			: "fixed inset-0 z-50 " + divPosition}
		role="button"
		tabindex="0"
		onclick={handleOverlayClick}
		onkeydown={handleOverlayKey}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}
	>
		<!-- Modal content -->
		<div
			class={relative 
				? "p-2" 
				: `bg-white rounded-md p-4 shadow-lg ${divStyle}`}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
		>
			{@render children?.()}
		</div>
	</div>
{/if}