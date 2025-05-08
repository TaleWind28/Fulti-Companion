<script lang="ts">
    // ... importa gli altri componenti per le schede
  
    import type { Tab } from "$lib/utility";
    import CustomButton from "./customButton.svelte";
    export let tabs: Tab[] = [];
    export let px = "";
  
    let selectedTab = 0;
    let addSt = `whitespace-nowrap py-3 px-1  font-medium text-sm transition-colors duration-150 ease-in-out{activeTabId === tab.id? ' text-white'
  : 'border-transparent text-black hover:bg-cafe_noir-900`;
    $: activeTabId= tabs[selectedTab].id;
    $: activeComponent= tabs[selectedTab].component;
    $:activeProps= tabs[selectedTab].props;
    function selectTab(tabId: number,label:string) {
        selectedTab = tabId;
        console.log("id:",tabId," label:",label);
    }
  </script>
  
  <!-- La parte della barra <nav> rimane simile -->
  <div class="border-2  bg-cafe_noir-700  flex w-auto h-15 rounded border-cafe_noir-700 {px}">
    <nav class="-mb-px flex w-auto gap-x-2 px-2 md:space-x-8" aria-label="Tabs">
      {#each tabs as tab (tab.id)}
        <CustomButton text={tab.label} color=""  dimensions="w-auto h-auto" additionalStyle={addSt}
            on:click={()=>selectTab(tab.id,tab.label)}/>
      {/each}
    </nav>
  </div>
  
  
  <div class="mt-6">
    <svelte:component this={activeComponent} {...activeProps}/>
  </div>
