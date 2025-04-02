<script lang="ts">
	import '../app.css';
	import Header from '../components/header.svelte'
	let logo = "../images/Logo3.png";
	let { children } = $props();
</script>

<Header></Header>
{@render children()}
