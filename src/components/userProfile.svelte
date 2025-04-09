<script lang="ts">
    import { auth } from "$lib/authUtility";
    import { getUserAvatar } from "$lib/utility";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import { type Image } from "$lib/utility";
    let avatar:null | Image = null;
    let loading = true;
    let error = null;
    let currentUser = null;

    onMount(() => {
        // Ascolta i cambiamenti dello stato di autenticazione
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            try {
            // Carica l'avatar quando l'utente è autenticato
            avatar = await getUserAvatar(user.uid);
            loading = false;
            } catch (err) {
            console.error('Errore nel caricamento dell\'avatar:', err);
            error = 'Impossibile caricare l\'avatar';
            loading = false;
            }
        } else {
            // Utente non autenticato
            currentUser = null;
            avatar = null;
            loading = false;
        }
    });
    
    // Pulizia dell'iscrizione quando il componente viene distrutto
    return unsubscribe;
  });
</script>

{#if avatar!==  null}
        <img src={avatar.data} alt="not yet" class=" w-auto h-auto"/>
{/if}