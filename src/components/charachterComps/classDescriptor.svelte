<script lang="ts">
    import { createEmptyCharacterClass, type CharacterClass } from "$lib/characterClasses.svelte";


    interface Props {
        chosenClass: CharacterClass;
    }

    let {chosenClass = $bindable(createEmptyCharacterClass())}: Props = $props();

</script>

{chosenClass.name}
{chosenClass.benefits}
{chosenClass.dataType}
{chosenClass.heroic}
{chosenClass.isHomebrew}
{chosenClass.lvl}
{chosenClass.skills}
{chosenClass.spells}

