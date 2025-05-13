<script lang="ts">
    import RunesButton from "./runesButton.svelte";
    let { tabs,
     px =""
    } = $props();
  
    let selectedTab = $state(0);
    let ActiveComponent= $derived(tabs[selectedTab].component);
    let activeProps= $derived(tabs[selectedTab].props);


  </script>

  <!-- La parte della barra <nav> rimane simile -->
  <div class="border-2  bg-cafe_noir-700  flex w-auto h-15 rounded border-cafe_noir-700 {px}">
    <nav class=" flex justify-center rounded items-center bg-cafe_noir-700 gap-6 p-3 mx-80 my-10">
      {#each tabs as tab}
        <RunesButton clickFun={() => {(selectedTab= tab.id)}} text = {tab.label} color="bg-blue-500" dimensions="w-auto h-auto" additionalStyle = "text-white"/>
      {/each} 
    </nav>
  </div>

  <div class="pb-200 justify-center items-center">
    <ActiveComponent {...activeProps}></ActiveComponent>
  </div>  