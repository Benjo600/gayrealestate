import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle, Clock, DollarSign, Users, Clipboard, Star, Phone } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const phases = [
    {
        icon: DollarSign,
        num: '01',
        title: 'Price It Right — From Day One',
        body: 'Overpricing is the #1 mistake CT sellers make. An overpriced home sits, collects days-on-market stigma, and ultimately sells for less than a correctly priced home would have. Our pricing strategy is built on hyperlocal comps, seasonal demand patterns, and an understanding of who your buyer actually is.',
        checklist: ['Comparative Market Analysis (CMA) of recent sold homes within 0.5 miles', 'Adjustments for specific features: updates, lot size, condition', 'Review of active competition and pending sales', 'Strategy session: pricing to create urgency vs. leaving room to negotiate'],
    },
    {
        icon: Clipboard,
        num: '02',
        title: 'Prepare & Stage Your Home',
        body: `Buyers make decisions in the first 30 seconds. We'll walk through your home room-by-room and identify exactly what will move the needle — and what's unnecessary expense. We will also help you complete the mandatory Connecticut Residential Property Condition Disclosure Report.`,
        checklist: ['Pre-listing walkthrough with prioritized action items', 'Completion of mandatory CT Property & Lead Disclosures', 'Professional staging consultation (or full staging for vacant homes)', 'Connections to trusted contractors, painters, and cleaners'],
    },
    {
        icon: TrendingUp,
        num: '03',
        title: 'Premium Marketing',
        body: 'Your home will be marketed not just on the MLS, but across the digital channels where serious buyers are actually searching — including LGBTQ+ real estate networks, where our reach is unmatched in Connecticut.',
        checklist: ['Professional photography + twilight shots', 'Zillow, Realtor.com, and MLS premium placement', 'Targeted social media advertising (Facebook, Instagram)', 'Outreach to LGBTQ+ Real Estate Alliance buyer network across CT, NY, and MA'],
    },
    {
        icon: Users,
        num: '04',
        title: 'Showings & Offer Strategy',
        body: `We'll coordinate showings to build momentum and urgency. When offers come in — and in CT's current market, they often come fast — we'll analyze every term, not just the price. The highest offer isn't always the best offer.`,
        checklist: ['Digital showings scheduling and feedback system', 'Open house strategy (if appropriate for your home)', 'Multiple offer management and escalation strategy', 'Offer comparison: price, financing, contingencies, closing date'],
    },
    {
        icon: Clock,
        num: '05',
        title: 'Navigate to Closing',
        body: `Once you're under contract, there's still significant work to do. Inspections, appraisal, buyer financing, title search, attorney coordination. We'll be there for every step — and so will attorney Carolyn Futtner for the legal side.`,
        checklist: ['Inspection negotiations: what to fix, what to counter, what to decline', 'Appraisal management and remediation if needed', 'Attorney coordination with Carolyn Futtner on our team', 'Final walkthrough and closing table preparation'],
    },
];

const SellersGuide: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Connecticut Seller's Guide | LGBTQ+-Allied Real Estate | GayRealEstateCT.net"
                description="The complete guide to selling your Connecticut home — pricing strategy, staging, marketing, offer negotiation, and closing. Written by LGBTQ+-allied CT real estate professionals."
                canonical="https://www.gayrealestatect.net/sellers-guide"
                keywords="Connecticut home selling guide, sell my home Connecticut LGBTQ, CT real estate seller guide, how to sell your home for more Connecticut"
            />

            {/* Back Nav */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-semibold text-slate-700 hover:bg-white hover:shadow-md transition-all">
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
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Seller's Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                        Sell Smart.<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sell for More.</span>
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        A five-phase guide to selling your Connecticut home — from pre-listing strategy to closing table. Written by agents who close deals, not just write guides.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-10">
                        <a href="#phase-1" className="px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                            Read the Guide <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href="/#contact" className="px-8 py-4 bg-white/60 backdrop-blur-sm border border-purple-200 text-slate-700 font-semibold rounded-full hover:bg-white hover:border-purple-300 transition-all shadow-sm">
                            Get a Free Valuation
                        </a>
                    </div>
                </div>
            </header>

            {/* CT Market Snapshot */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Median Days on Market', value: '11', sub: 'West Hartford (2025)', color: 'text-brand-600' },
                        { label: 'List-to-Sale Price Ratio', value: '102%', sub: 'Competitive CT towns', color: 'text-green-600' },
                        { label: 'YoY Price Growth', value: '+8.4%', sub: 'Hartford County (2025)', color: 'text-gold-600' },
                        { label: 'Average Sale Timeline', value: '35 days', sub: 'Listing to close', color: 'text-slate-700' },
                    ].map(({ label, value, sub, color }) => (
                        <div key={label} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 text-center">
                            <p className={`text-3xl md:text-4xl font-bold mb-1 md:mb-2 ${color}`}>{value}</p>
                            <p className="font-semibold text-slate-800 text-[13px] md:text-sm mb-1">{label}</p>
                            <p className="text-[11px] md:text-xs text-slate-400">{sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Phases */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16 md:pb-24 space-y-6 md:space-y-10">
                {phases.map((phase, i) => {
                    const Icon = phase.icon;
                    return (
                        <div key={i} id={`phase-${i + 1}`} className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 overflow-hidden group hover:border-purple-300 hover:shadow-xl transition-all duration-500">
                            <div className="px-6 py-5 md:px-10 md:py-6 border-b border-purple-100/50 flex items-center gap-4 md:gap-6" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(247,242,255,0.8))' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl shadow-sm border border-purple-100 flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Phase {phase.num}</p>
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">{phase.title}</h2>
                                </div>
                            </div>
                            <div className="p-5 md:p-8">
                                <p className="text-slate-600 leading-relaxed mb-4 md:mb-6 text-[13px] md:text-base">{phase.body}</p>
                                <div className="bg-slate-50 rounded-xl md:rounded-2xl p-5 md:p-6">
                                    <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 md:mb-4">What We Do</p>
                                    <ul className="space-y-2 md:space-y-3">
                                        {phase.checklist.map((item, j) => (
                                            <li key={j} className="flex items-start gap-2 md:gap-3 text-[13px] md:text-sm text-slate-700">
                                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 md:mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Testimonial */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-20 relative z-10 pt-8">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-purple-100 p-10 md:p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex justify-center gap-1 text-purple-400 text-lg md:text-xl mb-4 md:mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-purple-400" />)}
                    </div>
                    <blockquote className="text-slate-800 text-xl md:text-2xl font-display italic leading-relaxed mb-4 md:mb-6 max-w-2xl mx-auto font-medium">
                        "We listed on Thursday morning. By Saturday we had four offers. We accepted one at $62,000 over asking. The preparation strategy made all the difference."
                    </blockquote>
                    <p className="text-slate-500 text-xs md:text-sm mb-8">— Couple selling West Hartford home, Spring 2025</p>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <a 
                            href="/#contact" 
                            className="px-6 py-3.5 md:px-10 md:py-4 text-white font-bold rounded-xl md:rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto"
                            style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                        >
                            Get Your Free Valuation <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="/#contact" className="px-6 py-3.5 md:px-10 md:py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto">
                            <Phone className="w-4 h-4" /> Talk to a Listing Agent
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SellersGuide;
