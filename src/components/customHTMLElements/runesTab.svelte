<script lang="ts">
    let { tabs ,show = 0} = $props(); 
   

    let ActiveComponent = $derived(tabs[show].comp);
    let activeProps = $derived(tabs[show].props);
    console.log(tabs.tabs);
</script>

<div class="flex justify-center rounded items-center bg-cafe_noir-700 gap-6 p-3 mx-80 my-10">
    {#each tabs as tab }
        <button class={`${show === tab.id ? 'bg-cafe_noir-600 text-white w-30' : 'w-30'}`} onclick={() => (show= tab.id)}> {tab.label} </button>
    {/each}
</div>

<div class="pb-200 justify-center items-center">
    <ActiveComponent {...activeProps}></ActiveComponent>
</div>
