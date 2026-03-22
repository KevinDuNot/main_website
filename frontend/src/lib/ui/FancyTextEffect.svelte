<script lang="ts">
    import { onMount } from "svelte";
    import GrainEffect from '$lib/assets/resources/GrainEffect.webp';

    let { leftHex, rightHex, text } = $props();

    const maskId = "mask-" + Math.random().toString(36).slice(2, 9);

    let randomString = $state("");
    const characters = "000000000000000000001111111111111111111111112233445566778899";

    const generateRandomString = (length: number) => {
        let result = "";
        const charLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    };

    onMount(() => {
        randomString = generateRandomString(12000);
    });

    function handleMouseMove() {
        randomString = generateRandomString(12000);
    }
</script>

<div
        onmousemove={handleMouseMove}
        role="presentation"
        class="group relative w-full h-full overflow-hidden select-none bg-black"
>
    <div class="absolute inset-0 z-0">
        <div
                class="absolute inset-0 opacity-100 brightness-108"
                style="background: linear-gradient(to right, {leftHex}, {rightHex});"
        ></div>

        <div class="absolute inset-0 overflow-hidden mix-blend-overlay opacity-30">
            <p class="whitespace-pre-wrap break-all font-mono text-[10px] leading-tight font-bold text-white/50">
                {randomString}
            </p>
        </div>
    </div>


    <div
            class="absolute inset-0 z-10 pointer-events-none translate-y-3"
            style="
                mask-image: url(#{maskId});
                -webkit-mask-image: url(#{maskId});
                mask-repeat: no-repeat;
                mask-position: center;
                mask-size: 100% 100%;
            "
    >
        <div class="absolute inset-0 overflow-hidden opacity-100">
            <p class="whitespace-pre-wrap break-all font-mono text-[10px] leading-tight font-bold text-white drop-shadow-md">
                {randomString}
            </p>
        </div>
    </div>


    <svg class="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                <text
                        x="50%"
                        y="50%"
                        text-anchor="middle"
                        dominant-baseline="middle"
                        fill="white"
                        font-weight="800"
                        letter-spacing="0.1em"
                        opacity="1"
                        class="lg:text-[170px] text-[100px]"
                >
                    {text}
                </text>
            </mask>
        </defs>
    </svg>

    <div
            class="absolute inset-0 z-50 pointer-events-none mix-blend-difference opacity-100"
            style="background-image: url({GrainEffect}); background-size: cover; background-repeat: repeat;"
    ></div>

</div>