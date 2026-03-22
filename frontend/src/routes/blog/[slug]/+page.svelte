<script lang="ts">
    import { page } from '$app/state';
    import axios from 'axios';
    import { Link, EnvelopeSimpleOpen, FacebookLogo } from 'phosphor-svelte';
    import ErrorPage from '../../../routes/+error.svelte';
    import { Marked } from 'marked';
    import katex from 'katex';
    import DOMPurify from 'dompurify';
    import 'katex/dist/katex.min.css';
    import { env } from '$env/dynamic/public';

    const API_BASE = env.PUBLIC_API_BASE_URL

    interface BlogPostDetail {
        id: number;
        slug: string;
        blog_name: string;
        date_published: string;
        author: string;
        tldr_text: string;
        tags: string[];
        tile_image: string;
        blog_image: string;
        text: string;
    }

    interface NextPost {
        slug: string;
        blog_name: string;
        blog_image: string;
    }

    let post = $state<BlogPostDetail | null>(null);
    let nextPost = $state<NextPost | null>(null);
    let isLoading = $state(true);
    let error = $state<string | null>(null);

    // This is a repeat of /blog but will refactor later. For now its alright as not too many different options to keep
    // track of
    function getTagColor(tag: string) {
        if (tag === 'Mathematics') return 'bg-[#ef4444] text-white';
        if (tag === 'Computer Science') return 'bg-[#5b63f5] text-white';
        return 'bg-gray-200 text-gray-800';
    }

    function formatDate(dateStr: string) {
        if (!dateStr) return '';
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
    }

    const localMarkedInstance = new Marked();

    localMarkedInstance.use({
        extensions: [{
            name: 'inlineMath',
            level: 'inline',
            start(src) { return src.indexOf('$'); },
            tokenizer(src) {
                const match = /^(\$)(?!\$)([^\$]+?)\1/.exec(src);
                if (match) {
                    return { type: 'inlineMath', raw: match[0], text: match[2] };
                }
            },
            renderer(token) {
                try {
                    return katex.renderToString(token.text, { displayMode: false });
                } catch {
                    return token.raw;
                }
            }
        },
            {
                name: 'blockMath',
                level: 'block',
                start(src) { return src.indexOf('$$'); },
                tokenizer(src) {
                    const match = /^(\$\$)([^\$]+?)\1/.exec(src);
                    if (match) {
                        return { type: 'blockMath', raw: match[0], text: match[2] };
                    }
                },
                renderer(token) {
                    try {
                        return katex.renderToString(token.text, { displayMode: true });
                    } catch {
                        return token.raw;
                    }
                }
            }]
    });

    function renderContent(markdown: string) {
        if (!markdown) return '';
        const rawHtml = localMarkedInstance.parse(markdown) as string;

        return DOMPurify.sanitize(rawHtml, {
            ADD_ATTR: ['style', 'target'],
            ADD_TAGS: ['iframe', 'math', 'semantics', 'mrow', 'mi', 'mo', 'mn', 'annotation', 'svg', 'path']
        });
    }

    $effect(() => {
        const slug = page.params.slug;
        fetchData(slug);
    });

    async function fetchData(slug: string) {
        isLoading = true;
        error = null;
        try {
            // Parallel fetch for speed
            const [postRes, nextRes] = await Promise.all([
                axios.get(`${API_BASE}/api/blog_items/by_slug/${slug}/`),
                axios.get(`${API_BASE}/api/blog_items/get_next_by_slug/${slug}/`)
            ]);

            post = postRes.data;
            nextPost = nextRes.data;
        } catch (err) {
            error = "Unable to load article.";
        } finally {
            isLoading = false;
        }
    }

    function shareLinks(type: 'facebook' | 'copy' | 'email') {
        const url = window.location.href;

        switch (type) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;

            case 'copy':
                navigator.clipboard.writeText(url);
                break;

            case 'email':
                const subject = encodeURIComponent(post?.blog_name || "Error no subject title");
                const body = encodeURIComponent(
                    `See this blog post by CPMSoc. ${url}\n\nAbstract of the article:\n ${post?.tldr_text || "No snippet text"}`
                );
                window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
                break;
        }
    }
