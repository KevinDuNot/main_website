<script>
    import ContactUsBackground from "$lib/assets/contactus/ContactUsBackground.png";

    let email = $state("")
    let query = $state("")

    const submitForm = (e) => {
        e.preventDefault()
        console.log(`The email is ${email} and the query is ${query}`)
        email = ""
        query = ""
    }
</script>

<div class="relative w-full md:h-[750px] h-[750px] overflow-hidden bg-black font-sans flex flex-col items-center justify-center px-10">
    <div class="relative z-10 w-full max-w-[600px] flex flex-col items-center text-center">

        <h2 class="text-6xl lg:text-7xl font-bold tracking-tight pt-5 mb-6 text-white">
            Questions?
        </h2>

        <p class="font-mono lg:text-[16px] text-[14px] mb-6 text-white">
            We're always happy to help you out in any way we can!
            Message us on Facebook or Discord, or shoot us an email!
        </p>

        <form
                class="w-full flex flex-col gap-4 font-mono"
                onsubmit={submitForm}
        >
            <input
                    type="email"
                    placeholder="Email address"
                    bind:value={email}
                    class="w-full p-4 bg-white text-black placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
            />

            <textarea
                    placeholder="Query"
                    rows="6"
                    bind:value={query}
                    class="w-full p-4 bg-white text-black placeholder:text-gray-300 outline-none resize-none focus:ring-2 focus:ring-purple-500"
            ></textarea>

            <button
                    class="bg-white text-black py-3 px-12 mx-auto mt-2 hover:bg-gray-200 transition-colors hover:cursor-pointer"
            >
                Submit
            </button>
        </form>

    </div>

    <img
            src={ContactUsBackground}
            alt=""
            class="absolute inset-0 h-full w-full object-cover pointer-events-none select-none z-0"
    />
</div>