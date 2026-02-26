import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Shield, Users, Home, Star, Award } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { agents } from '../../data/agents';

const values = [
    {
        icon: Heart,
        title: 'Community First',
        desc: 'We are members of the community we serve — not just allies. Our team includes LGBTQ+ agents who have navigated these markets personally and bring that lived experience to every transaction.',
    },
    {
        icon: Shield,
        title: 'Complete Representation',
        desc: 'We believe in full buyer and seller representation. Your interests come first — always. We will never represent both sides of a transaction, and we will never pressure you toward a deal that isn\'t right for you.',
    },
    {
        icon: Users,
        title: 'Professional Network',
        desc: 'Beyond our agents, our team includes a Top 1% mortgage lender and a real estate attorney who specializes in LGBTQ+ estate planning and title — a truly complete real estate service.',
    },
    {
        icon: Home,
        title: 'Hyperlocal Knowledge',
        desc: 'Connecticut real estate is intensely local. We know which streets get sun, which neighborhoods are experiencing value growth, and which school principals show up at Pride. That\'s the knowledge that matters.',
    },
];

const milestones = [
    { year: '1999', event: 'GayRealEstate.com founded — one of the first LGBTQ+-focused real estate networks in the US' },
    { year: '2008', event: 'Connecticut legalizes same-sex marriage — we help LGBTQ+ families put down roots across the state' },
    { year: '2015', event: 'Marriage Equality Act passes nationally — our network expands to serve all 50 states' },
    { year: '2020', event: 'Connecticut team expands with Abby Dudarewicz, Travis Lipinski, Jake Earl, and Carolyn Futtner joining' },
    { year: '2021', event: 'Connecticut LGBTQ+ Equity Act signed — affirming LGBTQ+ inclusion in CT public schools' },
    { year: '2023', event: 'Arek Wtulich co-founds the Connecticut Chapter of the LGBTQ+ Real Estate Alliance' },
    { year: '2025', event: 'Over 250 LGBTQ+ families helped find their home in Connecticut. The mission continues.' },
];

const AboutUs: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const teamList = Object.values(agents);

    return (
        <div className="min-h-screen bg-slate-50">
            <SEOHead
                title="About GayRealEstate.com | LGBTQ+ Real Estate in Connecticut"
                description="Learn about GayRealEstate.com — our history, our team, and our mission to help the LGBTQ+ community find homes where they truly belong in Connecticut."
                canonical="https://www.gayrealestateconnecticut.com/about"
                keywords="about GayRealEstate.com, LGBTQ real estate Connecticut team, gay friendly realtor Connecticut, LGBTQ+ real estate alliance Connecticut"
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
            <header className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pt-24 md:pt-32 pb-16 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,58,237,0.2),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.12),transparent_60%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-white/10 rounded-full border border-white/10 mb-6 md:mb-8">
                        <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" />
                        <span className="text-[10px] md:text-xs font-bold text-gold-300 uppercase tracking-widest">Our Story</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                        We Help Our Community<br />
                        <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-gold-300 bg-clip-text text-transparent">Find Where They Belong.</span>
                    </h1>
                    <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        For over 25 years, GayRealEstate.com has connected the LGBTQ+ community with trusted, inclusive real estate professionals who understand the unique dimensions of buying and selling a home as a queer person or couple.
                    </p>
                </div>
                {/* Decorative rainbow accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500" />
            </header>

            {/* Mission */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
                <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-light max-w-3xl mx-auto">
                    A home is more than a financial asset. It's where you wake up every morning, where you host the people you love, where your children grow up. For LGBTQ+ buyers, finding a home where you'll truly be welcome — not just legally protected — requires insight that goes beyond square footage and school ratings.
                </p>
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light max-w-3xl mx-auto mt-6">
                    <span className="text-brand-600 font-semibold">That's the insight we provide.</span>
                </p>
            </section>

            {/* Values */}
            <section className="bg-white py-12 md:py-20">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">What We Stand For</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <div key={i} className="flex gap-4 md:gap-6 p-6 md:p-8 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-500/20">
                                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-[13px] md:text-sm">{v.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">Meet Our Connecticut Team</h2>
                    <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto">Agents, a lender, and an attorney — all under one roof, all working for you.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {teamList.map((agent) => (
                        <Link
                            key={agent.id}
                            to={`/agent/${agent.id}`}
                            className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:border-brand-300 hover:shadow-xl transition-all duration-500"
                        >
                            <div className="relative h-56 md:h-64 overflow-hidden bg-slate-200">
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-left">
                                    <p className="text-white font-bold text-xl font-serif">{agent.name}</p>
                                    <p className="text-slate-300 text-sm">{agent.title}</p>
                                </div>
                            </div>
                            <div className="p-5 md:p-6 text-left">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {agent.credentials.slice(0, 2).map((c, i) => (
                                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 text-brand-700 text-xs rounded-full font-medium border border-brand-100">
                                            {c.type === 'award' && <Award className="w-3 h-3" />}
                                            {c.label}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm group-hover:text-brand-700 transition-colors">
                                    View Profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* History Timeline */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">Our History</h2>
                        <p className="text-slate-600 text-sm md:text-lg">25+ years at the intersection of real estate and LGBTQ+ advocacy.</p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-gold-400 to-brand-500" />
                        <div className="space-y-6 md:space-y-8 pl-14 md:pl-16">
                            {milestones.map((m, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-9 md:-left-10 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 border-2 border-white shadow-md" />
                                    <p className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">{m.year}</p>
                                    <p className="text-[13px] md:text-base text-slate-700 leading-relaxed">{m.event}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
                    <div className="flex justify-center gap-1 text-gold-400 text-lg md:text-xl mb-4 md:mb-6 mt-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-gold-400" />)}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 md:mb-4">Ready to Work Together?</h2>
                    <p className="text-slate-300 text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto px-4">Let's talk. No pressure, no commitment. Just real people who care about helping you find your home.</p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <a href="/#contact" className="px-8 py-3.5 md:px-10 md:py-4 bg-gradient-to-r from-brand-500 to-gold-500 text-white font-bold rounded-xl md:rounded-2xl shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base">
                            Get in Touch <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                        <Link to="/#find-agent" className="px-8 py-3.5 md:px-10 md:py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl md:rounded-2xl hover:bg-white/20 transition-all text-sm md:text-base justify-center flex">
                            Meet the Agents
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
