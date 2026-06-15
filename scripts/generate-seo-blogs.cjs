const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'gayrealestate_blogs_2026');

function h(text, level = HeadingLevel.HEADING_2) {
  return new Paragraph({ text, heading: level, spacing: { before: 280, after: 100 } });
}

function p(...runs) {
  const children = runs.map(r =>
    typeof r === 'string'
      ? new TextRun({ text: r, size: 24 })
      : new TextRun({ text: r.text, bold: r.bold, italics: r.italic, size: 24 })
  );
  return new Paragraph({ children, spacing: { after: 160 } });
}

function bullet(text, bold = '') {
  return new Paragraph({
    bullet: { level: 0 },
    children: [
      ...(bold ? [new TextRun({ text: bold, bold: true, size: 24 }), new TextRun({ text: ' ' + text, size: 24 })] : [new TextRun({ text, size: 24 })]),
    ],
    spacing: { after: 80 },
  });
}

function numbered(text, bold = '') {
  return new Paragraph({
    numbering: { reference: 'default-numbering', level: 0 },
    children: [
      ...(bold ? [new TextRun({ text: bold, bold: true, size: 24 }), new TextRun({ text: ' ' + text, size: 24 })] : [new TextRun({ text, size: 24 })]),
    ],
    spacing: { after: 80 },
  });
}

