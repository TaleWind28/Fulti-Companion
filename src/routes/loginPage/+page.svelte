<script>
    let username = "";
    let password = "";
</script>

<div class="flex h-screen">
    <div class=" bg-teal-800 flex items-center justify-center text-white text-2xl w-full">
        <a href="/"><img src="src/images/Logo3.png" alt="pino" class="h-70 w-full"></a>
    </div>
    <div class="flex justify-center items-center gap-4 flex-col w-full">
        non so se inserire del testo qui
        <div class="flex flex-col gap-4 items-center w-full">
            <input id="Username" type="text" bind:value={username} placeholder="username" class="px-4 py-2 border rounded w-64">
            <input id="Username" type="password" bind:value={password} placeholder="password" class="px-4 py-2 border rounded w-64">
        </div>
        
        <button>
            Accedi
        </button>
    </div>

</div>