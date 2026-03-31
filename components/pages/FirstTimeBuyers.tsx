import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Home, Shield, DollarSign, Search, FileText, Key, Star, Phone } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const steps = [
    {
        icon: DollarSign,
        number: '01',
        title: 'Assess Your Finances',
        description:
            'Review your credit score, savings, and monthly budget. Aim for a credit score of 620+ (ideally 740+) and a down payment of at least 3–20%. Our partner lender Jake Earl can run a free pre-qualification in minutes.',
        tips: ['Check all three credit bureaus', 'Calculate your debt-to-income ratio', 'Identify down payment sources including gifts'],
    },
    {
        icon: FileText,
        number: '02',
        title: 'Get Pre-Approved',
        description:
            `A pre-approval letter shows sellers you're serious and defines your real budget. This is especially important in Connecticut's fast-moving markets like West Hartford, where homes go under contract in under two weeks.`,
        tips: ['Gather W-2s, tax returns, pay stubs, and bank statements', 'Avoid opening new credit lines during this process', 'Compare rates from multiple lenders'],
    },
    {
        icon: Search,
        number: '03',
        title: 'Find Your LGBTQ+ Agent',
        description:
            'Work with an agent who understands your priorities — not just floor plans and square footage, but community culture, school district inclusivity, and neighborhood vibe. Our team members are part of the CT LGBTQ+ Real Estate Alliance.',
        tips: ['Ask about their experience with LGBTQ+ buyers', 'Confirm they offer full buyer representation', 'Understand how they get paid post-NAR settlement'],
    },
    {
        icon: Home,
        number: '04',
        title: 'Search & Tour Homes',
        description:
            'Your agent will set up MLS alerts and preview homes before you tour. In competitive areas, you may need to act within 24–48 hours of seeing a property. Come prepared with your priorities list.',
        tips: ['Visit neighborhoods at different times of day', 'Attend open houses to build market intuition', 'Keep an open mind on cosmetics — focus on structure and location'],
    },
    {
        icon: Shield,
        number: '05',
        title: 'Make an Offer & Negotiate',
        description:
            `Your agent will prepare a competitive offer based on comparable sales. In a seller's market, you may need to escalate price, waive minor contingencies, or write a personal letter. We'll guide you through every scenario.`,
        tips: ['Include an inspection contingency to protect yourself', 'Understand earnest money and what happens if a deal falls through', 'Know your walk-away number before you fall in love with a property'],
    },
    {
        icon: Key,
        number: '06',
        title: 'Close & Get Your Keys',
        description:
            'The closing process typically takes 30–45 days. Attorney Carolyn Futtner on our team handles real estate closings and ensures title is held correctly — critically important for same-sex couples and non-traditional families.',
        tips: ['Review the Closing Disclosure 3 days before closing', 'Do a final walkthrough 24 hours before closing', `Bring valid ID and a cashier's check or wire transfer for closing costs`],
    },
];

const faqs = [
    {
        q: 'How much do I need for a down payment?',
        a: 'As little as 3% with conventional loans, 3.5% with FHA loans, or 0% with VA/USDA loans in eligible areas. However, putting down 20% eliminates Private Mortgage Insurance (PMI), saving you $100–$300/month.',
    },
    {
        q: `What's the difference between pre-qualification and pre-approval?`,
        a: `Pre-qualification is a quick estimate based on self-reported data. Pre-approval involves a full credit check and document review — it's what sellers actually want to see. We strongly recommend pre-approval before seriously shopping.`,
    },
    {
        q: 'How do we hold title as a same-sex couple?',
        a: `You have options: joint tenancy with right of survivorship (each partner automatically inherits the other's share), tenancy in common (each owns a defined percentage, goes to estate), or community property (in certain states). Our real estate attorney Carolyn Futtner will advise on what's right for your situation.`,
    },
    {
        q: 'Are there first-time buyer programs in Connecticut?',
        a: 'Yes. CHFA (Connecticut Housing Finance Authority) offers below-market interest rates, down payment assistance, and closing cost programs for first-time buyers meeting income limits. Our lender Jake Earl works extensively with CHFA programs.',
    },
    {
        q: 'How long does the home buying process take?',
        a: 'From starting your search to receiving keys, most buyers take 3–6 months. Pre-approval: 1–3 days. Active search: 1–3 months. Under contract to close: 30–45 days.',
    },
];

