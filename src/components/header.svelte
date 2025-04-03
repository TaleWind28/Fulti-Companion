<script>
  import { page } from "$app/state";
  export let appTitle = "F-Ulti Companion";
  export const logoUrl = "src/images/Logo3.png";
  export let homeUrl = "/"; 
  export let loginStatus = false;
  export let loginPage = "/loginPage";
  export let campaignPage = "/";
  export let playerSheetPage = "/";
  export let manualLinkPage = "/";
  export let objectGeneratorPage = "/";
  
  let username = "provvisorio, implementare a modo";
</script>
{#if page.url.pathname !== loginPage}
  <header class="bg-teal-800 text-white shadow-md py-4">
    <div class="container mx-auto px-4 flex items-center justify-between">
            
          <div class="flex-none">
              {#if logoUrl}
                  <a href={homeUrl}> <img src={logoUrl} alt={appTitle} class="flex items-start h-15" /></a>
              {/if} 
          </div>

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
                <a href={loginPage}> Accedi/Registrati</a>
              {/if}
            </span>
          {/if}
    </div>

  </header>
{/if}
<!-- calendario interattivo per organizzare sessioni -->