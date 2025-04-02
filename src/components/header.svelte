<script>
  import { page } from "$app/state";
  export let appTitle = "F-Ulti Companion";
  export const logoUrl = "src/images/Logo3.png";
  export let homeUrl = "/"; 
  export let loginStatus = false;
  export let loginPage = "/loginPage";
  let username = "provvisorio, implementare a modo";
  let isLoginPage = (page.url.pathname ==="/loginPage");
    
</script>
{#if page.url.pathname !== loginPage}
  <header class="bg-teal-800 text-white shadow-md py-4">
    <div class="container mx-auto px-4 flex items-center justify-between">
            <div class="flex-grow flex justify-center">
                {#if logoUrl}
                    <a href={homeUrl}> <img src={logoUrl} alt={appTitle} class="h-15 w-auto" /></a>
                {/if} 
            </div>
            {#if page.url.pathname !== loginPage}
            <span class="text-xl font-bold flex items-end">
              {#if loginStatus}
                {username}
              {:else}
                <a href={loginPage}> accedi</a>
              {/if}
            </span>
            {/if}
    </div>

  </header>
{/if}
<!-- calendario interattivo per organizzare sessioni -->