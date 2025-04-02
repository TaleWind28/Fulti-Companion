<script lang="ts">
    interface menuItem{
        label:string;
        path:string
    }

    export let menuItems:menuItem[] = [];
</script>

<nav >
    <ul class="flex space-x-6">
      {#each menuItems as item}
        <li>
            <a href={item.path} class="font-medium hover:text-sky-400 transition-colors duration-300">{item.label}</a></li>
      {/each}
    </ul>
  </nav>