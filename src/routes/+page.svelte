<script>
    export let loginPage = "/loginPage";
    import Grid from '../components/grid.svelte'
    const features = [
      {
        iconUri:"",
        title: "Schede Personaggio Digitali",
        description: "Creazione guidata, calcoli automatici (PF/PM), equipaggiamento e note. Sempre disponibili, anche offline."
      },
      {
        iconUri:"",
        title: "Bestiario Integrato",
        description: "Consulta rapidamente mostri e PNG, filtra per livello o tipo. Accessibile offline durante le sessioni."
      },
      {
        iconUri:"",
        title: "Gestione Campagne & Wiki",
        description: "Organizza le tue campagne, invita giocatori e costruite insieme una Wiki condivisa per lore e appunti."
      },
      {
        iconUri:"",
        title: "Dice Roller Avanzato",
        description: "Tira dadi personalizzati (d4-d20+) con un click. Log storico dei tiri per non perdere nulla."
      },
      {
        iconUri:"",
        title: "Combat Helper & Sessioni Live",
        description: "Il Master crea combattimenti, i giocatori interagiscono in tempo reale. Gestione"
      },
      {
        iconUri:"",
        title: "Offline & Cloud Sync",
        description: "Lavora offline senza problemi, i tuoi dati si sincronizzeranno automaticamente appena torni online."
      }
    ];
</script>


<div class="flex flex-col items-center justify-center">
    <section class="text-center">
        <h1 class="flex justify-center">
            <img src="src/images/Logo.png" alt="Logo" class="h-80">
        </h1>
        <p>Un compagno digitale per le tue avventure in Fabula Ultima</p>
        
        <p>Gestisci campagne, personaggi, combattimenti e molto altro anche offline</p>
        <br><br>

        <a href={loginPage} class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow inline-block transition-colors">
            Inizia Ora
        </a>
    </section>
    <br><br><br>

    <section class="text-center">
        <Grid grid= {features}>

        </Grid>
    </section>
    
</div>
