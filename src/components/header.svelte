<script lang="ts">
  import { page } from "$app/state";
  import {user, loading} from '../stores/authStore';
  import {logout} from '$lib/authUtility';
  import Fa from 'svelte-fa'
  import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';  
    import { goto } from "$app/navigation";

  export let appTitle = "F-Ulti Companion";
  export const logoUrl:string = "src/images/Logo3.png";
  export let homeUrl = "/"; 
  //export let loginStatus = false;
  export let pages:string[];
  const loginPage = pages[0];
  const campaignPage = pages[1];
  const playerSheetPage = pages[2];
  const manualLinkPage = pages[3];
  const objectGeneratorPage = pages[4];
  async function handleLogout(){
    try{
      await logout();
      goto("/");
    }   
    catch(error){
      alert("errore durante il logout");
    }
  }
  let username = "provvisorio, implementare a modo";
</script>

{#if page.url.pathname !== loginPage}
  <header class="bg-teal-800 text-white shadow-md py-4 max-w-auto h-10 flex items-center">
    <div class="container mx-auto px-4 flex items-center justify-between">

      <span class="flex-none">
        {#if logoUrl && page.url.pathname !== homeUrl}
              <a href={homeUrl}> <img src={logoUrl} alt={appTitle} class="flex items-start h-10" /></a>
        {/if} 
      </span>

      <span class="flex space-x-4 justify-center">
        <a href={campaignPage}>Campagne</a>
        <a href={playerSheetPage}>Schede Personaggio</a>
        <a href={manualLinkPage}>Manuali</a>
        <a href={objectGeneratorPage}>Generatore di Oggetti</a>
      </span>

      {#if page.url.pathname !== loginPage}
        <span class="font-bold flex-none">
          {#if $loading}
            accesso in corso...
          {:else if $user}
            {$user.displayName}
            <button on:click={handleLogout}> <Fa class="flex items-end justify-end cursor-pointer" icon={faRightFromBracket}/></button>
            {:else}
              <a href={pages[0]} class="rounded bg-emerald-400"> Accedi/Registrati</a>
          {/if}
        </span>

      {/if}
    </div>
  </header>
{/if}