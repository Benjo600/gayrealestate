const BASE = "https://www.gayrealestatect.net";

export interface SsrBlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  seoKeywords?: string;
}

export interface SsrAgent {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: { label: string; type: string }[];
  specialties: string[];
  stats: { label: string; value: string }[];
  bookingLink?: string;
}

export const SSR_BLOG_POSTS: Record<string, SsrBlogPost> = {
  "best-places-to-live-in-connecticut-lgbtq": {
    slug: "best-places-to-live-in-connecticut-lgbtq",
    title: "Best Places to Live in Connecticut for LGBTQ+ People (2026 Guide)",
    author: "Arek Wtulich",
    date: "2026-02-22",
    readTime: "8 MIN READ",
    image: `${BASE}/ct_lgbtq_places.png`,
    seoKeywords: "best places to live in Connecticut for LGBTQ, LGBTQ friendly Connecticut towns, gay friendly Connecticut, where to live in CT LGBTQ",
    content: `
      <p class="lead-paragraph">Let's be honest: when most people picture an LGBTQ+ friendly place to live, they think New York, San Francisco, or maybe Portland. Connecticut rarely makes that list. And that's exactly the problem - because what you don't know could cost you the home, the community, and the life you actually want.</p>

      <p>Connecticut has been quietly building one of the most robust LGBTQ+ protections frameworks in the country. It was the <strong>second state in the nation to legalize same-sex marriage</strong> back in 2008 - before it was federally mandated. It has comprehensive non-discrimination laws covering housing, employment, and public accommodations. And it's home to some genuinely thriving, deeply welcoming communities. You just have to know where to look.</p>

      <h2>Why Connecticut? The Case You Haven't Heard Yet</h2>
      <p>Before we get into specific towns, let's address something: why Connecticut at all? The honest answer is value. If you're moving from NYC or Boston, you can get a 3-bedroom home with a yard, top-rated schools, and a 60-minute train commute for what a studio apartment costs in Brooklyn. And with remote work now permanent for many professionals, the calculus has completely changed.</p>
      <p>For LGBTQ+ people specifically, Connecticut offers something rare: <strong>legal protection backed by culture</strong>. Laws matter, but so does whether your neighbors fly a Pride flag, whether your kids' teachers are affirming, and whether the local bar scene includes a queer space. In the towns below, you get all of it.</p>

      <h2>🏆 West Hartford: The Gold Standard</h2>
      <p>If you only research one Connecticut town, make it West Hartford. This is the community that consistently tops every LGBTQ+ livability metric, and for good reason. The local government has been explicitly pro-LGBTQ+ for decades. The school district is recognized for its inclusive curriculum and supportive staff. And the walkable Blue Back Square area has become a genuine hub for queer-friendly dining, shops, and nightlife.</p>
      <p>Arek consistently shares information about West Hartford first when asked where the community is strongest. His deep roots in Hartford County's real estate and LGBTQ+ networks make him one of the most connected advocates for buyers navigating this market.</p>
      <p>The median home price hovers around $540,000 for single family homes, with townhomes and condos available for first-time buyers in the $345s. The commute to Hartford is under 15 minutes. It's arguably the best all-around package in Connecticut.</p>

      <h2>🌈 Northampton's Shadow: Northampton-Adjacent Towns</h2>
      <p>The Pioneer Valley influence extends south into Connecticut's Tolland and Windham counties. Towns like <strong>Mansfield (Storrs)</strong>, home to UConn, have a progressive, academic culture that tends to be strongly LGBTQ+ inclusive. If you want lower home prices and don't need the urban amenities, this is worth exploring.</p>

      <h2>🏙️ Hartford: Affordable, Authentic, and Underrated</h2>
      <p>Hartford proper gets overlooked because of its urban challenges, but the LGBTQ+ community here is real, vibrant, and deeply rooted. The city has been a destination for queer nightlife in Connecticut for decades, and ongoing revitalization projects are making neighborhoods like Parkville and Blue Hills genuinely attractive. For investors or buyers willing to be early, Hartford offers <strong>extraordinary value</strong> - single-family homes under $250,000 are still possible.</p>

      <h2>🌊 New Haven: Yale Energy, Queer Culture, and Coastal Proximity</h2>
      <p>New Haven's Wooster Square and East Rock neighborhoods have long attracted artists, academics, and progressive thinkers - which translates to a strong, visible LGBTQ+ presence. Yale University anchors an intellectual culture that doesn't tolerate intolerance. Home prices are rising but still accessible compared to NYC, and you're 90 minutes from Manhattan by train.</p>

      <h2>🍂 Litchfield County: For the LGBTQ+ Buyer Who Wants Space</h2>
      <p>This surprises people: rural Northwestern Connecticut - Litchfield, Washington, Warren, and the lake communities - has long been a quiet retreat for LGBTQ+ professionals and couples from NYC and Boston. It's not the same as living in West Hartford, but the second-home and weekend community here is extremely welcoming. If you want land, privacy, and natural beauty, Travis Lipinski, our Litchfield County specialist, knows this market intimately.</p>

      <h2>What to Look For When Evaluating Any Connecticut Town</h2>
      <ul>
        <li><strong>School district policies:</strong> Does the district have explicit protections for LGBTQ+ students? Formal anti-bullying policies that name sexual orientation and gender identity?</li>
        <li><strong>Local government stance:</strong> Has the town passed local non-discrimination ordinances? Does it fly a Pride flag during June?</li>
        <li><strong>Community organizations:</strong> Is there a local PFLAG chapter? An LGBTQ+ center? These signal an established, supported community.</li>
        <li><strong>Business visibility:</strong> Rainbow stickers in windows aren't just decoration — they signal a business community that values your patronage and your identity.</li>
        <li><strong>Healthcare access:</strong> For trans and non-binary buyers especially, proximity to affirming medical providers is critical. Connecticut has several excellent options, particularly near Hartford and New Haven.</li>
      </ul>

      <h2>Your Next Step: Talk to Someone Who Knows This From the Inside</h2>
      <p>You can read rankings all day, but the most important insight comes from people who have lived this experience themselves - who have navigated Connecticut's market not just as realtors, but as members of the community they're helping you find. That's the difference we offer.</p>
      <p>Our team includes licensed agents who are part of the LGBTQ+ Real Estate Alliance, who live in these communities, and who have helped hundreds of LGBTQ+ buyers find exactly what they were looking for - not just a house, but a home where they genuinely belong.</p>
    `,
  },
  "why-west-hartford-is-lgbtq-friendly-connecticut": {
    slug: "why-west-hartford-is-lgbtq-friendly-connecticut",
    title: "Why West Hartford Is One of the Most LGBTQ+-Friendly Towns in Connecticut",
    author: "Arek Wtulich",
    date: "2026-02-18",
    readTime: "7 MIN READ",
    image: `${BASE}/west_hartford_lgbtq.png`,
    seoKeywords: "West Hartford LGBTQ friendly, West Hartford gay friendly, moving to West Hartford Connecticut, LGBTQ West Hartford CT",
    content: `
      <p class="lead-paragraph">West Hartford keeps appearing on every "best places to live" list for LGBTQ+ buyers in Connecticut. But lists don't tell you <em>why</em> — and "why" is everything when you're deciding where to plant roots. Here's the real story.</p>

      <p>West Hartford isn't just passively inclusive. It's a community that has been <strong>actively building its LGBTQ+ identity for over two decades</strong>. That's a meaningful distinction. There's a difference between a town that won't discriminate and a town that celebrates, and West Hartford is firmly in the second category.</p>

      <h2>The Local Government Is Actually On Your Side</h2>
      <p>West Hartford's Town Council has explicitly passed LGBTQ+ non-discrimination protections that go beyond state law requirements. The town is a consistent participant in Pride month programming, including official town government recognition. During June, you'll see Pride flags alongside the American flag on town property - not as a political statement, but as a statement of community values.</p>
      <p>This matters practically because local government attitude shapes everything from code enforcement fairness to how school boards are run. When the people in charge genuinely support the community, it flows through every institution.</p>

      <h2>The Schools Are a Major Draw — Especially for Families</h2>
      <p>West Hartford Public Schools are consistently rated among the best in Connecticut, but for LGBTQ+ families, the quality of inclusion matters as much as test scores. The district has explicit, named protections for LGBTQ+ students in its anti-bullying and non-discrimination policies. GSA (Gender & Sexuality Alliance) clubs exist at both high schools. Teachers receive training on affirming practices.</p>
      <p>The result: LGBTQ+ families with children regularly cite the school district as their primary reason for choosing West Hartford over comparable towns with similar price points and commute times.</p>
      <p>Abby Dudarewicz, who serves Hartford, Tolland, and Middlesex Counties, lives this reality firsthand - she is a Connecticut Realtor with SERHANT. CT who lives in Glastonbury with her wife, son, and two cats, and is passionate about helping LGBTQ+ buyers, sellers, and families feel informed, supported, and confident throughout the entire process. When she recommends a school district, it is grounded in personal experience, not just research.</p>

      <h2>The Neighborhood You'll Actually Want to Live In</h2>
      <p>Blue Back Square is the commercial and social heart of West Hartford Center — and it's genuinely alive in a way that many Connecticut downtowns aren't. Restaurants, boutiques, a movie theater, and bars within walking distance of residential neighborhoods. The queer-friendly social scene here is real: multiple establishments have long histories of welcoming LGBTQ+ clientele, and the crowd reflects the community's diversity.</p>
      <p>Beyond the Center, neighborhoods like Elmwood are experiencing real revitalization — more affordable home prices with the same inclusive community culture. For first-time buyers, Elmwood deserves serious attention.</p>

      <h2>The Real Estate Market: What You Actually Need to Know</h2>
      <p>West Hartford's housing market is competitive, and prices have risen significantly since 2020. Here's the current landscape:</p>
      <ul>
        <li><strong>Condos & townhomes:</strong> $345,000 median price in 2025 - most accessible entry point</li>
        <li><strong>Single-family homes:</strong> $542,000 median price in 2025</li>
        <li><strong>Premium neighborhoods near the Center:</strong> $700,000+</li>
        <li><strong>Days on market:</strong> Often under 2 weeks for desirable homes — you need to be ready to move fast</li>
      </ul>
      <p>This is a market where having a knowledgeable, well-networked agent is not optional — it's the difference between getting the house and losing it to a cash offer you didn't know was coming.</p>

      <h2>Is West Hartford Right for You?</h2>
      <p>It's genuinely great for: LGBTQ+ couples and families, especially with children. First-time buyers who want urban amenities and community connection. NYC or Boston transplants who want more space without sacrificing culture. People who value walkability, dining, and an active social scene.</p>
      <p>It may not be ideal for: Buyers on very tight budgets who need maximum square footage for minimum cost (look at Elmwood section or nearby towns instead). People seeking a quieter, more rural lifestyle (consider Litchfield County). Those who need to be in proximity to a different employment hub.</p>
      <p>The honest assessment: West Hartford has earned its reputation. But no single town is right for every buyer, and the best move you can make is talking to someone who knows the full CT market — not just one neighborhood.</p>
    `,
  },
  "moving-to-connecticut-as-a-gay-couple": {
    slug: "moving-to-connecticut-as-a-gay-couple",
    title: "Moving to Connecticut as a Gay Couple: What No One Tells You",
    author: "Arek Wtulich",
    date: "2026-02-15",
    readTime: "9 MIN READ",
    image: `${BASE}/gay_couple_moving_ct.png`,
    seoKeywords: "moving to Connecticut gay couple, relocating to CT LGBTQ, gay couple Connecticut real estate, same sex couple home buying Connecticut",
    content: `
      <p class="lead-paragraph">You've done the research. Connecticut has strong LGBTQ+ protections. You know about West Hartford. You've read the "best places to live" lists. But here's what those lists don't tell you: the gap between a town that's legally safe and a town where you'll actually feel at home is enormous, and bridging that gap is what we do.</p>

      <p>This post is for couples who are serious about making a move. Not window-shopping. Not "someday." People who are looking at their current situation — the cramped apartment, the absurd rent, the commute, the relationship that deserves more space — and thinking: it's time.</p>

      <h2>The Question Everyone Asks First (And It's the Wrong Question)</h2>
      <p>"Is Connecticut safe for gay couples?" Yes. Completely. Connecticut has had marriage equality since 2008. It has robust non-discrimination laws. Anti-LGBTQ+ housing discrimination is illegal and taken seriously. You are protected. That question is settled.</p>
      <p>The better questions are: <em>Where in Connecticut will we actually thrive? What does our daily life look like? Will we have community? Will our relationship be seen and celebrated, or just tolerated?</em> Those are harder, and more important.</p>

      <h2>The Daily Life Reality in Connecticut's Top LGBTQ+ Towns</h2>
      <p>In West Hartford, you will walk down the street holding hands and nobody will look twice. Not because they're being polite, because it's genuinely normal. You'll go to restaurants where other same-sex couples are at the next table. Your neighbors may display a Pride flag year-round (many do). The local coffee shop will have a "Love is Love" sticker in the window. This is the daily texture of life in a community that's been building inclusive culture for decades.</p>
      <p>In New Haven's East Rock neighborhood, the academic and arts community creates a similar environment — diverse, progressive, and actively queer-friendly. In Litchfield County's second-home communities, the culture is more private but equally welcoming: this is where NYC's gay professional class has been vacationing and retiring for generations.</p>

      <h2>Buying a Home Together: The Practical Considerations</h2>
      <p>This is where the conversation gets real, and it's where working with an agent who specializes in LGBTQ+ buyers genuinely matters.</p>
      <ul>
        <li><strong>How you hold title matters.</strong> Couples should work with their real estate attorney to understand the difference between joint tenancy with right of survivorship and tenancy in common — and which protects them better given their specific situation. Attorney Carolyn Futtner on our team handles exactly this.</li>
        <li><strong>Mortgage qualification as a couple.</strong> Both incomes, both credit scores, both financial histories. Working with a lender who has experience with same-sex couples ensures you're getting accurate guidance, not assumptions based on traditional household models. Jake Earl, our Top 1% mortgage lender, has navigated countless LGBTQ+ couple transactions.</li>
        <li><strong>Know your budget ceiling before you fall in love with a property.</strong> Connecticut's competitive markets move fast. Pre-approval isn't optional, it's the minimum entry requirement.</li>
        <li><strong>Commission structures and representation.</strong> Buyer representation is now more important than ever post-NAR settlement changes. Make sure your agent is exclusively representing your interests.</li>
      </ul>

      <h2>Community: The Thing That Decides Whether You Stay</h2>
      <p>Our most successful relocating couples — the ones who are still in Connecticut five years later and tell us it was the best decision they ever made — share one common factor: they didn't just buy a house, they joined a community.</p>
      <p>Connecticut has an active LGBTQ+ social infrastructure beyond Pride month. Hartford has consistent queer nightlife. New Haven and West Hartford have LGBTQ+ professional networking. Multiple towns have PFLAG chapters and LGBTQ+ community centers. If you come here expecting isolation, you'll be pleasantly shocked.</p>

      <h2>The NYC Comparison (Since You're Probably Thinking It)</h2>
      <p>If you're moving from New York — and a significant portion of our clients are — here's the honest comparison: You will gain space, equity, and a lower cost of living. You will miss certain things about city life: the density of nightlife, the anonymity, the sheer volume of queer spaces. Connecticut's queer scene is much smaller and more community-oriented, which many of our clients find they prefer after the initial adjustment period.</p>
      <p>The train to NYC runs regularly from New Haven, Hartford (through New Haven), and Fairfield County stations. Nobody's asking you to cut the cord. They're asking you to build something.</p>

      <h2>Our Team Has Lived This</h2>
      <p>Arek Wtulich, our lead agent, was a Co-Founder and Vice President of the Connecticut Chapter of the LGBTQ+ Real Estate Alliance. He's not just an agent who serves this community — he is a part of the community. When you work with our team, you're working with people who understand the nuances of this kind of move from the inside, not from a brochure.</p>
    `,
  },
  "most-lgbtq-inclusive-school-districts-connecticut": {
    slug: "most-lgbtq-inclusive-school-districts-connecticut",
    title: "The Most LGBTQ+-Inclusive School Districts in Connecticut (2026)",
    author: "Abby Dudarewicz",
    date: "2026-02-10",
    readTime: "10 MIN READ",
    image: `${BASE}/inclusive_schools_ct.png`,
    seoKeywords: "LGBTQ inclusive school districts Connecticut, gay friendly schools CT, affirming school districts Connecticut, LGBTQ family friendly Connecticut schools",
    content: `
      <p class="lead-paragraph">Here's a conversation that happens all the time: LGBTQ+ parents spend months researching home prices, commute times, and neighborhood vibes — and then almost as an afterthought ask about schools. Don't let that be you. For families with kids, the school district is often the single most important factor in quality of life, and the variation in Connecticut is dramatic.</p>

      <p>Some Connecticut school districts are nationally recognized for LGBTQ+ inclusivity. Others are actively hostile. Most fall somewhere in the middle, which is actually the most dangerous place to be — it creates the illusion of safety without the substance. Here's our honest breakdown.</p>

      <h2>What "LGBTQ+-Inclusive" Actually Means in a School District</h2>
      <p>Let's define our terms, because this matters. A truly inclusive district doesn't just tolerate LGBTQ+ students — it actively creates an environment where they can thrive. That means:</p>
      <ul>
        <li>Explicit LGBTQ+ protections in the district's non-discrimination and anti-bullying policies (not just "protected class" language — specifically naming sexual orientation and gender identity)</li>
        <li>Clear, enforced policies for transgender and non-binary students (bathroom access, pronoun use, name use before legal name change)</li>
        <li>Active GSA (Gender & Sexuality Alliance) clubs at middle and high school levels</li>
        <li>Staff training on affirming practices and how to respond to LGBTQ+ disclosures</li>
        <li>Curriculum that includes LGBTQ+ history and representation (Connecticut's LGBTQ+ Equity Act, signed in 2021, requires this)</li>
        <li>Administrative leadership that visibly champions inclusive values — not just as policy but as culture</li>
      </ul>

      <h2>🏆 Tier 1: Exceptional Districts</h2>
      <h3>West Hartford Public Schools</h3>
      <p>Consistently the gold standard in Connecticut for LGBTQ+ family inclusion. Both Conard and Hall High Schools have active, well-supported GSA programs. The district was an early adopter of comprehensive transgender student policies. Administrative leadership actively participates in LGBTQ+ community events. Parents of LGBTQ+ children repeatedly describe the district as genuinely affirming, not performatively so.</p>

      <h3>Glastonbury Public Schools</h3>
      <p>Glastonbury is often overlooked because it doesn't have West Hartford's profile, but its schools are exceptional — and its LGBTQ+ policies are among the strongest in CT. The town is also more affordable than West Hartford, making it a significant value opportunity for LGBTQ+ families.</p>

      <h3>New Haven Public Schools</h3>
      <p>New Haven's proximity to Yale creates an academic culture that influences the public schools profoundly. The district has strong LGBTQ+ protections, active student organizations, and a community of parents and educators who actively champion inclusion. Urban challenges exist, but for families in East Rock and Wooster Square neighborhoods, the district quality is notably higher.</p>

      <h2>🥈 Tier 2: Strong Districts Worth Considering</h2>
      <ul>
        <li><strong>Avon:</strong> Affluent suburban district with strong academics and developing LGBTQ+ programs. Generally inclusive culture.</li>
        <li><strong>Farmington:</strong> Similar profile to Avon — strong academics, progressive community culture, growing LGBTQ+ visibility.</li>
        <li><strong>Simsbury:</strong> Excellent schools with an increasingly progressive community. LGBTQ+ families are welcomed, though the community is still building infrastructure.</li>
        <li><strong>Mansfield (Storrs/UConn area):</strong> Academic community creates strong inclusion values. More modest housing prices make this an exceptional value for LGBTQ+ families who want quality schools on a budget.</li>
      </ul>

      <h2>What Our Agents Know That the Rankings Don't Show</h2>
      <p>School ratings tell you about test scores and college acceptance rates. They don't tell you whether the school counselor will correctly use your child's chosen name. They don't tell you whether the PE teacher handles locker room situations with competence and care. They don't tell you whether your child will have LGBTQ+ peers and LGBTQ+ adult role models in their school building.</p>
      <p>That's institutional knowledge that comes from being embedded in these communities — from knowing the principals, from talking to families who've been through these schools, from understanding the actual culture rather than the stated policy.</p>
      <p>Abby Dudarewicz lives in Glastonbury with her wife, son, and two cats — she navigates the Connecticut school system as a parent, not just as an agent. That lived experience, combined with her professional focus on serving Hartford, Tolland, and Middlesex Counties, gives her a ground-level view of which districts are genuinely affirming and which are still catching up. She brings that knowledge to every family she works with.</p>

      <h2>The Legal Foundation: Connecticut's 2021 LGBTQ+ Equity Act</h2>
      <p>Connecticut passed landmark legislation in 2021 requiring all public schools to include LGBTQ+ history in their curriculum.</p>

      <h2>Before You Commit to a District: Our Recommended Research Steps</h2>
      <ol>
        <li>Request the district's specific non-discrimination policy and look for explicit LGBTQ+ language</li>
        <li>Ask whether there are active GSA clubs at the schools your children would attend</li>
        <li>Request to speak with the school counselor and gauge their familiarity with LGBTQ+ youth support resources</li>
        <li>Connect with other LGBTQ+ families in the district — online groups and community organizations can make these introductions</li>
        <li>Talk to us — we've helped LGBTQ+ families navigate these exact conversations and can give you the unfiltered reality</li>
      </ol>
    `,
  },
  "1-million-nyc-vs-connecticut-what-do-you-get": {
    slug: "1-million-nyc-vs-connecticut-what-do-you-get",
    title: "$1 Million in NYC vs. $1 Million in Connecticut: What Do You Actually Get?",
    author: "Jake Earl",
    date: "2026-02-05",
    readTime: "9 MIN READ",
    image: `${BASE}/nyc_vs_ct_real_estate.png`,
    seoKeywords: "NYC vs Connecticut real estate, moving from NYC to Connecticut, 1 million dollars NYC vs Connecticut home, leaving New York for Connecticut",
    content: `
      <p class="lead-paragraph">A million dollars is still a lot of money. Unless you're buying real estate in New York City — in which case it's a down payment on a compromise. We've had this conversation with dozens of clients, and we want to have it with you honestly, with actual numbers and no sales pressure.</p>

      <p>Here's what we know: <strong>the people who make this move rarely look back</strong>. But the people who almost made this move and didn't? They're still in their 750-square-foot apartments, paying $4,200 a month in rent, wondering what if.</p>

      <h2>Let's Start With the Numbers</h2>

      <h3>$1,000,000 in New York City Gets You:</h3>
      <ul>
        <li>A 1–2 bedroom condo in Manhattan, likely under 900 sq ft</li>
        <li>A 2-bedroom co-op in a desirable Brooklyn neighborhood</li>
        <li>Monthly HOA/maintenance fees typically ranging from $1,500–$4,000+</li>
        <li>No yard. Almost certainly no parking. Limited storage.</li>
      </ul>

      <h3>$1,000,000 in Prime Connecticut Gets You:</h3>
      <ul>
        <li><strong>West Hartford:</strong> A beautifully renovated 4–5 bedroom single-family home in one of the best school districts in the state, walking distance to restaurants and shops, with a yard and 2-car garage</li>
        <li><strong>Litchfield County:</strong> A stunning historic property on 5–20 acres — actual privacy, actual land, actual quiet</li>
        <li><strong>Fairfield County:</strong> A 3–4 bedroom home in Connecticut's gold coast, with commuter rail access to NYC in 60–80 minutes</li>
      </ul>

      <h2>The Monthly Cost Comparison</h2>
      <p><strong>NYC Scenario:</strong> 1BR condo for $950,000 (20% down = $190,000). Monthly: ~$4,800 mortgage + $2,500 maintenance/HOA + NYC taxes = <strong>$7,300+/month</strong>. 750 sq ft.</p>
      <p><strong>Connecticut Scenario:</strong> 4BR single-family in West Hartford for $950,000 (20% down = $190,000). Monthly: ~$4,800 mortgage + $1,100 property taxes + minimal HOA = <strong>$5,900/month</strong>. 2,800+ sq ft. Yard. Garage. Top-rated schools.</p>
      <p>That's a $1,400/month difference, with dramatically more space. Over 10 years, that's $168,000 in savings before factoring in Connecticut's historically stronger property value appreciation.</p>

      <h2>What You're Actually Buying in Connecticut</h2>
      <ul>
        <li><strong>Space to exhale.</strong> A yard. A place to host. A guest room that doesn't require a pull-out couch apology.</li>
        <li><strong>A community where you're known.</strong> Your neighbors know your name. Your local coffee shop knows your order.</li>
        <li><strong>Equity that compounds.</strong> Ownership builds wealth. Rent builds your landlord's wealth.</li>
        <li><strong>Work-from-home livability.</strong> A home office that isn't your dining room table. Space for two people to work simultaneously.</li>
      </ul>

      <h2>The Commute Question</h2>
      <p>Fairfield County to Grand Central: 55–80 minutes. New Haven to Grand Central: 1:45. Hartford to NYC Penn Station: ~2:30 via Amtrak. If you're going in 2–3 days a week, the Fairfield County commute is genuinely manageable.</p>

      <h2>The Bottom Line</h2>
      <p>A million dollars in New York City is a compromise. A million dollars in Connecticut is a life. We're not telling you to leave New York — we're telling you to do the math with real numbers, with a team that knows both markets, before you decide.</p>
    `,
  },
  "litchfield-county-second-homes-lgbtq-buyers": {
    slug: "litchfield-county-second-homes-lgbtq-buyers",
    title: "Litchfield County's Best-Kept Secret: Second Homes & Weekend Retreats for LGBTQ+ Buyers",
    author: "Travis Lipinski",
    date: "2026-02-12",
    readTime: "7 MIN READ",
    image: `${BASE}/lgbtq_first_time_buyer.png`,
    seoKeywords: "Litchfield County second homes LGBTQ, gay friendly Connecticut weekend home, Litchfield CT real estate, second home Connecticut LGBTQ buyers",
    content: `
      <p class="lead-paragraph">There's a part of Connecticut that doesn't make the usual LGBTQ+ relocation lists — and that's precisely why it deserves your attention. Litchfield County, the quiet, hilly, historically rich northwestern corner of the state, has been a retreat for LGBTQ+ professionals, couples, and creatives from New York and Boston for decades. It just doesn't advertise it.</p>

      <p>This is a place where you can own 10 acres, wake up to nothing but birdsong, and still be two hours from Midtown Manhattan. Where a 200-year-old Colonial can be yours for what a Manhattan parking space costs annually. And where a deeply established — if understated — LGBTQ+ community has been woven into the fabric of towns like Washington, Warren, and Litchfield itself for generations.</p>

      <h2>Why Litchfield County Specifically?</h2>
      <p>Travis Lipinski was born and raised in Torrington and has spent over a decade as a second-home property manager in the greater Litchfield, Washington, and Lake Waramaug areas. "Litchfield County is unlike anywhere else in Connecticut," Travis says. "The architecture alone is extraordinary — 18th-century Colonials, converted barns, lakefront camps that have been in families for a hundred years. And the community here has always been quietly, genuinely welcoming."</p>

      <h2>What $500K–$1M Actually Buys You Here</h2>
      <ul>
        <li><strong>$400,000–$600,000:</strong> A well-maintained Colonial or Cape on 1–3 acres in towns like Torrington, Litchfield, or Morris. Renovated kitchens, wood-burning fireplaces, and detached garages are common at this range.</li>
        <li><strong>$600,000–$900,000:</strong> Historic properties with character — converted barns, antique center-halls, lakefront camps on Lake Waramaug or Bantam Lake.</li>
        <li><strong>$900,000+:</strong> Estate-level properties with significant acreage, guest houses, pool houses, and the kind of privacy that simply doesn't exist at any price in the tri-state metro area.</li>
      </ul>

      <h2>The Second-Home Lifestyle: A Genuine Alternative</h2>
      <p>Travis has managed second-home properties in this region for over a decade, which means he understands the specific demands and vulnerabilities of a property that sits empty for weeks at a time, the seasonal maintenance realities, the rental income potential, and the HOA or road-maintenance considerations that only experienced property managers know to flag before you sign.</p>

      <h2>Getting Started</h2>
      <ol>
        <li>Define your primary use: weekend retreat, hybrid primary residence, or income-generating rental property.</li>
        <li>Understand the commute reality. Litchfield County towns are 90–120 minutes from NYC depending on your exact destination.</li>
        <li>Get pre-approved before you fall in love. The market for distinctive historic properties moves quickly when priced well.</li>
        <li>Talk to Travis. His decade-plus in Litchfield County's second-home market means the conversation you have with him is categorically different from one with a general-market agent.</li>
      </ol>
    `,
  },
  "litchfield-county-towns-for-weekenders": {
    slug: "litchfield-county-towns-for-weekenders",
    title: "Lake Waramaug, Washington, & Beyond: The Litchfield County Towns Every LGBTQ+ Weekender Should Know",
    author: "Travis Lipinski",
    date: "2026-01-28",
    readTime: "8 MIN READ",
    image: `${BASE}/inclusive_neighborhoods.png`,
    seoKeywords: "Litchfield County Connecticut towns LGBTQ, Lake Waramaug real estate, Washington CT gay friendly, Litchfield hills weekend home buyers",
    content: `
      <p class="lead-paragraph">Most Connecticut guides for LGBTQ+ buyers focus on West Hartford, New Haven, and the usual suspects. This one is different. This is for the person who's been daydreaming about waking up to fog over a lake, having a wood-burning fire in October, and driving two hours back to the city on Sunday night feeling genuinely restored. This is the Litchfield County guide — written by someone who was born here.</p>

      <h2>🌊 Lake Waramaug: The Crown Jewel</h2>
      <p>If you've never heard of Lake Waramaug, prepare to lose an afternoon on Zillow. This pristine glacial lake in Warren and Kent is one of the most beautiful bodies of water in New England — unpretentious, uncommercial, and genuinely stunning. Lakefront properties here are rare, fiercely held, and range from rustic seasonal camps to updated 4-bedroom year-round homes.</p>
      <p>The community around Lake Waramaug has a long history of welcoming NYC's creative and professional LGBTQ+ community. Travis has managed properties on and around Lake Waramaug for years, which means he knows which lots have dock rights, which properties have the septic upgrades that matter for year-round use, and which listings have been priced based on lake proximity rather than actual condition.</p>

      <h2>🏡 Washington & Washington Depot: Understated, Beautiful, and Discreet</h2>
      <p>Washington is one of those New England towns that makes you understand why people pay to live in New England. Washington has long been a retreat for artists, writers, musicians, and LGBTQ+ professionals who specifically don't want the social scene of a larger community. Privacy and quiet are the amenities here. Antique Colonials, converted barns, and modernist glass-and-wood builds are all part of the architectural mix.</p>

      <h2>🏛️ Litchfield: History, Architecture, and a Genuinely Walkable Town Center</h2>
      <p>Litchfield proper is the county seat and one of the best-preserved 18th-century towns in America. The historic district — lined with original Federal and Georgian homes — is legitimately breathtaking and protected by strict architecture oversight. Properties on or near the historic town green command premium prices, but for good reason: the architectural quality is extraordinary.</p>

      <h2>🌿 Norfolk: Connecticut's Berkshires</h2>
      <p>Norfolk sits at the highest elevation in Litchfield County and has a distinctly Berkshires-adjacent energy: chamber music festivals, a Yale summer music program, Victorian-era farmhouses, and a tight-knit community of year-rounders and weekenders. Home prices in Norfolk tend to be more accessible than Washington or Litchfield center, making it excellent value for buyers who want the same landscape quality at a lower entry point.</p>

      <h2>What Makes the Right Property Here Different</h2>
      <p>Litchfield County properties — particularly older and historic ones — have specific evaluation requirements that most buyers and frankly most real estate agents aren't well-equipped to assess. Travis has spent over a decade doing hands-on property management in this region: he knows about septic systems for lakefront properties, about what happens to farmhouse foundations in a wet spring, about roof conditions on barn conversions, about the mechanical realities of heating a 1780 Colonial through a Connecticut winter.</p>
    `,
  },
  "legal-protections-lgbtq-real-estate-connecticut": {
    slug: "legal-protections-lgbtq-real-estate-connecticut",
    title: "Protecting Your Home & Your Relationship: What LGBTQ+ Buyers Need to Know Before Closing",
    author: "Carolyn Futtner",
    date: "2026-02-08",
    readTime: "9 MIN READ",
    image: `${BASE}/generational_wealth_real_estate.png`,
    seoKeywords: "LGBTQ real estate legal protections Connecticut, same sex couple home buying title Connecticut, real estate attorney LGBTQ CT, title protection gay couples Connecticut",
    content: `
      <p class="lead-paragraph">Nobody loves talking about the legal side of buying a home. For LGBTQ+ buyers — especially unmarried couples, or couples in any configuration — some of those decisions carry significantly more weight than most real estate agents will tell you.</p>

      <p>Carolyn Futtner is a founding partner at Mancini, Provenzano &amp; Futtner, LLC, a Connecticut real estate attorney with bar admission since 2005, and someone who has presided over hundreds of commercial and residential closings across the state. This is her honest guide to what LGBTQ+ buyers actually need to understand before they sign anything.</p>

      <h2>The Most Important Decision No One Talks About: How You Hold Title</h2>
      <p>When two people buy a property together, the way the deed is written determines what happens to the property if one partner dies, becomes incapacitated, or if the relationship ends. There are two primary options:</p>
      <ul>
        <li><strong>Joint Tenancy with Right of Survivorship:</strong> Each partner owns 100% of the property. If one dies, the other automatically inherits the full property — regardless of what any will says. This provides the strongest automatic protection for the surviving partner.</li>
        <li><strong>Tenancy in Common:</strong> Each partner owns a defined share (often 50/50). If one partner dies, their share passes to whoever is named in their will or estate plan — not automatically to the surviving partner. For unmarried couples without updated estate plans, this can create devastating complications.</li>
      </ul>
      <p>For LGBTQ+ couples, especially unmarried partners, the choice of how to hold title can be the difference between a surviving partner inheriting the family home and being forced to negotiate with a deceased partner's relatives over a property they helped pay for.</p>

      <h2>Estate Planning: The Non-Negotiable Companion to Buying</h2>
      <p>Connecticut's legal framework is strong for LGBTQ+ buyers — the state has robust non-discrimination laws and has recognized same-sex marriage since 2008. A will, a healthcare proxy, and a durable power of attorney are the minimum infrastructure every couple should have in place before they take title to a property together.</p>

      <h2>What Happens at a Connecticut Real Estate Closing</h2>
      <p>In Connecticut, closings are attorney-supervised — one of relatively few states where this is a legal requirement. That means a licensed attorney must be present at every closing to review and certify the title. Carolyn has conducted hundreds of closings across Connecticut. Her experience includes commercial and residential transactions, and appearances in courts throughout the state, including the Connecticut Appellate Court.</p>

      <h2>Title Insurance: Why It Matters More Than You Think</h2>
      <p>Title insurance protects against claims that arise from events before you purchased the property — liens, unpaid taxes, forged signatures in prior ownership chains, boundary disputes, and similar issues. Carolyn advises every buyer to purchase an owner's title insurance policy — not just the lender's policy, which only protects the bank. The owner's policy is a one-time premium that protects your ownership interest for as long as you own the property.</p>

      <h2>Questions to Ask Your Attorney Before Closing</h2>
      <ol>
        <li>How does the deed structure we've chosen interact with our current estate plan?</li>
        <li>Are there any easements, encumbrances, or deed restrictions I should know about before I take title?</li>
        <li>Is the title company issuing an owner's policy in addition to the lender's policy?</li>
        <li>What happens to my ownership interest if my partner and I separate?</li>
        <li>Should we update our wills and healthcare proxies to reflect this purchase?</li>
      </ol>
    `,
  },
  "trans-moving-connecticut-guide": {
    slug: "trans-moving-connecticut-guide",
    title: "Trans Moving to Connecticut: What to Actually Know Before You Relocate",
    author: "Abby Dudarewicz",
    date: "2026-03-28",
    readTime: "7 MIN READ",
    image: `${BASE}/trans_moving_ct.png`,
    seoKeywords: "trans moving Connecticut, transgender moving Connecticut, trans friendly towns CT, LGBTQ relocation Connecticut",
    content: `
      <p class="lead-paragraph">Connecticut comes up a lot when trans people are looking for a safer state to move to — and it's not just hype. The legal protections are real, the general culture is more progressive than most of the country, and the state has actively passed shield laws protecting people fleeing anti-trans legislation elsewhere.</p>

      <p>But moving as a trans person involves more than just picking a state. You need movers you can trust, a realtor who gets it, and a realistic picture of what life actually looks like there — including the parts that are still imperfect.</p>

      <h2>What Connecticut's Legal Protections Actually Cover</h2>
      <p>Connecticut has banned housing discrimination based on gender identity since 1991. That covers advertising, leasing, and selling — meaning a landlord or seller legally cannot treat you differently because you're trans.</p>

      <h2>Which Connecticut Towns Are Actually Welcoming</h2>
      <ul>
        <li><strong>West Hartford:</strong> Top-rated suburb, good schools, and a genuinely inclusive feel. Highly recommended for trans families with kids.</li>
        <li><strong>New Haven:</strong> More urban, more visible queer presence, and a Yale-connected progressive culture. East Rock and Wooster Square are the primary hubs.</li>
        <li><strong>Middletown:</strong> Smaller and quieter, but known locally as extremely trans-friendly due to Wesleyan University's influence.</li>
      </ul>

      <h2>Choosing Movers as a Trans Person</h2>
      <p>Most moving companies don't advertise how they handle trans clients' name preferences or privacy. We recommend asking whether they use preferred names on all paperwork and if they have experience with LGBTQ+ relocations.</p>

      <h2>Real Talk: What's Still Hard</h2>
      <p>Connecticut is expensive. Electricity bills are among the highest in the US, and heating an older New England home in winter is a genuine budget item. Additionally, while protections are strong, wait times for trans-competent healthcare providers can be long in less urban areas.</p>
    `,
  },
  "lgbtq-friendly-small-towns-connecticut": {
    slug: "lgbtq-friendly-small-towns-connecticut",
    title: "LGBTQ-Friendly Small Towns in Connecticut: An Honest Guide",
    author: "Travis Lipinski",
    date: "2026-03-25",
    readTime: "8 MIN READ",
    image: `${BASE}/lgbtq_small_towns_ct.png`,
    seoKeywords: "LGBTQ friendly small towns CT, gay friendly Connecticut small towns, queer small towns New England",
    content: `
      <p class="lead-paragraph">Most Connecticut relocation content focuses on West Hartford or New Haven. But a lot of LGBTQ people moving to the state aren't looking for suburbs or cities — they want something smaller, quieter, and still genuinely welcoming.</p>

      <h2>Chester: The Creative Soul</h2>
      <p>Chester sits in the Connecticut River Valley and has a genuine arts community. It comes up consistently in conversations about LGBTQ-friendly towns, particularly among queer artists and creatives. The tradeoff? It's very small, and you'll drive to Middletown or New Haven for major shopping and healthcare.</p>

      <h2>Middletown: The Progressive Hub</h2>
      <p>Middletown is larger than Chester but still qualifies as a small city. Wesleyan University gives it a progressive feel that punches way above its weight. It's often mentioned as one of the most genuinely welcoming mid-size towns in the state, with a great downtown scene.</p>

      <h2>Ridgefield: Refined and Manicured</h2>
      <p>In Fairfield County, Ridgefield is wealthier and more manicured, with a strong arts presence. It's known as one of the most progressive towns near the New York border. The trade-off is the cost — home prices are well above the state average.</p>

      <h2>The Rural Reality</h2>
      <p>In small-town CT, you absolutely need a car. Public transit is nearly non-existent. LGBTQ-specific healthcare is also thinner, meaning you might drive 30-45 minutes for a specialized provider. However, the tradeoff is space, nature, and a community where you are known as a neighbor first.</p>
    `,
  },
  "wooster-square-new-haven-lgbtq-neighborhood": {
    slug: "wooster-square-new-haven-lgbtq-neighborhood",
    title: "Wooster Square New Haven: Is It Still the Best LGBTQ Neighborhood?",
    author: "Arek Wtulich",
    date: "2026-03-20",
    readTime: "7 MIN READ",
    image: `${BASE}/new_haven_wooster.png`,
    seoKeywords: "Wooster Square New Haven LGBTQ, gay neighborhood New Haven CT, moving to New Haven LGBTQ",
    content: `
      <p class="lead-paragraph">Wooster Square gets mentioned in almost every guide to LGBTQ life in New Haven, and for good reason. It's the most historically queer-concentrated part of the city, it has a real neighborhood feel, and it's where you'll find the highest density of pride flags and community-minded neighbors.</p>

      <h2>The Neighborhood Character</h2>
      <p>Wooster Square is New Haven's Little Italy - and also its de facto gay neighborhood. Victorian and Gothic-style row houses line streets that have been on the National Register of Historic Places for decades. Frank Pepe's and Sally's, two of the country's most famous pizza spots, are both here, adding a vibrant energy to the quiet streets.</p>

      <h2>Why LGBTQ Residents Stay</h2>
      <p>The queer presence here isn't loud or commercial - it's grassroots. It's the kind of place where a neighborhood trash cleanup or a park meet-up organized by queer residents draws dozens of people. The community is low-key, family-oriented, and genuinely welcoming. Plus, New Haven's Pride Center is just a short walk away.</p>

      <h2>Real Talk: The Tradeoffs</h2>
      <p>Wooster Square sits at the edge of more urban areas, meaning crime is a real conversation that happens at neighborhood meetings. Additionally, the neighborhood has become increasingly desirable, leading to gentrification that is shifting property values. While it's more affordable than West Hartford, it's no longer the "secret" it once was.</p>
    `,
  },
  "chester-ct-lgbtq-family-guide": {
    slug: "chester-ct-lgbtq-family-guide",
    title: "Chester, CT for LGBTQ Families: Is This Small Town Worth It?",
    author: "Abby Dudarewicz",
    date: "2026-03-15",
    readTime: "8 MIN READ",
    image: `${BASE}/chester_ct_family.png`,
    seoKeywords: "Chester CT LGBTQ, gay family small town Connecticut, LGBTQ friendly Chester Connecticut",
    content: `
      <p class="lead-paragraph">Chester comes up constantly in conversations about LGBTQ-friendly small towns in Connecticut. It's an arts-focused community that punches way above its weight for a town of only 3,800 people.</p>

      <h2>Community Without Performance</h2>
      <p>Chester isn't trying to be a "gay town." It's just a small Connecticut town where LGBTQ residents are treated as neighbors. For families who want low-key normalcy rather than a visible scene, this is a distinct advantage. The town's galleries, theater, and restaurants create a sophisticated atmosphere that appeals to city-transplants.</p>

      <h2>Nature and Space</h2>
      <p>The Connecticut River Valley is genuinely beautiful, offering fall foliage, kayaking, and hiking right at your doorstep. Families often describe the slower pace as a major gain for their mental health and quality of life. You gain actual space for the same price as a cramped suburban lot elsewhere.</p>

      <h2>What to Consider</h2>
      <p>It is very small. If you don't click with the immediate community, options are limited. While Regional School District 4 is solid, it's not the same powerhouse as West Hartford. You will also drive for everything — groceries, medical appointments, and work. But for many LGBTQ families, the trade-off for a peaceful, affirming home is worth every mile.</p>
    `,
  },
  "best-lgbtq-neighborhoods-new-haven-ct": {
    slug: "best-lgbtq-neighborhoods-new-haven-ct",
    title: "Best LGBTQ Neighborhoods in New Haven, CT: A Real Breakdown",
    author: "Arek Wtulich",
    date: "2026-03-10",
    readTime: "8 MIN READ",
    image: `${BASE}/new_haven_neighborhoods.png`,
    seoKeywords: "best LGBTQ neighborhoods New Haven, gay neighborhood New Haven CT, moving to New Haven LGBTQ",
    content: `
      <p class="lead-paragraph">New Haven is often more affordable, more diverse, and more urban than its suburban neighbors. Yale's presence gives it an intellectual and progressive culture that makes it a top destination for LGBTQ buyers.</p>

      <h2>East Rock: The Academic Enclave</h2>
      <p>East Rock is the primary alternative to Wooster Square. It has a more residential, quieter feel and is a favorite among Yale faculty and young professionals. The tree-lined streets and proximity to East Rock Park make it an ideal spot for those who want city access without the noise. It feels slightly more "settled" than Wooster Square.</p>

      <h2>Westville: Artsy and Walkable</h2>
      <p>Westville sits on the western edge of the city and offers a "village" feel within the city limits. It's artsy, walkable, and home to many galleries and small businesses. For LGBTQ people who want New Haven's culture but prefer less density, Westville is an exceptional value.</p>

      <h2>Downtown / Ninth Square</h2>
      <p>If you want urban energy, the Ninth Square area is the place to be. It's dense, walkable, and close to New Haven's main social hubs. While it's mostly apartments, the culture is young, progressive, and very visible.</p>
    `,
  },
  "gay-realtor-connecticut-guide": {
    slug: "gay-realtor-connecticut-guide",
    title: "Gay Realtor in Connecticut: How to Find One That Actually Helps",
    author: "Arek Wtulich",
    date: "2026-03-05",
    readTime: "6 MIN READ",
    image: `${BASE}/gay_realtor_guide.png`,
    seoKeywords: "gay realtor Connecticut, LGBTQ realtor Connecticut, gay real estate agent CT",
    content: `
      <p class="lead-paragraph">Buying or renting a home in Connecticut as an LGBTQ person is legally protected - but feeling comfortable through the process is just as important. A realtor who "gets it" understands the nuances of choosing a neighborhood and navigating the legalities of LGBTQ homeownership.</p>

      <h2>What to Look For</h2>
      <p>A genuinely affirming realtor will know which neighborhoods are safe and welcoming across the state, not just in the well-known hubs. They will understand the specific concerns around documentation for trans clients and will never assume anything about your family structure.</p>

      <h2>Why it Matters</h2>
      <p>Working with someone who shares your values saves time and stress. They can point out details - like a local school district's history with LGBTQ inclusion or a neighborhood's social vibe - that a standard agent might miss. At GayRealEstateCT, we pride ourselves on being that expert resource for the community.</p>
    `,
  },
};

