
<script lang="ts">
    import { fade } from "svelte/transition";

	let { 
		showModal = $bindable(), 
		count = $bindable(), 
		modalText,
		relative = false,
		divPosition = "flex items-center justify-center", 
		children, 
		divStyle = "m-auto",
		ariaLabel = "Modal dialog",
		ariaDescribedBy = undefined,
		canClickOutside= false,
		fixedPosition = false
	} = $props();

	let modalVisible = $derived(showModal);

	function closeModal() {
		showModal = false;
	}

	function handleOverlayClick(e: any) {
		if (e.target === e.currentTarget && !canClickOutside) closeModal();
	}

	function handleOverlayKey(e: any) {
		
		if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget && !canClickOutside) {
			e.preventDefault();
			closeModal();
		}
	}
</script>

{#if modalVisible}
	{#if relative}
		{#if !fixedPosition}
		<!-- Overlay trasparente per modal relativi -->
		<div
			class="fixed inset-0 z-40"
			role="button"
			tabindex="0"
			onclick={closeModal}
			onkeydown={handleOverlayKey}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
		></div>
		{/if}
		
		<!-- Modal content con posizione absolute -->
		<div
			class="absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-max p-2"
			role="dialog"
			aria-modal="true"
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					closeModal();
				}
			}}
			tabindex="-1"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
		>
			{@render children?.()}
		</div>
	{:else}
		<!-- Modal normale fixed -->
	
			<div
				class="fixed inset-0 z-50 {divPosition}"
				role="button"
				tabindex="0"
				onclick={handleOverlayClick}
				onkeydown={handleOverlayKey}
				in:fade={{ duration: 200 }}
				out:fade={{ duration: 150 }}
			>
				<!-- Modal content -->
				<div
					class="bg-white rounded-md p-4 shadow-lg {divStyle}"
					role="dialog"
					aria-modal="true"
					aria-label={ariaLabel}
					aria-describedby={ariaDescribedBy}
					tabindex="-1"
					onkeydown={(e) => {
						if (e.key === 'Escape') {
							closeModal();
						}
					}}
					in:fade={{ duration: 200 }}
					out:fade={{ duration: 150 }}
				>
					{@render children?.()}
				</div>
			</div>
	{/if}
{/if}