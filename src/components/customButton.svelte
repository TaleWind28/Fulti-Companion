<script lang="ts">
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import Fa from "svelte-fa";

    export let text:string;
    export let style = "bg-blue-500 cursor-pointer rounded text-white"
    export let dimensions = "w-24 h-8";
    export let type:'button' | 'submit' | 'reset' = 'button';
    export let icon:IconDefinition;

</script>

<button {type} on:click class="{dimensions} {style}">
{#if icon===null}
    {text}
{:else}
    <Fa icon={icon}/>
{/if}
</button> 