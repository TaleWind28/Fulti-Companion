<script lang="ts">
  import { page } from "$app/state";
  export let appTitle = "F-Ulti Companion";
  export const logoUrl:string = "src/images/Logo3.png";
  export let homeUrl = "/"; 
  export let loginStatus = false;
  export let pages:string[];
  const loginPage = pages[0];
  const campaignPage = pages[1];
  const playerSheetPage = pages[2];
  const manualLinkPage = pages[3];
  const objectGeneratorPage = pages[4];
  
  let username = "provvisorio, implementare a modo";
</script>

{#if page.url.pathname !== loginPage}
  <header class="bg-teal-800 text-white shadow-md py-4">
    <div class="container mx-auto px-4 flex items-center justify-between">
          <span class="flex-none">
              {#if logoUrl}
                  <a href={homeUrl}> <img src={logoUrl} alt={appTitle} class="flex items-start h-15" /></a>
              {/if} 
          </span>

          <span class="flex space-x-6 justify-center">
            <a href={campaignPage}>Campagne</a>
            <a href={playerSheetPage}>Schede Personaggio</a>
            <a href={manualLinkPage}>Manuali</a>
            <a href={objectGeneratorPage}>Generatore di Oggetti</a>
          </span>
          {#if page.url.pathname !== loginPage}
            <span class="text-xl font-bold flex-none">
              {#if loginStatus}
                {username}
              {:else}
                <a href={pages[0]}> Accedi/Registrati</a>
              {/if}
            </span>
          {/if}
    </div>
  </header>
{/if}
<!-- calendario interattivo per organizzare sessioni -->