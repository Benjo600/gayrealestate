import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Shield, Users, Home, Award, Instagram } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { agents } from '../../data/agents';

const values = [
    {
        icon: Heart,
        title: 'Community First',
        desc: 'We are members of the community we serve — not just allies.',
    },
    {
        icon: Shield,
        title: 'Complete Representation',
        desc: 'Your interests come first — always. Full advocacy.',
    },
    {
        icon: Users,
        title: 'Professional Network',
        desc: 'Top 1% mortgage lenders and specialized title attorneys.',
    },
    {
        icon: Home,
        title: 'Hyperlocal Knowledge',
        desc: 'We know which neighborhoods are experiencing growth.',
    },
];

const AboutUs: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const teamList = Object.values(agents);

    return (
        <div className="min-h-screen selection:bg-purple-500/10" style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}>
            <SEOHead
                title="About GayRealEstateCT.net | LGBTQ+ Real Estate"
                description="Learn about our mission to help the LGBTQ+ community find homes where they truly belong in Connecticut."
                canonical="https://www.gayrealestatect.net/about"
            />

            <nav className="absolute top-0 left-0 right-0 p-4 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-wider text-slate-700 shadow-sm">
                        <ArrowLeft className="w-3.5 h-3.5" /> Home
                    </Link>
                </div>
            </nav>

            <header className="relative pt-24 md:pt-40 pb-12 md:pb-40 overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.07),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.07),transparent_50%)]" />

                <div className="max-w-7xl mx-auto px-5 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-4">
                        <Heart className="w-3 h-3 text-purple-500" />
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Our Mission</span>
                    </div>
                    <h1 className="text-3xl md:text-8xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                        We Help Our Community<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Find Where They Belong.</span>
                    </h1>
                    <p className="text-slate-600 text-[13px] md:text-2xl max-w-3xl mx-auto leading-relaxed">
                        GayRealEstateCT.net connects the LGBTQ+ community with trusted, inclusive real estate professionals across Connecticut.
                    </p>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-12 md:py-32 text-center">
                <p className="text-sm md:text-4xl text-slate-700 leading-relaxed font-light">
                    A home is more than a financial asset. For LGBTQ+ buyers, finding a home where you'll truly be welcome requires insight that goes beyond square footage. <span className="text-brand-600 font-semibold md:block mt-2">That's the insight we provide.</span>
                </p>
            </section>

            <section className="py-12 md:py-20 bg-slate-50/40">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900">What We Stand For</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-md" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xs md:text-xl font-bold text-slate-900 mb-1.5">{v.title}</h3>
                                    <p className="text-slate-500 leading-tight text-[10px] md:text-sm">{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="team" className="py-12 md:py-24 max-w-7xl mx-auto px-4 overflow-hidden">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 mb-2">Meet Our Team</h2>
                    <p className="text-slate-500 text-[11px] md:text-lg">Specialized experts working for you across CT.</p>
                </div>
                
                <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto pb-4 md:pb-0 snap-x no-scrollbar ml-[-1rem] mr-[-1rem] px-4 md:px-0">
                    {teamList.map((agent) => (
                        <Link
                            key={agent.id}
                            to={`/agent/${agent.id}`}
                            className="flex-shrink-0 w-[240px] md:w-auto snap-center bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
                        >
                            <div className="relative h-44 md:h-64 overflow-hidden">
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-4 text-left">
                                    <p className="text-white font-bold text-md leading-tight">{agent.name}</p>
                                    <p className="text-white/60 text-[9px] uppercase font-black tracking-widest">{agent.title.split(' ')[0]}</p>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] uppercase font-black text-brand-600">Profile</span>
                                    {agent.instagram && (
                                        <div 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(`https://instagram.com/${agent.instagram!.replace('@', '')}`, '_blank');
                                            }}
                                            className="p-1.5 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-pink-600 hover:border-pink-200 transition-all"
                                        >
                                            <Instagram className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="py-12 md:py-20 bg-slate-900 text-white rounded-t-[3rem] mt-8">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Find Your Home?</h2>
                    <p className="text-slate-400 text-sm md:text-lg mb-8 max-w-md mx-auto">Our specialized team is ready to guide you home.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="/#contact" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-lg active:scale-95 transition-all text-sm">
                            Get in Touch
                        </a>
                        <Link to="/reviews" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm text-center">
                            Client Reviews
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
