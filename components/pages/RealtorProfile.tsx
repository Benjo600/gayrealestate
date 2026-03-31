import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Footer from '../Footer';
import { ScrollToTop } from '../ui/scroll-to-top';
import { ContactModal } from '../ui/ContactModal';
import SEOHead from '../SEOHead';
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    X,
    Send,
    CheckCircle2,
    Calendar,
    Instagram,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { agents } from '../../data/agents';

const BASE_URL = 'https://www.gayrealestateconnecticut.com';

const RealtorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const agentKey = id?.toLowerCase();
    const agent = agentKey && agents[agentKey] ? agents[agentKey] : undefined;
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const [modal, setModal] = useState<{ open: boolean; method: 'call' | 'email' | 'schedule' }>({
        open: false,
        method: 'call',
    });

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
                        item: `${BASE_URL}/#find-agent`,
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
        <div className="min-h-screen bg-black font-sans overflow-x-hidden">

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

            {/* Premium Floating Back Button */}
            <div className="fixed top-8 left-8 z-[60] hidden md:block">
                <Link 
                    to="/" 
                    className="group flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:shadow-glow transition-all duration-300"
                >
                    <div className="w-8 h-8 rounded-xl bg-white text-slate-900 flex items-center justify-center transition-transform group-hover:-translate-x-1">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 leading-none mb-1">Return</span>
                        <span className="text-sm font-bold text-white leading-none">Home</span>
                    </div>
                </Link>
            </div>

            {/* ══════════════════════════════════════════
                HERO — Beautiful Light Premium Split
            ══════════════════════════════════════════ */}
            <div className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-28 pb-16 px-5 sm:px-8 lg:px-16 bg-pride-mix">

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* ── LEFT: Content ── */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                        className="w-full lg:w-[55%] flex flex-col items-start text-left"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold tracking-[0.25em] text-white uppercase mb-8 shadow-sm backdrop-blur-sm"
                        >
                            {roleLabel}
                        </motion.span>

                        <h1
                            className="font-serif font-bold text-white leading-[0.95] tracking-tight mb-8 drop-shadow-md"
                            style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}
                        >
                            {agent.name.split(' ')[0]}
                            <br />
                            <span className="text-white/80">
                                {agent.name.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>

                        <p className="text-gold-300 font-bold tracking-[0.15em] uppercase text-[11px] mb-4 drop-shadow-md">
                            {agent.title}
                        </p>

                        <p className="text-white/90 text-[15px] md:text-lg leading-relaxed font-light mb-8 max-w-[480px]">
                            {agent.tagline}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8 pt-6 border-t border-white/20 w-full max-w-[600px]">
                            {agent.stats.map((stat, idx) => {
                                const isAreas = stat.label.toLowerCase().includes('area');
                                return (
                                    <div key={idx} className={`${isAreas ? 'flex-[2]' : 'flex-1'} min-w-0`}>
                                        <p className="text-xl sm:text-2xl font-serif font-bold text-white mb-1 tracking-tight leading-snug break-words">
                                            {stat.value}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold mt-1">
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Framed Photo ── */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                        className="w-full lg:w-[45%] flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[420px] lg:max-w-[460px] aspect-[4/5] rounded-[2.5rem] p-2 bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                                <img
                                    src={agent.image}
                                    alt={`${agent.name} — ${agent.title} at GayRealEstateCT.net`}
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: 'center 10%' }}
                                />
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] rounded-[2rem] pointer-events-none" />
                            </div>
                            
                        </div>
                    </motion.div>

                </div>
            </div>

            <main 
                className="relative overflow-hidden selection:bg-purple-500/30"
                style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
            >
                {/* Decorative radial washes */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.03),transparent_55%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.03),transparent_50%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 py-12 md:py-20 lg:py-24 relative z-10">
                    <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-14 lg:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-4 space-y-10"
                        >
                            <div className="h-px bg-slate-100" />

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-5">Credentials</p>
                                <div className="space-y-3.5">
                                    {agent.credentials.map((cred, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                                            <span className="text-sm text-slate-600 leading-snug">{cred.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {agent.instagram && (
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-3">Follow {agent.name.split(' ')[0]} on Instagram</p>
                                    <a
                                        href={`https://instagram.com/${agent.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 group"
                                    >
                                        <Instagram className="w-5 h-5 text-slate-400 group-hover:text-[#ee2a7b] transition-colors duration-300" />
                                        <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors duration-300 font-light">{agent.instagram}</span>
                                    </a>
                                </div>
                            )}

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-5">Specialties</p>
                                <div className="flex flex-wrap gap-2">
                                    {agent.specialties.map((spec, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:border-brand-400/50 hover:bg-brand-50/50 transition-all duration-300"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {(agent.nmls || agent.branchAddress || agent.bookingLink) && (
                                <div className="space-y-6 pt-10">
                                    <div className="h-px bg-slate-100" />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-5">Professional Details</p>
                                        <div className="space-y-4">
                                            {agent.nmls && (
                                                <div className="text-[13px] text-slate-600">
                                                    <span className="font-semibold text-slate-800">NMLS:</span> {agent.nmls}
                                                </div>
                                            )}
                                            {agent.branchAddress && (
                                                <div className="text-[13px] text-slate-600">
                                                    <span className="font-semibold text-slate-800 flex mb-1">Branch:</span>
                                                    <div className="leading-relaxed">{agent.branchAddress}</div>
                                                </div>
                                            )}
                                            {agent.branchNmls && (
                                                <div className="text-[13px] text-slate-600">
                                                    <span className="font-semibold text-slate-800">Branch NMLS:</span> {agent.branchNmls}
                                                </div>
                                            )}
                                            {agent.bookingLink && (
                                                <div className="pt-2">
                                                    <a href={agent.bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:text-brand-800 transition-colors group">
                                                        Visit Total Mortgage <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.aside>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-8 space-y-14"
                        >
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-8">About</p>
                                <div className="space-y-7">
                                    {paragraphs.map((para, idx) => (
                                        <div
                                            key={idx}
                                            className={!isBioExpanded && idx > 1 ? 'hidden lg:block' : ''}
                                        >
                                            <p className="text-slate-700 text-lg leading-[1.85] font-light">
                                                {para}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {paragraphs.length > 2 && (
                                    <button
                                        onClick={() => setIsBioExpanded(!isBioExpanded)}
                                        className="lg:hidden mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                                    >
                                        {isBioExpanded ? (
                                            <>Show Less <ChevronUp className="w-4 h-4" /></>
                                        ) : (
                                            <>Read More <ChevronDown className="w-4 h-4" /></>
                                        )}
                                    </button>
                                )}
                            </div>

                            <div className="h-px bg-slate-100" />

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-8">
                                    Why Work With {agent.name.split(' ')[0]}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {agent.whyWorkWithMe.map((point, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.08 }}
                                            className="flex items-start gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-purple-100/40 hover:bg-white/80 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div 
                                                className="w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 text-[12px] font-bold shadow-sm"
                                                style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                                            >
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm text-slate-700 leading-relaxed pt-1.5">{point}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Ready to get started?</h3>
                                    <p className="text-slate-400 text-sm">Let's discuss your real estate goals today.</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => openModal('schedule')}
                                    className="flex items-center gap-3 px-8 py-4 text-white font-bold rounded-2xl transition-all duration-300 text-sm tracking-wide whitespace-nowrap shadow-xl hover:-translate-y-0.5"
                                    style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                                >
                                    <Calendar className="w-4 h-4" />
                                    Schedule a Call
                                </motion.button>
                            </div>

                            <div className="h-px bg-slate-100" />

                        </motion.div>
                    </div>
                </div>
                </div>
            </main>

            <Footer />
            <ScrollToTop />

            {modal.open && (
                <ContactModal
                    agentName={agent.name}
                    agentTitle={agent.title}
                    defaultMethod={modal.method}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default RealtorProfile;
