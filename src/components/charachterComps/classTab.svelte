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

<GeneratorBox nameTag={"Classi"}>
    <!-- Selettore per aggiungere classi al personaggio -->
    <ModalSelector itemName={"class"} itemList={[{}]} selectedItem={{name:""}}/>
    <!-- Mostro le Classi del personaggio -->
    {#each classList as classe }
        <ClassDescriptor chosenClass={classe.data}/>
    {/each}
</GeneratorBox>