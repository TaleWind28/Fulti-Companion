<script lang="ts">
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import GeneratorBox from "../Generators/generatorBox.svelte";
    import fury from "../../additionalFiles/fury.json";
    import { createFuryRune, safeParseCharacterClass } from "$lib/characterClasses.svelte";
    import ClassDescriptor from "./classDescriptor.svelte";

    const furyClass = safeParseCharacterClass(fury);
    
    const furia = createFuryRune(furyClass);
    let {classList = [furia]} = $props();



    $inspect(furia);
</script>
<div class="flex flex-col gap-4 ">


<GeneratorBox nameTag={"Classi"}>
    <!-- Selettore per aggiungere classi al personaggio -->
    <ModalSelector itemName={"class"} itemList={[{}]} selectedItem={{name:""}}/>
</GeneratorBox>
<hr class="w-full border-cafe_noir-600">
<!-- Mostro le Classi del personaggio -->
    {#each classList as classe }
        <ClassDescriptor bind:chosenClass={classe.data}/>
    {/each}
</div>