<script lang="ts">
    import { onMount } from 'svelte'
    import axios from 'axios'
    import FancyTextEffect from "$lib/ui/FancyTextEffect.svelte"
    import ErrorPage from '../../routes/+error.svelte';
    import { env } from '$env/dynamic/public';

    const API_BASE = env.PUBLIC_API_BASE_URL

    interface BlogPost {
        id: number;
        slug: string;
        blog_name: string;
        date_published: string;
        author: string;
        tldr_text: string;
        tags: string[];
        tile_image: string;
        blog_image: string;
    }

    let blogPosts = $state<BlogPost[]>([])
    let isLoading = $state(true)
    let error = $state<string | null>(null)

    const availableTags = ["Mathematics", "Computer Science"]
    let selectedTags = $state<string[]>([])

    let innerWidth = $state(0)

    let numCols = $derived.by(() => {
        if (innerWidth >= 1280) return 4
        if (innerWidth >= 1024) return 3
        if (innerWidth >= 640) return 2
        return 1;
    });

    function getTypeColourGradient(tag: string) {
        if (tag === 'Mathematics') return 'from-[#ef4444] to-[#f87171]'
        if (tag === 'Computer Science') return 'from-[#5b63f5] to-[#818cf8]'
        return 'from-gray-100 to-gray-200'
    }

    function getTagColor(tag: string) {
        if (tag === 'Mathematics') return 'bg-[#ef4444]'
        if (tag === 'Computer Science') return 'bg-[#5b63f5]'
        return 'bg-gray-300'
    }

    function formatDate(dateStr: string) {
        if (!dateStr) return ''
        const [y, m, d] = dateStr.split('-')
        return `${d}/${m}/${y}`
    }

    async function fetchPosts() {
        try {
            let response

            // If no tags selected do the standard GET request
            // If tags selected then we do the GET request thing which filters based on tags
            if (selectedTags.length === 0) {
                response = await axios.get(`${API_BASE}/api/blog_items/shortened/`)
            } else {
                response = await axios.get(`${API_BASE}/api/blog_items/filter_by_tags/`, {
                    params: {
                        tags: selectedTags
                    },
                    paramsSerializer: {
                        indexes: null
                    }
                });
            }
            blogPosts = response.data
        } catch (err) {
            error = "Could not load the blog posts."
        } finally {
            isLoading = false
        }
    }

    function toggleTag(tag: string) {
        if (selectedTags.includes(tag)) {
            // E.g. .filter removes the tag from the selected tags
            // Basically will keep if they are the same, t !== tag is false so it will be removed
            selectedTags = selectedTags.filter(t => t !== tag)
        } else {
            selectedTags = [...selectedTags, tag]
        }
        fetchPosts();
    }

    onMount(() => {
        fetchPosts()
    });
</script>

<!-- This is to get the like window width so we know how many columns to use -->
<svelte:window bind:innerWidth />

<div class="w-full h-[170px] overflow-hidden">
    <FancyTextEffect
            text="BLOG"
            leftHex="#32b7b6"
            rightHex="#425389"
    />
</div>

<div class="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 font-instrument-sans text-black">
    {#if error}
        <div class="min-h-[70vh] flex items-center justify-center py-20">
            <ErrorPage />
        </div>
    {:else}
        <div class="flex flex-wrap gap-4 lg:mx-20 sm:mx-10 mx-5">
            {#each availableTags as tag}
                {@const isSelected = selectedTags.includes(tag)}
                <button
                        onclick={() => toggleTag(tag)}
                        class="px-6 py-2 text-sm font-mono font-bold border cursor-pointer
                {isSelected
                    ? `bg-gradient-to-r ${getTypeColourGradient(tag)} text-white border-transparent`
                    : 'bg-white text-black border-black hover:bg-gray-50'}"
                >
                    {tag}
                </button>
            {/each}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-20 sm:mx-10">

            {#each blogPosts as post, index}
                {@const isLastInRow = (index + 1) % numCols === 0}

                <a
                        href={`/blog/${post.slug}`}
                        class="group block h-full border-b border-black bg-white transition-colors py-8 cursor-pointer"
                >
                    <div class="flex flex-col h-full px-6 border-black {!isLastInRow ? 'border-r' : ''}">

                        <div class="w-full aspect-[5/4] overflow-hidden mb-5 bg-gray-100 border border-gray-100">
                            <img
                                    src={post.tile_image}
                                    alt={post.blog_name}
                                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                        </div>

                        <div class="flex flex-col flex-grow">

                            <h2 class="text-xl font-bold leading-tight text-black mb-3 group-hover:text-[#5b8ddb] transition-colors hover:cursor-pointer">
                                {post.blog_name}
                            </h2>

                            <div class="mt-auto space-y-1 mb-4">
                                <p class="text-sm font-mono font-medium text-gray-500">
                                    {formatDate(post.date_published)}
                                </p>
                                <p class="text-sm font-mono font-medium text-gray-800 tracking-wide">
                                    {post.author}
                                </p>
                                <p class="text-xs font-mono font-medium text-gray-400 line-clamp-3">
                                    {post.tldr_text}
                                </p>
                            </div>

                            <div class="flex gap-2">
                                {#each post.tags as tag}
                                    <div class={`h-[4px] w-8 ${getTagColor(tag)}`}></div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </a>
            {/each}

        </div>
    {/if}
</div>