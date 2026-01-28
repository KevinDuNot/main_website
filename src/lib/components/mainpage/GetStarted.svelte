<script>
    import BackgroundGetStarted from '$lib/assets/getstarted/BackgroundGetStarted.png'
    import PurpleForegroundGetStarted from '$lib/assets/getstarted/PurpleForegroundGetStarted.png'
    import PolygonGetStarted from '$lib/assets/getstarted/PolygonGetStarted.png'
</script>

<div class="relative w-full md:h-[750px] h-[800px] overflow-hidden bg-black font-sans">

    <img
            src={BackgroundGetStarted}
            alt=""
            class="absolute inset-0 h-full w-full object-cover pointer-events-none select-none z-0"
    />

    <div class="absolute top-0 left-0 z-0 flex items-center justify-center
            w-full h-[50%]
            md:w-[45%] md:h-full pointer-events-none select-none">

        <svg class="absolute w-[60%] md:w-full md:h-full scale-125 select-none md:translate-x-20 translate-x-2 translate-y-10 md:translate-y-10" viewBox="0 0 630 436" overflow="visible">
            <defs>
                <path
                        id="binaryPath"
                        d="M0.005,455.998 C5.205,344.717 127.638,225.829 219.629,211.162 C343.848,191.356 599.786,141.118 639.999,-0.001"
                        fill="none"
                        transform="scale(1) rotate(1)"
                />

                <path
                        id="binaryPathTop"
                        d="M-0.002,493.994 C23.886,360.389 219.503,255.655 334.770,243.361 C483.866,227.458 717.555,138.830 763.166,0.295 "
                        fill="none"
                        transform="scale(0.83) rotate(1)"
                />


                <linearGradient id="edge-fade" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stop-color="black" />
                    <stop offset="10%" stop-color="white" />
                    <stop offset="90%" stop-color="white" />
                    <stop offset="100%" stop-color="black" />
                </linearGradient>

                <mask id="text-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#edge-fade)" />
                </mask>
            </defs>

            <text class="font-mono text-[10px] fill-white tracking-widest opacity-50 -translate-y-8 -translate-x-5" mask="url(#text-mask)">
                <textPath href="#binaryPathTop" startOffset="0%">
                    00111010011101010111010101010111101001111010011101010011101010111010101010101001110100111010101110101010101010001010111010101010101111010101010101100100100111010011101011101001110101011101010101010100
                </textPath>
            </text>

            <text class="font-mono text-[10px] fill-white tracking-widest opacity-50 -translate-x-1" mask="url(#text-mask)">
                <textPath href="#binaryPath" startOffset="0%">
                    10010100111010100111010101110101010101010011101001110101011101010101010100111010011101010111010101010101001110100111010101110101010101010011101001110101011101010101010100111010011101010111010101010101
                </textPath>
            </text>
        </svg>

        <img
                src={PolygonGetStarted}
                alt=""
                class="relative h-[80%] w-auto object-contain opacity-100 z-10"
        />
    </div>

    <div class="absolute bottom-0 right-0 z-10
                w-full h-[55%]
                md:top-0 md:h-full md:w-[55%]">

        <img
                src={PurpleForegroundGetStarted}
                alt=""
                class="absolute inset-0 w-full h-full object-cover
                       [clip-path:polygon(0_10%,100%_0,100%_100%,0_100%)]
                       md:[clip-path:polygon(150px_0,100%_0,100%_100%,0_100%)]"
        />

        <div class="absolute inset-0 z-30 flex flex-col justify-center items-center
                    pt-[12%] px-10 md:mr-5 mr-0 md:mb-0 mb-10
                    md:pt-0 md:px-0 md:pl-[120px]">

            <div class="flex flex-col md:max-w-[600px]">
                <h2 class="text-6xl lg:text-7xl font-bold tracking-tight pt-5 mb-6 text-white">
                    Get Started
                </h2>


                <p class="font-mono lg:text-[16px] text-[14px] leading-relaxed mb-6 text-white">
                    If you're new to all this, check out our beginner
                    guides CP101 for competitive programming, and
                    CM101 for competitive maths.
                </p>

                <div class="flex flex-wrap gap-3">
                    <a
                            href="/cp101"
                            class="bg-[#ffffff] text-black font-mono text-sm py-2 px-4 hover:bg-[#eeeeee] transition-colors w-[35%] text-center"
                    >
                        CP101
                    </a>
                    <a
                            href="/cm101"
                            class="bg-[#ffffff] text-black font-mono text-sm py-2 px-4 hover:bg-[#eeeeee] transition-colors w-[35%] text-center"
                    >
                        CM101
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- This is the grid effect you see on top of the purple (and also subtly on the black section) -->
    <svg class="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-10 mix-blend-overlay" width="100%" height="100%">
        <defs>
            <pattern id="global-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" stroke-width="4" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#global-grid)" />
    </svg>

</div>