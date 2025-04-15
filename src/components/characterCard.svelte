<script lang="ts">
    import { type Character } from "$lib/utility";
    export let dimensions ="";
    export let padding = "";
    //script typescript per importare i personaggi dal database
    export let caracters:Character[] = [{
        name:"Landon McCoy",
        stats:[
            10,
            6,
            6,
            8
        ],
        elementalAffinity:[false],
        statuses:[false],
        level:25,
        pic:""
    },{
        name:"Chroma Celsius",
        stats:[
            10,
            6,
            6,
            8
        ],
        elementalAffinity:[false],
        statuses:[false],
        level:20,
        pic:""
    }
    ];
</script>

<div class="{dimensions} {padding} flex grid-cols-{caracters.length} gap-4">
        {#each caracters as car}
            <div class="w-fit">
                <div class="justify-between bg-white">
                    {car.name} {car.level}
                </div>
                <div>
                    <span class="flex flex-col">
                        <img src={car.pic} alt="character pic">
                        healtbar
                        manabar
                        inventorybar
                    </span>
                </div>
            </div>
        {/each}
</div>