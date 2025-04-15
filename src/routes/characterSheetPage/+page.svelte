<script>
    import CustomButton from "../../components/customButton.svelte";
    import CharacterCard from "../../components/characterCard.svelte";
    function createCharacter(){

    }
    function upload(){
        
    }
</script>
<div class="bg-cafe_noir-900">
    <br><br><br>
    <div class=" flex items-center justify-center gap-6 bg-white w-fit mx-auto h-20 px-8 rounded">
        <input placeholder="ricerca con il nome personaggio" class=" bg-cafe_noir-600 text-white rounded"/>
        <CustomButton text="Crea Personaggio" color="bg-cafe_noir-600" dimensions="w-35 h-10" on:click{createCharacter}/>
        <CustomButton text="importa da Json" color="bg-cafe_noir-600" dimensions="w-35 h-10" on:click{upload}/>
    </div>
    <CharacterCard dimensions="w-auto h-auto" padding = "px-8" />
    
    <br><br><br>
</div>