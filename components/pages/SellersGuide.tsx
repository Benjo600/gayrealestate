import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle, Clock, DollarSign, Users, Clipboard, Phone } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const phases = [
    {
        icon: DollarSign,
        num: '01',
        title: 'Price It Right — From Day One',
        body: 'Overpricing is the #1 mistake CT sellers make. An overpriced home sits, collects days-on-market stigma, and ultimately sells for less than a correctly priced home would have.',
        checklist: ['Comparative Market Analysis (CMA)', 'Adjustments for specific features', 'Review of active competition', 'Strategy session: pricing to create urgency'],
    },
    {
        icon: Clipboard,
        num: '02',
        title: 'Prepare & Stage Your Home',
        body: `Buyers make decisions in the first 30 seconds. We'll walk through your home room-by-room and identify exactly what will move the needle.`,
        checklist: ['Pre-listing walkthrough', 'CT Property & Lead Disclosures', 'Professional staging consultation', 'Connections to trusted contractors'],
    },
    {
        icon: TrendingUp,
        num: '03',
        title: 'Premium Marketing',
        body: 'Your home will be marketed not just on the MLS, but across the digital channels where serious buyers are actually searching — including LGBTQ+ real estate networks.',
        checklist: ['Professional photography', 'Zillow, Realtor.com premium placement', 'Targeted social media advertising', 'LGBTQ+ Real Estate Alliance network'],
    },
    {
        icon: Users,
        num: '04',
        title: 'Showings & Offer Strategy',
        body: `We'll coordinate showings to build momentum and urgency. When offers come in, we'll analyze every term, not just the price.`,
        checklist: ['Digital showings system', 'Open house strategy', 'Multiple offer management', 'Offer comparison: terms & dates'],
    },
    {
        icon: Clock,
        num: '05',
        title: 'Navigate to Closing',
        body: `Once you're under contract, there's still significant work to do. Inspections, appraisal, buyer financing, title search, attorney coordination.`,
        checklist: ['Inspection negotiations', 'Appraisal management', 'Attorney coordination', 'Final walkthrough preparation'],
    },
];

