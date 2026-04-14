import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Footer from '../Footer';
import { ScrollToTop } from '../ui/scroll-to-top';
import { ContactModal } from '../ui/ContactModal';
import SEOHead from '../SEOHead';
import {
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Send,
    CheckCircle2,
    Calendar,
    Instagram,
    User,
    Briefcase,
    Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { agents } from '../../data/agents';

const BASE_URL = 'https://www.gayrealestatect.net';

const RealtorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const agentKey = id?.toLowerCase();
    const agent = agentKey && agents[agentKey] ? agents[agentKey] : undefined;
    const [modal, setModal] = useState<{ open: boolean; method: 'call' | 'email' | 'schedule' }>({
        open: false,
        method: 'call',
    });

    const [activeTab, setActiveTab] = useState<'bio' | 'expertise' | 'why'>('bio');

    const openModal = (method: 'call' | 'email' | 'schedule') => setModal({ open: true, method });
    const closeModal = () => setModal(prev => ({ ...prev, open: false }));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const agentSEOData = useMemo(() => {
        if (!agent) return null;
        const roleLabel = agent.role === 'agent' ? 'Realtor' : agent.role === 'lender' ? 'Mortgage Banker' : 'Attorney';
        const pageTitle = `${agent.name} — ${agent.title} | GayRealEstateCT.net`;
        const pageDescription = `${agent.name} is a ${roleLabel} at GayRealEstateCT.net. ${agent.tagline} ${agent.specialties.slice(0, 3).join(', ')}.`;
        const canonicalUrl = `${BASE_URL}/agent/${agent.id}`;
        const imageUrl = agent.image.startsWith('http') ? agent.image : `${BASE_URL}${agent.image}`;

        const structuredData = [
            {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: agent.name,
                jobTitle: agent.title,
                description: agent.tagline,
                image: imageUrl,
                url: canonicalUrl,
                worksFor: {
                    '@type': 'Organization',
                    name: 'GayRealEstateCT.net',
                    url: BASE_URL,
                },
                knowsAbout: agent.specialties,
                hasCredential: agent.credentials.map((cred) => ({
                    '@type': 'EducationalOccupationalCredential',
                    credentialCategory: cred.type,
                    name: cred.label,
                })),
            },
            {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Our Team',
                        item: `${BASE_URL}/about#team`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: agent.name,
                        item: canonicalUrl,
                    },
                ],
            },
        ];

        return { pageTitle, pageDescription, canonicalUrl, imageUrl, structuredData };
    }, [agent]);

    if (!agent) {
        return <Navigate to="/" replace />;
    }

    const paragraphs = agent.bio.split('\n\n').filter(p => p.trim());
    const roleLabel = agent.role === 'agent' ? 'Realtor' : agent.role === 'lender' ? 'Mortgage Banker' : 'Attorney';

    return (
        <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">

            {agentSEOData && (
                <SEOHead
                    title={agentSEOData.pageTitle}
                    description={agentSEOData.pageDescription}
                    canonical={agentSEOData.canonicalUrl}
                    ogType="profile"
                    ogImage={agentSEOData.imageUrl}
                    ogImageAlt={`${agent.name} — ${agent.title}`}
                    keywords={`${agent.name}, ${agent.title}, ${agent.specialties.join(', ')}, LGBTQ realtor Connecticut`}
                    author={agent.name}
                    structuredData={agentSEOData.structuredData}
                />
            )}

            {/* Premium Floating Back Button - Moved to Top-Right to avoid Label Overlap */}
            <div className="fixed top-8 right-8 z-[60] hidden md:block">
                <Link 
                    to="/" 
                    className="group flex items-center gap-2.5 px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:bg-white hover:border-white transition-all duration-500"
                >
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-slate-500 leading-none mb-1">Return</span>
                        <span className="text-[12px] font-bold text-white group-hover:text-slate-900 leading-none tracking-wide">Home</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white/10 group-hover:bg-slate-900 text-white flex items-center justify-center transition-all">
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                </Link>
            </div>

            {/* ══════════════════════════════════════════
                HERO SECTION - Responsive Redesign
            ══════════════════════════════════════════ */}
            
            {/* Desktop Hero Layout - Professional & Balanced */}
            <div className="hidden lg:flex relative w-full h-[85vh] min-h-[700px] items-center justify-center overflow-hidden bg-pride-mix font-sans py-12 px-8">
                <div className="relative z-10 w-full max-w-[1400px] mx-auto flex items-center gap-20 px-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                        className="w-[55%] flex flex-col items-start"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-black tracking-[0.3em] text-white/80 uppercase mb-8 shadow-sm backdrop-blur-sm">
                            {roleLabel}
                        </div>
                        <h1 className="font-serif font-bold text-white leading-[0.9] tracking-tight mb-8" style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)' }}>
                            {agent.name.split(' ')[0]}<br />
                            <span className="text-white/60 font-light italic">{agent.name.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <div className="border-l-2 border-white/20 pl-8 space-y-4 mb-10">
                            <p className="text-purple-300 font-bold tracking-[0.2em] uppercase text-[10px]">{agent.title}</p>
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light max-w-[480px]">{agent.tagline}</p>
                        </div>
                        <div className="flex flex-wrap items-start gap-x-16 gap-y-8 pt-8 border-t border-white/15 w-full">
                            {agent.stats.map((stat, idx) => (
                                <div key={idx} className="min-w-fit max-w-sm">
                                    <p className="text-xl md:text-2xl font-serif font-bold text-white mb-2 tracking-tight leading-snug">{stat.value}</p>
                                    <p className="text-[9px] uppercase font-black tracking-[0.25em] text-white/40">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-[45%] flex justify-end"
                    >
                        <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[3.5rem] p-1.5 bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl overflow-hidden group">
                             <img src={agent.image} alt={agent.name} className="w-full h-full object-cover rounded-[3rem] transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: 'center 10%' }} />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile/Tablet Compact Hero Layout */}
            <div className="lg:hidden relative bg-pride-mix pt-12 pb-12 px-6">
                <div className="flex flex-col items-center">
                    {/* Compact Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-[380px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl pb-6"
                    >
                        <div className="w-full aspect-[4/3] relative">
                            <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] font-bold text-white uppercase tracking-[0.2em] mb-2">
                                    {roleLabel}
                                </span>
                                <h1 className="text-3xl font-serif font-bold text-white leading-tight">{agent.name}</h1>
                            </div>
                        </div>
                        
                        <div className="px-6 pt-5">
                            <p className="text-gold-300 font-bold tracking-widest text-[9px] uppercase mb-5">{agent.title}</p>
                            
                            {/* Compact Stats Grid - No Scroll Needed */}
                            <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
                                {agent.stats.map((stat, idx) => (
                                    <div key={idx} className="border-l border-white/20 pl-3">
                                        <p className="text-xs uppercase tracking-widest text-white/50 font-bold mb-1">{stat.label}</p>
                                        <p className="text-sm font-serif font-bold text-white leading-tight">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {agent.instagram && (
                                <div className="mb-6 px-1">
                                    <a 
                                        href={`https://instagram.com/${agent.instagram.replace('@', '')}`} 
                                        target="_blank" 
                                        className="flex items-center gap-3 py-3 px-4 bg-white/5 rounded-2xl border border-white/10 text-white/90 hover:bg-white/10 transition-all"
                                    >
                                        <Instagram className="w-4 h-4 text-purple-400" />
                                        <span className="text-[12px] font-medium tracking-wide">{agent.instagram}</span>
                                    </a>
                                </div>
                            )}

                            <button 
                                onClick={() => openModal('schedule')}
                                className="w-full py-3.5 bg-white text-slate-900 font-bold rounded-2xl text-[13px] shadow-xl active:scale-[0.98] transition-all hover:bg-slate-50"
                            >
                                Contact {agent.name.split(' ')[0]}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                MAIN CONTENT - Mobile Tabs & Desktop Grid
            ══════════════════════════════════════════ */}
            <main className="relative pb-24">
                <div className="max-w-7xl mx-auto lg:px-16 lg:py-24">
                    
                    {/* Mobile Tab Control */}
                    <div className="lg:hidden sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3 flex gap-2 overflow-x-auto custom-scrollbar-hide">
                        {[
                            { id: 'bio', label: 'Story', icon: <User className="w-4 h-4" /> },
                            { id: 'expertise', label: 'Expertise', icon: <Briefcase className="w-4 h-4" /> },
                            { id: 'why', label: 'Attributes', icon: <Award className="w-4 h-4" /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                                    activeTab === tab.id 
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-105' 
                                    : 'bg-white text-slate-500 border border-slate-200'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="mt-8 lg:mt-0 p-6 lg:p-20 bg-white shadow-sm lg:rounded-[3rem] lg:border lg:border-slate-100">
                        {/* Mobile Tab Content */}
                        <div className="lg:hidden">
                            <AnimatePresence mode="wait">
                                {activeTab === 'bio' && (
                                    <motion.div key="bio" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">About {agent.name.split(' ')[0]}</h3>
                                        <div className="space-y-5 text-slate-600 leading-relaxed text-[15px]">
                                            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                                        </div>
                                        {agent.instagram && (
                                            <div className="mt-10 pt-6 border-t border-slate-100">
                                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4">Instagram</p>
                                                <a href={`https://instagram.com/${agent.instagram.replace('@', '')}`} target="_blank" className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                                                        <Instagram className="w-4 h-4 text-pink-600" />
                                                    </div>
                                                    {agent.instagram}
                                                </a>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                                {activeTab === 'expertise' && (
                                    <motion.div key="expertise" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-4">Credentials</h3>
                                            <div className="space-y-3">
                                                {agent.credentials.map((c, i) => (
                                                    <div key={i} className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />{c.label}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-4">Specialties</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {agent.specialties.map((s, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {activeTab === 'why' && (
                                    <motion.div key="why" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">Why {agent.name.split(' ')[0]}?</h3>
                                        <div className="grid gap-3">
                                            {agent.whyWorkWithMe.map((p, i) => (
                                                <div key={i} className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50 text-sm text-slate-700 font-medium flex gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                                                    {p}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Desktop Layout (Standard Grid) */}
                        <div className="hidden lg:grid grid-cols-12 gap-20">
                            <aside className="col-span-4 space-y-12">
                                <div>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-6">Credentials</p>
                                    <div className="space-y-4">
                                        {agent.credentials.map((c, i) => (
                                            <div key={i} className="flex gap-3 text-sm text-slate-600 font-light leading-snug">
                                                <div className="w-1 h-1 rounded-full bg-purple-400 mt-2 shrink-0" />
                                                {c.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {agent.instagram && (
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-4">Instagram</p>
                                        <a href={`https://instagram.com/${agent.instagram.replace('@', '')}`} target="_blank" className="flex items-center gap-3 text-slate-600 hover:text-purple-600 transition-colors">
                                            <Instagram className="w-5 h-5" />
                                            <span className="text-sm font-light">{agent.instagram}</span>
                                        </a>
                                    </div>
                                )}
                                <div>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-6">Specialties</p>
                                    <div className="flex flex-wrap gap-2">
                                        {agent.specialties.map((s, i) => <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600">{s}</span>)}
                                    </div>
                                </div>
                            </aside>
                            <div className="col-span-8 space-y-16">
                                <section>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-8">About</p>
                                    <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-light">
                                        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                                    </div>
                                </section>
                                 <section>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-8">Why Work With Me</p>
                                    <div className="grid grid-cols-2 gap-4 mb-10">
                                        {agent.whyWorkWithMe.map((p, i) => (
                                            <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 leading-relaxed flex gap-3">
                                                 <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                                                 {p}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Final Bottom Contact CTA */}
                                    <div className="flex justify-center pt-6">
                                        <button 
                                            onClick={() => openModal('schedule')}
                                            className="group relative flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(124,58,237,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(124,58,237,0.5)] hover:-translate-y-1 transition-all active:scale-95 duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            <Send className="w-4 h-4" />
                                            Connect with {agent.name.split(' ')[0]}
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <ScrollToTop />

            {modal.open && (
                <ContactModal
                    agentName={agent.name}
                    agentId={agent.id}
                    agentTitle={agent.title}
                    defaultMethod={modal.method}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default RealtorProfile;
