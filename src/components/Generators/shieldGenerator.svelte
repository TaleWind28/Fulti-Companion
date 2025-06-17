<script lang="ts">
    import type { Item } from "$lib/types";
    import { exportHtmlToImage } from "$lib/weaponUtility";
    import ImageUploader2 from "../customHTMLElements/imageUploader2.svelte";
    import ModalSelector from "../customHTMLElements/modalSelector.svelte";
    import RunesButton from "../customHTMLElements/runesButton.svelte";
    import GeneratorBox from "./generatorBox.svelte";

    let imageUrl = $state(null);
    let customEquipName = $state("");
    let shieldItems:Item[] = [];
</script>


<GeneratorBox nameTag={"Scudo"}>
    pippo
    <div>
        <!-- intestazione -->
         <span>
                <ModalSelector itemList = {shieldItems} itemName = {shieldItems[0].name} selectedItem = {shieldItems[0]} />
                <input type="checkbox" class="flex-shrink-0">
                <input placeholder="Nome" bind:value={customEquipName} class="border rounded">
         </span>
    </div>
  <!-- Contenuto passato allo snippet 'imageProcessor' -->  
    {#snippet imageProcessor()}    
        <div  id={"pino"} class="bg-white">
            <div class="bg-cafe_noir-700 grid grid-cols-5">
                <p class="col-span-2">
                    {"pino"}
                </p>
                <span class="grid grid-cols-2  col-span-2 gap-30">
                    <p>PRECISIONE</p>
                    <p>DANNO</p>
                </span>
            </div>
            <div class=" grid grid-cols-3 gap-4">
                <div class="col-span-1">
                    <ImageUploader2 dimensions={"w-40 h-30"} fill={true} bind:imageUrl = {imageUrl}/>
                </div>
                <div class="col-span-2">
                    <div class="justify-around bg-cafe_noir-800 flex">
                        <p>
                            michele
                        </p>
                        <p>
                            raiola
                        </p>
                    </div>
                    <hr>
                    <div class="flex flex-row items-center justify-between px-2 ">
                        <p>amico</p>
                        <p>*</p>
                        <p>pluto</p>
                        <p>* </p>
                        <p>pinotto</p>
                    </div>
                    <hr>
                    <div>
                        {"pota"}
                    </div>
                </div>
            </div>
        </div>
        <RunesButton text="pino" clickFun={()=> exportHtmlToImage("pino")}/>
    {/snippet}
</GeneratorBox>