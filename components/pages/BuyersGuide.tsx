import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Search, DollarSign, FileText, Home, Shield, Scale, CheckCircle } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const chapters = [
    {
        icon: Search,
        num: 'Chapter 1',
        title: 'Preparing to Buy',
        points: [
            'Assess your credit score and fix any errors before applying',
            'Build your savings: down payment (3–20%), closing costs (2–5%), and reserves',
            'Understand the difference between renting and owning long-term',
            'Set your non-negotiables and nice-to-haves before you start touring',
        ],
        insight: `Before you even think about listings, run your credit report from all three bureaus. Errors are more common than you'd think and can be fixed — but only if you catch them early.`,
    },
    {
        icon: DollarSign,
        num: 'Chapter 2',
        title: 'Financing Your Home',
        points: [
            'Know the loan types: Conventional, FHA, VA, USDA, and CHFA (Connecticut-specific)',
            'Complete CHFA\'s mandatory homebuyer education class (if using a state-funded loan)',
            'Understand PMI — and how to avoid or eliminate it',
            'Get pre-approved before making a single offer',
            'Work with a lender experienced with LGBTQ+ buyers and non-traditional income structures',
        ],
        insight: 'CHFA (Connecticut Housing Finance Authority) offers competitive rate programs for first-time buyers. Our partner lender Jake Earl has helped over 500 LGBTQ+ buyers navigate CHFA — ask us to connect you.',
    },
    {
        icon: Home,
        num: 'Chapter 3',
        title: 'Finding the Right Neighborhood',
        points: [
            'Research LGBTQ+ community culture beyond just legal protections',
            'Visit at different times: weekday morning, Friday evening, weekend afternoon',
            'Check school district LGBTQ+ policies if you have or plan to have children',
            'Talk to residents — your agent can make introductions',
        ],
        insight: 'In Connecticut, the difference between two towns 10 miles apart can be dramatic in terms of LGBTQ+ community culture. Legal safety and lived experience are different things — we help you understand both.',
    },
    {
        icon: FileText,
        num: 'Chapter 4',
        title: 'Making a Winning Offer',
        points: [
            'Understand comparable sales ("comps") in your target area',
            'Know when to escalate, when to hold firm, and when to walk away',
            'Contingencies: what to waive, what never to waive (inspection)',
            `Earnest money: how much, how it's held, and what protects you if a deal falls through`,
        ],
        insight: 'In West Hartford and other competitive CT markets, homes often receive multiple offers within 48 hours. Your agent will prepare a competitive strategy — including an escalation clause where appropriate.',
    },
    {
        icon: Shield,
        num: 'Chapter 5',
        title: 'Inspections & Due Diligence',
        points: [
            'General home inspection: always worth the $400–$600 investment',
            'Radon testing: especially important in Connecticut — many homes test high',
            'Sewer scope: older CT homes often have clay or cast iron pipes requiring attention',
            'Oil tank sweep: if the home was ever heated by oil, test for buried tanks',
        ],
        insight: `Connecticut's older housing stock is charming — and requires thorough inspection. We'll connect you with inspectors who know how to evaluate Victorian-era homes, post-war colonials, and everything in between.`,
    },
    {
        icon: Scale,
        num: 'Chapter 6',
        title: 'Closing & Legal Protection',
        points: [
            'Understand title insurance and why it matters',
            'How to hold title as an LGBTQ+ couple or individual',
            'Review the Closing Disclosure 3 days before closing',
            'Post-closing: property tax adjustments, homestead exemption filing',
        ],
        insight: 'Connecticut is an attorney state — a real estate attorney must be present at closing. Attorney Carolyn Futtner on our team specializes in LGBTQ+ real estate law and handles title issues, deed preparation, and estate planning.',
    },
];

const BuyersGuide: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="LGBTQ+ Buyer's Guide — Connecticut Real Estate | GayRealEstateCT.net"
                description="The complete Connecticut buyer's guide for LGBTQ+ home buyers. From credit to closing, neighborhood matching to legal protection — everything you need in one place."
                canonical="https://www.gayrealestateconnecticut.com/buyers-guide"
                keywords="LGBTQ buyers guide Connecticut, gay home buyer guide CT, Connecticut home buying LGBTQ, same sex couple home buying Connecticut guide"
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
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Buyer's Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                        The Complete <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>LGBTQ+ Buyer's Guide</span><br />to Connecticut
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Six chapters of honest, practical guidance — from getting your finances right to closing the deal and protecting your investment legally.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-10">
                        <a href="#chapter-1" className="px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                            Start Reading <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href="/#contact" className="px-8 py-4 bg-white/60 backdrop-blur-sm border border-purple-200 text-slate-700 font-semibold rounded-full hover:bg-white hover:border-purple-300 transition-all shadow-sm">
                            Talk to an Agent
                        </a>
                    </div>
                </div>
            </header>

            {/* Table of Contents */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-5 md:p-8">
                    <h2 className="font-bold text-slate-900 text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-brand-600" /> Table of Contents
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {chapters.map((ch, i) => {
                            const Icon = ch.icon;
                            return (
                                <a href={`#chapter-${i + 1}`} key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-brand-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">{ch.num}</p>
                                        <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-700 transition-colors">{ch.title}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Chapters */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16 md:pb-24 space-y-8 md:space-y-12">
                {chapters.map((ch, i) => {
                    const Icon = ch.icon;
                    return (
                        <div key={i} id={`chapter-${i + 1}`} className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 overflow-hidden hover:border-purple-300 hover:shadow-xl transition-all duration-500">
                            {/* Chapter Header */}
                            <div className="px-6 py-5 md:px-10 md:py-6 border-b border-purple-100/50 flex items-center gap-4 md:gap-6" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(247,242,255,0.8))' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl shadow-sm border border-purple-100 flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{ch.num}</p>
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">{ch.title}</h2>
                                </div>
                            </div>
                            {/* Chapter Body */}
                            <div className="p-5 md:p-8">
                                <ul className="space-y-4 mb-8">
                                    {ch.points.map((point, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-600">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                {/* Agent Insight */}
                                <div className="bg-brand-50 border border-brand-100 rounded-xl md:rounded-2xl p-5 md:p-6">
                                    <p className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">💡 Agent Insight</p>
                                    <p className="text-slate-700 text-[13px] md:text-sm leading-relaxed">{ch.insight}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Download CTA */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-20 relative z-10 pt-8">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-purple-100 p-10 md:p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3 md:mb-4">Want Personalized Advice?</h2>
                    <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto">Every buyer's situation is different. Talk to one of our LGBTQ+-allied agents for guidance tailored to your goals, budget, and timeline.</p>
                    <a 
                        href="/#contact" 
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-10 md:py-5 text-white font-bold rounded-xl md:rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
                        style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                    >
                        Get Free Personalized Advice <ArrowRight className="w-5 h-5" />
                    </a>
                    <p className="text-slate-400 text-[11px] md:text-xs mt-4">🔒 No commitment. Completely confidential.</p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BuyersGuide;