function metaBlock(title, metaTitle, metaDesc, keywords, author) {
  return [
    new Paragraph({
      children: [new TextRun({ text: 'SEO METADATA', bold: true, allCaps: true, size: 20, color: '666666' })],
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({ children: [new TextRun({ text: `Meta Title: ${metaTitle}`, size: 20, color: '444444' })], spacing: { after: 40 } }),
    new Paragraph({ children: [new TextRun({ text: `Meta Description: ${metaDesc}`, size: 20, color: '444444' })], spacing: { after: 40 } }),
    new Paragraph({ children: [new TextRun({ text: `Focus Keywords: ${keywords}`, size: 20, color: '444444' })], spacing: { after: 40 } }),
    new Paragraph({ children: [new TextRun({ text: `Author: ${author}`, size: 20, color: '444444' })], spacing: { after: 200 } }),
    new Paragraph({ children: [new TextRun({ text: '─'.repeat(60), size: 18, color: 'cccccc' })], spacing: { after: 200 } }),
  ];
}

async function writeDoc(filename, docChildren) {
  const doc = new Document({
    numbering: {
      config: [{
        reference: 'default-numbering',
        levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.START }],
      }],
    },
    sections: [{ children: docChildren }],
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
  console.log('✓', filename);
}

// ─── BLOG 1: How to Choose a Gay Realtor ────────────────────────────────────
async function blog1() {
  const children = [
    ...metaBlock(
      'How to Choose a Gay Realtor or LGBT Real Estate Agent (2026 Guide)',
      'How to Choose a Gay Realtor or LGBT Real Estate Agent | 2026 | GayRealEstateCT',
      'Not every realtor understands LGBTQ+ buyers. Learn what questions to ask, what credentials matter, and how to find a truly affirming gay realtor or LGBT real estate agent in Connecticut.',
      'gay realtor Connecticut, gay real estate agent CT, LGBT realtor Connecticut, LGBT real estate agent Connecticut, how to find a gay realtor, LGBTQ realtor CT',
      'Arek Wtulich — Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance'
    ),
    new Paragraph({ text: 'How to Choose a Gay Realtor or LGBT Real Estate Agent (2026 Guide)', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Choosing a real estate agent is one of the most consequential decisions in a home search. For LGBTQ+ buyers, it carries an extra layer: you need a gay realtor or LGBT real estate agent who doesn\'t just tolerate your relationship or identity — someone who actively understands the unique legal, neighborhood, and community considerations that matter to you. The difference between a general agent and a truly affirming gay real estate agent can save you from the wrong neighborhood, the wrong lender, or a legally vulnerable closing.'),
    p('This guide covers exactly what to look for, what to ask, and what red flags should send you walking out the door when you\'re searching for the right LGBT realtor in Connecticut.'),

    h('Why Your Gay Realtor\'s LGBTQ+ Competency Actually Matters'),
    p('Most realtors will tell you they\'re welcoming to all clients. That\'s a baseline — not a credential. A true gay realtor or LGBT real estate agent goes further. They know which neighborhoods in Connecticut have strong queer communities versus which are merely "tolerant." They understand the specific title and deed considerations for unmarried same-sex couples. They know which local lenders are welcoming and which have a history of subtle bias. They\'ve worked with trans clients and understand name discrepancy issues in mortgage and title documentation.'),
    p('These aren\'t hypothetical concerns. They\'re the everyday details that determine whether your home-buying experience is empowering or exhausting — and they\'re what separates a general agent from a genuine gay real estate agent.'),

    h('5 Questions to Ask Any Gay Realtor or LGBT Real Estate Agent Before You Hire Them'),
    bullet('Have you completed LGBTQ+ cultural competency training or hold any relevant designations?', 'Question 1:'),
    p('The LGBTQ+ Real Estate Alliance certifies gay realtors and LGBT real estate agents who have completed training on fair housing, community-specific needs, and inclusive practices. Ask directly if they hold this or a similar credential. It signals intentional commitment, not just goodwill.'),
    bullet('Can you share testimonials or references from LGBTQ+ clients?', 'Question 2:'),
    p('Lived experience matters. A gay realtor or LGBT real estate agent who has successfully guided same-sex couples, trans individuals, or queer families through Connecticut closings will have stories to tell — and clients willing to speak to their experience.'),
    bullet('How do you handle dual discrimination scenarios?', 'Question 3:'),
    p('LGBTQ+ buyers sometimes face sellers, neighbors, or even loan officers who express bias. Ask how your gay real estate agent has navigated these situations before. Do they have a plan? Have they filed complaints or advocated for clients? Their answer tells you a great deal about their instincts.'),
    bullet('Which neighborhoods in Connecticut would you recommend for an LGBTQ+ buyer in my situation?', 'Question 4:'),
    p('A strong LGBT real estate agent doesn\'t just know the market — they know the culture. They should be able to name specific streets, HOA cultures, school district policies, and social dynamics without hesitation. Vague answers ("everywhere is welcoming these days") are a red flag.'),
    bullet('How do you support unmarried same-sex couples with title and deed decisions?', 'Question 5:'),
    p('If you and your partner are unmarried, the way your deed is structured at closing has serious legal consequences. An affirming gay realtor knows to raise this early, refer you to an LGBTQ-experienced real estate attorney, and ensure your interests are protected — not just process the transaction.'),

    h('Red Flags: When to Walk Away From a Gay Realtor or LGBT Real Estate Agent'),
    bullet('They use wrong pronouns after being corrected, or seem uncomfortable with your family structure.'),
    bullet('They can\'t name any LGBTQ+-specific resources, organizations, or lenders in Connecticut.'),
    bullet('They respond to LGBTQ+ questions with "I treat everyone the same" — a well-meaning statement that avoids the specific expertise you actually need from a gay realtor.'),
    bullet('They hesitate to discuss which neighborhoods have stronger versus weaker queer communities.'),
    bullet('They have no verifiable LGBTQ+ client references.'),

    h('Where to Find a Certified Gay Realtor or LGBT Real Estate Agent in Connecticut'),
    p('The LGBTQ+ Real Estate Alliance (realestatealliance.org) is the most credible national organization for locating pre-screened, trained gay realtors and LGBT real estate agents. Our team at GayRealEstateCT.net has all been vetted through the Alliance and holds relevant certifications.'),
    p('When you search the Alliance directory for Connecticut, you\'ll find gay realtors and LGBT real estate agents across Hartford County, New Haven County, and Litchfield County who have specific community experience — not just a checkbox.'),

    h('The Difference an Affirming Gay Real Estate Agent Makes'),
    p('Arek Wtulich, co-founder of the CT LGBTQ+ Real Estate Alliance chapter, has guided hundreds of LGBTQ+ buyers through Connecticut closings since 2010. His approach as a gay realtor begins with understanding the full picture of a client\'s life: their relationship structure, their family plans, their community priorities, and their financial situation — before a single listing is pulled. That comprehensive approach is what separates a transactional agent from a genuine advocate.'),
    p('The bottom line: you deserve more than tolerance. You deserve a gay realtor or LGBT real estate agent who is actively on your side. Ask the questions above, trust your instincts, and don\'t settle for less.'),

    h('Frequently Asked Questions'),
    bullet('Is it legal for a realtor to discriminate against LGBTQ+ buyers in Connecticut?', 'Q:'),
    p('No. Connecticut has some of the strongest LGBTQ+ housing protections in the country, prohibiting discrimination based on sexual orientation and gender identity. File a complaint with the CT Commission on Human Rights and Opportunities (CHRO) if you experience bias — and reach out to a gay realtor or LGBT real estate agent who can advocate for you.'),
    bullet('Do I have to use a gay realtor to be protected?', 'Q:'),
    p('No — legal protections apply regardless of your agent. But working with an affirming gay real estate agent or LGBT realtor maximizes your experience and ensures you\'re getting guidance tailored to your actual needs.'),
    bullet('Can a straight realtor be a good LGBTQ+ ally?', 'Q:'),
    p('Absolutely. Allyship is about knowledge, commitment, and action — not identity. The questions above will reveal whether any agent, regardless of their own identity, is genuinely equipped to serve as an effective LGBT real estate agent for your needs.'),
  ];
  await writeDoc('How_to_Choose_a_Gay-Friendly_Realtor_(2026_Guide).docx', children);
}

// ─── BLOG 2: What Is the LGBTQ+ Real Estate Alliance ────────────────────────
async function blog2() {
  const children = [
    ...metaBlock(
      'What Is the LGBTQ+ Real Estate Alliance?',
      'What Is the LGBTQ+ Real Estate Alliance? | GayRealEstateCT',
      'The LGBTQ+ Real Estate Alliance certifies gay realtors and LGBT real estate agents across the US. Here\'s what it does, why it matters, and how to find certified agents in Connecticut.',
      'LGBTQ real estate alliance, gay realtor certification, gay real estate agent organization, LGBT realtor certification Connecticut, LGBT real estate agent alliance, LGBTQ realtor training',
      'Arek Wtulich — Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance'
    ),
    new Paragraph({ text: 'What Is the LGBTQ+ Real Estate Alliance?', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('When you search for a gay realtor or LGBT real estate agent, the LGBTQ+ Real Estate Alliance is the most credible place to start. Founded in 2019, the Alliance is a professional trade organization with over 3,000 members across the United States dedicated to advancing LGBTQ+ homeownership, fighting housing discrimination, and professionalizing inclusive real estate practice.'),
    p('But what does Alliance membership actually mean for a gay real estate agent — and why should it matter when you\'re choosing an LGBT realtor in Connecticut?'),

    h('What the LGBTQ+ Real Estate Alliance Does'),
    p('The Alliance functions on two levels: advocacy and education. On the advocacy side, it engages with legislators, fair housing organizations, and industry groups to push for stronger protections for LGBTQ+ homebuyers and renters. It publishes research on LGBTQ+ homeownership gaps, tracks discrimination trends, and contributes to policy conversations at the national level.'),
    p('On the education side, it trains and certifies gay realtors and LGBT real estate agents in LGBTQ+ cultural competency — covering fair housing law, the specific needs of same-sex couples, trans-inclusive documentation practices, community considerations, and affirming communication. This training separates gay real estate agents who have made a deliberate investment in serving this community from those who simply market themselves with a rainbow flag.'),

    h('Why Alliance Certification Matters for Connecticut Buyers'),
    p('Connecticut has robust state-level protections for LGBTQ+ buyers — the state has prohibited housing discrimination based on sexual orientation since 1991 and gender identity since the same period. But legal protection and practical expertise are different things.'),
    p('An Alliance-certified gay realtor or LGBT real estate agent in Connecticut understands the legal landscape, yes — but they also know which Fairfield County towns have historically strong queer communities, which Greater Hartford neighborhoods have the most visible LGBTQ+ culture, how to navigate a closing when a trans client\'s legal name is still in transition, and which lenders in the state have explicit LGBTQ+ inclusion programs.'),
    p('That institutional knowledge isn\'t just nice to have. For many buyers, it\'s the difference between finding the right home quickly and spending a year feeling like a square peg. That\'s why Alliance certification is the clearest signal when evaluating a gay real estate agent or LGBT realtor.'),

    h('How the Alliance Screens Its Members'),
    p('Alliance membership isn\'t automatic. Members must complete training, agree to a code of conduct, and affirm their commitment to LGBTQ+ inclusion. The organization publishes a searchable directory at realestatealliance.org that lets buyers filter by state and specialty.'),
    p('In Connecticut, Alliance members include gay realtors and LGBT real estate agents specializing in Hartford County, New Haven County, Litchfield County, and the Fairfield County border with New York. Coverage is strong — particularly in the markets most popular with LGBTQ+ buyers.'),

    h('The Alliance\'s Annual Report: LGBTQ+ Homeownership in America'),
    p('Each year, the Alliance releases research on LGBTQ+ homeownership trends. The most recent data points to a persistent homeownership gap: LGBTQ+ Americans own homes at lower rates than comparable non-LGBTQ+ populations, driven by discrimination experiences, income disparities rooted in workplace discrimination, and lack of access to LGBTQ+-affirming financial professionals — including gay realtors and LGBT real estate agents who proactively know how to navigate these challenges.'),
    p('Connecticut consistently performs above the national average for LGBTQ+ homeownership, in part because of its legal protections and in part because of the strong advocacy ecosystem — including the Alliance\'s active local chapter.'),

    h('GayRealEstateCT and the Alliance'),
    p('Our team at GayRealEstateCT.net is directly affiliated with the LGBTQ+ Real Estate Alliance. Arek Wtulich co-founded the Connecticut chapter and has been an active member since the organization\'s founding. Our gay realtors and LGBT real estate agents have collectively completed the Alliance\'s training programs and adhere to its professional standards.'),
    p('When you work with our team, you\'re getting gay real estate agents who have invested in this expertise — not agents who happen to be friendly to LGBTQ+ clients. That distinction shows up in every part of the process, from the first neighborhood conversation to the closing table.'),

    h('Frequently Asked Questions'),
    bullet('Is the LGBTQ+ Real Estate Alliance a government organization?', 'Q:'),
    p('No. It\'s a private professional trade organization, similar to the National Association of Realtors. It has no regulatory authority but functions as the clearest quality signal when evaluating a gay realtor or LGBT real estate agent.'),
    bullet('Do I have to use an Alliance member to be protected from discrimination?', 'Q:'),
    p('No. Connecticut law protects you regardless of who your agent is. But an Alliance-certified gay real estate agent or LGBT realtor brings specific training and commitment that goes beyond the legal minimum.'),
    bullet('How do I find Alliance-certified gay realtors or LGBT real estate agents in Connecticut?', 'Q:'),
    p('Visit realestatealliance.org and search by state. You can also contact our team directly — our gay realtors and LGBT real estate agents are all Alliance-affiliated and can connect you with the right specialist for your situation.'),
  ];
  await writeDoc('What_Is_the_LGBTQ+_Real_Estate_Alliance.docx', children);
}

// ─── BLOG 3: Connecticut Is #1 for LGBTQ Real Estate Searches ───────────────
async function blog3() {
  const children = [
    ...metaBlock(
      'Connecticut Is #1 in the US for LGBTQ Real Estate Searches – Here\'s Why',
      'Connecticut Leads the US in LGBTQ Real Estate Searches (2026) | GayRealEstateCT',
      'Google Trends data shows Connecticut ranks #1 nationally for LGBTQ real estate search volume — including "gay realtor CT" and "gay real estate agent Connecticut." Here\'s what\'s driving it.',
      'LGBTQ real estate Connecticut, gay realtor Connecticut searches, gay real estate agent Connecticut, LGBT realtor CT, lgbtq real estate searches 2026, Connecticut LGBTQ home buyers',
      'Arek Wtulich — Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance'
    ),
    new Paragraph({ text: 'Connecticut Is #1 in the US for LGBTQ Real Estate Searches – Here\'s Why', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('According to Google Trends data from May 2026, Connecticut ranks first in the United States for per-capita search volume around "LGBTQ real estate" — ahead of Wisconsin, Maryland, Washington, and California. That\'s a striking finding for a small New England state, and it deserves a real explanation.'),
    p('What is driving this demand? Who is searching? And what does it mean if you\'re an LGBTQ+ buyer or seller in Connecticut right now?'),

    h('The Data Behind the Ranking'),
    p('Google Trends measures relative search interest by state, normalized for population. Connecticut\'s #1 ranking means that relative to its population, no state generates more searches around LGBTQ real estate topics. The search index score for Connecticut was 100 — the maximum — in the most recent trailing 12-month window.'),
    p('Related queries that show high volume from Connecticut include: "gay realtor CT," "gay real estate agent Connecticut," "LGBT realtor near me," "LGBT real estate agent Connecticut," "gay friendly towns Connecticut," "LGBTQ mortgage lenders CT," "same sex couple buying a home Connecticut," and "best places to live for gay couples." These aren\'t vanity searches — they represent real people actively exploring a purchase and looking for the right gay realtor to guide them.'),

    h('Why Connecticut Leads: 5 Converging Factors'),
    bullet('Legal protections that are among the nation\'s strongest.', 'Factor 1:'),
    p('Connecticut prohibited housing discrimination based on sexual orientation in 1991 — years before most states and decades before federal guidance. Gender identity protections followed. The state\'s legal infrastructure gives LGBTQ+ buyers confidence that the market is not hostile to them — and makes the search for a gay realtor or LGBT real estate agent in Connecticut feel like a natural, supported step.'),
    bullet('A genuine LGBTQ+ community fabric in multiple markets.', 'Factor 2:'),
    p('West Hartford, New Haven, Middletown, Hartford\'s Parkville neighborhood, and Litchfield County\'s rural retreat culture all represent distinct LGBTQ+ communities — not just a single "gay neighborhood." This distribution of welcoming environments across diverse price points and lifestyles creates broad appeal.'),
    bullet('The NYC migration effect.', 'Factor 3:'),
    p('Remote work has accelerated a migration of LGBTQ+ professionals and couples from New York City and Boston into Connecticut markets. West Hartford\'s median home price is roughly one-quarter of comparable Brooklyn neighborhoods. The math is compelling, and LGBTQ+ buyers are running it — and searching for a gay real estate agent in Connecticut to help them navigate the move.'),
    bullet('Access to the LGBTQ+ Real Estate Alliance\'s active Connecticut chapter.', 'Factor 4:'),
    p('Connecticut has an unusually strong Alliance presence, with multiple certified gay realtors and LGBT real estate agents across the state. This professional infrastructure helps connect buyers to affirming agents, which in turn generates more successful transactions and word-of-mouth referrals — fueling further search activity.'),
    bullet('An increasingly hostile national climate driving "safe state" searches.', 'Factor 5:'),
    p('In states where anti-LGBTQ+ legislation has increased, searches for relocation to affirming states have spiked. Connecticut consistently appears on "best states for LGBTQ relocation" lists — and that reputation drives inbound search interest from buyers currently elsewhere, many of whom are specifically searching for gay realtors and LGBT real estate agents in Connecticut.'),

    h('What the Demand Means for Sellers'),
    p('If you\'re selling a home in a Connecticut market popular with LGBTQ+ buyers, the data suggests you have access to a motivated, financially capable buyer pool. West Hartford sellers, in particular, consistently report receiving multiple offers from LGBTQ+ buyers relocating from NYC and Boston who are pre-approved and ready to move.'),
    p('Staging your home to feel explicitly inclusive — visible signals like community-oriented decor, neighborhood context included in listings, and sellers\' agents who can speak to the community fabric — has been shown to attract stronger offers from this demographic.'),

    h('What the Demand Means for Buyers'),
    p('High search volume means competition. If you\'re an LGBTQ+ buyer looking at Connecticut\'s most desirable markets, you\'re not the only one. West Hartford and certain New Haven neighborhoods have seen bidding wars that mirror what major cities experienced in 2021. Being pre-approved, moving fast, and working with a gay realtor or LGBT real estate agent who has deep local relationships is not optional — it\'s the baseline.'),
    p('The good news: demand is distributed across a wider range of Connecticut markets than most buyers initially consider. If you can\'t compete in West Hartford, towns like Middletown, Glastonbury, and Hamden offer strong LGBTQ+ acceptance at lower price points.'),

    h('The 2026 Market Outlook'),
    p('Connecticut\'s LGBTQ+ real estate market shows no signs of cooling. Migration from more hostile states continues to accelerate. Remote work enables buyers who would previously have needed to live within commuting distance of NYC or Boston. And Connecticut\'s own LGBTQ+ population continues to grow as the state\'s reputation spreads.'),
    p('For buyers considering the market: the window of relative affordability compared to gateway cities may not stay open indefinitely. The areas most popular with LGBTQ+ buyers are appreciating. The data suggests now, not later — and starting with the right gay realtor or LGBT real estate agent makes all the difference.'),
  ];
  await writeDoc('Connecticut_Is_#1_in_the_US_for_LGBTQ_Real_Estate_Searches_–_Here\'s_Why.docx', children);
}

// ─── BLOG 4: Gay Friendly Towns in Connecticut 2026 Ranked ──────────────────
async function blog4() {
  const children = [
    ...metaBlock(
      'Gay Friendly Towns in Connecticut: 2026 Ranked Guide',
      'Gay Friendly Towns in Connecticut: 2026 Ranked Guide | GayRealEstateCT',
      'Our 2026 ranking of the most LGBTQ-friendly towns in Connecticut — based on legal protections, community fabric, school district policies, and real estate value.',
      'gay friendly towns in Connecticut, LGBTQ friendly Connecticut towns 2026, best towns for gay couples Connecticut, gay realtor Connecticut, LGBT real estate agent CT, gay real estate agent Connecticut',
      'Arek Wtulich — Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance'
    ),
    new Paragraph({ text: 'Gay Friendly Towns in Connecticut: 2026 Ranked Guide', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Connecticut has more genuinely LGBTQ+-welcoming towns than most buyers realize. This guide ranks them not by vibe or assumption, but by four concrete factors: legal/policy record, visible community presence, school district inclusivity, and real estate value for LGBTQ+ buyers. We\'ve done this work — speaking with residents, reviewing district policies, and tracking market data — so you don\'t have to start from scratch.'),

    h('#1: West Hartford — The Gold Standard'),
    p('West Hartford earns the top position every year for a reason. The town government has an explicit and decades-long commitment to LGBTQ+ inclusion. Its school district — consistently ranked among Connecticut\'s top five — has formal anti-bullying policies naming sexual orientation and gender identity, plus LGBTQ-inclusive curriculum adopted at the elementary level.'),
    p('The Blue Back Square area has become a genuine queer hub with affirming businesses, restaurants, and community gathering spaces. The town flies a Pride flag during June, but the culture of inclusion is year-round and substantive. Median home prices hover around $540,000 for single-family homes, with townhomes available from the mid-$300s.'),

    h('#2: New Haven — Yale Energy and Genuine Queer Visibility'),
    p('New Haven\'s combination of academic progressivism and genuine urban LGBTQ+ culture earns it the second spot. The Yale University community creates a critical mass of LGBTQ+ residents, faculty, and allies that extends well beyond campus. Neighborhoods like Wooster Square, East Rock, and Westville each have distinct queer characters.'),
    p('New Haven\'s Pride Center of Connecticut is one of the most active LGBTQ+ community organizations in New England. Home prices are more accessible than West Hartford on a per-square-foot basis, making it the better value proposition for buyers who want urban density and a visible queer presence.'),

    h('#3: Middletown — The Progressive Surprise'),
    p('Middletown doesn\'t appear on enough lists. Wesleyan University\'s influence gives this mid-sized city a progressive, intellectual culture that is genuinely and deeply LGBTQ+-affirming — not as a political statement but as a default social norm. The downtown has strong independent businesses, and the community has an active LGBTQ+ social scene that is disproportionate to the city\'s size.'),
    p('Middletown is significantly more affordable than West Hartford or New Haven, with single-family homes available in the $280,000–$400,000 range. For first-time LGBTQ+ buyers, it offers the best combination of genuine inclusion and accessible pricing in the state.'),

    h('#4: Glastonbury — Suburban Excellence with Strong Protections'),
    p('Glastonbury is a high-achieving suburb across the Connecticut River from Hartford with excellent schools and a community that has grown steadily more progressive over the past decade. Its school district has explicit LGBTQ+ student protections, and the town has a growing queer population of young families who have relocated from urban areas.'),
    p('Home prices are higher — typically $450,000–$650,000 for single-family — but the school quality and community infrastructure justify the premium for families with children.'),

    h('#5: Hamden — Affordable, Diverse, and Underrated'),
    p('Hamden sits just north of New Haven and benefits from the same progressive culture at a more accessible price point. Quinnipiac University\'s presence adds a student-influenced energy, and the town\'s diversity makes it naturally more inclusive. For buyers priced out of New Haven proper, Hamden is the logical alternative.'),

    h('#6: Norwalk — Fairfield County\'s Most Welcoming Option'),
    p('Fairfield County towns have historically been more conservative, but Norwalk is the exception. Its South Norwalk neighborhood has a genuinely mixed, progressive character that includes a visible LGBTQ+ presence. Proximity to the Metro-North train makes it appealing to NYC-connected buyers who want Connecticut pricing with commuter access.'),

    h('#7: Hartford — Authentic Community at the Most Affordable Price'),
    p('Hartford proper remains the most affordable market with a real, historically-rooted LGBTQ+ community. The city has been a destination for queer nightlife and culture for decades. Neighborhoods like Parkville are undergoing revitalization, and buyers willing to invest in a city that\'s actively improving can find extraordinary value. Single-family homes under $250,000 are still possible.'),

    h('What This Ranking Doesn\'t Cover'),
    p('This ranking focuses on the residential buyer experience. It doesn\'t capture the rural retreat culture of Litchfield County, which has its own distinct LGBTQ+ community of weekenders and second-home buyers. If you\'re looking for space, privacy, and natural beauty rather than walkable urban culture, that market deserves its own conversation — and our agent Travis Lipinski specializes in exactly that.'),

    h('How to Use This Guide — and Find the Right Gay Realtor for Each Market'),
    p('Every town on this list is genuinely welcoming. The ranking reflects relative strengths across multiple dimensions, not a hierarchy of "safe versus unsafe." Your personal priorities — school quality, price point, commute time, urban versus suburban feel — should drive your decision.'),
    p('What makes the difference in each of these markets is working with a gay realtor or LGBT real estate agent who knows the specific community from the inside. A gay real estate agent embedded in West Hartford can tell you which condo building has the most active LGBTQ+ residents\' group. An LGBT realtor who works in New Haven knows which blocks of Wooster Square have seen the most recent LGBTQ+ families move in. That layer of local, community-specific knowledge is what a general agent simply can\'t provide — and it\'s exactly what you\'ll find when you work with our team.'),
  ];
  await writeDoc('Gay_Friendly_Towns_in_Connecticut_2026_Ranked_Guide.docx', children);
}

// ─── BLOG 5: LGBTQ+ First-Time Home Buyer Guide CT ──────────────────────────
async function blog5() {
  const children = [
    ...metaBlock(
      'LGBTQ+ First-Time Home Buyer Guide (Connecticut Edition)',
      'LGBTQ+ First-Time Home Buyer Guide: Connecticut 2026 | GayRealEstateCT',
      'A complete guide for LGBTQ+ first-time home buyers in Connecticut — from pre-approval to closing, with CT programs, gay realtors, LGBT real estate agents, and legal protections.',
      'LGBTQ first time home buyer Connecticut, gay realtor first time buyer CT, LGBT real estate agent Connecticut, gay real estate agent first time buyer, first time buyer programs Connecticut LGBTQ',
      'Abby Dudarewicz — Licensed CT Realtor & LGBTQ+ Community Advocate'
    ),
    new Paragraph({ text: 'LGBTQ+ First-Time Home Buyer Guide (Connecticut Edition)', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Buying your first home in Connecticut as an LGBTQ+ person is genuinely exciting — and also genuinely complex. This guide walks you through every step of the process, with attention to the considerations that matter specifically to our community: legal protections, title decisions for unmarried couples, LGBTQ-affirming lenders, and the neighborhoods worth knowing.'),
    p('This is not a generic home buying 101. This is the guide written specifically for you — and it covers why finding the right gay realtor or LGBT real estate agent is one of the most important steps in the entire process.'),

    h('Step 1: Know Your Legal Protections Before You Start'),
    p('Connecticut has prohibited housing discrimination based on sexual orientation since 1991 — one of the earliest and strongest state-level protections in the country. Gender identity has been protected since the same period. This means:'),
    bullet('A seller cannot refuse to sell to you because you\'re LGBTQ+.'),
    bullet('A landlord cannot refuse to rent to you because you\'re LGBTQ+.'),
    bullet('A lender cannot deny you a mortgage because you\'re LGBTQ+.'),
    p('If you experience discrimination, the Connecticut Commission on Human Rights and Opportunities (CHRO) is your first point of contact. File a complaint at portal.ct.gov/CHRO. Federal Fair Housing Act protections also apply, though Connecticut\'s state-level protections have historically been stronger.'),

    h('Step 2: Get Your Finances Pre-Approved With an Affirming Lender'),
    p('Pre-approval before house hunting is non-negotiable. But for LGBTQ+ buyers, the choice of lender matters beyond just rate shopping. An LGBTQ-affirming lender understands:'),
    bullet('Domestic partnership income documentation — not all lenders handle this smoothly.'),
    bullet('Name discrepancies on documents for trans buyers — a competent lender has a clear protocol.'),
    bullet('LGBTQ-specific down payment assistance programs that may be available to you.'),
    p('Connecticut\'s CHFA (Connecticut Housing Finance Authority) offers down payment assistance programs available to first-time buyers regardless of sexual orientation or gender identity. The current CHFA First-Time Homebuyer Program offers below-market interest rates and down payment assistance up to $20,000. Ask your lender specifically about CHFA eligibility on your first call.'),

    h('Step 3: Understand Title and Deed Decisions for Couples'),
    p('If you\'re buying with a partner, the most important legal decision you\'ll make isn\'t the purchase price — it\'s how you hold title on the deed. Two options:'),
    bullet('Joint Tenancy with Right of Survivorship: Each partner owns 100% of the property. If one dies, the other automatically inherits — regardless of any will. This is generally the stronger protection for LGBTQ+ couples.', 'Option A:'),
    bullet('Tenancy in Common: Each partner owns a defined share. If one partner dies, their share goes to whoever is named in their will or estate plan — not automatically to you. For unmarried couples without updated estate planning, this can create complications.', 'Option B:'),
    p('Connecticut requires attorneys to be present at closings, which is an advantage — your closing attorney should review your title options with you. If your agent doesn\'t raise this question, raise it yourself.'),

    h('Step 4: Find a Gay Realtor or LGBT Real Estate Agent Who Knows Your Community'),
    p('Your agent is your primary advocate throughout this process — and for LGBTQ+ first-time buyers, working with a gay realtor or LGBT real estate agent isn\'t just a preference, it\'s a strategic advantage. The right gay real estate agent brings knowledge that a general agent simply doesn\'t have: which neighborhoods are genuinely affirming versus merely tolerant, which HOA communities have active LGBTQ+ residents, and how to navigate situations where implicit bias may be affecting your transaction.'),
    p('Look for a gay realtor or LGBT real estate agent who:'),
    bullet('Holds LGBTQ+ Real Estate Alliance certification or equivalent training.'),
    bullet('Has specific experience with LGBTQ+ buyers and can provide community references.'),
    bullet('Knows which neighborhoods align with your lifestyle and priorities — not just which ones are legally permissible.'),
    bullet('Will proactively raise the legal and financial considerations specific to LGBTQ+ buyers.'),
    p('Our team at GayRealEstateCT.net includes certified gay realtors and LGBT real estate agents across Hartford County, New Haven County, and Litchfield County. Every agent on our team has community-specific experience and Alliance credentials — not just goodwill.'),

    h('Step 5: Understand Connecticut\'s First-Time Buyer Programs'),
    p('Connecticut has multiple first-time buyer programs that can significantly reduce your upfront costs:'),
    bullet('CHFA First-Time Homebuyer Program: Below-market 30-year fixed rates, available statewide. Income limits apply based on family size and county.'),
    bullet('CHFA Down Payment Assistance (DAP): Up to $20,000 in zero-interest assistance toward your down payment, repaid when you sell or refinance.'),
    bullet('HUD-Approved Housing Counseling: Free and low-cost counseling services from HUD-approved agencies in Connecticut help buyers understand their options — including LGBTQ+ buyers who want a confidential conversation about their specific situation.'),

    h('Step 6: What to Expect at a Connecticut Closing'),
    p('Connecticut is one of a small number of states where a licensed attorney must oversee every real estate closing. This is a buyer protection — but only if you have an attorney who is actually acting in your interest.'),
    p('At the closing table, you\'ll sign the deed (which should reflect the title structure you\'ve chosen), the mortgage documents, and a stack of disclosure and certification forms. The attorney should be able to answer every question you have — including questions about how your deed language protects your relationship, not just how it transfers the property.'),

    h('Frequently Asked Questions'),
    bullet('Can my same-sex partner and I get a joint mortgage in Connecticut?', 'Q:'),
    p('Yes, absolutely. Connecticut lenders cannot discriminate based on sexual orientation. You and your partner are evaluated together on income, debt, and credit — the same as any couple.'),
    bullet('What if I\'m trans and my legal name is different from my preferred name?', 'Q:'),
    p('This is a documentation question that comes up in mortgage and title processes. Work with a lender and closing attorney who have explicit experience with trans clients — your gay realtor or LGBT real estate agent should be able to refer you to the right professionals.'),
    bullet('Is there a minimum down payment required in Connecticut?', 'Q:'),
    p('With a conventional loan, the minimum is typically 3-5% down. FHA loans require 3.5%. CHFA programs can supplement your down payment. Work with your lender to find the combination that works for your situation.'),
  ];
  await writeDoc('LGBTQ+_First-Time_Home_Buyer_Guide_(Connecticut_Edition).docx', children);
}

// ─── BLOG 6: Best LGBTQ Mortgage Lenders in Connecticut ────────────────────
async function blog6() {
  const children = [
    ...metaBlock(
      'Best LGBTQ Mortgage Lenders in Connecticut',
      'Best LGBTQ-Friendly Mortgage Lenders in Connecticut (2026) | GayRealEstateCT',
      'Not all mortgage lenders are equally welcoming. Here\'s what to look for in an LGBTQ-affirming lender in Connecticut, and which questions to ask before you apply.',
      'LGBTQ mortgage lenders Connecticut, gay friendly mortgage broker CT, LGBT real estate agent lender referral, gay realtor recommended lenders CT, same sex mortgage lender CT',
      'Jake Earl — VP, Mortgage Banker | Total Mortgage'
    ),
    new Paragraph({ text: 'Best LGBTQ Mortgage Lenders in Connecticut', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Getting a mortgage is the biggest financial transaction most people will ever make. For LGBTQ+ buyers, the choice of lender carries an extra dimension: you want someone who is not just legally compliant with fair housing rules, but actively experienced with the documentation realities, communication sensitivities, and financial structures specific to our community.'),
    p('Jake Earl, VP and Mortgage Banker at Total Mortgage (Connecticut\'s largest mortgage lender), breaks down exactly what to look for — and the questions to ask before you commit to a lender. Your gay realtor or LGBT real estate agent should also be a key resource here: experienced gay real estate agents maintain relationships with affirming lenders and can refer you to someone they\'ve worked with successfully on LGBTQ+ transactions before.'),

    h('What Makes a Mortgage Lender Truly LGBTQ-Affirming?'),
    p('Legal compliance is the floor, not the ceiling. Every mortgage lender in Connecticut is legally prohibited from discriminating based on sexual orientation or gender identity under both state law and the federal Fair Housing Act. But "won\'t discriminate" is different from "actively serves."'),
    p('An LGBTQ-affirming mortgage lender goes further:'),
    bullet('Understands domestic partnership income documentation, including how to handle income from partners who aren\'t yet legally married.'),
    bullet('Has a clear, respectful protocol for trans clients whose legal name may differ from their preferred name — and doesn\'t make this more complicated than it needs to be.'),
    bullet('Knows which LGBTQ-specific down payment assistance programs exist and proactively discusses them.'),
    bullet('Has a team that uses correct pronouns, doesn\'t make assumptions about family structure, and treats your relationship as normal — because it is.'),
    p('When in doubt, ask your gay realtor or LGBT real estate agent who they trust. Gay real estate agents who work frequently with LGBTQ+ buyers develop firsthand knowledge of which lenders perform well and which don\'t — that referral is worth more than any online review.'),

    h('5 Questions to Ask a Mortgage Lender Before Applying'),
    numbered('Do you have experience working with same-sex and unmarried couples?'),
    p('This is a baseline question that reveals whether the lender has done this before or is figuring it out as they go. Experienced lenders can name specific documentation considerations and walk you through the process clearly.'),
    numbered('How do you handle income documentation for domestic partners?'),
    p('If you and your partner are unmarried, your income will be combined for the application. Ask how they document this — some lenders have cleaner processes than others, and a rough experience here can delay your closing.'),
    numbered('Are you familiar with CHFA programs and other Connecticut first-time buyer assistance?'),
    p('Connecticut\'s CHFA offers below-market rates and down payment assistance that can substantially reduce upfront costs. A good lender should know these programs cold and be able to walk you through eligibility in your first conversation.'),
    numbered('What is your process for trans borrowers with name discrepancies?'),
    p('A lender who has navigated this before will answer this question smoothly and specifically. A lender who pauses, seems uncertain, or says "that\'s a title company question" may not have the experience you need.'),
    numbered('What is your typical timeline from application to clear-to-close in Connecticut?'),
    p('This is a practical question that reveals operational competence. In a competitive market, a lender who takes 60 days to close when competitors close in 30 will cost you offers. Connecticut closing timelines average 30-45 days — know what you\'re agreeing to.'),

    h('Connecticut-Specific Mortgage Programs Worth Knowing'),
    bullet('CHFA First-Time Homebuyer Program: The Connecticut Housing Finance Authority offers 30-year fixed-rate loans at below-market rates for first-time buyers meeting income and purchase price limits. Available statewide, with no explicit restriction on sexual orientation or gender identity.'),
    bullet('CHFA DAP (Down Payment Assistance Program): Up to $20,000 in zero-interest assistance, repayable when you sell or refinance. This can be the difference between being able to buy and not being able to buy for many first-time LGBTQ+ buyers.'),
    bullet('USDA Loans (Rural Areas): If you\'re considering a home in Connecticut\'s more rural markets (Litchfield County, Eastern CT), USDA loans offer zero down payment for eligible properties. Income limits apply.'),
    bullet('FHA Loans: 3.5% down payment minimum, more flexible credit requirements. Explicit fair housing protections apply — FHA explicitly prohibits LGBTQ+ discrimination.'),

    h('Why Working With a Local Lender Often Beats a National Bank'),
    p('Large national banks have LGBTQ+ inclusion policies and compliance training. But local Connecticut mortgage bankers often have operational advantages: they know the local appraisal market, have established relationships with Connecticut title companies and closing attorneys, and can often move faster than a national bank\'s pipeline.'),
    p('Total Mortgage, as Connecticut\'s largest lender with offices across the state, offers the scale of a large operation with local market knowledge. Jake Earl has closed LGBTQ+ client transactions across Hartford, New Haven, and Fairfield counties, and understands the specific nuances of each market. Our gay realtors and LGBT real estate agents regularly refer clients to Jake specifically because of his track record with LGBTQ+ buyers.'),

    h('Red Flags to Watch For'),
    bullet('A lender who seems unfamiliar with CHFA programs despite you being a first-time buyer.'),
    bullet('Uncomfortable or overly clinical responses to questions about domestic partnership income.'),
    bullet('Lenders who pressure you to decide before you\'ve reviewed the Loan Estimate carefully.'),
    bullet('Unusually long estimated closing timelines without explanation.'),
    p('The right lender makes this process straightforward. You shouldn\'t have to educate your mortgage professional about your situation — they should be educating you. If something feels off, consult your gay realtor or LGBT real estate agent before proceeding.'),
  ];
  await writeDoc('Best_LGBTQ_Mortgage_Lenders_in_Connecticut.docx', children);
}

// ─── BLOG 7: LGBTQ Down Payment Assistance ──────────────────────────────────
async function blog7() {
  const children = [
    ...metaBlock(
      'LGBTQ Down Payment Assistance Programs Explained',
      'LGBTQ Down Payment Assistance Programs: Connecticut 2026 | GayRealEstateCT',
      'A complete breakdown of down payment assistance programs available to LGBTQ+ buyers in Connecticut — including CHFA grants, national programs, and how to apply.',
      'LGBTQ down payment assistance, gay real estate agent down payment programs, LGBT realtor CHFA Connecticut, gay realtor assistance programs CT, CHFA down payment assistance Connecticut',
      'Jake Earl — VP, Mortgage Banker | Total Mortgage'
    ),
    new Paragraph({ text: 'LGBTQ Down Payment Assistance Programs Explained', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('The down payment is the single biggest barrier to homeownership for most first-time buyers — and LGBTQ+ buyers, who face documented income disparities and higher rates of student debt from states that historically offered fewer scholarship opportunities, often carry this burden more acutely. The good news: there is real assistance available. The bad news: most buyers never hear about it.'),
    p('This guide covers every meaningful down payment assistance program available to LGBTQ+ buyers in Connecticut — what they are, how much they offer, and exactly how to access them. One of the most underrated advantages of working with an experienced gay realtor or LGBT real estate agent is that they know these programs and will proactively connect you with the right lender and resources before you even start your search.'),

    h('Connecticut\'s CHFA Down Payment Assistance Program (DAP)'),
    p('The Connecticut Housing Finance Authority\'s Down Payment Assistance Program is the most significant resource available to first-time buyers in the state. Here\'s what it actually offers:'),
    bullet('Assistance amount: Up to $20,000 toward your down payment and closing costs.'),
    bullet('Interest rate: 0% — no interest accrues on the assistance.'),
    bullet('Repayment terms: The assistance is repaid when you sell the home, refinance, or pay off your mortgage. It is not a monthly payment obligation.'),
    bullet('Eligibility: Must be a first-time buyer (or not have owned a home in the past three years). Income limits apply by county and household size. There is no restriction based on sexual orientation or gender identity.'),
    p('For a buyer purchasing a $350,000 home with a 5% down payment requirement, CHFA assistance can cover a significant portion of the required $17,500 down payment — potentially enabling a purchase that would otherwise be out of reach.'),

    h('CHFA First-Time Homebuyer Program: The Rate Advantage'),
    p('Separate from the down payment assistance, CHFA also offers below-market interest rates on 30-year fixed mortgages for first-time buyers. The rate discount is typically 0.25% to 0.75% below market — which translates to meaningful savings over the life of the loan.'),
    p('Using the CHFA first-time buyer rate in combination with the DAP is allowed and common. Ask your lender to stack these programs when modeling your options. Your gay realtor or LGBT real estate agent should be raising this conversation with you in your first meeting — not leaving it to the lender to discover.'),

    h('National Programs Available to Connecticut LGBTQ+ Buyers'),
    bullet('FHA Loans (Federal Housing Administration): 3.5% minimum down payment for buyers with credit scores of 580+. FHA explicitly prohibits discrimination based on sexual orientation and gender identity. FHA loans are often the most accessible path for first-time buyers with limited savings.'),
    bullet('Fannie Mae HomeReady: 3% down payment for buyers at or below 80% of area median income. Allows non-traditional income documentation, which can benefit domestic partners whose finances aren\'t legally combined.'),
    bullet('Freddie Mac Home Possible: Similar to HomeReady — 3% down, income limits apply. Both programs are available through participating lenders across Connecticut.'),
    bullet('USDA Rural Development Loans: Zero down payment for eligible properties in rural and suburban areas. Parts of Litchfield County, Eastern Connecticut, and Northern Connecticut qualify. Income limits apply.'),

    h('LGBTQ+-Specific Financial Assistance Organizations'),
    p('While most down payment programs are not specifically LGBTQ+-labeled (they\'re open to all eligible buyers and don\'t discriminate), a small number of organizations specifically prioritize LGBTQ+ homeownership:'),
    bullet('National LGBTQ Task Force: Periodically administers homeownership assistance grants in partnership with housing nonprofits. Check thetaskforce.org for current programs.'),
    bullet('Local Fair Housing Organizations: Connecticut Fair Housing Center (ctfairhousing.org) provides counseling and, in some cases, connects buyers with targeted assistance programs. Their counselors are familiar with LGBTQ+ buyer needs.'),
    bullet('Community Development Financial Institutions (CDFIs): Several CDFIs operating in Connecticut offer flexible mortgage products and targeted assistance for underserved buyers, including LGBTQ+ individuals.'),

    h('How to Apply: Step by Step'),
    numbered('Complete a HUD-approved homeownership counseling course. This is required for CHFA program eligibility and takes approximately 6-8 hours (available online).'),
    numbered('Get pre-approved with a CHFA-participating lender. Not all lenders offer CHFA programs — ask specifically. Total Mortgage is a CHFA-participating lender.'),
    numbered('Apply for CHFA DAP at the same time as your mortgage application. Your lender will submit this on your behalf — it is not a separate application process.'),
    numbered('Provide income documentation. CHFA will verify that your household income falls within their county-specific limits.'),
    numbered('Close on your home. Assistance funds are disbursed at closing, reducing the cash you need to bring to the table.'),

    h('Common Mistakes to Avoid'),
    bullet('Assuming you don\'t qualify. Income limits are higher than many buyers expect — particularly in lower-cost counties. Always check before ruling yourself out.'),
    bullet('Not asking your lender about CHFA. Many lenders don\'t proactively discuss assistance programs. If they don\'t raise it, you should — and your gay real estate agent or LGBT realtor should be prompting this conversation.'),
    bullet('Waiting until you find a house. Pre-approval and CHFA eligibility verification should happen before you start actively searching. Assistance approval takes time, and you don\'t want to lose a home because of paperwork.'),
    bullet('Ignoring closing cost assistance. CHFA DAP covers closing costs in addition to down payment. These can add up to $5,000-$10,000 in a Connecticut transaction — don\'t overlook them.'),
  ];
  await writeDoc('LGBTQ_Down_Payment_Assistance_Programs_Explained.docx', children);
}

// ─── BLOG 8: Gay Areas in Connecticut ───────────────────────────────────────
async function blog8() {
  const children = [
    ...metaBlock(
      'Gay Areas in Connecticut: Neighborhood-by-Neighborhood Guide',
      'Gay Areas in Connecticut: Neighborhood-by-Neighborhood Guide 2026 | GayRealEstateCT',
      'A real, specific guide to the most LGBTQ+ welcoming neighborhoods in Connecticut — from West Hartford\'s Blue Back Square to New Haven\'s Wooster Square and beyond.',
      'gay areas in Connecticut, LGBTQ neighborhoods Connecticut, gay realtor Connecticut neighborhoods, gay real estate agent neighborhood guide CT, LGBT real estate agent CT neighborhoods, queer neighborhoods New Haven',
      'Arek Wtulich — Licensed CT Realtor & Co-Founder, CT LGBTQ+ Real Estate Alliance'
    ),
    new Paragraph({ text: 'Gay Areas in Connecticut: Neighborhood-by-Neighborhood Guide', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Connecticut doesn\'t have one gay neighborhood. It has many — each with a distinct character, price point, and community energy. This guide breaks down the most welcoming areas neighborhood by neighborhood, with honest notes on what makes each one work and where the tradeoffs are.'),
    p('This isn\'t based on assumptions or outdated reputation. This is based on direct client conversations, market data, and the on-the-ground knowledge of gay realtors and LGBT real estate agents who live and work in these communities.'),

    h('West Hartford: Blue Back Square and the Surrounding Blocks'),
    p('Blue Back Square is West Hartford\'s walkable commercial and residential hub, and it\'s become the closest thing Connecticut has to a traditional "gayborhood" — minus the concentration of queer bars that defined urban gay neighborhoods in decades past. What you get instead is a community where LGBTQ+ families, couples, and individuals are embedded throughout the neighborhood fabric at a density that feels genuinely affirming rather than merely tolerant.'),
    p('Pride flags are a year-round presence here, not just seasonal decoration. The local businesses are demonstrably inclusive — not just in policy but in staff culture. Several of the area\'s most popular restaurants and coffee shops have queer ownership. Housing in the immediate Blue Back area skews toward condos and townhomes ($320,000–$520,000), with the broader West Hartford single-family market ranging from $400,000 to $900,000+ in the most sought-after streets.'),

    h('New Haven: Wooster Square'),
    p('Wooster Square is New Haven\'s historic Little Italy neighborhood and its de facto queer neighborhood — a combination that creates one of the more interesting neighborhood identities in New England. Victorian and Gothic-style row houses, famous pizza (Frank Pepe\'s, Sally\'s), a leafy town green, and a grassroots LGBTQ+ community that has anchored this neighborhood for decades.'),
    p('The community here tends toward young professionals, academics, and artists. Yale\'s proximity creates a constant influx of educated, progressive new residents. Pride Center of Connecticut is located just outside the neighborhood, serving as a genuine community anchor. Home prices reflect Wooster Square\'s desirability: single-family homes range from $380,000 to $650,000, with condos available from the $220,000s.'),

    h('New Haven: East Rock'),
    p('East Rock is the quieter alternative to Wooster Square — more residential, more settled, and slightly more expensive. Tree-lined streets with Victorian architecture and proximity to East Rock Park make it ideal for buyers who want New Haven\'s progressive culture in a calmer setting. It attracts a strong contingent of Yale faculty, nonprofit professionals, and queer families who want excellent public schools and a neighborhood where they\'re genuinely known as neighbors.'),

    h('New Haven: Westville'),
    p('Westville sits at New Haven\'s western edge and has a distinct "village within the city" feel. Independent galleries, artist studios, and LGBTQ+-owned businesses line Whalley Avenue. It\'s the most arts-forward of New Haven\'s welcoming neighborhoods and tends to attract queer creatives and artists who want urban energy at slightly more accessible prices than Wooster Square or East Rock.'),

    h('Hartford: Parkville'),
    p('Parkville is Hartford\'s most interesting neighborhood story — a former industrial area undergoing genuine creative revitalization with strong LGBTQ+ community roots. Several queer-owned businesses have anchored the neighborhood\'s transformation. Home prices are exceptional value for what you get: single-family homes in Parkville are typically available in the $150,000–$280,000 range, making it the most affordable LGBTQ+-welcoming neighborhood in the state.'),
    p('The tradeoff is the urban realities of Hartford proper, which is still navigating significant fiscal and infrastructure challenges. Buyers who see the neighborhood\'s trajectory and can tolerate the imperfections of a city in transition are finding real value here.'),

    h('Middletown: Downtown and the Wesleyan Corridor'),
    p('Middletown doesn\'t have a single named "gay neighborhood" — instead, the entire downtown and the corridor near Wesleyan University function as an LGBTQ+-affirming zone. The university\'s influence is profound and pervasive. It\'s the kind of town where queer visibility is normalized rather than concentrated, which some buyers find preferable to a more explicitly demarcated "gayborhood."'),

    h('Litchfield County: The Rural Alternative'),
    p('The Litchfield County market — particularly Washington, Warren, and the Lake Waramaug area — has a long history as a retreat for LGBTQ+ professionals and couples from NYC and Boston. It\'s not a "neighborhood" in the urban sense but rather a community of second-home owners and year-round residents who have chosen privacy, natural beauty, and space. The queer presence here is established but quieter — known within the community, invisible from the outside.'),

    h('How a Gay Realtor or LGBT Real Estate Agent Unlocks These Neighborhoods'),
    p('Lists and rankings give you a starting point. A gay realtor or LGBT real estate agent gives you the layer underneath — the specific block where the LGBTQ+ community is most active, the building where the residents\' association is explicitly affirming, the street that\'s seen five queer families move in over the past two years. That intelligence doesn\'t appear in any public database.'),
    p('Our gay real estate agents live in these communities. When you start a conversation with our team, you\'re talking to an LGBT realtor who can tell you which block has the best energy, which condo building has an active LGBTQ+ residents\' group, and which school principal is an exceptional ally. That\'s the layer of information that neighborhood guides don\'t provide — and it\'s why working with the right gay real estate agent makes every other part of your search more efficient.'),
  ];
  await writeDoc('Gay_Areas_in_Connecticut_Neighborhood-by-Neighborhood_Guide.docx', children);
}

// ─── BLOG 9: Best Places for Gay Couples in New England ─────────────────────
async function blog9() {
  const children = [
    ...metaBlock(
      'Best Places to Live for Gay Couples in New England',
      'Best Places to Live for Gay Couples in New England (2026) | GayRealEstateCT',
      'Comparing Connecticut, Massachusetts, Rhode Island, and Vermont for LGBTQ+ couples — with honest assessments of price, community, legal protections, and quality of life.',
      'best places to live for gay couples, gay realtor New England, gay real estate agent New England, LGBT real estate agent Connecticut, LGBT realtor Connecticut vs Massachusetts, LGBTQ places to live New England',
      'Travis Lipinski — Licensed CT Realtor | Litchfield County Specialist'
    ),
    new Paragraph({ text: 'Best Places to Live for Gay Couples in New England', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('New England as a region punches above its weight for LGBTQ+ livability. All six states have strong legal protections, none of them are hostile territory, and several have been leading the country on LGBTQ+ rights for decades. But New England is not monolithic — and if you\'re choosing where to plant roots as a gay couple, the differences between states matter enormously.'),
    p('This guide compares Connecticut, Massachusetts, Rhode Island, Vermont, Maine, and New Hampshire across the factors that actually matter: legal protections, housing costs, community density, and quality of life.'),

    h('Connecticut: The Best Value Proposition in New England'),
    p('Connecticut has the strongest combination of legal protections, genuine LGBTQ+ community density, and relative affordability compared to the other states LGBTQ+ buyers consistently consider. Its legal framework is among the most comprehensive in the country — prohibiting discrimination in housing, employment, and public accommodations based on sexual orientation and gender identity since 1991.'),
    p('The key advantage: Connecticut\'s most LGBTQ+-welcoming markets (West Hartford, New Haven, Middletown) are significantly more affordable than comparable markets in Massachusetts. A home that would cost $900,000 in Newton, Massachusetts costs $500,000 in West Hartford — often with comparable schools and a similar LGBTQ+ community presence.'),
    p('For couples relocating from NYC, Connecticut also wins on commute time. West Hartford is a 2.5-hour drive to Manhattan; New Haven is 90 minutes by train. And Connecticut has an exceptionally strong network of gay realtors and LGBT real estate agents — particularly through the LGBTQ+ Real Estate Alliance\'s active Connecticut chapter — which makes the buying process smoother than in states with fewer specialist gay real estate agents.'),

    h('Massachusetts: The Iconic Option'),
    p('Massachusetts has a near-mythic status in LGBTQ+ history — it was the first state in the nation to legalize same-sex marriage in 2004. Its LGBTQ+ community is large, deeply established, and visible across multiple markets. Boston\'s South End and Jamaica Plain are among the most iconic gay neighborhoods in America. Northampton, in Western Massachusetts, has one of the highest per-capita LGBTQ+ populations of any city in the country.'),
    p('The tradeoff is cost. Boston-area real estate is among the most expensive in the nation — median single-family prices in communities comparable to West Hartford easily exceed $800,000. Northampton is more accessible but still running ahead of Connecticut\'s rural markets. For buyers with substantial budgets or significant coastal city equity to deploy, Massachusetts offers the deepest LGBTQ+ community roots in New England.'),

    h('Rhode Island: Providence\'s Hidden LGBTQ+ Scene'),
    p('Providence is an underrated LGBTQ+ destination. Brown University and RISD anchor a progressive, creative culture. The Fox Point neighborhood has a visible queer presence. Providence\'s housing costs are lower than Boston but trending upward rapidly.'),
    p('Newport is also worth noting — it has a quiet, established LGBTQ+ community, particularly among the second-home crowd. The state is small, which means community density is concentrated and social circles are tighter. For some couples, this is a feature; for others, it\'s a limitation.'),

    h('Vermont: The Liberal Sanctuary'),
    p('Vermont was the first state to legalize civil unions (2000) and consistently ranks among the most LGBTQ+-affirming states in the country by every metric. Burlington has a visible queer scene that punches above its weight for a small city. Brattleboro and Woodstock attract LGBTQ+ buyers looking for rural small-town living.'),
    p('The limitation: Vermont is expensive for what you get. Housing stock is older, winters are more severe, and economic opportunity is more limited than in Connecticut or Massachusetts. It\'s an excellent choice for couples who prioritize a specific lifestyle — rural, community-oriented, low-density — over career proximity or urban amenities.'),

    h('New Hampshire: Individual Freedom, Mixed Culture'),
    p('New Hampshire lives by its "Live Free or Die" ethos, which translates to minimal government interference and lower taxes — but a more mixed community culture. Manchester and Portsmouth have growing LGBTQ+ communities, but the state doesn\'t have the same institutional commitment to inclusion that Connecticut or Massachusetts have built over decades. For buyers drawn by New Hampshire\'s tax advantages (no income tax, no sales tax), the tradeoff is a less consistently affirming environment outside the urban centers.'),

    h('Maine: The Destination, Not the Base'),
    p('Maine is stunning and genuinely welcoming, but its geography and economic realities make it better suited to second-home buyers and remote workers with maximum flexibility. Portland has a vibrant LGBTQ+ scene and relatively accessible home prices. The rest of the state is vast, rural, and in some areas more conservative. For couples who work remotely and want to trade urban density for natural beauty, Maine is worth serious consideration.'),

    h('The Verdict for Most Gay Couples — and How to Find the Right Agent'),
    p('For couples balancing legal protection, community density, housing affordability, and career access: Connecticut wins the calculus for most buyers. For those who prioritize historical LGBTQ+ community roots above all else and have the budget: Massachusetts. For those chasing lifestyle above economics: Vermont or Maine.'),
    p('Our team focuses on Connecticut, but we\'re happy to refer you to Alliance-affiliated gay realtors and LGBT real estate agents in any New England state if another market is a better fit for your situation. Our goal is that you find the right home — not that you find it in Connecticut specifically. Whatever you decide, working with a gay real estate agent or LGBT realtor who knows the specific market will make an enormous difference in how smoothly the process goes.'),
  ];
  await writeDoc('Best_Places_to_Live_for_Gay_Couples_in_New_England.docx', children);
}

// ─── BLOG 10: LGBTQ Housing Discrimination Statistics 2026 ──────────────────
async function blog10() {
  const children = [
    ...metaBlock(
      'LGBTQ Housing Discrimination Statistics 2026',
      'LGBTQ Housing Discrimination Statistics 2026 | GayRealEstateCT',
      'Current data on LGBTQ housing discrimination in the United States and Connecticut — plus what to do if you experience it and which protections apply to you.',
      'LGBTQ housing discrimination statistics, gay realtor as discrimination protection, LGBT real estate agent advocacy, gay real estate agent fair housing, housing discrimination against gay couples Connecticut',
      'Carolyn Futtner — Real Estate Attorney | MPF Law'
    ),
    new Paragraph({ text: 'LGBTQ Housing Discrimination Statistics 2026', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Housing discrimination against LGBTQ+ individuals and couples remains a documented, ongoing reality in the United States — even in states with strong legal protections. Understanding the scope of the problem, knowing what it looks like in practice, and knowing your rights if you experience it are essential tools for any LGBTQ+ buyer or renter.'),
    p('Carolyn Futtner, real estate attorney and founding partner at MPF Law, presents the current data and the practical guidance Connecticut buyers need.'),

    h('The National Picture: What the Data Shows'),
    p('According to the National Fair Housing Alliance\'s most recent annual report, sexual orientation and gender identity are among the fastest-growing categories of housing discrimination complaints — even as overall complaints have fluctuated. Key findings include:'),
    bullet('LGBTQ+ individuals are approximately 46% more likely to experience housing discrimination than their non-LGBTQ+ counterparts in studies using matched-pair testing.'),
    bullet('Transgender individuals face the highest rates of discrimination — with studies showing 19% of transgender respondents reported being denied a home or apartment because of their gender identity.'),
    bullet('LGBTQ+ individuals of color experience compounded discrimination — at higher rates than either white LGBTQ+ people or non-LGBTQ+ people of color independently.'),
    bullet('Discrimination is often subtle and difficult to prove — it appears in delayed responses, selective availability claims, application denials without stated reason, and unwelcoming in-person interactions rather than explicit refusals.'),

    h('Connecticut\'s Statistics: Better, But Not Perfect'),
    p('Connecticut\'s state-level protections are among the strongest in the country, and the data shows a meaningful difference. The Connecticut Commission on Human Rights and Opportunities (CHRO) processes LGBTQ+-related housing discrimination complaints, and complaint volumes in Connecticut are lower than comparable states without explicit protections.'),
    p('However, lower complaint volumes don\'t necessarily mean lower discrimination rates — they can also reflect lower awareness of reporting mechanisms, underreporting due to fear or distrust of the process, or discrimination that is too subtle to constitute a clear legal violation. A 2024 study by the Connecticut Fair Housing Center found that LGBTQ+ testers in selected markets still encountered differential treatment in approximately 18% of tests.'),

    h('What Housing Discrimination Actually Looks Like'),
    p('Most LGBTQ+ housing discrimination is not a landlord saying "I won\'t rent to gay people." It\'s more often:'),
    bullet('Being told a unit is unavailable when it later appears back on the market.'),
    bullet('An unusually slow or unresponsive application process compared to non-LGBTQ+ applicants.'),
    bullet('Subtle hostility, excessive questioning, or discomfort from a seller or landlord during showings.'),
    bullet('HOA or condo board rejection that isn\'t explained or is explained with pretextual reasons.'),
    bullet('A seller refusing an offer that meets asking price without a stated reason, followed by accepting a lower offer from another buyer.'),
    p('These patterns are documented, and they are actionable — even without explicit statements of bias. A gay realtor or LGBT real estate agent who has worked extensively with LGBTQ+ buyers can often recognize these patterns faster than a first-time buyer would, and knows when to escalate versus when a delay has a legitimate explanation.'),

    h('Your Legal Protections in Connecticut'),
    p('Connecticut law prohibits housing discrimination based on sexual orientation and gender identity in:'),
    bullet('The sale or rental of residential housing.'),
    bullet('The terms, conditions, or privileges of a sale or rental.'),
    bullet('Advertising that expresses any preference, limitation, or discrimination.'),
    bullet('Financing (mortgage lending) related to housing.'),
    p('The Connecticut Commission on Human Rights and Opportunities (CHRO) enforces these protections. You have 180 days from the date of the alleged discrimination to file a complaint. Federal Fair Housing Act protections also apply, with a parallel process available through HUD.'),

    h('What to Do If You Experience Discrimination'),
    numbered('Document everything immediately. Write down dates, times, names, and what was said or done. Save all written communications.'),
    numbered('Do not confront the discriminating party directly — this rarely changes outcomes and can complicate your legal case.'),
    numbered('Contact your gay realtor or LGBT real estate agent immediately — an experienced gay real estate agent will know whether what you\'re describing constitutes a pattern of discrimination and can help you decide whether to escalate.'),
    numbered('File a complaint with the CHRO (portal.ct.gov/CHRO) within 180 days.'),
    numbered('Consider consulting a real estate attorney who has fair housing experience. Carolyn Futtner at MPF Law has experience advising clients on discrimination claims in Connecticut transactions.'),
    numbered('Contact HUD\'s Fair Housing office (hud.gov/fairhousing) if you want to pursue a parallel federal complaint.'),

    h('The Systemic Impact: Why These Statistics Matter for Buyers'),
    p('LGBTQ+ housing discrimination contributes to the persistent homeownership gap between LGBTQ+ and non-LGBTQ+ Americans. When buyers are systematically steered away from certain neighborhoods, discouraged by hostile application processes, or denied financing, the compounding effect is lower homeownership rates and lower wealth accumulation over time.'),
    p('Choosing an LGBTQ+-affirming gay real estate agent and attorney is one of the most effective individual actions you can take. A gay realtor or LGBT real estate agent serves as a buffer and advocate throughout the process — someone who can recognize discriminatory patterns, call them out professionally, and redirect you to a transaction where your interests are respected.'),
  ];
  await writeDoc('LGBTQ_Housing_Discrimination_Statistics_2026.docx', children);
}

// ─── BLOG 11: Best Gay-Friendly Places to Retire in Connecticut ─────────────
async function blog11() {
  const children = [
    ...metaBlock(
      'Best Gay-Friendly Places to Retire in Connecticut',
      'Best Gay-Friendly Places to Retire in Connecticut (2026) | GayRealEstateCT',
      'Planning LGBTQ+ retirement in Connecticut? Here\'s where to look — from active adult communities to quiet shoreline towns — with honest notes on healthcare, community, and cost.',
      'best gay friendly places to retire Connecticut, gay realtor retirement CT, LGBT real estate agent retirement Connecticut, gay real estate agent senior buyer CT, LGBTQ retirement communities Connecticut',
      'Abby Dudarewicz — Licensed CT Realtor & LGBTQ+ Community Advocate'
    ),
    new Paragraph({ text: 'Best Gay-Friendly Places to Retire in Connecticut', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Retirement is one of the most significant home-buying decisions an LGBTQ+ person or couple will make. It\'s not just about finding a safe, welcoming community — it\'s about proximity to affirming healthcare, walkable amenities as mobility changes, legal security for partners, and a community where you\'ll actually want to spend time. Connecticut gets this right in ways that many states don\'t.'),
    p('Here\'s an honest guide to the best retirement options for LGBTQ+ people in Connecticut, organized by lifestyle type. And throughout this search, working with a gay realtor or LGBT real estate agent who understands the specific considerations of LGBTQ+ retirement — estate planning, title structure, healthcare access — will make every step more confident.'),

    h('For Active LGBTQ+ Retirees: West Hartford'),
    p('West Hartford is the top choice for LGBTQ+ retirees who want to stay active, engaged, and connected to a vibrant community. Its walkable Blue Back Square district, exceptional dining and arts scene, and explicit LGBTQ+ inclusion culture make it appealing well beyond the home-buying years.'),
    p('The practical advantages for retirees: Hartford Hospital and St. Francis Medical Center (both within 10 minutes) have strong LGBTQ+ inclusion programs. The town has excellent public transportation for non-drivers. And the community has an established LGBTQ+ social network — including senior-specific groups through the region\'s LGBTQ+ centers.'),
    p('Home types available for retirees: Condos and townhomes in the $300,000–$500,000 range offer low-maintenance living. Several active adult communities in the Greater West Hartford area cater to buyers 55 and over, with amenity packages designed for active retirement.'),

    h('For Coastal Living: The Connecticut Shoreline'),
    p('The Connecticut shoreline — stretching from Greenwich to Stonington — offers a lifestyle that LGBTQ+ retirees from the Northeast have been quietly claiming for decades. Towns like Old Lyme, Westbrook, Madison, and Guilford offer water access, a more relaxed pace, and communities that have grown increasingly welcoming to LGBTQ+ buyers.'),
    p('Guilford, in particular, has a town culture that actively supports LGBTQ+ residents and has been recognized for its inclusive town government. Healthcare proximity matters on the shoreline — Yale-New Haven Hospital is the major system serving the coastal communities, and its LGBTQ+ program is among the most comprehensive in New England.'),
    p('Shoreline home prices vary significantly: waterfront properties in Madison or Old Saybrook can reach $1M+, while inland communities near the shore remain accessible from the $300,000s.'),

    h('For Small-Town Retirement: Litchfield County'),
    p('Litchfield County\'s small towns — Washington, Warren, Litchfield, Norfolk — attract an established LGBTQ+ retirement population from New York and Boston who want privacy, natural beauty, and space. The lifestyle is fundamentally different from West Hartford or New Haven: you will drive for everything, healthcare is a longer trip, and the social scene is quieter. But for couples who want a private estate, acreage, and the beauty of Northwestern Connecticut\'s hills and lakes, the tradeoff is completely worth it.'),
    p('Our agent Travis Lipinski, our Litchfield County gay realtor and specialist, can connect you with properties that rarely make it to the public MLS.'),

    h('For Affordable Retirement: Greater New Haven'),
    p('New Haven and its surrounding towns — Hamden, East Haven, North Haven — offer LGBTQ+-welcoming communities at more accessible price points than West Hartford or the shoreline. Yale-New Haven Hospital\'s LGBTQ+ program is exceptional. The city\'s cultural offerings (Yale museums, the arts district, the restaurant scene) rival cities many times its size. For LGBTQ+ retirees on a fixed income who want access to urban amenities, this market deserves serious consideration.'),

    h('LGBTQ+ Healthcare Access in Connecticut: A Retirement-Critical Factor'),
    p('For LGBTQ+ retirees — particularly trans individuals — access to affirming, competent healthcare is not a nice-to-have. It\'s a retirement location requirement. Connecticut has strong options:'),
    bullet('Hartford Healthcare LGBTQ+ Program: Hartford Hospital and associated providers have explicit LGBTQ+ patient care protocols.'),
    bullet('Yale Medicine LGBTQ+ Program: One of the most comprehensive in New England, with specialists across multiple disciplines.'),
    bullet('UCONN Health Center: Based in Farmington, serving the Greater Hartford area with LGBTQ+ affirming primary and specialty care.'),
    p('When evaluating retirement locations, factor in driving distance to these systems. A gay realtor or LGBT real estate agent who specializes in LGBTQ+ buyers can help you map healthcare proximity alongside neighborhood quality and price — these factors belong in the same conversation.'),

    h('Estate Planning for LGBTQ+ Retirees: Don\'t Skip This'),
    p('Retirement-age LGBTQ+ couples — particularly those who married later in life after decades of being legally excluded — sometimes have estate plans that predate marriage equality or reflect the legal constraints of an earlier era. Before you purchase a retirement home, update your will, healthcare proxy, durable power of attorney, and beneficiary designations.'),
    p('The way you hold title on your retirement property matters significantly for estate outcomes. Work with a real estate attorney — Carolyn Futtner at MPF Law specializes in estate and real estate law for LGBTQ+ clients — to ensure your retirement home is structured to protect your partner, your intentions, and your legacy. Your gay real estate agent should be raising these conversations before closing, not after.'),
  ];
  await writeDoc('Best_Gay-Friendly_Places_to_Retire_in_Connecticut.docx', children);
}

// ─── BLOG 12: Do You Need an LGBTQ Real Estate Attorney ────────────────────
async function blog12() {
  const children = [
    ...metaBlock(
      'Do You Need an LGBTQ Real Estate Attorney?',
      'Do You Need an LGBTQ Real Estate Attorney? | GayRealEstateCT',
      'When does an LGBTQ+ buyer or seller need a specialized real estate attorney — and what does one actually do differently? A Connecticut attorney explains.',
      'LGBTQ real estate attorney Connecticut, gay realtor attorney partnership CT, gay real estate agent attorney referral, LGBT real estate agent legal advice, real estate attorney same sex couple Connecticut',
      'Carolyn Futtner — Real Estate Attorney | MPF Law'
    ),
    new Paragraph({ text: 'Do You Need an LGBTQ Real Estate Attorney?', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Connecticut is one of a small number of states where a licensed attorney must be present at every real estate closing. That means you will have an attorney involved regardless — the question is whether that attorney understands the specific legal considerations that apply to LGBTQ+ buyers and couples. The answer to that question shapes whether your closing is merely processed or genuinely protected.'),
    p('Carolyn Futtner, founding partner at Mancini, Provenzano & Futtner, LLC and a Connecticut-licensed real estate attorney since 2005, explains what an LGBTQ-experienced attorney actually does differently — and how the right attorney works in partnership with your gay realtor or LGBT real estate agent to protect your interests at every step.'),

    h('Why Connecticut Real Estate Closings Require an Attorney'),
    p('Connecticut is an "attorney state" for real estate — meaning a licensed attorney must certify title, supervise the closing, and ensure the deed is legally valid. This is a protection for buyers: unlike in non-attorney states, there is a licensed professional whose job is to catch title defects, review closing documents, and ensure the transaction is legally sound.'),
    p('The attorney requirement creates an opportunity: rather than having a generic closing attorney assigned by the title company (whose loyalty is ultimately to the lender), you can — and should — hire your own attorney whose loyalty is entirely to you. Your gay realtor or LGBT real estate agent should be able to refer you to attorneys who have specific experience with LGBTQ+ clients — that referral pipeline is part of what makes a gay real estate agent genuinely valuable.'),

    h('What an LGBTQ-Experienced Attorney Does Differently'),
    p('The differences are practical, not symbolic:'),
    bullet('Title and deed structure for unmarried couples: An LGBTQ-experienced attorney will proactively discuss how to hold title — joint tenancy versus tenancy in common — and ensure you understand the implications for survivorship and estate planning. This conversation should happen before closing, not at the closing table.'),
    bullet('Name discrepancy navigation: Trans clients sometimes have legal names that differ from preferred names, or names that are in the process of legal change. A real estate attorney who has navigated this before knows how to handle it cleanly in the deed and title documents.'),
    bullet('Estate planning alignment: An attorney who handles both real estate and estate law (as Carolyn does) can ensure your deed structure aligns with your existing will and estate plan — or flag misalignments that need to be addressed before you take title.'),
    bullet('Discrimination recognition and response: If a transaction shows signs of discriminatory treatment — an unusual number of seller contingencies targeting a gay couple, unexplained delays, or a rejected offer followed by an accepted lower offer — an experienced attorney knows what to document and how to escalate. Your gay realtor or LGBT real estate agent should flag these patterns too, and the attorney and agent working together gives you the strongest possible response.'),
    bullet('HOA and condo review: HOA documents can contain provisions, behavioral rules, or community cultures that may not be welcoming to LGBTQ+ residents. A thorough attorney reviews the full HOA package before your right of rescission expires.'),

    h('When You Definitely Need LGBTQ Legal Expertise'),
    p('Some situations make specialized legal counsel especially important:'),
    bullet('You are an unmarried same-sex couple purchasing together and have not updated your estate plan recently.'),
    bullet('You are a trans individual purchasing, particularly if your legal name is in transition.'),
    bullet('You are purchasing into an HOA or condo association without reviewing the full governing documents.'),
    bullet('You are purchasing a property with a complex title history (foreclosure, estate sale, quitclaim deed transfers).'),
    bullet('You have experienced any indication of discriminatory treatment during your transaction.'),

    h('What to Expect Working With Carolyn Futtner at MPF Law'),
    p('Carolyn has been admitted to the Connecticut bar since 2005. Her practice covers residential and commercial real estate transactions, trusts and estates, and probate law — a combination that allows her to address both the closing and the estate planning that should accompany any significant purchase.'),
    p('She has presided over closings across the state, including in Connecticut\'s appellate courts. Her LGBTQ+ clients consistently report that working with an attorney who understands their specific situation — rather than treating the transaction as generic — makes the closing process significantly less stressful and significantly more legally sound. She works closely with the gay realtors and LGBT real estate agents on our team, which means the legal and transactional sides of your purchase are coordinated from day one.'),

    h('Questions to Ask Any Real Estate Attorney'),
    numbered('Have you handled closings for same-sex couples and LGBTQ+ individuals before?'),
    numbered('How do you approach title structure conversations for unmarried couples?'),
    numbered('Do you handle estate planning in addition to real estate closings?'),
    numbered('Have you navigated name discrepancy issues for trans clients?'),
    numbered('What is your process if I have questions after the closing?'),
    p('A strong attorney answers these questions specifically and confidently. A generic "we handle all clients the same" answer misses the point — and should prompt you to ask more specifically before committing. If your gay realtor or LGBT real estate agent can\'t provide a referral to an attorney with LGBTQ+ closing experience, that\'s worth noting too.'),
  ];
  await writeDoc('Do_You_Need_an_LGBTQ_Real_Estate_Attorney.docx', children);
}

// ─── BLOG 13: Transgender Housing Rights Connecticut ─────────────────────────
async function blog13() {
  const children = [
    ...metaBlock(
      'Transgender Housing Rights: What Connecticut Law Says',
      'Transgender Housing Rights in Connecticut: What the Law Says (2026) | GayRealEstateCT',
      'A complete guide to transgender housing rights in Connecticut — including what state law prohibits, how to file a discrimination complaint, and practical tips for trans home buyers.',
      'transgender housing rights Connecticut, gay realtor trans client CT, LGBT real estate agent transgender buyer, gay real estate agent trans experience Connecticut, gender identity housing protections CT',
      'Carolyn Futtner — Real Estate Attorney | MPF Law'
    ),
    new Paragraph({ text: 'Transgender Housing Rights: What Connecticut Law Says', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Connecticut offers some of the strongest housing protections for transgender individuals in the United States. Understanding exactly what those protections cover — and what to do when they\'re violated — is essential knowledge for any trans person buying, renting, or selling property in Connecticut.'),
    p('This guide covers Connecticut state law specifically, the federal protections that apply simultaneously, and the practical reality of navigating housing transactions as a trans person — including tips from real estate attorney Carolyn Futtner and agent Abby Dudarewicz. One of the most important practical steps is working with a gay realtor or LGBT real estate agent who has direct experience with trans clients — someone who knows the specific documentation considerations and can advocate for you effectively.'),

    h('Connecticut\'s Explicit Transgender Housing Protections'),
    p('Connecticut\'s Fair Employment Practices Act and the Connecticut Human Rights Act collectively prohibit discrimination in housing based on gender identity or expression. These protections apply to:'),
    bullet('The sale, rental, lease, or transfer of housing.'),
    bullet('The terms, conditions, or privileges of a sale or rental (including security deposit requirements, application processes, and lease terms).'),
    bullet('Advertising that expresses any limitation or preference based on gender identity.'),
    bullet('Financing decisions related to housing, including mortgage lending.'),
    bullet('Refusal to negotiate or otherwise make housing unavailable.'),
    p('Connecticut enacted these protections early — gender identity has been explicitly covered since 1991, making it one of the first states to codify these protections. This three-decade track record has created a legal enforcement infrastructure that is more mature than in states that added these protections more recently.'),

    h('Federal Protections That Apply in Connecticut'),
    p('In June 2020, the U.S. Supreme Court\'s Bostock v. Clayton County decision held that Title VII\'s prohibition on sex discrimination covers sexual orientation and gender identity. HUD subsequently issued guidance extending this interpretation to the Fair Housing Act — meaning federal fair housing law also prohibits housing discrimination against transgender individuals.'),
    p('In Connecticut, this means trans individuals have overlapping state and federal protections. You can file complaints with either the Connecticut CHRO or HUD (or both) if you experience discrimination. Connecticut\'s state protections are generally considered stronger and have a longer enforcement track record.'),

    h('What Trans Housing Discrimination Actually Looks Like'),
    p('Overt discrimination ("we don\'t rent to trans people") is rare and easily actionable. More common patterns include:'),
    bullet('An application being declined without stated reason, when a similarly qualified applicant was accepted.'),
    bullet('Being told a unit is "no longer available" despite it remaining listed.'),
    bullet('Unusual scrutiny of income documentation or references compared to other applicants.'),
    bullet('Subtle hostility or discomfort during showings that affects the transaction.'),
    bullet('Name or pronoun disrespect from sellers, landlords, or their agents in ways that affect the transaction.'),
    p('These are legally actionable if a pattern of differential treatment can be documented. An experienced gay real estate agent or LGBT realtor who has worked with trans clients will often recognize these patterns before you do and know exactly when to document and when to escalate.'),

    h('Name Discrepancy Issues in Real Estate Transactions'),
    p('One of the most practical challenges trans buyers face is name discrepancy — when your preferred name or the name you use professionally differs from your current legal name. This arises in:'),
    bullet('Mortgage applications, which use legal name from government-issued ID.'),
    bullet('Title and deed documents, which must match your legal name.'),
    bullet('HOA and condo association applications.'),
    p('The solution is transparency with your attorney and lender from the outset. Both should have experience navigating this — and if they don\'t, that\'s important information. Work with a gay realtor or LGBT real estate agent who has explicitly worked with trans clients before: they will already have referrals to a lender and closing attorney who handle name discrepancies cleanly and respectfully.'),
    p('Connecticut law does not require you to disclose that you are transgender in a real estate transaction. The name on your deed should be your current legal name. If you are in the process of a legal name change, discuss timing with your attorney — there may be reasons to complete the change before closing.'),

    h('Affirming Healthcare Proximity: A Practical Housing Consideration'),
    p('For trans individuals, access to affirming, competent healthcare providers is a quality-of-life factor that can be determinative in choosing where to live. Connecticut has strong options:'),
    bullet('Yale Medicine Gender Program: New Haven — comprehensive trans healthcare including hormone management, surgery referrals, and mental health support.'),
    bullet('Hartford Healthcare LGBTQ+ Program: Hartford — primary and specialty care with explicit trans competency.'),
    bullet('UCONN Health Center: Farmington — serving the Greater Hartford area with trans-affirming care.'),
    bullet('Planned Parenthood Connecticut: Gender-affirming hormone therapy through multiple locations statewide.'),
    p('When evaluating neighborhoods, map the distance to these providers. A gay realtor or LGBT real estate agent who specializes in LGBTQ+ buyers can help you integrate healthcare proximity into your home search — so it\'s a factor in which neighborhoods you seriously consider, not an afterthought.'),

    h('Filing a Discrimination Complaint in Connecticut'),
    numbered('Document the incident immediately: dates, names, what happened, any witnesses.'),
    numbered('Notify your gay realtor or LGBT real estate agent — they can help you assess whether what happened constitutes a pattern of discrimination and what to document.'),
    numbered('File with the Connecticut Commission on Human Rights and Opportunities (CHRO) at portal.ct.gov/CHRO. You have 180 days from the discriminatory act.'),
    numbered('Simultaneously file with HUD (hud.gov/fairhousing) if you want to pursue federal remedies.'),
    numbered('Consult a real estate attorney — particularly one experienced with fair housing claims — to understand your options and potential remedies.'),
    p('Remedies for housing discrimination in Connecticut can include compensatory damages, injunctive relief (requiring the landlord or seller to rent/sell to you), and civil penalties. The process takes time, but it works.'),
  ];
  await writeDoc('Transgender_Housing_Rights_What_Connecticut_Law_Says.docx', children);
}

// ─── BLOG 14: Cheapest Gay-Friendly Cities in Connecticut ───────────────────
async function blog14() {
  const children = [
    ...metaBlock(
      'Cheapest Gay-Friendly Cities in Connecticut',
      'Cheapest Gay-Friendly Cities in Connecticut (2026) | GayRealEstateCT',
      'Budget-conscious LGBTQ+ buyer? Here are the most affordable gay-friendly cities in Connecticut — with real median prices and honest community assessments.',
      'cheapest gay friendly places to live Connecticut, gay realtor affordable markets CT, LGBT real estate agent affordable Connecticut, gay real estate agent Hartford Middletown CT, affordable LGBTQ housing Connecticut',
      'Jake Earl — VP, Mortgage Banker | Total Mortgage'
    ),
    new Paragraph({ text: 'Cheapest Gay-Friendly Cities in Connecticut', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Connecticut has a reputation as an expensive state — and in some markets, that reputation is earned. But the state is not uniformly expensive, and several of its most LGBTQ+-welcoming communities are among the most affordable in New England. If you\'re an LGBTQ+ buyer working within a tighter budget, here are the markets worth knowing.'),
    p('This guide uses 2025-2026 median sale price data and pairs it with an honest assessment of the LGBTQ+ community fabric, so you\'re not just buying cheap — you\'re buying into a place where you\'ll feel welcome.'),

    h('#1: Hartford — Extraordinary Value, Genuine Community'),
    p('Hartford remains the most affordable Connecticut market with a real, historically-rooted LGBTQ+ community. Median single-family home prices in Hartford proper are approximately $210,000 — roughly 40% of the West Hartford median. Condos and multifamily properties are available for even less.'),
    p('The Parkville neighborhood is the center of Hartford\'s LGBTQ+ presence, with queer-owned businesses, community events, and an active social network. The tradeoff is Hartford\'s urban challenges — the city is navigating fiscal constraints and has neighborhoods at varying stages of revitalization. Buyers willing to do the due diligence can find exceptional value in a city that is genuinely changing.'),

    h('#2: Middletown — Progressive Culture at Accessible Prices'),
    p('Middletown\'s median single-family home price is approximately $295,000 — meaningfully below West Hartford and New Haven but with a community culture that is arguably Connecticut\'s most organically LGBTQ+-affirming. Wesleyan University\'s influence creates a social and intellectual environment that normalizes queer presence rather than concentrating it.'),
    p('For first-time buyers who want genuine community without the premium of Connecticut\'s most in-demand markets, Middletown is the strongest value proposition in the state right now.'),

    h('#3: Hamden — New Haven\'s Affordable Alternative'),
    p('Hamden sits directly north of New Haven and shares much of its progressive community culture at lower prices. Median single-family prices in Hamden are approximately $320,000, compared to $390,000+ in New Haven proper. The town\'s proximity to Yale creates the same demographic influence without the New Haven price premium.'),
    p('Hamden has a genuinely diverse community that is naturally inclusive of LGBTQ+ residents. The LGBTQ+ presence is less concentrated than in Wooster Square but more distributed throughout the town — which many buyers find preferable.'),

    h('#4: New Britain — The Underrated Option'),
    p('New Britain is one of Connecticut\'s most overlooked markets for LGBTQ+ buyers. The city has a growing arts scene, a community that is more welcoming than its reputation suggests, and home prices that are among the lowest of any Hartford County market: median single-family prices around $225,000.'),
    p('New Britain\'s LGBTQ+ community is smaller than Hartford or Middletown, but the town\'s affordability and its proximity to West Hartford (15-minute drive) make it worth serious consideration for buyers who need to maximize purchase power.'),

    h('#5: Torrington — Litchfield County\'s Most Affordable Entry Point'),
    p('For buyers who want Litchfield County\'s rural beauty and landscape at the lowest entry point, Torrington is the answer. Median single-family prices are approximately $245,000 — a fraction of what you\'d pay in Washington or Litchfield proper. The trade is a more urban setting within Litchfield County, with less of the pastoral character that makes the western lake communities special.'),
    p('LGBTQ+ community presence in Torrington is quieter than in the cities, but the progressive culture of the surrounding county creates a generally welcoming environment. Travis Lipinski, our gay realtor for Litchfield County, grew up in Torrington and can give you an unfiltered assessment of what life actually looks like there.'),

    h('What "Affordable" Really Costs You in Connecticut'),
    p('Every affordable market involves trade-offs. Being honest about what they are:'),
    bullet('Hartford\'s affordability comes with urban challenges that require research and realistic expectations.'),
    bullet('New Britain\'s prices reflect a smaller job market and fewer urban amenities.'),
    bullet('Torrington requires a car for everything and is further from major employers.'),
    p('The good news: Connecticut\'s state-level legal protections apply everywhere. Whether you buy in West Hartford or Hartford, in New Haven or New Britain, the same housing discrimination protections, fair housing enforcement, and LGBTQ+ legal rights apply. You can find an affordable home in Connecticut without sacrificing legal security.'),

    h('Getting Pre-Approved — and Finding the Right Gay Real Estate Agent for Affordable Markets'),
    p('If you\'re purchasing in a lower-price-point market, first-time buyer programs become even more impactful. CHFA\'s Down Payment Assistance Program (up to $20,000) and below-market interest rates can make a Hartford or Middletown purchase achievable for buyers who would otherwise be renting. Ask Jake Earl at Total Mortgage to model your specific numbers — in affordable markets, the math often works out better than buyers expect.'),
    p('Working with a gay realtor or LGBT real estate agent who knows these specific markets is equally important. An experienced gay real estate agent embedded in Hartford or Middletown knows which blocks are genuinely safe and improving, which listings are priced below market because of a quick seller versus a problematic property, and which local community organizations serve the LGBTQ+ population. That local intelligence is the difference between a smart affordable purchase and a costly mistake.'),
  ];
  await writeDoc('Cheapest_Gay-Friendly_Cities_in_Connecticut.docx', children);
}

// ─── BLOG 15: Same-Sex Couples Buying a Home: 7 Things to Know ─────────────
async function blog15() {
  const children = [
    ...metaBlock(
      'Same-Sex Couples Buying a Home: 7 Things to Know Before You Sign',
      'Same-Sex Couples Buying a Home: 7 Things to Know Before You Sign | GayRealEstateCT',
      'Buying a home as a same-sex couple? Here are 7 critical legal, financial, and practical considerations before you close — from a Connecticut real estate attorney.',
      'same sex couple buying a home, gay realtor same sex couple CT, gay real estate agent couple Connecticut, LGBT real estate agent couple advice, LGBT realtor same sex buyers, joint mortgage same sex couple Connecticut',
      'Carolyn Futtner — Real Estate Attorney | MPF Law'
    ),
    new Paragraph({ text: 'Same-Sex Couples Buying a Home: 7 Things to Know Before You Sign', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    p('Buying a home as a same-sex couple is exciting, consequential, and — if you\'re not careful — legally complicated in ways that could cost you significantly if the unexpected happens. This isn\'t meant to be alarmist. It\'s meant to be useful. These are the seven things Connecticut real estate attorney Carolyn Futtner tells every same-sex couple before they sign anything.'),
    p('Before any of these seven items: make sure you\'re working with a gay realtor or LGBT real estate agent who has direct experience with same-sex couples. An experienced gay real estate agent will flag most of these considerations before you even think to ask — and will have already built a team of affirming lenders, attorneys, and inspectors around you.'),

    h('1. How You Hold Title Determines What Happens If One of You Dies'),
    p('The way your deed is structured — specifically whether you hold title as joint tenants with right of survivorship or as tenants in common — determines what happens to the property if one partner dies. This is the most important legal decision in your home purchase and the one most couples don\'t think about until it\'s too late.'),
    p('Joint tenancy with right of survivorship means each partner owns 100% of the property. If one dies, the other automatically inherits — regardless of what any will says. Tenancy in common means each partner owns a defined share, which passes according to their will (or Connecticut intestacy law if there is no will). For unmarried couples whose families of origin are not necessarily supportive, tenancy in common without an updated estate plan is a genuine risk.'),
    p('Before you close, decide explicitly how you want to hold title. Your closing attorney should raise this conversation — if they don\'t, you should. Your gay realtor or LGBT real estate agent should also be prompting this conversation well before the closing date.'),

    h('2. Your Estate Plan Needs to Match Your Deed'),
    p('A deed that provides right of survivorship is an important protection — but it\'s not a substitute for a complete estate plan. Every same-sex couple purchasing a home together should have, at minimum: an updated will, a durable power of attorney, and a healthcare proxy. These documents ensure that if one partner becomes incapacitated (not just dies), the other has legal authority to manage the property, finances, and healthcare decisions.'),
    p('For LGBTQ+ couples whose families of origin may not respect their relationship, these documents are non-negotiable. Without them, families can and do intervene in ways that override the surviving partner\'s wishes.'),

    h('3. Unmarried Couples Have Fewer Automatic Legal Protections Than Married Ones'),
    p('Connecticut law provides strong protections for married same-sex couples. But many LGBTQ+ couples — for personal, political, or practical reasons — choose not to marry. That\'s entirely valid and none of this guide\'s business. But you should understand what it means legally: unmarried partners are not automatically next-of-kin, not automatically entitled to each other\'s estate, and not automatically protected in certain financial and medical situations.'),
    p('The solution is documentation — deed structure, estate plan, power of attorney, healthcare proxy. If you are an unmarried couple purchasing a home together, invest the time and money in this documentation. It costs a few hundred dollars and can protect everything you\'ve built together.'),

    h('4. Both Partners Should Be on the Mortgage If Possible'),
    p('Being on the mortgage means being on the legal obligation — but it also means both partners\' credit and income are contributing to the purchase. If only one partner is on the mortgage, the other has no legal obligation to the lender, which might seem like a benefit but creates complications: the non-mortgaged partner has no established legal relationship with the property through the loan, which can complicate things if the relationship changes.'),
    p('There are situations where it makes financial sense to have only one partner on the mortgage (e.g., one partner has significantly better credit). If you go this route, ensure the deed structure and your legal agreements clearly reflect both partners\' ownership and financial contributions. Your gay realtor or LGBT real estate agent should be connecting you with a lender experienced with same-sex couple mortgage applications.'),

    h('5. Your Lender Is Legally Prohibited From Discriminating — But Document Anyway'),
    p('Connecticut lenders cannot deny a mortgage because you are an LGBTQ+ couple. The same-sex nature of your relationship cannot legally factor into your application, rates, or terms. But discrimination is sometimes subtle — unusual delays, unexplained denials, or a sudden change in available programs. Document every interaction. If something feels wrong, consult an attorney before moving to another lender without documenting what happened. Your gay real estate agent or LGBT realtor should be your first call if something seems off.'),

    h('6. Review the HOA Documents Before You Lose Your Right to Walk Away'),
    p('If you\'re buying into a condo or HOA community, Connecticut law gives you a right of rescission — a period to review the HOA documents and back out without penalty if you don\'t like what you find. Use it. HOA documents can contain behavioral rules, community culture signals, and board structures that may not be explicitly anti-LGBTQ+ but reveal a community that won\'t be welcoming. Have your attorney review these documents, not just yourself. Your LGBT realtor or gay real estate agent should also be flagging any HOA communities with known issues before you even make an offer.'),

    h('7. Connecticut Requires an Attorney at Every Closing — Use Yours Fully'),
    p('Connecticut\'s attorney requirement at closings is a genuine advantage for buyers — there is a licensed professional reviewing every document. But the closing attorney\'s job, at minimum, is to ensure the transaction is legally sound for the lender and the title company. To ensure your interests are protected, you want your own attorney who is accountable to you specifically.'),
    p('Your attorney should review the title commitment, flag any deed restrictions or easements, confirm the deed language reflects your intentions, and answer every question you have. If you feel rushed or like questions are being batted away, that\'s a problem. A good closing attorney — especially one experienced with LGBTQ+ clients like Carolyn Futtner at MPF Law — will make sure you leave the closing table fully understanding what you just signed.'),
    p('This process is supposed to be exciting. Getting these seven things right — with a gay realtor or LGBT real estate agent guiding the transaction and an LGBTQ+-experienced attorney protecting the legal side — protects that excitement now and for every year you own the home.'),
  ];
  await writeDoc('Same-Sex_Couples_Buying_a_Home_7_Things_to_Know_Before_You_Sign.docx', children);
}

// ─── Run all ─────────────────────────────────────────────────────────────────
(async () => {
  console.log('Generating 15 SEO-optimized blog docs...\n');
  await blog1();
  await blog2();
  await blog3();
  await blog4();
  await blog5();
  await blog6();
  await blog7();
  await blog8();
  await blog9();
  await blog10();
  await blog11();
  await blog12();
  await blog13();
  await blog14();
  await blog15();
  console.log('\nAll 15 blogs written successfully.');
})();
