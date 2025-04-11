<script>
    import ShowRelatedNews from "../../components/showRelatedNews.svelte";
    import UserProfile from "../../components/userProfile.svelte";
    import Calendar from "../../components/calendar.svelte";
    import RecentActivityTable from "../../components/recentActivityTable.svelte";
    import CustomButton from "../../components/customButton.svelte";
    let hideCalendar = true;
</script> 
 
<div class="grid grid-cols-[30%_70%]"><!--container principale -->
    <div class=" bg-orange-200 gap-4"><!-- tab con propic ed informazioni utente -->
        <div class=" gap-4">
            <UserProfile/><!-- propic-->
        </div>
        <br>
        <div class="flex items-center justify-center gap-4"><!-- prossimo appuntamento--> 
            <!-- implementare componenete che visualizza il primo appuntamento del calendario e che se premuto abilita la visaulizzazione dello stesso-->
            <CustomButton text="mostra calendario" dimensions= "w-40 h-10" additionalStyle="hover:bg-blue-600 transition-colors" on:click ={()=>hideCalendar = !hideCalendar}/>
        </div>
        <br>
    </div>
    <!-- tab laterale dx -->
    <div class=" bg-orange-300">
        <div class=" bg-orange-100"><!-- news tab--> 
            <ShowRelatedNews/>
        </div>
        {#if hideCalendar}
            <div class=" bg-orange-100 "><!-- attività recenti-->
                <RecentActivityTable/>
            </div>
        {:else}
            <div><!-- calendario--> 
                <div class="flex items-center justify-center">
                    <Calendar/>
                </div>
            </div>
        {/if}
    </div>


</div>
