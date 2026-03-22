<script>
    import MacGraphicError from '$lib/assets/error/MacGraphicError.jpg'
    import { onMount } from 'svelte';

    // Jokes taken from https://github.com/hotheadhacker/no-as-a-service/blob/main/reasons.json
    const reasons = [
        "This request is above my computational pay grade.",
        "My power supply filed for bankruptcy, so I can't give you a response.",
        "I'll spare you a half-hearted yes and give you an honest no.",
        "I'm on sleep mode, don't disturb me please",
        "Effort is currently not supported by my operating system.",
        "I'm still recovering from the last time I said yes.",
        "My answer is like Schrödinger's cat: it's both yes and no until you realize it's just no.",
        "Is it Opposite Day? Because otherwise my answer is no.",
        "I'm still running on DDR4 ram, sorry.",
        "I can't, I have an important meeting to stare at a spreadsheet and contemplate life.",
        "I forgot how to say yes.",
        "Pretend I gave you a clever excuse and just take the 'no' as implied."
    ];

    let randomReason = $state(reasons[0])

    onMount(() => {
        randomReason = reasons[Math.floor(Math.random() * reasons.length)]
    })
</script>

<div
        class="w-full flex flex-col items-center justify-center text-center px-4 font-mono min-h-[70vh] gap-6"
>
    <img src={MacGraphicError} alt="404 Error Graphic" class="max-w-30 select-none pointer-events-none"/>
    <h1 class="text-8xl font-bold text-black leading-none tracking-tighter">
        404
    </h1>

    <p class="text-l text-gray-600 font-medium">
        {randomReason}
    </p>
</div>