</script>

<div class="w-full min-h-screen font-instrument-sans text-black">

    {#if isLoading}
<!--        <div class="h-screen flex items-center justify-center font-mono text-gray-400">Loading...</div>-->
    {:else if error || !post}
        <div class="min-h-[70vh] flex items-center justify-center py-20">
            <ErrorPage />
        </div>
    {:else}

        <div class="max-w-[1200px] mx-auto px-10 pt-12">

            <div class="flex gap-4 mb-6">
                {#each post.tags as tag}
                    <span class={`flex items-center justify-center px-4 py-1 text-sm font-mono tracking-wider ${getTagColor(tag)}`}>
                        {tag}
                    </span>
                {/each}
            </div>

            <h1 class="text-4xl md:text-6xl font-extrabold text-black mb-5 leading-tight">
                {post.blog_name}
            </h1>

            <div class="flex flex-col md:flex-row gap-8 items-start mb-8">

                <div class="flex gap-4 items-center shrink-0">

                    <button
                            onclick={() => shareLinks('facebook')}
                            class="p-2 border border-black hover:bg-black hover:cursor-pointer hover:text-white transition-colors"
                            aria-label="Share on Facebook"
                    >
                        <FacebookLogo size={20} weight="fill" />
                    </button>

                    <button
                            onclick={() => shareLinks('copy')}
                            class="p-2 border border-black hover:bg-black hover:cursor-pointer hover:text-white transition-colors"
                            aria-label="Copy Link"
                    >
                        <Link size={20} />
                    </button>

                    <button
                            onclick={() => shareLinks('email')}
                            class="p-2 border border-black hover:bg-black hover:cursor-pointer hover:text-white transition-colors"
                            aria-label="Share via Email"
                    >
                        <EnvelopeSimpleOpen size={20} />
                    </button>

                </div>
                <div class="font-mono text-gray-600 text-sm leading-relaxed italic border-l-4 border-gray-100 pl-4">
                    {post.tldr_text}
                </div>
            </div>
        </div>

        <div class="w-[85%] h-[400px] md:h-[600px] overflow-hidden mb-8 mx-auto">
            <img
                    src={post.blog_image}
                    alt={post.blog_name}
                    class="w-full h-full object-cover"
            />
        </div>

        <div class="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-12">

            <div class="md:w-1/4 shrink-0">
                <div class="flex flex-col justify-center">

                    <p class="text-2xl font-bold leading-tight pb-4 text-center">
                        {post.author}
                    </p>

                    <div class="border-y-1 border-black py-2 font-mono italic text-m text-center">
                        {formatDate(post.date_published)}
                    </div>

                </div>
            </div>

            <div class="md:w-3/4">
                <article class="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-p:font-['Instrument_Sans'] prose-p:leading-loose">
                    {@html renderContent(post.text)}
                </article>
            </div>
        </div>

    {/if}

    {#if nextPost}
        <a href={`/blog/${nextPost.slug}`} class="group block relative w-full h-[275px] md:h-[350px] mt-12 overflow-hidden cursor-pointer">
            <div class="absolute inset-0">
                <img
                        src={nextPost.blog_image}
                        alt="Next Article"
                        class="w-full h-full object-cover filter brightness-65 blur-sm group-hover:scale-108 scale-105 transition-all duration-400"
                />
            </div>

            <div class="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
                <p class="font-mono text-sm md:text-base mb-4 tracking-widest opacity-90">
                    Read another article
                </p>
                <h2 class="text-4xl md:text-6xl font-bold">
                    {nextPost.blog_name}
                </h2>
            </div>
        </a>
    {/if}
</div>