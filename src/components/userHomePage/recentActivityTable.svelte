<script lang="ts">
    import { type RecentActivity } from "$lib/utility";
    import { getRecentActivities, manageRecentActivities } from "$lib/utility";
    import { user } from "../../stores/authStore";
    import { onMount } from "svelte";
    let recentActivities:RecentActivity[] = [];
    let loading = true;
    let intervalId: NodeJS.Timeout |null = null;
    const REFRESH_INTERVAL = 5000; // 5 secondi
    // Funzione per caricare le attività recenti
    async function loadRecentActivities() {
        if ($user && $user.uid) {
            try {
                loading = true;
                recentActivities = await getRecentActivities($user.uid);
            } catch (error) {
                console.error("Errore nel caricamento delle attività recenti:", error);
            } finally {
                loading = false;
            }
        }
    }
    
    // Carica le attività quando il componente viene montato
    onMount(() => {
        loadRecentActivities();
        intervalId = setInterval(loadRecentActivities,REFRESH_INTERVAL);
    });
    
    // Ricarica quando cambia l'utente
    $: if ($user) {
        loadRecentActivities();
    }
</script>


<div class="border border-orange-300 overflow-hidden">
    <!-- Intestazione a colonna singola -->
    <div class="bg-orange-200  p-4 font-semibold text-center ">
        Attività Recenti
    </div>
    
    <!-- Corpo della tabella -->
    <div class="divide-y divide-black-200">
    {#if $user}
        {#each  recentActivities as act}
            <div class="p-3"> {act.name} : {act.path} </div>
        {/each}
    {/if}
    </div>
</div>