<script lang="ts">
    import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import Fa from "svelte-fa";
    
    // Proprietà principali
    export let value: string = "";
    export let type: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'file' = 'text';
    export let name: string = "";
    export let id: string = "";
    export let required: boolean = false;
    export let hidden:boolean = false;
    export let text = "Default Text";
    export let placeholder = "Default Placeholder";
    
    // Stili
    export let style = "inline-block px-4 py-2 bg-cafe_noir-600 text-white rounded-md  transition-colors";
    export let additionalStyle = " cursor-pointer hover:bg-cafe_noir-700";
    export let color = "bg-white border-gray-300";
    export let dimensions = "w-full h-10 px-3";
    let styleClass = style+ " " + additionalStyle + " " + color + " " + dimensions ;
    if(hidden) styleClass = "hidden";
    
    // Icona (opzionale)
    export let icon: IconDefinition | undefined = undefined;
    export let iconPosition: 'left' | 'right' = 'left';

</script>

<div class="relative {dimensions}">
    {#if icon && iconPosition === 'left'}
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Fa icon={icon} class="text-gray-500" />
        </div>
    {/if}
    {#if hidden}
        
        <label class="{style} {additionalStyle} {color}" >
            <input
                {type}
                {name}
                {id}
                {required}
                bind:value
                on:input
                on:blur
                on:focus
                on:keydown
                on:keyup
                on:keypress
                on:change
                class="hidden"
            />
                {text}
            
        </label>
    {:else}
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
            class={styleClass}
        />
    {/if} 
    {#if icon && iconPosition === 'right'}
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Fa icon={icon} class="text-gray-500" />
        </div>
    {/if}
</div>