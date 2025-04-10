<script>
    import ShowRelatedNews from "../../components/showRelatedNews.svelte";
    import UserProfile from "../../components/userProfile.svelte";
    import Calendar from "../../components/calendar.svelte";
    import RecentActivityTable from "../../components/recentActivityTable.svelte";
</script> 
 
<div class="grid grid-cols-[30%_70%] bg-blue-900"><!--container principale -->
    <div class=" bg-orange-200"><!-- tab con propic ed informazioni utente -->
        <div>
            <UserProfile/>
        </div>
        <div><!-- calendario--> 
            <div class="flex items-center justify-center">
                <Calendar/>
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
        <div class=" bg-orange-100 "><!-- attività recenti-->
            <RecentActivityTable/>
        </div>
    </div>


</div>
