<script lang="ts">
  import defaultImage from "/src/images/UploadImage.png";

  let {dimensions = "w-auto h-auto", fill=false, imageUrl = $bindable()} = $props();
  
  let uploadError = $state();
  let ObjUrl = $state(defaultImage);

  $inspect(imageUrl,"imageUploader");
 

  let imageSrc = $derived.by(()=>{
    if(imageUrl === null || imageUrl === undefined) return ObjUrl;
    console.log("passo il primo");
    if(imageUrl.replaceAll(" ","") !=="")
    { console.log("sono nel secondo"); 
      return imageUrl;
    }else {  console.log("passo il secondo");
      return ObjUrl;
    }
    
  });

  
  let modality = () =>{
    if(fill = true)return "object-fill";
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

<label for="file-selector">
  <img
      src={imageSrc}
      alt="Immagine corrente, clicca per cambiarla"
      class="{dimensions} {modality}"
    />
</label>

<input  type="file"  id="file-selector" accept="image/*"  onchange={handleFileSelect}  style="display: none;"  aria-hidden="true"/>