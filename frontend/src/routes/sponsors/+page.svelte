<script>
    import CitadelSecuritiesLogo from '$lib/assets/sponsors/citadel_securities_logo.png'
    import JaneStreetLogo from '$lib/assets/sponsors/jane_street_logo.png'
    import OptiverLogo from '$lib/assets/sponsors/optiver_logo.png'
    import VivcourtLogo from '$lib/assets/sponsors/cropped_vivcourt_logo.png'
    import SusquehannaLogo from '$lib/assets/sponsors/sig_logo.png'
    import IMCLogo from '$lib/assets/sponsors/imc_logo.png'
    import MakoLogo from '$lib/assets/sponsors/mako_logo.png'
    import UNSWComputingLogo from '$lib/assets/sponsors/unsw_computing_logo.png'
    import UNSWMathematicsLogo from '$lib/assets/sponsors/unsw_maths_logo.png'

    import SponsorGridEffect from "$lib/ui/SponsorGridEffect.svelte";

    const majorSponsors = [
        {
            name: "Citadel Securities",
            logo: CitadelSecuritiesLogo,
            text_p1: "<p>Citadel Securities is a leading global market maker, delivering a broad array of fixed income and equity products to banks, broker-dealers, government agencies, corporations, insurers, and sovereign wealth funds.</p><p>Since its founding more than 15 years ago, Citadel Securities has cultivated a culture of excellence, assembling the brightest minds in trading, technology, and the sciences to make better markets for a better world.</p>",
            href: "https://www.citadelsecurities.com/"
        },
        {
            name: "Jane Street",
            logo: JaneStreetLogo,
            text_p1: "<p>Jane Street is a quantitative trading firm with offices worldwide. We hire smart, humble people who love to solve problems, build systems, and test theories.</p><p>You'll learn something new every day in our office—whether it's connecting with a colleague to share perspectives, or participating in a talk, class, or game night. Our success is driven by our people and we never stop improving.</p>",
            href: "https://www.janestreet.com/"
        },
    ]

    const minorSponsors = [
        {
            name: "Optiver",
            logo: OptiverLogo,
            text_p1: "<p>Optiver is a tech-driven trading firm and leading global market maker. For over 35 years, Optiver has been improving financial markets around the world, making them more transparent and efficient for all participants. The firm looks for the brightest students, who are passionate about problem solving and have a motivation to succeed. Regardless of whether you join as a grad or an intern, you’ll be supported in their industry-leading training programs to excel and make an impact on the real world.</p><p>To learn more about Optiver’s Graduate and Internship Program opportunities, see <a href=\"https://optiver.com/\" target=\"_blank\" rel=\"noreferrer\" class=\"text-[#7862e2] hover:underline\">our website</a>.</p>",
            href: "https://optiver.com/"
        },
        {
            name: "Vivcourt",
            logo: VivcourtLogo,
            text_p1: "<p>We use technology and data to trade diverse assets and execute various trading strategies on the world’s financial markets.</p><p>Employee wellbeing and growth is at the heart of our ethos and we create a positive impact by sharing our profits and our purposefully chosen social causes with our people.</p>",
            href: "https://www.vivcourt.com/"
        },
        {
            name: "Susquehanna",
            logo: SusquehannaLogo,
            text_p1: "<p>Susquehanna is a global quantitative trading firm founded by a group of friends who share a passion for game theory and probabilistic thinking. Our rigorous and analytical approach to decision making has led Susquehanna to become one of the largest and most successful proprietary trading firms in the world. In our offices around the globe, our employees are relentless problem solvers who collaborate to make optimal decisions.</p>",
            href: "https://sig.com/"
        },
        {
            name: "IMC",
            logo: IMCLogo,
            text_p1: "<p>As a leading, global market maker, IMC trades on more than 100 venues and provides liquidity in more than 200,000 securities. Using innovative technology and advanced trading strategies, we’ve played our part in making financial markets more efficient for almost 30 years.</p><p>Across offices, diverse teams of traders, developers and technologists work together to design and develop the software, hardware, networks and algorithms that drive our strategies and make us one of the world’s leading liquidity providers. We hire independent thinkers and challenge them to anticipate change and continuously innovate, seeking new ways to sustain our success. At IMC, anyone can make an impact and everyone is encouraged to do so.</p>",
            href: "https://www.imc.com/ap/"
        },
        {
            name: "MAKO",
            logo: MakoLogo,
            text_p1: "<p>We make markets in exchange-traded fixed income, equities and commodities products, providing liquidity to major exchanges in Europe, APAC and the Americas. Our reputation is built upon our consistent provision of liquidity across all market cycles, especially periods of high market stress.</p><p>Now, a large percentage of our global workforce is dedicated to designing, building, optimizing and maintaining our latency sensitive proprietary trading systems. Our success in this journey is underpinned by our expertise developed over the last 20 years as well as our entrepreneurial and collaborative culture. We are proud of our history, however we firmly believe that our commitment to rapid innovation and support of intellectual curiosity means that our best days are ahead of us.</p>",
            href: "https://www.mako.com/"
        },
    ]

    const affiliateSponsors = [
        {
            name: "UNSW Computing",
            logo: UNSWComputingLogo,
            text_p1: "",
            href: ""
        },
        {
            name: "UNSW Mathematics",
            logo: UNSWMathematicsLogo,
            text_p1: "",
            href: ""
        }
    ]
</script>

<div class="max-w-[1100px] mx-auto flex flex-col py-6 px-10 font-instrument-sans">

    <h1 class="text-5xl font-bold text-[#5b8ddb] mb-10">
        Sponsors
    </h1>
    <h2 class="text-4xl font-bold text-[#5b8ddb] mb-3">
        Major Sponsors
    </h2>

    <SponsorGridEffect sponsors={majorSponsors}/>

    <h2 class="text-4xl font-bold text-[#5b8ddb] mt-15 mb-3">
        Minor Sponsors
    </h2>

    <SponsorGridEffect sponsors={minorSponsors}/>

    <h2 class="text-4xl font-bold text-[#5b8ddb] mt-15 mb-3">
        Affiliate Sponsors
    </h2>

    <SponsorGridEffect sponsors={affiliateSponsors}/>
</div>