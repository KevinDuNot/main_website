<script lang="ts">
    interface Sponsor {
        name: string;
        logo: string;
        text_p1: string;
        href: string;
    }

    let { sponsors } = $props<{ sponsors: Sponsor[] }>();
</script>

<div class="grid grid-cols-1 md:grid-cols-2">
    {#each sponsors as sponsor, i}
        {@const isLeftColumn = i % 2 === 0}
        <div class="relative flex flex-col h-full py-8 md:border-b border-black
                {isLeftColumn ? 'md:pr-15' : 'md:pl-10'}"
        >
            {#if isLeftColumn}
                <div class="hidden md:block absolute right-0 top-10 bottom-6 w-[1px] bg-black"></div>
            {/if}

            {#if sponsor.href}
                <div class="mb-6 h-16 flex items-center justify-center">
                    <a
                            href={sponsor.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="h-full hover:cursor-pointer hover:scale-102 duration-200"
                    >
                        <img src={sponsor.logo} alt={sponsor.name} class="h-full object-contain object-left" />
                    </a>
                </div>
            {:else}
                <div class="mb-0 h-24 flex items-center justify-center">
                    <div class="h-full hover:cursor-pointer hover:scale-102 duration-200">
                        <img src={sponsor.logo} alt={sponsor.name} class="h-full object-contain object-left" />
                    </div>
                </div>
            {/if}

            <div class="text-sm font-instrument-sans leading-relaxed text-black text-justify space-y-6">
                {@html sponsor.text_p1}
            </div>
        </div>
    {/each}
</div>