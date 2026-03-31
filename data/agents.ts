

export interface Agent {
    id: string;
    name: string;
    title: string;
    tagline: string;
    image: string;
    heroImageStyle?: { objectPosition?: string; objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' };
    bio: string;
    role: 'agent' | 'lender' | 'attorney';
    stats: { label: string; value: string }[];
    specialties: string[];
    credentials: { label: string; type: 'verified' | 'award' | 'achievement' }[];
    whyWorkWithMe: string[];
    instagram?: string;
    nmls?: string;
    branchAddress?: string;
    branchNmls?: string;
    bookingLink?: string;
}

export const agents: Record<string, Agent> = {
    arek: {
        id: "arek",
        name: "Arek Wtulich",
        title: "CT Realtor | William Raveis",
        tagline: "Your dedicated advocate for inclusive home buying, selling or investing.",
        image: "/images/Arek_Alt_1.jpg",
        heroImageStyle: { objectPosition: '65% 10%' },
        bio: "Arek Wtulich is a full-time, licensed CT Realtor who proudly serves the LGBTQ+ community and allies with enthusiasm, integrity, and a deeply personal approach to real estate. Since 2020, Arek has helped buyers and sellers across the state turn their housing goals into reality, with a special passion for guiding first-time homebuyers through what can often feel like an emotional and overwhelming process. His clients know him for his optimism, clear communication, and ability to create a calm, empowering experience from the first showing to the closing table.\n\nArek's dedication to excellence was recognized early in his career when he earned the Century 21 Quality Award in his first full year in the business. He believes that every client deserves not only expert market knowledge, but also a trusted advocate who understands the importance of feeling safe, seen, and supported, especially when making one of life's biggest financial and personal decisions.\n\nA passionate leader and advocate, Arek is deeply involved in both the real estate and LGBTQ+ communities. He was a Co-Founder and Vice President of the Connecticut Chapter of the LGBTQ+ Real Estate Alliance, and served on the Board of Directors for the Tri-County Alliance of Realtors, where he was the 2025 Vice President. He is also a HYPE Ambassador with Hartford Young Professionals & Entrepreneurs and an active member of BNI Rocky Hill.",
        role: "agent",
        stats: [
            { label: "Experience", value: "Since 2020" },
            { label: "Areas", value: "Hartford, Middlesex, New Haven and Tolland Counties" },
            { label: "Community", value: "LGBTQ+ Leader" }
        ],
        specialties: ["First-Time Homebuyers", "LGBTQ+ Relocation", "Listing Specialist", "Multi-family Homes"],
        credentials: [
            { label: "Licensed CT Realtor", type: "verified" },
            { label: "Century 21 Quality Award", type: "award" },
            { label: "Co-Founder, CT LGBTQ+ Real Estate Alliance", type: "achievement" },
            { label: "2025 VP, Tri-County Alliance of Realtors", type: "achievement" }
        ],
        whyWorkWithMe: [
            "Full-time licensed professional since 2020",
            "Century 21 Quality Award recipient in first full year",
            "Deep expertise guiding first-time homebuyers",
            "Trusted advocate for LGBTQ+ community and allies"
        ],
        instagram: "@areksellsre"
    },
    abby: {
        id: "abby",
        name: "Abby Dudarewicz",
        title: "CT Realtor | SERHANT. CT",
        tagline: "Helping you find not just a house, but a home where you belong.",
        image: "/images/abby.png",
        heroImageStyle: { objectFit: 'cover', objectPosition: 'top center' },
        bio: "Abby Dudarewicz is a Connecticut Realtor with SERHANT. CT and a member of the highly ranked Gagliardi Team. Abby is known for her approachable style, strong organization, and concierge-level support for her clients from start to finish. She primarily serves Hartford, Tolland, and Middlesex Counties, but is happy to help clients anywhere in Connecticut.\n\nAbby is passionate about helping LGBTQ+ buyers, sellers, and families feel informed, supported, and confident throughout the entire process. She lives in Glastonbury with her wife, son, and two cats.",
        role: "agent",
        stats: [
            { label: "Experience", value: "Since 2022" },
            { label: "Areas", value: "Hartford, Middlesex, New Haven Counties" },
            { label: "Community", value: "LGBTQ+ Advocate" }
        ],
        specialties: ["Residential Sales", "Buyer Representation", "LGBTQ+ Families", "Hartford & Tolland Counties"],
        credentials: [
            { label: "Licensed CT Realtor — SERHANT. CT", type: "verified" },
            { label: "Member, Gagliardi Team", type: "achievement" },
            { label: "LGBTQ+ Community Advocate", type: "achievement" }
        ],
        whyWorkWithMe: [
            "Concierge-level support from start to finish",
            "Personal LGBTQ+ lived experience as part of the community",
            "Deep coverage of Hartford, Tolland & Middlesex Counties",
            "Approachable, organized, and genuinely invested in your outcome"
        ],
        instagram: "@abbydudarewicz"
    },

    travis: {
        id: "travis",
        name: "Travis Lipinski",
        title: "CT Realtor | William Raveis Lifestyles Realty",
        tagline: "Committed to Litchfield County — bringing local knowledge, genuine guidance, and a decade of expertise to every transaction.",
        image: "/Travis Lipinski headshot.jpg",
        heroImageStyle: { objectFit: 'cover', objectPosition: 'top center' },
        bio: "Travis is committed to Litchfield County. Born and raised in Torrington, he began working in Litchfield in the hospitality sector. After attending Johnson and Wales University with a major in business and minor in hospitality management, he worked in the country club, hotel and restaurant industry doing event planning, sales and management.\n\nFor over a decade, Travis has established himself as a second home property manager in the greater Litchfield, Washington, and Lake Waramaug areas. He brings to the table a knowledge of conditions, aesthetics, and mechanical work that go along with home buying and selling.\n\nTravis has the knowledge and appreciation of all types of architecture and conditions of properties large and small to guide client needs and wants. He will share all the uniqueness that each and every city and town in Litchfield County and into the greater Farmington Valley towns west of Hartford can offer here in the Nutmeg State.\n\nWhether you are a first-time home buyer, relocating from NYC, a long-standing resident, experienced seller, investor, or weekender, guidance by Travis will be efficient and genuine.",
        role: "agent",
        stats: [
            { label: "Experience", value: "Since 2021" },
            { label: "Areas", value: "Litchfield, Hartford Counties" },
            { label: "Background", value: "Hospitality" }
        ],
        specialties: ["Commercial RE", "Airbnb host", "Leases", "Second Home Properties"],
        credentials: [
            { label: "Licensed CT Realtor", type: "verified" },
            { label: "Johnson & Wales University — Business", type: "achievement" },
            { label: "Board of Directors, Warner Theatre", type: "achievement" },
            { label: "Board of Directors, Torrington Historic Preservation Trust", type: "achievement" }
        ],
        whyWorkWithMe: [
            "Born and raised in Torrington — true local expert",
            "Over a decade of property management experience",
            "Deep knowledge of architecture and property conditions",
            "Active community leader across multiple boards"
        ],
        instagram: "@travislipinskitherealtor"
    },
    jake: {
        id: "jake",
        name: "Jake Earl",
        title: "VP, Mortgage Banker | Total Mortgage",
        tagline: "Top 1% Lender turning complex finances into approvals.",
        image: "/images/jake.jpg?v=2",
        heroImageStyle: { objectFit: 'cover', objectPosition: 'top center' },
        bio: "With over 15 years in the mortgage industry, Jake Earl has earned a reputation as a top-tier professional, recognized in the Top 1% of Mortgage Lenders Nationwide and ranked as the #2 Lender at Total Mortgage in 2024. Since beginning his career in 2010, Jake has consistently delivered smart, tailored home loan solutions—particularly for high-achieving professionals and first-time homebuyers.\n\nJake's success stems from his client-first philosophy. He takes a highly personalized approach, carefully assessing each borrower's unique financial picture to recommend mortgage programs that align with both short-term goals and long-term plans. His dedication to ethical practices, integrity, and transparency has helped him build a business driven almost entirely by word-of-mouth referrals.\n\nKnown for his ability to navigate even the most complex loan scenarios, Jake is relentless in finding solutions. Whether guiding a first-time buyer through their first home purchase or assisting clients with challenging financial backgrounds, he is committed to going the extra mile to deliver results.",
        role: "lender",
        stats: [
            { label: "Areas", value: "CT, MA, FL, NC, SC, GA, TX, CA" },
            { label: "Total Mortgage", value: "#2 Lender 2024" },
            { label: "Experience", value: "Since 2010" }
        ],
        specialties: ["Complex Loan Scenarios", "First-Time Homebuyers", "High-Achieving Professionals", "Tailored Mortgage Solutions"],
        credentials: [
            { label: "Top 1% Mortgage Lenders Nationwide", type: "award" },
            { label: "#2 Lender at Total Mortgage 2024", type: "achievement" },
            { label: "15+ Years Industry Experience", type: "verified" },
            { label: "Senior Vice President", type: "verified" }
        ],
        whyWorkWithMe: [
            "Top 1% of Mortgage Lenders Nationwide",
            "#2 Lender at Total Mortgage in 2024",
            "Over 15 years of industry experience since 2010",
            "Business built on word-of-mouth referrals"
        ],
        instagram: "@Jakethefishdaddy",
        nmls: "975556",
        branchAddress: "128 Garden Street, Farmington, CT 06032",
        branchNmls: "2587938",
        bookingLink: "https://www.totalmortgage.com/bankers/jake-earl"
    },
    carolyn: {
        id: "carolyn",
        name: "Carolyn Futtner",
        title: "Real Estate Attorney | MPF Law",
        tagline: "Extensive courtroom and closing table experience — protecting your interests with precision and care.",
        image: "/Carolyn+Futtner-1920w.webp",
        heroImageStyle: { objectFit: 'cover', objectPosition: 'top center' },
        bio: "As a solo practitioner, Carolyn Futtner specialized in both litigation and transactional work. Her years of law experience have taken her to courtrooms all over the state such as the Connecticut Appellate Court. Since her admittance to the Bar, Futtner has gained extensive experience in real estate, having taken on hundreds of commercial and residential closings.\n\nCarolyn's legal fields include real estate transactions, civil litigation, personal injury, family law, trusts and estates, probate law, business planning, DUI law, and consumer and commercial collections.",
        role: "attorney",
        stats: [
            { label: "Experience", value: "Since 2005" },
            { label: "Areas", value: "All CT but Fairfield County" },
            { label: "Closings", value: "Hundreds" }
        ],
        specialties: ["Real Estate Transactions", "Wills", "Trusts & Estates", "Probate & Business Planning"],
        credentials: [
            { label: "Juris Doctor — Western New England College, School of Law, 2005", type: "verified" },
            { label: "B.A. — University of Connecticut (New England & Honors Scholar)", type: "achievement" },
            { label: "Bar Admission — Connecticut 2005", type: "verified" },
            { label: "Founding Partner — Mancini, Provenzano & Futtner, LLC", type: "achievement" }
        ],
        whyWorkWithMe: [
            "Hundreds of commercial and residential closings",
            "Experienced across courtrooms including CT Appellate Court",
            "Founding Partner at Mancini, Provenzano & Futtner, LLC",
            "UConn Honors Scholar with deep legal expertise"
        ],
        instagram: "@bronxette"
    }
};
