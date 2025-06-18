<script lang="ts">
  import defaultImage from "/src/images/UploadImage.png";

  let {dimensions = "w-auto h-auto", fill=false, imageUrl = $bindable(), padre = $bindable()} = $props();
  
  let uploadError = $state();
  let ObjUrl = $state(defaultImage);


  let imageSrc = $derived.by(() => {
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === "") {
      return ObjUrl;
    }
    return imageUrl;
  });
  $inspect(imageSrc,padre,"sono io");
  let modality = () =>{
    if(fill === true)return "object-fill";
    else return "object-cover";
  }
  
  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0] || null;
    uploadError = null;

    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        //creo il nuovo url
        ObjUrl = URL.createObjectURL(selectedFile);
        imageUrl = ObjUrl;
      } else {
        uploadError = 'Per favore, seleziona un file immagine valido.';
      }
    }
    if (target) target.value = ''; // Resetta l'input
  }
</script>

<label for={padre+"file-selector"}>
  <img
      src={imageSrc}
      alt="Immagine corrente, clicca per cambiarla"
      class="{dimensions} {modality}"
    />
</label>

<input  type="file"  id={padre+"file-selector"} accept="image/*"  onchange={handleFileSelect}  style="display: none;"  aria-hidden="true"/>