<script lang="ts">
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import { faDigitalOcean } from "@fortawesome/free-brands-svg-icons";
    import Fa from "svelte-fa";
    export let text:string;

    export let style = "cursor-pointer rounded"
    export let additionalStyle = "text-white";
    export let color = "bg-blue-500";
    export let dimensions = "w-24 h-8";
    export let type:'button' | 'submit' | 'reset' = 'button';
    export let icon:IconDefinition | undefined = undefined;
    export let textIcon = false; 
    export let iconStyle ="";
</script>

<button {type} on:click class="{dimensions} {style} {color} {additionalStyle}">
{#if !textIcon && icon== undefined}
    {text}
{:else if icon!= undefined && !textIcon}
    <Fa class={iconStyle} icon={icon}/>
{:else if textIcon && icon!= undefined}
    <span class="flex items-center justify-center gap-2">
        <Fa class={iconStyle} icon={icon}/>
        {text}
    </span>
    
{/if}
</button> 