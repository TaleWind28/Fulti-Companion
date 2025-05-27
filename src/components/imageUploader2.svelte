<script lang="ts">
    import defaultImage from "/src/images/UploadImage.png";

    let uploadError = $state();
    let ObjUrl = $state(defaultImage);
    let imageSrc = $derived(ObjUrl);
    function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0] || null;
    uploadError = null;

    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        ObjUrl = URL.createObjectURL(selectedFile);
        
      } else {
        uploadError = 'Per favore, seleziona un file immagine valido.';
      }
    }
    if (target) target.value = ''; // Resetta l'input
  }
</script>

<label for="file-selector" class="image-upload-label" aria-label="Cambia immagine">
  <img
      src={imageSrc}
      alt="Immagine corrente, clicca per cambiarla"
      class="clickable-image-inside-button"
    />
</label>

<input  type="file"  id="file-selector" accept="image/*"  onchange={handleFileSelect}  style="display: none;"  aria-hidden="true"/>