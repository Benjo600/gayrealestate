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

interface Review {
    text: string;
    author: string;
    location: string;
}

const arekReviews: Review[] = [
    {
        text: "A true advocate — I knew he was on my side through the whole process. Extraordinary polite, patient, and an incredible realtor.",
        author: "Dylan S.",
        location: "New Haven, CT"
    },
    {
        text: "Kind, attentive, and always working for our needs in the sale of our property.",
        author: "Paige G.",
        location: "Hamden, CT"
    },
    {
        text: "Professional, efficient, and enjoyable to work with. He turned what could have been stressful into something fulfilling and positive.",
        author: "Jack Z.",
        location: "Wethersfield, CT"
    },
    {
        text: "As first-time homeowners, Arek was a wealth of knowledge. He navigated us through showings, mortgage approvals, and inspections seamlessly.",
        author: "Thomas N.",
        location: "Glastonbury, CT"
    },
    {
        text: "If you want to sell, contact Arek — he will do everything possible to promote and sell your home. Terrific person to work with.",
        author: "Janet & David J.",
        location: "Kensington, CT"
    },
    {
        text: "An excellent communicator and advocate. He put in extra hours to find me the perfect place — even my attorney commented on how amazing he was.",
        author: "Erin S.",
        location: "New Britain, CT"
    },
    {
        text: "Especially helpful with answering questions and making the home-buying process as user-friendly as possible.",
        author: "Evan B.",
        location: "Berlin, CT"
    },
    {
        text: "I really don't care what agency I use as long as Arek is my agent.",
        author: "Monique L.",
        location: "Cromwell, CT"
    },
    {
        text: "Amazing! Very calm and understands the market.",
        author: "Izabela K.",
        location: "Cromwell, CT"
    }
];

const jakeReviews: Review[] = [
    {
        text: "Answers the phone EVERY time I call, immense knowledge, and always steers me in the right direction. This is my second time working with him.",
        author: "Charles I.",
        location: "Hartford, CT"
    },
    {
        text: "Mortgage commitment completed weeks early. Very seamless process. This is my 3rd mortgage with Jake and I will continue to use him.",
        author: "Thomas L.",
        location: "West Hartford, CT"
    },
    {
        text: "For anyone looking for an honest, engaged, and customer-oriented lender — look no further than Jake Earl. He explained every detail.",
        author: "Rohan",
        location: "Hartford, CT"
    },
    {
        text: "Responsive to texts, calls, and emails even on weekends. He knows his job well, goes above and beyond.",
        author: "First-Time Buyer",
        location: "New Britain, CT"
    }
];

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

const AgentReviewSection: React.FC<AgentSectionProps> = ({ name, title, image, reviews, stats, reversed }) => {
    return (
        <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Reviews Book - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <BookTestimonial 
                        agentImage={image}
                        agentName={name}
                        testimonials={reviews.map(r => ({
                            name: r.author,
                            text: r.text,
                            jobtitle: r.location || "Verified Client",
                            rating: 5,
                            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author)}&background=random&color=fff`
                        }))} 
                    />
                </motion.div>
            </div>
        </section>
    );
};

/* ──────────────────────────────────────────────
   MAIN REVIEWS PAGE
   ────────────────────────────────────────────── */

const Reviews: React.FC = () => {
    return (
        <div className="h-auto bg-champagne-50 font-sans relative selection:bg-brand-500/20">
            <SEOHead
                title="Reviews | GayRealEstate.com"
                description="Client testimonials for our real estate professionals."
                canonical="https://www.gayrealestateconnecticut.com/reviews"
                ogType="website"
            />
            <Header />
            <main className="relative z-10">
                {/* Hero */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-900 via-charcoal-900 to-slate-800 overflow-hidden text-center">
                    <div className="max-w-5xl mx-auto px-4 relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
                                <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                                <span className="text-xs font-semibold text-gold-300 uppercase">5-Star Reviews</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                                Trusted by <span className="text-gold-400">Clients</span> Across Connecticut
                            </h1>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-6 md:gap-12">
                            {[
                                { icon: Star, value: "5.0", label: "Rating" },
                                { icon: Users, value: "250+", label: "Clients" },
                                { icon: ThumbsUp, value: "100%", label: "Recommend" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <stat.icon className="w-4 h-4 text-gold-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
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
                    <div className="flex-1 h-px bg-slate-200" />
                    <div className="w-2 h-2 rounded-full bg-gold-400/40" />
                    <div className="flex-1 h-px bg-slate-200" />
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
                <Footer />
            </main>
        </div>
    );
};

export default Reviews;
