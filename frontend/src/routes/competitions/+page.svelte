<script lang="ts">
    import { Marked } from 'marked'
    import CPMSocRocketCodeRumble from '$lib/assets/events/CPMSocRocketCodeRumbleSmall.webp'
    import competitionsMarkdown from './competitions.md?raw';
    import { onMount } from 'svelte';
    import DOMPurify from 'dompurify';

    let renderedContent = $state('');

    function renderMarkdown(markdown: string): string {
        const localMarkedInstance = new Marked();

        const renderer = {
            heading(token: { text: string; depth: number }): string {
                if (token.depth === 1) {
                    return `<h1 class="text-5xl font-bold text-[#5b8ddb] tracking-tight">${token.text}</h1>`;
                }
                return `<h2 class="text-4xl font-bold text-[#5b8ddb] tracking-tight mt-2">${token.text}</h2>`;
            },

            link(token: { href: string; text: string }): string {
                let href = token.href;
                if (!href.startsWith('http') && !href.startsWith('https') && !href.startsWith('/')) {
                    href = `/competitions/${href}`;
                }
                return `<a href="${href}" target="_blank" rel="noreferrer" class="text-[#7862e2] hover:underline">${token.text}</a>`;
            },

            paragraph(token: { text: string }): string {
                return `<p class="text-xl leading-relaxed mb-4">${token.text}</p>`;
            }
        };

        localMarkedInstance.use({ renderer: renderer as any });
        return localMarkedInstance.parse(markdown) as string;
    }

    onMount(() => {
        const rawHtml = renderMarkdown(competitionsMarkdown);
        renderedContent = DOMPurify.sanitize(rawHtml, {
            ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'br'],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
        });
    });
</script>

<div class="group relative flex justify-center items-center w-full md:h-[220px] h-[200px] overflow-hidden bg-black">
    <img
            src={CPMSocRocketCodeRumble}
            alt="CPMSoc Workshop Group"
            class="absolute inset-0 w-full h-full object-cover brightness-90 object-[center_45%] blur-[1px] select-none scale-105"
    />

    <div class="flex items-center justify-center z-10">
        <h1 class="text-white font-[800] tracking-[0.1em] lg:text-[110px] md:text-[80px] sm:text-[60px] text-[40px]">
            COMPETITIONS
        </h1>
    </div>
</div>

<div class="max-w-[1000px] mx-auto gap-4 flex flex-col py-6 px-10">

    {#if renderedContent}
        <div class="flex flex-col gap-4
            [&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-5 [&>ul]:text-xl [&>ul]:leading-relaxed [&>ul]:ml-5 [&>ul]:space-y-1">
            {@html renderedContent}
        </div>
    {/if}

</div>