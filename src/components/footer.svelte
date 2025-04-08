<script>
    import { page } from "$app/state";
</script>


{#if page.url.pathname !== "/loginPage"}
    <footer class="bg-teal-800 text-white shadow-md py-4">
        <br><br><br>
        definire footer
    </footer>
{/if}