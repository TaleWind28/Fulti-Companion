<script lang="ts">
  import { onMount } from 'svelte';
  import { type News, getNewsPerUtente } from '$lib/utility';
  import Fa from 'svelte-fa';
  import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'; 
  import CustomButton from './customButton.svelte';

  let news: News[] = [];
  let loading = true;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let error: Error | null = null;
  // --- NUOVA LOGICA PER LO SCROLL ---
  // Variabile per contenere il riferimento al DIV scorrevole
  let scrollContainerElement: HTMLDivElement; 
  // Quantità di pixel da scorrere ad ogni click
  const SCROLL_AMOUNT = 300; // Puoi aggiustare questo valore
  // Intervallo di aggiornamento in millisecondi (es: 30 secondi)
  const FETCH_INTERVAL_MS = 5000;
  // Funzione per recuperare e aggiornare i dati
  const fetchNewsAndUpdate = async () => {
		error = null; // Resetta l'errore ad ogni tentativo
		console.log(`Attempting fetch at ${new Date().toLocaleTimeString()}`);
		try {
			const fetchedNews = await getNewsPerUtente();
			news = fetchedNews; // Aggiornamento reattivo
		} catch (err) {
			console.error('Failed to fetch news:', err);
			error = err instanceof Error ? err : new Error(String(err));
    };
  }
  //funzione chiamata quando viene creato il componente
  onMount(() => {
		console.log('NewsFeed component mounted. Starting initial fetch.');
    loading = true; // Mostra il loading per la *prima* chiamata
		// 1. Fetch iniziale dei dati
		fetchNewsAndUpdate().finally(() => {
      loading = false; // Nascondi il loading dopo la prima chiamata, anche se fallisce
    });

		// 2. Imposta l'intervallo per i fetch successivi
		intervalId = setInterval(fetchNewsAndUpdate, FETCH_INTERVAL_MS);
    console.log(`Set interval with ID: ${intervalId} for every ${FETCH_INTERVAL_MS}ms`);

		// 3. Funzione di cleanup: viene eseguita quando il componente viene distrutto
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
				console.log(`Cleared interval with ID: ${intervalId}`);
        intervalId = null;
			}
		};
	});

  function scrollContent(direction: 'left' | 'right') {
    
    if (!scrollContainerElement) {
      console.warn("Scroll container not found!");
      return; // Esce se l'elemento non è ancora stato bindato
    }

    const scrollValue = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;

    // Usa scrollBy per uno scorrimento relativo e fluido
    scrollContainerElement.scrollBy({
      left: scrollValue,
      behavior: 'smooth' // Aggiunge l'animazione di scorrimento
    });
  }

</script>

<div class="p-4">
  <CustomButton icon={faArrowLeft} on:click={()=>scrollContent('left')} style="cursor-pointer" dimensions="" text=""/>
  <CustomButton icon={faArrowRight} on:click={()=>scrollContent('right')} style="cursor-pointer" dimensions="" text=""/>
  <!-- carico le news-->
  {#if loading}
    <p class="text-center text-gray-500">Caricamento...</p>
  {:else}
    <div class="overflow-x-auto flex gap-4 pb-2 [&::-webkit-scrollbar]:hidden"
    bind:this={scrollContainerElement} role="region" aria-label="Elenco notizie scorrevoli"
    style="-ms-overflow-style: none; scrollbar-width: none;">
      {#each news as item }<!-- creo la news-->
        <div class="bg-white shadow rounded aspect-square p-3 flex flex-col w-32 h-20 shrink-0">
          <h3 class="font-medium text-sm truncate">{item.title || 'Senza titolo'}</h3>
          <p class="text-xs text-gray-500 mb-2">{item.timestamp.toLocaleDateString()}</p>
          <p class="text-xs line-clamp-4">{item.content || ''}</p>
        </div>
      {/each}
    </div>
    {#if news.length === 0}
      <p class="text-center text-gray-500">Nessuna news trovata</p>
    {/if}
  {/if}
</div>