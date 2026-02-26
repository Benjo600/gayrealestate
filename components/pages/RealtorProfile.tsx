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
    X,
    Send,
    CheckCircle2,
    Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { agents } from '../../data/agents';

const BASE_URL = 'https://www.gayrealestateconnecticut.com';

// Contact Modal extracted to components/ui/ContactModal.tsx

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

    // Build SEO data for the agent
    const agentSEOData = useMemo(() => {
        if (!agent) return null;
        const roleLabel = agent.role === 'agent' ? 'Realtor' : agent.role === 'lender' ? 'Mortgage Banker' : 'Attorney';
        const pageTitle = `${agent.name} — ${agent.title} | GayRealEstate.com`;
        const pageDescription = `${agent.name} is a ${roleLabel} at GayRealEstate.com. ${agent.tagline} ${agent.specialties.slice(0, 3).join(', ')}.`;
        const canonicalUrl = `${BASE_URL}/agent/${agent.id}`;
        const imageUrl = agent.image.startsWith('http') ? agent.image : `${BASE_URL}${agent.image}`;

        const structuredData = [
            // Person schema
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
                    name: 'GayRealEstate.com',
                    url: BASE_URL,
                },
                knowsAbout: agent.specialties,
                hasCredential: agent.credentials.map((cred) => ({
                    '@type': 'EducationalOccupationalCredential',
                    credentialCategory: cred.type,
                    name: cred.label,
                })),
            },
            // BreadcrumbList
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
        <div className="min-h-screen bg-[#0f0f0f] font-sans overflow-x-hidden">

            {/* Dynamic Agent SEO */}
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

            {/* ── Back Button ── */}
            <motion.nav
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
                aria-label="Back navigation"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back
                </Link>
            </motion.nav>

            {/* ══════════════════════════════════════════
                HERO — Split panel: dark left / photo right
                Mobile: photo top / content bottom
            ══════════════════════════════════════════ */}
            <div className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0a0a0a]">

                {/* ── RIGHT / TOP: Photo column ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    className="relative w-full lg:w-[55%] xl:w-[58%] h-[50vh] md:h-[60vh] lg:h-auto lg:max-h-none order-1 lg:order-2 flex-shrink-0"
                >
                    <img
                        src={agent.image}
                        alt={`${agent.name} — ${agent.title} at GayRealEstate.com`}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: '50% 8%' }}
                    />

                    {/* Fade to dark — bottom on mobile, left on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent lg:hidden" />
                    <div className="absolute inset-0 hidden lg:block"
                        style={{ background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.35) 30%, transparent 70%)' }}
                    />
                    {/* Subtle dark vignette on outer edges */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
                </motion.div>

                {/* ── LEFT / BOTTOM: Content panel ── */}
                <div className="relative z-10 flex flex-col justify-center w-full lg:w-[45%] xl:w-[42%] px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 pt-8 pb-10 lg:py-24 order-2 lg:order-1 flex-shrink-0">

                    {/* Subtle warm glow accent */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Role pill */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[10px] font-bold tracking-[0.32em] text-white/30 uppercase mb-6 block"
                    >
                        {roleLabel}
                    </motion.span>

                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                        <h1
                            className="font-serif font-bold text-white leading-[0.88] tracking-tight mb-6"
                            style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)' }}
                        >
                            {agent.name.split(' ')[0]}
                            <br />
                            <span className="text-white/45">
                                {agent.name.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>

                        {/* Gold rule */}
                        <div className="w-12 h-[2px] bg-gradient-to-r from-amber-400 to-amber-400/0 mb-5" />

                        {/* Title */}
                        <p className="text-amber-400/80 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                            {agent.title}
                        </p>

                        {/* Tagline */}
                        <p className="text-white/75 text-sm leading-relaxed font-light max-w-[340px] mb-10">
                            {agent.tagline}
                        </p>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        className="grid grid-cols-3 gap-0 border-t border-white/8 pt-8 mb-10"
                    >
                        {agent.stats.map((stat, idx) => (
                            <div key={idx} className={idx > 0 ? "pl-5 border-l border-white/8" : ""}>
                                <p className="text-lg md:text-xl font-serif font-bold text-white mb-0.5">{stat.value}</p>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-medium leading-tight">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll cue */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="hidden lg:flex items-center gap-3"
                    >
                        <div className="w-px h-8 bg-white/12" />
                        <span className="text-[9px] tracking-[0.28em] text-white/22 uppercase">Scroll</span>
                    </motion.div>
                </div>
            </div>


            {/* ══════════════════════════════════════════
                CONTENT — Light section below hero
            ══════════════════════════════════════════ */}
            <main className="bg-white">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 py-12 md:py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* ── Left Sidebar: Contact + Credentials + Specialties ── */}
                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-4 space-y-10"
                        >
                            <div className="h-px bg-slate-100" />

                            {/* Credentials */}
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-5">Credentials</p>
                                <div className="space-y-3.5">
                                    {agent.credentials.map((cred, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-[7px] w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                                            <span className="text-sm text-slate-600 leading-snug">{cred.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Specialties */}
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold mb-5">Specialties</p>
                                <div className="flex flex-wrap gap-2">
                                    {agent.specialties.map((spec, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.aside>

                        {/* ── Right: Bio + Why Work With Me + CTA ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-8 space-y-14"
                        >
                            {/* Bio */}
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
                                        className="lg:hidden mt-6 flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
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

                            {/* Why Work With Me */}
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
                                            className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center flex-shrink-0 text-[11px] font-bold">
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Ready to get started?</h3>
                                    <p className="text-slate-400 text-sm">Let's discuss your real estate goals today.</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => openModal('schedule')}
                                    className="flex items-center gap-3 px-8 py-4 bg-[#0f0f0f] text-white font-semibold rounded-2xl hover:bg-slate-800 transition-colors duration-300 text-sm tracking-wide whitespace-nowrap"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Schedule a Call
                                </motion.button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>

            <Footer />
            <ScrollToTop />

            {/* Contact Modal */}
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
