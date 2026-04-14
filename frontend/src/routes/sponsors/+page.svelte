<script>
    import CitadelSecuritiesLogo from '$lib/assets/sponsors/citadel_securities_logo.png'
    import JaneStreetLogo from '$lib/assets/sponsors/jane_street_logo.png'
    import OptiverLogo from '$lib/assets/sponsors/optiver_logo.png'
    import VivcourtLogo from '$lib/assets/sponsors/cropped_vivcourt_logo.png'
    import SusquehannaLogo from '$lib/assets/sponsors/sig_logo.png'
    import IMCLogo from '$lib/assets/sponsors/imc_logo.png'
    import UNSWScienceLogo from '$lib/assets/sponsors/unsw_school_of_science_logo.png'
    import UNSWCSELogo from '$lib/assets/sponsors/unsw_computer_science_and_engineering_logo.png'
    import UNSWMathematicsLogo from '$lib/assets/sponsors/unsw_maths_logo.png'
    import FlowTradersLogo from '$lib/assets/sponsors/flow_traders_logo.png'
    import HudsonRiverTradingLogo from '$lib/assets/sponsors/hudson_river_trading_logo.png'
    import QubeLogo from '$lib/assets/sponsors/qube_logo.png'

    import SponsorGridEffect from "$lib/ui/SponsorGridEffect.svelte";

    const principalSponsors = [
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
        {
            name: "Hudson River Trading",
            logo: HudsonRiverTradingLogo,
            text_p1: "<p>Hudson River Trading (HRT) is a global quantitative trading firm that leverages cutting-edge technology, advanced research, and powerful computing to make markets more efficient. HRT brings together experts in mathematics, computer science, and engineering to design and optimize automated trading systems.</p><p>Collaboration is central to HRT’s culture—researchers, developers, and traders work closely to solve complex problems and continuously improve performance. The firm is committed to innovation, transparency, and building systems that operate at the forefront of modern financial markets.</p>",
            href: "https://www.janestreet.com"
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
            name: "Qube Research & Technologies",
            logo: QubeLogo,
            logo_css: "scale-175",
            text_p1: "<p>Qube Research & Technologies (QRT) is a global quantitative investment firm focused on delivering high-quality returns through a scientific approach to financial markets. By combining data, research, and technology, QRT develops systematic trading strategies across a wide range of asset classes.</p><p>The firm fosters a collaborative and intellectually rigorous environment where researchers, engineers, and quants work together to solve complex problems. QRT places a strong emphasis on innovation, continuous learning, and applying cutting-edge techniques to stay at the forefront of quantitative finance.</p>",
            href: "https://www.qube-rt.com/"
        },
    ]

    const affiliateSponsors = [
        {
            name: "Flow Traders",
            logo: FlowTradersLogo,
            text_p1: "<p>Flow Traders is a leading global financial technology-enabled liquidity provider, specialising in exchange-traded products (ETPs). Operating across multiple asset classes, Flow Traders uses advanced technology and data-driven strategies to provide continuous liquidity to financial markets worldwide.</p><p>With a strong focus on innovation and collaboration, Flow Traders brings together traders, developers, and researchers to improve market efficiency. The firm offers a dynamic environment where employees are empowered to take ownership, solve challenging problems, and make a tangible impact from day one.</p>",
            href: "https://www.flowtraders.com/"
        }
    ]

    const facultySponsors = [
        {
            name: "UNSW School of Science",
            logo: UNSWScienceLogo,
            text_p1: "",
            href: ""
        },
        {
            name: "UNSW School of Mathematics",
            logo: UNSWMathematicsLogo,
            text_p1: "",
            href: ""
        },
        {
            name: "UNSW School of Computer Science & Engineering",
            logo: UNSWCSELogo,
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
        Principal Sponsors
    </h2>

    <SponsorGridEffect sponsors={principalSponsors}/>

    <h2 class="text-4xl font-bold text-[#5b8ddb] mt-15 mb-3">
        Minor Sponsors
    </h2>

    <SponsorGridEffect sponsors={minorSponsors}/>

    <h2 class="text-4xl font-bold text-[#5b8ddb] mt-15 mb-3">
        Affiliate Sponsors
    </h2>

    <SponsorGridEffect sponsors={affiliateSponsors}/>

    <h2 class="text-4xl font-bold text-[#5b8ddb] mt-15 mb-3">
        Faculty Sponsors
    </h2>

    <SponsorGridEffect sponsors={facultySponsors}/>
</div>