const SellersGuide: React.FC = () => {
    const [activeStage, setActiveStage] = useState(0);
    const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
    
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const togglePhase = (index: number) => {
        setExpandedPhase(prev => prev === index ? null : index);
    };

    const stageGroups = [
        { title: 'The Prep', phases: [0, 1] },
        { title: 'The Market', phases: [2, 3] },
        { title: 'The Closing', phases: [4] }
    ];

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/10"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Connecticut Seller's Guide | GayRealEstateCT.net"
                description="Complete guide to selling your Connecticut home — pricing, staging, marketing, and closing."
                canonical="https://www.gayrealestatect.net/sellers-guide"
            />

            <nav className="absolute top-0 left-0 right-0 p-4 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
                        <ArrowLeft className="w-3.5 h-3.5" /> Home
                    </Link>
                </div>
            </nav>

            {/* Hero - Ultra-Lean for Mobile */}
            <header className="relative pt-20 pb-4 md:pt-40 md:pb-16 overflow-hidden text-center bg-white/40">
                <div className="max-w-7xl mx-auto px-5 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-3">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Seller's Guide</span>
                    </div>
                    <h1 className="text-3xl md:text-8xl font-display font-bold text-slate-900 mb-2 leading-tight">
                        Sell Smart. <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sell for More.</span>
                    </h1>
                    <p className="text-slate-500 text-[10px] md:text-xl font-bold uppercase tracking-widest md:text-slate-600 md:font-normal md:tracking-normal">A Five-Phase Strategy to Winning CT Market</p>
                </div>
            </header>

            {/* Stage & Phase Navigation Suite - Mobile Only */}
            <section className="max-w-4xl mx-auto px-4 pb-8 md:hidden">
                {/* Main Stage Tabs */}
                <div className="flex gap-1 p-1 bg-slate-200/50 rounded-2xl mb-4 backdrop-blur-sm">
                    {stageGroups.map((sg, i) => (
                        <button 
                            key={i} 
                            onClick={() => {
                                setActiveStage(i);
                                setExpandedPhase(stageGroups[i].phases[0]);
                            }}
                            className={cn(
                                "flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                activeStage === i 
                                    ? "bg-slate-900 text-white shadow-xl" 
                                    : "text-slate-500"
                            )}
                        >
                            {sg.title.replace('The ', '')}
                        </button>
                    ))}
                </div>

                {/* Sub-Phase Selector for the Stage */}
                <div className="flex justify-center gap-4">
                    {stageGroups[activeStage].phases.map((phIdx) => (
                        <button 
                            key={phIdx}
                            onClick={() => setExpandedPhase(phIdx)}
                            className={cn(
                                "text-[10px] font-bold uppercase tracking-[0.25em] pb-1 transition-all border-b-2",
                                expandedPhase === phIdx 
                                    ? "border-purple-600 text-slate-900" 
                                    : "border-transparent text-slate-400"
                            )}
                        >
                            Ph.{phIdx + 1}
                        </button>
                    ))}
                </div>
            </section>


            {/* Market Stats - Responsive */}
            <section className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { label: 'DOM', value: '11', sub: 'Days on Market' },
                        { label: 'Ratio', value: '102%', sub: 'List-to-Sale' },
                        { label: 'Growth', value: '+8%', sub: 'YoY Growth' },
                        { label: 'Timeline', value: '35d', sub: 'List to Close' },
                    ].map(({ label, value, sub }) => (
                        <div key={label} className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-slate-100 text-center shadow-lg">
                            <p className="text-3xl md:text-5xl font-black text-brand-600 mb-2">{value}</p>
                            <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Phases - Responsive System */}
            <section className="max-w-6xl mx-auto px-4 pb-16 space-y-4 md:space-y-12">
                {phases.map((phase, i) => {
                    const isOpen = expandedPhase === i;
                    const Icon = phase.icon;
                    
                    // Mobile filtering: Only show ONLY the currently EXPANDED phase
                    const isVisibleMobile = expandedPhase === i;

                    return (
                        <div key={i} id={`phase-${i + 1}`} className={cn(
                            "bg-white transition-all duration-500",
                            isVisibleMobile ? "block" : "hidden md:block",
                            "md:rounded-[3rem] md:shadow-sm md:border md:border-slate-100 md:overflow-hidden md:mb-12",
                            isVisibleMobile && "rounded-2xl shadow-xl border border-purple-100 mx-1 mb-8"
                        )}>
                            {/* Phase Header */}
                            <div 
                                className="w-full px-5 py-6 md:px-12 md:py-10 flex items-center justify-between bg-white border-b border-slate-50 md:border-none"
                            >
                                <div className="flex items-center gap-5 md:gap-10 text-left">
                                    <div className="w-12 h-12 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] shadow-lg flex items-center justify-center flex-shrink-0 transition-all text-white bg-slate-900" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                        <Icon className="w-6 h-6 md:w-10 md:h-10 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-sm font-black uppercase text-purple-600 tracking-[0.3em] mb-1 leading-none">Phase {phase.num}</p>
                                        <h2 className="text-xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">{phase.title}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 md:p-12">
                                <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
                                    <div>
                                        <p className="text-[13px] md:text-xl text-slate-600 mb-8 leading-relaxed font-medium italic border-l-2 border-slate-50 pl-5">{phase.body}</p>
                                        <div className="bg-slate-50 rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-slate-100">
                                            <p className="text-[9px] md:text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Phase Checklist</p>
                                            <ul className="space-y-4">
                                                {phase.checklist.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-4 text-[13px] md:text-lg text-slate-700">
                                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                                            <CheckCircle className="w-3 h-3 text-green-600" />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center">
                                        <div className="w-full aspect-square rounded-[3rem] bg-gradient-to-br from-purple-50 to-blue-50 border border-white p-1 flex items-center justify-center shadow-inner">
                                            <Icon className="w-1/3 h-1/3 text-brand-600 opacity-20" />
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Next/Prev Controls */}
                                <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between md:hidden">
                                    <button 
                                        onClick={() => {
                                            if (i > 0) {
                                                const prevIdx = i - 1;
                                                setExpandedPhase(prevIdx);
                                                setActiveStage(stageGroups.findIndex(p => p.phases.includes(prevIdx)));
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
                                            if (i < 4) {
                                                const nextIdx = i + 1;
                                                setExpandedPhase(nextIdx);
                                                setActiveStage(stageGroups.findIndex(p => p.phases.includes(nextIdx)));
                                                window.scrollTo(0, 300);
                                            }
                                        }}
                                        disabled={i === 4}
                                        className="py-3 px-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-xl"
                                    >
                                        Next Stage <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            <section className="max-w-7xl mx-auto px-5 pb-20">
                <div className="bg-slate-900 text-white rounded-3xl md:rounded-[4rem] p-10 md:p-32 text-center shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_60%)] pointer-events-none" />
                    <h2 className="text-3xl md:text-6xl font-serif font-bold mb-6 relative z-10">Curious about your home's value?</h2>
                    <p className="text-slate-400 text-sm md:text-2xl mb-12 max-w-2xl mx-auto relative z-10">Get a data-backed valuation from a real agent who knows CT, not an algorithm.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <a href="/#contact" className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl active:scale-95 transition-all text-sm md:text-xl shadow-xl hover:-translate-y-1">
                            Get Free Valuation
                        </a>
                        <a href="/#contact" className="px-10 py-5 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-sm md:text-xl inline-flex items-center justify-center gap-3">
                            <Phone className="w-5 h-5 md:w-6 md:h-6" /> Message Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SellersGuide;
