<script lang="ts">
    import { auth } from "$lib/authUtility";
    import { getUserAvatar } from "$lib/utility";
    import { onAuthStateChanged, type User } from "firebase/auth";
    import CustomButton from "./customButton.svelte";
    import { onDestroy, onMount } from "svelte";
    import { type Image } from "$lib/utility";
    import ImageUploader from "./imageUploader.svelte";
    let avatar:null | Image = null;
    let loading = true;
    let error = null;
    let currentUser:User | null = null;
    let intervalId: NodeJS.Timeout |null = null;
    const REFRESH_INTERVAL = 5000; // 5 secondi
    // Funzione per aggiornare l'avatar dell'utente
  async function updateUserAvatar() {
    if (!currentUser) return;
    
    try {
      // Aggiorna solo l'avatar senza toccare lo stato di autenticazione
      avatar = await getUserAvatar(currentUser.uid);
      console.log('Avatar aggiornato:', new Date().toLocaleTimeString());
      error = null;
    } catch (err) {
      console.error('Errore nell\'aggiornamento dell\'avatar:', err);
      error = 'Impossibile aggiornare l\'avatar';
    } finally {
      loading = false;
    }
  }
  
  // Configura l'aggiornamento periodico
  function setupPeriodicAvatarUpdate() {
    if (intervalId) clearInterval(intervalId);
    
    if (currentUser) {
      // Imposta l'aggiornamento periodico solo se l'utente è autenticato
      intervalId = setInterval(updateUserAvatar, REFRESH_INTERVAL);
      console.log('Aggiornamento periodico avatar attivato');
    }
  }
  
  onMount(() => {
    // Ascolta i cambiamenti dello stato di autenticazione
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser = user;
        try {
          // Carica l'avatar quando l'utente è autenticato
          avatar = await getUserAvatar(user.uid);
          loading = false;
          
          // Imposta l'aggiornamento periodico dopo il primo caricamento
          setupPeriodicAvatarUpdate();
          
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
        
        // Pulisci l'intervallo se l'utente si disconnette
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    });
    
    // Pulizia quando il componente viene distrutto
    return () => {
      unsubscribe();
      if (intervalId) clearInterval(intervalId);
    };
  });
  
  // Quando il componente viene distrutto, pulisci l'intervallo
  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
  
  // Funzione opzionale per forzare un aggiornamento
  function forceAvatarUpdate() {
    updateUserAvatar();
  }

</script>
<div class="flex items-center justify-center flex-col gap-2">
    <div>
        {#if !loading} 
            {#if avatar !==  null}
                <img src={avatar.data} alt="not yet loaded" class="w-auto h-auto max-w-120 max-h-120 aspect-square"/>
            {:else}
                <img src="src/images/default-avatar.jpeg" alt="placeholder" class="aspect-square"/> 
            {/if}
        {:else}
            <div class="h-100 flex justify-center items-center">
                Avatar Loading...
            </div>
        {/if}
    </div>
    <ImageUploader fileSelectionText="cambia avatar" text="applica" hidePreview={true} use="avatar"/>
</div>