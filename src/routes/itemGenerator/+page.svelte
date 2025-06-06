<script lang="ts">
    import AccessoryGenerator from "../../components/Generators/accessoryGenerator.svelte";
    import ArcanaGenerator from "../../components/Generators/arcanaGenerator.svelte";
    import ShieldGenerator from "../../components/Generators/shieldGenerator.svelte";
    import WeaponGenerator from "../../components/Generators/weaponGenerator.svelte";

</script>

<div class="bg-cafe_noir-900 items-center pt-6 pb-6 flex-col px-28 gap-6">
    <WeaponGenerator/>
    <ShieldGenerator/>
    <AccessoryGenerator/>
    <ArcanaGenerator/>
</div>




