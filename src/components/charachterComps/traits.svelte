<script>
    let {
        identity = "Ernesto",
        theme = "Vuole",
        origin = "Psicologo"
    } = $props(); 
</script>

<div class="flex flex-col w-full">
    <div class="flex">
        <p class="font-bold">Identità: </p>
        {identity}
    </div>
    <div class="flex">
        <p class="font-bold">Tema: </p>
        {theme}
    </div>
    <div class="flex">
        <p class="font-bold">Origine: </p> 
        {origin}
    </div>
</div>