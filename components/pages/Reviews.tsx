import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Users, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { BookTestimonial } from '../ui/3d-book-testimonial';

/* ──────────────────────────────────────────────
   CONDENSED REVIEW DATA
   ────────────────────────────────────────────── */

import { arekReviews, jakeReviews, abbyReviews, carolynReviews, Review } from '../../data/reviews';


/* ──────────────────────────────────────────────
   AGENT SECTION COMPONENT
   ────────────────────────────────────────────── */

interface AgentSectionProps {
    name: string;
    title: string;
    image: string;
    reviews: Review[];
    stats: { label: string; value: string }[];
    reversed?: boolean;
}

const ReviewCard = ({ review, idx }: { review: Review, idx: number, key?: any }) => {
    // Add useState dynamically (need React import if not destructured)
    const [expanded, setExpanded] = React.useState(false);
    const isLong = review.text.length > 180;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all relative group flex flex-col h-full"
        >
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11L8 15H11V19H5V15L7 11V7H11V11H10ZM20 11L18 15H21V19H15V15L17 11V7H21V11H20Z" fill="#770088"/>
                </svg>
            </div>
            
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
            </div>
            
            {/* Removed italic, kept regular text for readability */}
            <div className="text-slate-700 text-[15px] leading-relaxed mb-8 flex-grow">
                {expanded || !isLong ? review.text : review.text.substring(0, 180).trim() + '... '}
                {isLong && (
                    <button 
                        onClick={() => setExpanded(!expanded)} 
                        className="mt-2 font-semibold text-sm hover:opacity-80 transition-opacity block"
                        style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                    >
                        {expanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
                <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white"
                    style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                >
                    {review.author.charAt(0)}
                </div>
                <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">{review.author}</h4>
                    <p className="text-xs text-slate-500 font-medium">{review.location || 'Verified Client'}</p>
                </div>
            </div>
        </motion.div>
    );
};

const AgentReviewSection: React.FC<AgentSectionProps> = ({ name, title, image, reviews, stats, reversed }) => {
    return (
        <section className={`py-16 md:py-24 ${reversed ? 'bg-white/40' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start ${reversed ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Agent Profile Column (Sticky) */}
                    <div className="w-full lg:w-1/3 flex-shrink-0 lg:sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-purple-100/50 flex flex-col items-center"
                        >
                            <div 
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden p-[3px] shadow-xl mb-6 relative"
                                style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)' }}
                            >
                                <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative bg-white">
                                    <img src={image} alt={name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-display font-bold text-slate-900 mb-2 text-center">{name}</h2>
                            <p 
                                className="font-medium text-sm text-center mb-6 px-4 py-1.5 bg-purple-50 rounded-full"
                                style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                            >
                                {title}
                            </p>
                            
                            <div className="w-full border-t border-slate-100 pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="text-center">
                                            <p className="text-xl font-display font-bold text-slate-900">{stat.value.split('·')[0]}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="w-full lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                            {reviews.map((review, idx) => (
                                <ReviewCard key={idx} review={review} idx={idx} />
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

/* ──────────────────────────────────────────────
   MAIN REVIEWS PAGE
   ────────────────────────────────────────────── */

const Reviews: React.FC = () => {
    return (
        <div 
            className="h-auto font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Reviews | GayRealEstateCT.net"
                description="Client testimonials for our real estate professionals."
                canonical="https://www.gayrealestatect.net/reviews"
                ogType="website"
            />
            <Header />
            <main className="relative z-10">
                {/* Hero */}
                <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.07),transparent_55%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.07),transparent_50%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(119,0,136,0.06),transparent_55%)] pointer-events-none" />

                    <div className="max-w-5xl mx-auto px-4 relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-8">
                                <Star className="w-4 h-4 text-purple-500 fill-purple-400" />
                                <span className="text-xs font-semibold text-slate-600 uppercase">5-Star Reviews</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6">
                                Trusted by <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Clients</span> Across Connecticut
                            </h1>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-6 md:gap-12">
                            {[
                                { icon: Star, value: "5.0", label: "Rating" },
                                { icon: Users, value: "250+", label: "Clients" },
                                { icon: ThumbsUp, value: "100%", label: "Recommend" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center" style={{ background: 'rgba(119,0,136,0.08)', borderColor: 'rgba(119,0,136,0.18)' }}>
                                        <stat.icon className="w-4 h-4" style={{ color: '#6B008A' }} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-display font-bold text-slate-900">{stat.value}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </section>

                <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-600 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <AgentReviewSection
                    name="Arek Wtulich"
                    title="CT Realtor | William Raveis"
                    image="/images/Arek_Alt_1.jpg"
                    stats={[
                        { label: "Since", value: "2020" },
                        { label: "Locations", value: "Hartford · Middlesex · New Haven" },
                    ]}
                    reviews={arekReviews}
                />

                <div className="max-w-xs mx-auto flex items-center gap-4 px-4">
                    <div className="flex-1 h-px bg-purple-100" />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }} />
                    <div className="flex-1 h-px bg-purple-100" />
                </div>

                <AgentReviewSection
                    name="Jake Earl"
                    title="Senior Vice President | Total Mortgage"
                    image="/images/jake.jpg?v=2"
                    stats={[
                        { label: "Since", value: "2010" },
                        { label: "License", value: "CT · MA · FL · TX · CA" },
                    ]}
                    reviews={jakeReviews}
                    reversed
                />

                <div className="max-w-xs mx-auto flex items-center gap-4 px-4">
                    <div className="flex-1 h-px bg-purple-100" />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }} />
                    <div className="flex-1 h-px bg-purple-100" />
                </div>

                <AgentReviewSection
                    name="Abby Dudarewicz"
                    title="CT Realtor | SERHANT. CT"
                    image="/images/abby.png"
                    stats={[
                        { label: "Since", value: "2022" },
                        { label: "Locations", value: "Hartford · Middlesex" },
                    ]}
                    reviews={abbyReviews}
                />

                <div className="max-w-xs mx-auto flex items-center gap-4 px-4">
                    <div className="flex-1 h-px bg-purple-100" />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }} />
                    <div className="flex-1 h-px bg-purple-100" />
                </div>

                <AgentReviewSection
                    name="Carolyn Futtner"
                    title="Real Estate Attorney | MPF Law"
                    image="/Carolyn+Futtner-1920w.webp"
                    stats={[
                        { label: "Since", value: "2005" },
                        { label: "Locations", value: "Connecticut" },
                    ]}
                    reviews={carolynReviews}
                    reversed
                />
                <Footer />
            </main>
        </div>
    );
};

export default Reviews;
