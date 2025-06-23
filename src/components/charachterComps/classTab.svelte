<script>
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";

    let {classList = [""]} = $props();
</script>

<GeneratorBox nameTag={"Classi"}>
    <!-- Selettore per aggiungere classi al personaggio -->
    <ModalSelector itemName={"class"} itemList={[{}]} selectedItem={{name:""}}/>

    <!-- Mostro le Classi del personaggio -->
    {#each classList as classe }
        <p>class</p>

    {/each}
</GeneratorBox>