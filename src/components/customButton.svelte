<script lang="ts">
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import Fa from "svelte-fa";
    export let text:string;
    export let style = "cursor-pointer rounded text-white"

    export let additionalStyle = "";
    export let color = "bg-blue-500";
    export let dimensions = "w-24 h-8";
    export let type:'button' | 'submit' | 'reset' = 'button';
    export let icon:IconDefinition | undefined = undefined;
</script>

<button {type} on:click class="{dimensions} {style} {color} {additionalStyle}">
{#if icon===undefined}
    {text}
{:else}
    <Fa icon={icon}/>
{/if}
</button> 