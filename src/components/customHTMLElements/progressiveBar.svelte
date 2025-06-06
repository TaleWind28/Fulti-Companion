
    <script>
        // Props del componente
        export let label = "PV"; // Etichetta della barra (es. "PV", "PM", "PI")
        export let actual = 40;   // Valore attuale
        export let max = 70;      // Valore massimo
        export let color; // Colore della barra (red-500 di default) // Colore di sfondo
        export let bgColor;
        
        // Calcolo della percentuale di riempimento
        $: percentage = (max > 0) ? Math.min(100, Math.max(0, (actual / max) * 100)) : 0;
    </script>
    
    <div class="w-full relative h-8 mb-1">
        <!-- Sfondo della barra -->
        <div 
            class="absolute top-0 left-0 h-full w-full"
            style="background-color: {bgColor};"
        ></div>
        
        <!-- Barra di progresso colorata -->
        <div 
            class="absolute top-0 left-0 h-full transition-all duration-300 ease-in-out {color}"
            style="width: {percentage}%; background-color: {color};"
        ></div>
        
        <!-- Testo sovrapposto -->
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-black font-medium text-sm">
            {actual}/{max} {label}
        </div>
    </div>