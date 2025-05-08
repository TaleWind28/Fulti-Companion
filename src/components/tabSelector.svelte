<script lang="ts">
    // ... importa gli altri componenti per le schede
  
    import type { Tab } from "$lib/utility";
    import CustomButton from "./customButton.svelte";
    export let tabs: Tab[] = [];
    export let px = "";
  
    let selectedTab = 0;
    $: activeTabId= tabs[selectedTab].id;
    $: activeComponent= tabs[selectedTab].component;
    $:activeProps= tabs[selectedTab].props;
    function selectTab(tabId: number) {
      const selectedTab = tabs.find(t => t.id === tabId);
    }
  </script>
  
  <!-- La parte della barra <nav> rimane simile -->
  <div class="border-2  bg-cafe_noir-700  flex w-auto h-15 rounded border-cafe_noir-700 {px}">
    <nav class="-mb-px flex w-auto space-x-4 md:space-x-8" aria-label="Tabs">
      {#each tabs as tab (tab.id)}
        <CustomButton text={tab.label} color="" dimensions="w-30" additionalStyle=""/>
      {/each}
    </nav>
  </div>
  
  
  <div class="mt-6">
    <svelte:component this={activeComponent} {...activeProps}/>
  </div>