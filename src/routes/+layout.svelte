<script lang="ts">
	import '../app.css';
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
	let logo = "src/images/Logo3.png";
	let headerPages = ["/loginPage", "/campaingPage", "/characterSheetPage","/","itemGeneratorPage" ];
	let { children } = $props();
</script>

<Header logoUrl= {logo} pages={headerPages}></Header>
	
{@render children()}
<Footer></Footer>