export const SSR_AGENTS: Record<string, SsrAgent> = {
  arek: {
    id: "arek",
    name: "Arek Wtulich",
    title: "CT Realtor | William Raveis",
    bio: "Arek Wtulich is a full-time, licensed CT Realtor who proudly serves the LGBTQ+ community and allies with enthusiasm, integrity, and a deeply personal approach to real estate. Since 2020, Arek has helped buyers and sellers across the state turn their housing goals into reality, with a special passion for guiding first-time homebuyers through what can often feel like an emotional and overwhelming process. His clients know him for his optimism, clear communication, and ability to create a calm, empowering experience from the first showing to the closing table.\n\nArek's dedication to excellence was recognized early in his career when he earned the Century 21 Quality Award in his first full year in the business. A passionate leader and advocate, Arek is deeply involved in both the real estate and LGBTQ+ communities. He was a Co-Founder and Vice President of the Connecticut Chapter of the LGBTQ+ Real Estate Alliance, and served on the Board of Directors for the Tri-County Alliance of Realtors, where he was the 2025 Vice President.",
    image: `${BASE}/images/Arek_Alt_1.jpg`,
    credentials: [
      { label: "Licensed CT Realtor", type: "verified" },
      { label: "Century 21 Quality Award", type: "award" },
      { label: "Co-Founder, CT LGBTQ+ Real Estate Alliance", type: "achievement" },
      { label: "2025 VP, Tri-County Alliance of Realtors", type: "achievement" },
    ],
    specialties: ["First-Time Homebuyers", "LGBTQ+ Relocation", "Listing Specialist", "Multi-family Homes"],
    stats: [
      { label: "Experience", value: "Since 2020" },
      { label: "Areas", value: "Hartford, Middlesex, New Haven and Tolland Counties" },
      { label: "Community", value: "LGBTQ+ Leader" },
    ],
  },
  abby: {
    id: "abby",
    name: "Abby Dudarewicz",
    title: "CT Realtor | SERHANT. CT",
    bio: "Abby Dudarewicz is a Connecticut Realtor with SERHANT. CT and a member of the highly ranked Gagliardi Team. Abby is known for her approachable style, strong organization, and concierge-level support for her clients from start to finish. She primarily serves Hartford, Tolland, and Middlesex Counties, but is happy to help clients anywhere in Connecticut.\n\nAbby is passionate about helping LGBTQ+ buyers, sellers, and families feel informed, supported, and confident throughout the entire process. She lives in Glastonbury with her wife, son, and two cats.",
    image: `${BASE}/images/abby.png`,
    credentials: [
      { label: "Licensed CT Realtor — SERHANT. CT", type: "verified" },
      { label: "Member, Gagliardi Team", type: "achievement" },
      { label: "LGBTQ+ Community Advocate", type: "achievement" },
    ],
    specialties: ["Residential Sales", "Buyer Representation", "LGBTQ+ Families", "Hartford & Tolland Counties"],
    stats: [
      { label: "Experience", value: "Since 2022" },
      { label: "Areas", value: "Hartford, Middlesex, Tolland Counties" },
      { label: "Community", value: "LGBTQ+ Advocate" },
    ],
  },
  travis: {
    id: "travis",
    name: "Travis Lipinski",
    title: "CT Realtor | William Raveis Lifestyles Realty",
    bio: "Travis is committed to Litchfield County. Born and raised in Torrington, he began working in Litchfield in the hospitality sector. After attending Johnson and Wales University with a major in business and minor in hospitality management, he worked in the country club, hotel and restaurant industry doing event planning, sales and management.\n\nFor over a decade, Travis has established himself as a second home property manager in the greater Litchfield, Washington, and Lake Waramaug areas. He brings to the table a knowledge of conditions, aesthetics, and mechanical work that go along with home buying and selling. Whether you are a first-time home buyer, relocating from NYC, a long-standing resident, experienced seller, investor, or weekender, guidance by Travis will be efficient and genuine.",
    image: `${BASE}/Travis%20Lipinski%20headshot.jpg`,
    credentials: [
      { label: "Licensed CT Realtor", type: "verified" },
      { label: "Johnson & Wales University — Business", type: "achievement" },
      { label: "Board of Directors, Warner Theatre", type: "achievement" },
      { label: "Board of Directors, Torrington Historic Preservation Trust", type: "achievement" },
    ],
    specialties: ["Residential and Commercial RE", "Airbnb host", "Leases", "Second Home Properties"],
    stats: [
      { label: "Experience", value: "Since 2021" },
      { label: "Areas", value: "Litchfield, Hartford Counties" },
      { label: "Background", value: "Hospitality" },
    ],
  },
  jake: {
    id: "jake",
    name: "Jake Earl",
    title: "VP, Mortgage Banker | Total Mortgage",
    bio: "With over 15 years in the mortgage industry, Jake Earl has earned a reputation as a top-tier professional, recognized in the Top 1% of Mortgage Lenders Nationwide and ranked as the #2 Lender at Total Mortgage in 2024. Since beginning his career in 2010, Jake has consistently delivered smart, tailored home loan solutions — particularly for high-achieving professionals and first-time homebuyers.\n\nJake's success stems from his client-first philosophy. He takes a highly personalized approach, carefully assessing each borrower's unique financial picture to recommend mortgage programs that align with both short-term goals and long-term plans. His dedication to ethical practices, integrity, and transparency has helped him build a business driven almost entirely by word-of-mouth referrals.",
    image: `${BASE}/images/jake.jpg`,
    credentials: [
      { label: "Top 1% Mortgage Lenders Nationwide", type: "award" },
      { label: "#2 Lender at Total Mortgage 2024", type: "achievement" },
      { label: "15+ Years Industry Experience", type: "verified" },
      { label: "Senior Vice President", type: "verified" },
    ],
    specialties: ["Complex Loan Scenarios", "First-Time Homebuyers", "High-Achieving Professionals", "Tailored Mortgage Solutions"],
    stats: [
      { label: "Areas", value: "CT, MA, FL, NC, SC, GA, TX, CA" },
      { label: "Total Mortgage", value: "#2 Lender 2024" },
      { label: "Experience", value: "Since 2010" },
    ],
    bookingLink: "https://www.totalmortgage.com/bankers/jake-earl",
  },
  carolyn: {
    id: "carolyn",
    name: "Carolyn Futtner",
    title: "Real Estate Attorney | MPF Law",
    bio: "As a solo practitioner, Carolyn Futtner specialized in both litigation and transactional work. Her years of law experience have taken her to courtrooms all over the state such as the Connecticut Appellate Court. Since her admittance to the Bar, Futtner has gained extensive experience in real estate, having taken on hundreds of commercial and residential closings.\n\nCarolyn's legal fields include real estate transactions, civil litigation, personal injury, family law, trusts and estates, probate law, business planning, DUI law, and consumer and commercial collections.",
    image: `${BASE}/Carolyn%2BFuttner-1920w.webp`,
    credentials: [
      { label: "Juris Doctor — Western New England College, School of Law, 2005", type: "verified" },
      { label: "B.A. — University of Connecticut (New England & Honors Scholar)", type: "achievement" },
      { label: "Bar Admission — Connecticut 2005", type: "verified" },
      { label: "Founding Partner — Mancini, Provenzano & Futtner, LLC", type: "achievement" },
    ],
    specialties: ["Real Estate Transactions", "Wills", "Trusts & Estates", "Probate & Business Planning"],
    stats: [
      { label: "Experience", value: "Since 2005" },
      { label: "Areas", value: "All CT but Fairfield County" },
      { label: "Closings", value: "Hundreds" },
    ],
  },
};
