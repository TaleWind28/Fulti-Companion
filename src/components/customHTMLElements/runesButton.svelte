<script lang="ts">
    import Fa from "svelte-fa";

    let {
        text = "Default Text",
        style = "cursor-pointer rounded",
        additionalStyle = "",
        color = "bg-blue-500",
        dimensions = "w-24 h-8",
        icon = undefined,
        textIcon = false,
        iconStyle = "",
        clickFun,
        textColor = "text-white"
    } = $props();

    function click(){
        clickFun();
    }
</script>

<button class="{dimensions} {style} {color} {additionalStyle}" onclick={click}>
{#if !textIcon && icon== undefined}
    <p class={textColor}>{text}</p>
{:else if icon!= undefined && !textIcon}
    <Fa class={iconStyle} icon={icon}/>
{:else if textIcon && icon!= undefined}
    <span class="flex items-center justify-center gap-2">
        <Fa class={iconStyle} icon={icon}/>
        <p class={textColor}>{text}</p>
    </span>
{/if}
</button> 