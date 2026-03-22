<script lang="ts">
    import { marked } from 'marked'
    import { onMount } from 'svelte';
    import DOMPurify from 'dompurify';

    let { data } = $props();
    let renderedContent = $state('');
    let leaderboardContainer: HTMLDivElement | undefined = $state();

    // Coz of hydration issues
    function stripScripts(html: string): string {
        return html
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/\s+onclick="[^"]*"/gi, '');
    }

    function renderMarkdown(markdown: string, basePath: string): string {
        const renderer = {
            heading(token: { text: string; depth: number }): string {
                if (token.depth === 1) {
                    return `<h1 class="text-5xl font-bold text-[#5b8ddb] tracking-tight mb-4">${token.text}</h1>`;
                }
                if (token.depth === 2) {
                    return `<h2 class="text-4xl font-bold text-[#5b8ddb] tracking-tight mt-4 mb-2">${token.text}</h2>`;
                }
                return `<h3 class="text-2xl font-bold text-[#5b8ddb] tracking-tight mt-3 mb-2">${token.text}</h3>`;
            },

            link(token: { href: string; text: string }): string {
                let href = token.href;
                if (!href.startsWith('http') && !href.startsWith('https') && !href.startsWith('/')) {
                    href = `${basePath}/${href}`;
                }
                return `<a href="${href}" target="_blank" rel="noreferrer" class="text-[#7862e2] hover:underline">${token.text}</a>`;
            },

            paragraph(token: { text: string }): string {
                return `<p class="text-xl leading-relaxed mb-4">${token.text}</p>`;
            }
        };

        marked.use({ renderer: renderer as any });
        return marked.parse(markdown) as string;
    }

    onMount(() => {
        if (data.type === 'markdown' && data.markdown) {
            const basePath = `/competitions/${data.slug}`.replace(/\/+$/, '');
            const rawHtml = renderMarkdown(data.markdown, basePath);
            renderedContent = DOMPurify.sanitize(rawHtml, {
                ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'br', 'strong', 'em'],
                ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
            });
        }

        if (data.type === 'html' && leaderboardContainer) {
            // Wire up the toggle button
            const toggleBtn = leaderboardContainer.querySelector('button');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    const rows = leaderboardContainer!.getElementsByClassName('ineligible');
                    for (let i = 0; i < rows.length; i++) {
                        rows[i].classList.toggle('d-none');
                    }
                });
            }

            // Horizontal scroll
            const scrollContainer = document.getElementById('container');
            if (scrollContainer) {
                scrollContainer.addEventListener('wheel', (e: WheelEvent) => {
                    if (e.deltaY !== 0) {
                        e.preventDefault();
                        scrollContainer.scrollLeft -= e.deltaY;
                    }
                });
            }
        }
    });
</script>

{#if data.type === 'html'}
    <div class="leaderboard-page max-w-[1200px] mx-auto py-6 px-10">
        <h1 class="text-5xl font-bold text-[#5b8ddb] tracking-tight mb-6">
            {data.title}
        </h1>
        {#if data.html}
            <div bind:this={leaderboardContainer}>
                {@html stripScripts(data.html)}
            </div>
        {:else}
            <p class="text-xl text-gray-500">Leaderboard not found.</p>
        {/if}
    </div>
{:else}
    <div class="max-w-[1000px] mx-auto gap-4 flex flex-col py-6 px-10">
        <h1 class="text-5xl font-bold text-[#5b8ddb] tracking-tight">
            {data.title}
        </h1>

        {#if renderedContent}
            <div class="flex flex-col gap-4
    [&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-5 [&>ul]:text-xl [&>ul]:leading-relaxed [&>ul]:ml-5 [&>ul]:space-y-1
    [&>ol]:list-decimal [&>ol]:list-outside [&>ol]:pl-5 [&>ol]:text-xl [&>ol]:leading-relaxed [&>ol]:ml-5 [&>ol]:space-y-1 [&>ol>li]:pl-2">
                {@html renderedContent}
            </div>        {:else}
            <p class="text-xl text-gray-500">Competition not found.</p>
        {/if}
    </div>
{/if}