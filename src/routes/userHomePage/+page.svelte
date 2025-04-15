<script>
    import ShowRelatedNews from "../../components/showRelatedNews.svelte";
    import UserProfile from "../../components/userProfile.svelte";
    import Calendar from "../../components/calendar.svelte";
    import RecentActivityTable from "../../components/recentActivityTable.svelte";
    import CustomButton from "../../components/customButton.svelte";
    let hideCalendar = true;
</script> 
 
<div class="grid grid-cols-[30%_70%] "><!--container principale -->
    <div class=" bg-cafe_noir-600 gap-4 border-2 border-white "><!-- tab con propic ed informazioni utente -->
        <div>
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
    <div class="border-2 border-white">
        <div class="  bg-orange-200  "><!-- news tab--> 
            <ShowRelatedNews/>
        </div>
        {#if hideCalendar}
            <div class=" bg-cafe_noir-700  *:00 "><!-- attività recenti-->
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
