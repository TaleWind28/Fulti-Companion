<script lang="ts">
    export let text:string;
    export let btnFun: () => void = () => {};
    export let style = "bg-blue-500 cursor-pointer rounded text-white"
    export let dimensions = "w-24 h-8";
    export let type:'button' | 'submit' | 'reset' = 'button';
    
</script>

<button {type} on:click={btnFun} class="{dimensions} {style}">
{text}   
</button> 