const FirstTimeBuyers: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="First-Time Home Buying Guide for LGBTQ+ Buyers in Connecticut | GayRealEstateCT.net"
                description="Your comprehensive step-by-step guide to buying your first home in Connecticut as an LGBTQ+ buyer. Learn about financing, finding inclusive agents, and protecting your investment."
                canonical="https://www.gayrealestateconnecticut.com/first-time-buyers"
                keywords="first time home buyer Connecticut LGBTQ, LGBTQ first time buyer guide CT, gay couple buying first home Connecticut, home buying steps Connecticut"
            />

            {/* Back Nav */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-semibold text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.07),transparent_55%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.07),transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(119,0,136,0.06),transparent_55%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-6 md:mb-8">
                        <Home className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">First-Time Buyers</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                        Your First Home.<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Done Right.</span>
                    </h1>
                    <p className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                        A step-by-step guide to buying your first home in Connecticut — written specifically for LGBTQ+ buyers who want to feel safe, informed, and supported at every stage.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">
                        <a href="#steps" className="px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                            See the Steps <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                        <a href="/#contact" className="px-8 py-4 bg-white/60 backdrop-blur-sm border border-purple-200 text-slate-700 font-semibold rounded-full hover:bg-white hover:border-purple-300 shadow-sm transition-all duration-300">
                            Talk to an Agent
                        </a>
                    </div>
                </div>
            </header>

            {/* Steps */}
            <section id="steps" className="py-16 md:py-24 max-w-5xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">The 6-Step Buying Process</h2>
                    <p className="text-slate-600 text-[13px] md:text-lg max-w-2xl mx-auto">Every first-time buyer goes through these stages. We'll be with you through each one.</p>
                </div>
                <div className="space-y-6 md:space-y-10">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div key={i} className="group flex flex-col md:flex-row gap-6 md:gap-8 bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 hover:border-purple-300 hover:shadow-xl transition-all duration-500">
                                <div className="flex-shrink-0 flex flex-col items-center gap-2 md:gap-3 md:w-24">
                                    <span className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.8 }}>{step.number}</span>
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl shadow-sm border border-purple-100 flex items-center justify-center pt-0.5" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-brand-700 transition-colors">{step.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-4 md:mb-5 text-[13px] md:text-base">{step.description}</p>
                                    <ul className="space-y-2">
                                        {step.tips.map((tip, j) => (
                                            <li key={j} className="flex items-start gap-2 md:gap-3 text-[13px] md:text-sm text-slate-600">
                                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 md:mt-0.5" />
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Mid CTA */}
            <section className="py-12 md:py-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-400 text-lg md:text-xl mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-purple-400" />)}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3 md:mb-4 pt-4 md:pt-0">Ready to Start Your Search?</h2>
                    <p className="text-slate-600 text-[13px] md:text-lg mb-6 md:mb-8 max-w-xl mx-auto px-4">Our LGBTQ+-led team will guide you from pre-approval to keys — with zero judgment and total confidentiality.</p>
                    <a 
                        href="/#contact" 
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 md:px-10 md:py-4 text-white font-bold rounded-xl md:rounded-full hover:-translate-y-1 transition-all duration-300 shadow-xl text-sm md:text-base w-full sm:w-auto"
                        style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                    >
                        Get a Free Consultation <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-600 text-[13px] md:text-lg">Honest answers to the questions every first-time buyer asks.</p>
                </div>
                <div className="space-y-4 md:space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-sm border border-slate-100">
                            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3 flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-brand-100 text-brand-700 text-xs md:text-sm font-bold flex items-center justify-center md:mt-0.5">{i + 1}</span>
                                <span className="mt-0.5 md:mt-0">{faq.q}</span>
                            </h3>
                            <p className="text-slate-600 leading-relaxed pl-9 md:pl-10 text-[13px] md:text-base">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing CTA */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-12 text-center relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60">
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)' }} />
                    <div className="relative z-10">
                        <Phone className="w-8 h-8 md:w-10 md:h-10 text-purple-500 mx-auto mb-4 md:mb-6" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3 md:mb-4">Talk to Someone Who Gets It</h2>
                        <p className="text-slate-600 text-[13px] md:text-lg max-w-xl mx-auto mb-6 md:mb-8">Our agents live and work in Connecticut's LGBTQ+ communities. They're not just professionals — they're neighbors.</p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <a href="/#contact" className="px-6 py-3.5 md:px-10 md:py-4 text-white font-bold rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                Connect With Our Team <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                            <Link to="/#find-agent" className="px-6 py-3.5 md:px-10 md:py-4 bg-white border border-purple-200 text-slate-700 font-semibold rounded-xl md:rounded-2xl hover:border-purple-300 transition-all duration-300 text-sm md:text-base justify-center flex">
                                Browse Our Agents
                            </Link>
                        </div>
                        <p className="text-slate-500 text-[10px] md:text-xs mt-4 md:mt-6">🔒 Completely confidential. No commitment required.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FirstTimeBuyers;
