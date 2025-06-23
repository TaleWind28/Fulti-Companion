<script>
    import { faCancel } from "@fortawesome/free-solid-svg-icons";
    import RunesButton from "../customHTMLElements/runesButton.svelte";

    let {noteName = $bindable(""), noteDescription= $bindable(""), onDelete = $bindable()} = $props();

      function handleDelete() {
        console.log("entra");
        onDelete(); // Chiama la funzione del padre
    }

</script>

<div class="flex flex-col p-2">
    <!-- Riga 1: Nome Legame -->
    <span class="flex items-center justify-start gap-2 py-2">
        <RunesButton dimensions="w-auto h-auto" color="" icon={faCancel} clickFun={handleDelete}/>
        <input class="border rounded" placeholder="Nome Nota" bind:value={noteName}>
    </span>

    <textarea bind:value={noteDescription} class="border w-200 h-30" placeholder="Descrizione">

    </textarea>
    <hr class="w-full border-cafe_noir-600">
</div>