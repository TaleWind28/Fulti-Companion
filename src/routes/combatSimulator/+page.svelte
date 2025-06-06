<!-- Combat Simulator -->
<script>
    import Modal from "../../components/customHTMLElements/modal.svelte";
    let showModal = $state(false);
</script>

<div class="flex items-center justify-center">
    <Modal bind:showModal={showModal} modalText={"chiudimi"} >
        <h1>
            sto provando a fare una cosa bella
        </h1>
        <h2>
            ma non ci sto riuscendo
        </h2>
    </Modal>
    <button onclick={()=>{showModal=true}}>premimi</button>

</div>

