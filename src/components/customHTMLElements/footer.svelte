<script>
    import { page } from "$app/state";
    let poweredByLogo = "/src/images/Powered by Fabula Ultima Logo.png";
</script>


{#if page.url.pathname !== "/loginPage"}
    <footer class="bg-teal-800 text-white shadow-md py-4 flex justify-center">
        <br><br><br>
        <img src={poweredByLogo} alt="poweredbyfabula ultima"/>
    </footer>
{/if}