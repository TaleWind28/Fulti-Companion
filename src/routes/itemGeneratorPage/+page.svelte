<script lang="ts">
    import ImageUploader from "../../components/imageUploader.svelte";
    import CustomButton from "../../components/customButton.svelte";
    import CreateNews from "../../components/createNews.svelte";
    import { getUserAvatar} from "$lib/utility";
    import { user } from "../../stores/authStore";
    import { type Image } from "$lib/utility";
    import { type RecentActivity, manageRecentActivities } from "$lib/utility"; 
    export let avatar: Image | null = null;
    
    async function handleUserAvatar(): Promise<void> {
        if ($user === null) return;
        avatar = await getUserAvatar($user?.uid);
    }
    async function handleUserActivity(){
        const activity:RecentActivity = {
            name:"prova",
            path:"mio",
            timestamp: new Date()
        }
        if($user)manageRecentActivities($user?.uid,activity);
    }
</script>


<ImageUploader/>
<CreateNews/>


<CustomButton text="create activity" on:click={handleUserActivity}/>
{#if $user!== null}
    <CustomButton text="mostra avatar" on:click={handleUserAvatar}/>
    {#if avatar!==  null}
        <img src={avatar.data} alt="not yet"/>
    {/if}
{/if}

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>