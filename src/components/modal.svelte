<script>
	let { showModal = $bindable(), modalText, children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<dialog 
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
	<div>
		{@render children?.()}
		<button autofocus onclick={() => dialog.close()}>{modalText}</button>
	</div>
</dialog>