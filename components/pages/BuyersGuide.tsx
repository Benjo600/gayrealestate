import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
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
    const [activePhase, setActivePhase] = useState(0);
    const [expandedChapter, setExpandedChapter] = useState<number | null>(0);
    
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const toggleChapter = (index: number) => {
        setExpandedChapter(prev => prev === index ? null : index);
    };

    const phaseGroups = [
        { title: 'The Prep', chapters: [0, 1] },
        { title: 'The Search', chapters: [2, 3] },
        { title: 'The Finish', chapters: [4, 5] }
    ];

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/10"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="LGBTQ+ Buyer's Guide | GayRealEstateCT.net"
                description="Complete Connecticut buyer's guide for LGBTQ+ home buyers."
                canonical="https://www.gayrealestatect.net/buyers-guide"
            />

            {/* Back Nav */}
            <nav className="absolute top-0 left-0 right-0 p-4 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </Link>
                </div>
            </nav>

            {/* Hero - Ultra-Lean for Mobile */}
            <header className="relative pt-20 pb-4 md:pt-32 md:pb-16 overflow-hidden text-center bg-white/40">
                <div className="max-w-7xl mx-auto px-5 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-3">
                        <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Buyer's Guide</span>
                    </div>
                    <h1 className="text-2xl md:text-7xl font-display font-bold text-slate-900 mb-2 leading-tight md:mb-4">
                        Homebuyer Strategy
                    </h1>
                    <p className="text-slate-500 text-[10px] md:text-xl font-bold uppercase tracking-widest md:text-slate-600 md:font-normal md:tracking-normal">Credit to Closing: Step-by-Step</p>
                </div>
            </header>

            {/* Phase & Chapter Navigation Suite - Mobile Only */}
            <section className="max-w-4xl mx-auto px-4 pb-6 md:hidden">
                {/* Main Phase Tabs */}
                <div className="flex gap-1.5 p-1 bg-slate-200/50 rounded-2xl mb-4 backdrop-blur-sm">
                    {phaseGroups.map((pg, i) => (
                        <button 
                            key={i} 
                            onClick={() => {
                                setActivePhase(i);
                                setExpandedChapter(phaseGroups[i].chapters[0]);
                            }}
                            className={cn(
                                "flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                activePhase === i 
                                    ? "bg-slate-900 text-white shadow-xl" 
                                    : "text-slate-500"
                            )}
                        >
                            {pg.title}
                        </button>
                    ))}
                </div>

                {/* Sub-Chapter Selector for the Phase */}
                <div className="flex justify-center gap-4">
                    {phaseGroups[activePhase].chapters.map((chIdx) => (
                        <button 
                            key={chIdx}
                            onClick={() => setExpandedChapter(chIdx)}
                            className={cn(
                                "text-[10px] font-bold uppercase tracking-[0.25em] pb-1 transition-all border-b-2",
                                expandedChapter === chIdx 
                                    ? "border-purple-600 text-slate-900" 
                                    : "border-transparent text-slate-400"
                            )}
                        >
                            Ch.{chIdx + 1}
                        </button>
                    ))}
                </div>
            </section>

            {/* Chapters - Responsive System */}
            <section className="max-w-6xl mx-auto px-4 pb-16 space-y-4 md:space-y-8">
                {chapters.map((ch, i) => {
                    const isOpen = expandedChapter === i;
                    const Icon = ch.icon;
                    
                    // Mobile filtering: Only show ONLY the currently EXPANDED chapter
                    const isVisibleMobile = expandedChapter === i;

                    return (
                        <div key={i} id={`chapter-${i + 1}`} className={cn(
                            "bg-white transition-all duration-500",
                            isVisibleMobile ? "block" : "hidden md:block",
                            "md:rounded-[2.5rem] md:shadow-sm md:border md:border-slate-100 md:overflow-hidden md:mb-12",
                            isVisibleMobile && "rounded-2xl shadow-xl border border-purple-100 mx-1 mb-8"
                        )}>
                            {/* Chapter Header */}
                            <div 
                                className="w-full px-5 py-6 md:px-12 md:py-10 flex items-center justify-between bg-white border-b border-slate-50 md:border-none"
                            >
                                <div className="flex items-center gap-5 md:gap-8 text-left">
                                    <div className="w-12 h-12 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] shadow-lg flex items-center justify-center flex-shrink-0 transition-all text-white bg-slate-900" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                        <Icon className="w-6 h-6 md:w-10 md:h-10" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-sm font-black uppercase text-purple-600 tracking-[0.3em] mb-1 leading-none">{ch.num}</p>
                                        <h2 className="text-xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">{ch.title}</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Chapter Body */}
                            <div className="p-5 md:p-12">
                                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                                    <div>
                                        <h3 className="text-[10px] md:text-lg font-black uppercase tracking-[0.25em] text-slate-400 mb-6 border-b border-slate-50 pb-2">What to do</h3>
                                        <ul className="space-y-4 md:space-y-6">
                                            {ch.points.map((point, j) => (
                                                <li key={j} className="flex items-start gap-4 text-slate-700 text-[13px] md:text-lg">
                                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                                    </div>
                                                    <span className="leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl md:rounded-[2rem] p-6 md:p-10 relative overflow-hidden">
                                            <p className="text-[10px] md:text-sm font-bold text-purple-700 uppercase tracking-[0.2em] mb-4">💡 Professional Insight</p>
                                            <p className="text-slate-800 text-sm md:text-xl leading-relaxed italic font-medium">{ch.insight}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Next/Prev Controls */}
                                <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between md:hidden">
                                    <button 
                                        onClick={() => {
                                            if (i > 0) {
                                                const prevIdx = i - 1;
                                                setExpandedChapter(prevIdx);
                                                setActivePhase(phaseGroups.findIndex(p => p.chapters.includes(prevIdx)));
                                                window.scrollTo(0, 300);
                                            }
                                        }}
                                        disabled={i === 0}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 disabled:opacity-0 flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-3 h-3" /> Prev
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (i < 5) {
                                                const nextIdx = i + 1;
                                                setExpandedChapter(nextIdx);
                                                setActivePhase(phaseGroups.findIndex(p => p.chapters.includes(nextIdx)));
                                                window.scrollTo(0, 300);
                                            }
                                        }}
                                        disabled={i === 5}
                                        className="py-3 px-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-xl"
                                    >
                                        Next <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20 pt-8">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl md:rounded-[4rem] border border-purple-100 p-10 md:p-24 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h2 className="text-3xl md:text-6xl font-display font-bold text-slate-900 mb-6">Ready to Find Your Home?</h2>
                    <p className="text-slate-600 text-base md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto">Every buyer's situation is different. Talk to one of our LGBTQ+-allied agents for guidance tailored to your goals, budget, and timeline.</p>
                    <a 
                        href="/#contact" 
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-6 text-white font-bold rounded-xl md:rounded-3xl shadow-2xl hover:-translate-y-1 transition-all duration-300 text-sm md:text-xl w-full sm:w-auto"
                        style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                    >
                        Schedule Free Strategy Call <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BuyersGuide;
