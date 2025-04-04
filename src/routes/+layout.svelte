<script lang="ts">
	import '../app.css';
	import Header from '../components/header.svelte'
	let logo = "src/images/Logo3.png";
	let headerPages = ["/loginPage"];
	let { children } = $props();
</script>

<Header logoUrl= {logo} pages={headerPages}>
	
</Header>
{@render children()}
