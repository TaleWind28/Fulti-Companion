<script>
    let {bindValue = $bindable(), iconColor = "", icon = null ,styleClass= ""} = $props();
    import Fa from "svelte-fa";

</script>
<span class={styleClass}>
    <input type="number" class="w-15" bind:value={bindValue}>
    <Fa icon={icon} class={iconColor}/>
</span>