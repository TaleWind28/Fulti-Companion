<script>
    import { page } from "$app/state";
</script>


{#if page.url.pathname !== "/loginPage"}
    <br><br><br>
    <footer class="bg-teal-800 text-white shadow-md py-4">
        definire footer
    
    </footer>
{/if}