<script lang="ts">
    import type { Skill } from "$lib/characterClasses.svelte";

    interface Props {
        skill: Skill;
    }

    let {skill = $bindable()}:Props = $props();

</script>

<div class="flex flex-col p-2">
    <section class="bg-cafe_noir-700 flex items-center justify-between p-2">
        <p>{skill.skillName}</p>
        <input type="number" placeholder="0" min="0" max={skill.maxLvl} bind:value={skill.currentLvl} class="bg-white">
    </section>
    <section>
        {skill.description}
    </section>
</div>