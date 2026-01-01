<script lang="ts">
    import Hero_Background from '$lib/assets/hero/Hero_Background.png'
    import Chip from '$lib/assets/hero/Chip.png'
    import Chip_Inverted from '$lib/assets/hero/Chip_Inverted.png'

    let tiltX = $state(0);
    let tiltY = $state(0);

    const handleMouseMove = (e: MouseEvent) => {
        if (e == null || !e.currentTarget) { return }

        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        tiltX = -y / 80;
        tiltY = x / 80;
    }

    const handleMouseLeave = () => {
        tiltX = 0;
        tiltY = 0;
    }
</script>

<div class="relative flex w-full md:h-[85vh] h-[95vh] items-center overflow-hidden text-white justify-center">

    <img
            src={Hero_Background}
            alt=""
            class="absolute inset-0 h-full w-full object-fill pointer-events-none select-none"
    />

    <!-- If you really really want a slight black tint you can uncomment this -->
     <div class="absolute inset-0 pointer-events-none bg-black/15"></div>

    <div class="relative z-10 w-[95%] flex md:flex-row flex-col p-0 gap-10">
        <div class="xl:flex-3 lg:flex-4 md:flex-6 flex-4 flex justify-center items-center">
            <div
                    class="relative md:w-[80%] w-[40%] perspective-[1000px] group"
                    role="presentation"
                    onmousemove={handleMouseMove}
                    onmouseleave={handleMouseLeave}
            >
                <div
                        class="relative w-full h-full transition-transform duration-250 ease-out will-change-transform"
                        style="transform: rotate(-15deg) rotateX({tiltX}deg) rotateY({tiltY}deg)"
                >

                    <img
                            src={Chip_Inverted}
                            alt="Blue chip inverted bottom parallax effect"
                            class="absolute z-10 top-0 left-0 w-full h-auto translate-x-2 translate-y-2 brightness-110"
                    />

                    <div class="absolute inset-0 z-30 pointer-events-none"></div>

                    <img
                            src={Chip}
                            alt="Blue chip top no parallax effect"
                            class="relative z-30 w-full h-auto brightness-115"
                            style="transform: translateX({-tiltY * 1.5}px) translateY({-tiltX * 1.5}px)"
                    />

                </div>
            </div>
        </div>

        <div class="flex-5 relative flex justify-center items-center z-10 p-8">
            <div>
                <p class="mb-4 font-mono md:w-[85%]">
                    #include &lt;math.h&gt;
                </p>
                <h1 class="lg:text-8xl sm:text-6xl text-5xl font-[600] mb-4">UNSW CPMSoc</h1>
                <p class="mb-4 font-mono text-xs md:w-[80%] w-[100%]">
                    Hi! We're the UNSW Competitive Programming and Mathematics Society,
                    a student society run by and for people who love problem solving.

                    <br/><br/>

                    We run regular workshops and competitions, as well as social and
                    professional events. Everyone is welcome, regardless of prior
                    experience!
                </p>
            </div>
        </div>
    </div>
</div>