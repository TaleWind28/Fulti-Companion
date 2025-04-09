<script>
    import ShowRelatedNews from "../../components/showRelatedNews.svelte";
    import UserProfile from "../../components/userProfile.svelte";
</script> 
 
<div class="grid grid-cols-[30%_70%] bg-blue-900"><!--container principale -->
    <div class=" bg-amber-300"><!-- tab con propic ed informazioni utente -->
        <div class="flex col-auto">
            <!-- immagine utente-->
            <!--<img src="src/images/sora_avatar_test.jpg" class=" w-auto h-100" alt="sora">-->
            <UserProfile/>
        </div>
        <div><!-- calendario--> 
            <div class="flex items-center justify-center">
                calendario
            </div>
        </div>
        <div class="flex items-center justify-center"><!-- prossimo appuntamento--> 
            pino
        </div>
    </div>
    <!-- tab laterale dx -->
    <div class=" bg-red-500">
        <div class=" bg-orange-100"><!-- news tab--> 
            <ShowRelatedNews/>
        </div>
        <div class=" bg-fuchsia-800"><!-- attività recenti-->
            
        </div>
    </div>


</div>
