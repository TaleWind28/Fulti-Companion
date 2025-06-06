<script>
    
    import { user } from "../../stores/authStore";
    import { publishNews } from "$lib/utility";
    let title= "";
    let iconImg = "";
    let bigImg = "";
    let timestamp = new Date();
    let author = "";
    let content = "";
    /**
     * @param {{ preventDefault: () => void; }} event
     */
    async function handleSubmit(event){
        event.preventDefault();
        let news = {title,iconImg, bigImg, timestamp,author,content};
        if($user!==null){
            if($user.displayName !== null){
                news.author = $user.displayName;
                news.timestamp = new Date();
            }
        }else{
            alert("devi essere autenticato");
            return;
        }
        
        await publishNews(news);
    }
</script>

<form on:submit={handleSubmit}>
    
    <input id="content" type="text" bind:value={content} placeholder="content" class="px-4 py-2 rounded w-64"> 
    <button type="submit">
        premi
    </button>
</form>