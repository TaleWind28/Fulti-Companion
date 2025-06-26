<script lang="ts">
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
    import RunesButton from "../../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "../../Generators/generatorBox.svelte";
    import Note from "../note.svelte";


let {charactherNotes = $bindable([{id:0,name:"",description:""}])} = $props();


    function createNote(){
        console.log("vai")
        charactherNotes.push({id:charactherNotes.length,name:"",description:""})
    }

    function deleteNote(id:number){
        charactherNotes.splice(charactherNotes.findIndex( note => note.id === id));
    }
</script>

<GeneratorBox nameTag="Note"  additionalStyle="flex items-center justify-between">
     {#snippet additionalHeaderThings()}
            <RunesButton dimensions ="w-auto" icon={faPlus} color="" clickFun={createNote}/>
    {/snippet}
 
    <!-- Riga 2: Tipo di Legame -->
    <section >
        {#each charactherNotes as note}
            <Note bind:noteName={note.name} bind:noteDescription={note.description} onDelete={()=>deleteNote(note.id)}/>
        {/each}
    </section>
</GeneratorBox>