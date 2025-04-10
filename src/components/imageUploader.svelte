<script lang="ts">
    import { uploadImages } from "$lib/utility";
    import CustomButton from "./customButton.svelte";
    import { getAuth } from "firebase/auth";
    let previewUrl = '';
    let selectedFile:File|null = null; 
    let uploadError = '';
    export let use = '';
    export let text = '';
    export let fileSelectionText = '';
    export let hidePreview = false;
    function handleFileSelect(event:Event){
        const target = event.target as HTMLInputElement;
        selectedFile = target.files?.[0] || null;

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            //selectedFile = file;
            if(selectedFile)previewUrl = URL.createObjectURL(selectedFile);
        } else {
            uploadError = 'Seleziona un file immagine valido';
        }

    }

    async function handleUpload(){
        if(!selectedFile)return;
        const user = getAuth().currentUser;
        if(!user)throw new Error("Utente non autenticato");
        
        await uploadImages(user.uid,selectedFile,use);
        selectedFile = null;
       
    }
</script>


{#if !selectedFile}
    <label class="inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors">
        <input type="file" accept="image/*" class="hidden" on:change={handleFileSelect}/>
        {fileSelectionText}
    </label>
{:else if !hidePreview}
    <div class="space-y-4">
        <div class="flex justify-center">
            <img src={previewUrl} alt="Anteprima" class="max-h-64 rounded-md object-contain border border-gray-200" />
        </div>
    </div>
{/if}
{#if selectedFile}
    <CustomButton text={text} on:click={handleUpload}/>
{/if}