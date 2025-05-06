<script lang="ts">
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import Fa from "svelte-fa";
    
    // Proprietà principali
    export let value: string = "";
    export let placeholder: string = "";
    export let type: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'file' = 'text';
    export let name: string = "";
    export let id: string = "";
    export let required: boolean = false;
    
    // Stili
    export let style = "rounded border focus:outline-none focus:ring-2 focus:ring-blue-500";
    export let additionalStyle = "";
    export let color = "bg-white border-gray-300";
    export let dimensions = "w-full h-10 px-3";
    
    // Icona (opzionale)
    export let icon: IconDefinition | undefined = undefined;
    export let iconPosition: 'left' | 'right' = 'left';

</script>

<div class="relative {dimensions} {additionalStyle}">
    {#if icon && iconPosition === 'left'}
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Fa icon={icon} class="text-gray-500" />
        </div>
    {/if}
    
    <input
        {type}
        {name}
        {id}
        {required}
        {placeholder}
        bind:value
        on:input
        on:blur
        on:focus
        on:keydown
        on:keyup
        on:keypress
        on:change
        class="{style} {color} {icon && iconPosition === 'left' ? 'pl-10' : ''} {icon && iconPosition === 'right' ? 'pr-10' : ''}"
    />
    
    {#if icon && iconPosition === 'right'}
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Fa icon={icon} class="text-gray-500" />
        </div>
    {/if}
</div>