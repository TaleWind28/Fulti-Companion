<script lang="ts">
    import ImageUploader from "../../components/imageUploader.svelte";
    import CustomButton from "../../components/customButton.svelte";
    import { getUserAvatar} from "$lib/utility";
    import { user } from "../../stores/authStore";
    import { type Image } from "$lib/utility";
    
    export let avatar: Image | null = null;
    
    async function handleUserAvatar(): Promise<void> {
        if ($user === null) return;
        avatar = await getUserAvatar($user?.uid);
    }
</script>


<ImageUploader/>

{#if $user!== null}
    <CustomButton text="mostra avatar" on:click={handleUserAvatar}/>
    {#if avatar!==  null}
        <img src={avatar.data} alt="not yet"/>
    {/if}
{/if}

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>