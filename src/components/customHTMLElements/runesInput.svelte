<script>
    let {bindValue = $bindable(), iconColor = "", icon = null ,styleClass= "", change = ()=>{} } = $props();
    import Fa from "svelte-fa";
    function changeFun(){
        change()
    }
</script>
<span class={styleClass}>
    <input type="number" class="w-15" bind:value={bindValue} onchange={changeFun}>
    <Fa icon={icon} class={iconColor}/>
</span>