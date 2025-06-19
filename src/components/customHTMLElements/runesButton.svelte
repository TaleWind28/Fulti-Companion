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
        textColor = "text-white",
        changeFun = ()=>console.log("change not set")
    } = $props();

    function click(){
        clickFun();
    }
    function change(){
        changeFun();
    }
</script>

<button class="{dimensions} {style} {color} {additionalStyle}" onclick={click} onchange={change}>
 <!-- se uso il bottone come pulsante -->   
{#if !textIcon && icon== undefined}
    <p class={textColor}>{text}</p>
{:else if icon!= undefined && !textIcon}
    <!-- se uso il bottone come icona -->
    <Fa class={iconStyle} icon={icon}/>
{:else if textIcon && icon!= undefined}
    <!-- se uso il bottone come icona con del testo-->
    <span class="flex items-center justify-center gap-2">
        <Fa class={iconStyle} icon={icon}/>
        <p class={textColor}>{text}</p>
    </span>
{/if}
</button> 