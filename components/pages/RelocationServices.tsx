import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Truck, Users, CheckCircle, Star, Phone, Heart } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const services = [
    {
        icon: MapPin,
        title: 'Neighborhood Matching',
        description: `We don't just find you a house — we find you a community. Based on your lifestyle, family structure, commute needs, and what "home" means to you, we'll match you with the right Connecticut town.`,
        items: ['In-depth lifestyle consultation', 'LGBTQ+ community culture assessment', 'School district analysis for families', 'Walkability & transit scoring'],
    },
    {
        icon: Truck,
        title: 'Seamless Move Coordination',
        description: 'We connect you with a trusted network of LGBTQ+-friendly movers, attorneys, inspectors, and contractors — so every professional you work with reflects your values.',
        items: ['Vetted LGBTQ+-friendly vendors', 'Move-in timeline planning', 'Utility transfer checklists', 'Local service provider introductions'],
    },
    {
        icon: Users,
        title: 'Community Integration',
        description: 'The hardest part of moving isn\'t packing boxes — it\'s building a new social network. We make introductions to local LGBTQ+ organizations, events, and community groups from day one.',
        items: ['LGBTQ+ community group introductions', 'Local event calendar', 'Professional networking connections', 'Ongoing check-ins post-move'],
    },
    {
        icon: Heart,
        title: 'Long-Distance Support',
        description: 'Moving from NYC, Boston, or beyond? We handle virtual tours, remote offer submissions, and full closing support — you don\'t have to be in Connecticut until the day you pick up your keys.',
        items: ['Virtual showing tours with live agent', 'Remote offer & document signing', 'Third-party inspection management', 'Keys-in-hand concierge service'],
    },
];

const destinations = [
    { name: 'West Hartford', badge: 'Most Popular', desc: 'Walkable, vibrant downtown. The #1 LGBTQ+-friendly suburb in Connecticut.', price: '$380k–$800k' },
    { name: 'Glastonbury', badge: 'Best Value', desc: 'Top-rated schools, welcoming community, more affordable than West Hartford.', price: '$320k–$650k' },
    { name: 'New Haven', badge: 'Urban Energy', desc: 'Yale-anchored arts scene, strong queer community, transit access to NYC.', price: '$250k–$700k' },
    { name: 'Litchfield County', badge: 'Rural Retreat', desc: 'Privacy, land, and a longstanding LGBTQ+ second-home community.', price: '$350k–$2M+' },
    { name: 'Farmington Valley', badge: 'Family-Friendly', desc: 'Excellent schools, progressive culture, Avon/Simsbury area.', price: '$400k–$900k' },
    { name: 'Fairfield County', badge: 'NYC Commuters', desc: 'Gold coast access, 60-min train to Midtown, strong LGBTQ+ presence.', price: '$500k–$3M+' },
];

const RelocationServices: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="LGBTQ+ Relocation Services in Connecticut | GayRealEstateCT.net"
                description="Relocating to Connecticut? Our LGBTQ+-led team provides full-service relocation support — neighborhood matching, community integration, vendor introductions, and remote closing support."
                canonical="https://www.gayrealestateconnecticut.com/relocation-services"
                keywords="LGBTQ relocation Connecticut, gay couple moving to CT, relocating to Connecticut services, moving to Connecticut LGBTQ support"
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
                        <Truck className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Relocation Services</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                        Move to Connecticut.<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Arrive as a Neighbor.</span>
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        We do more than help you find a house — we help you find your community. Our LGBTQ+-led relocation service handles every detail from your first virtual tour to your first neighborhood block party.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-10">
                        <a href="/#contact" className="px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                            Start Your Relocation <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                        <a href="#destinations" className="px-8 py-4 bg-white/60 backdrop-blur-sm border border-purple-200 text-slate-700 font-semibold rounded-full hover:bg-white hover:border-purple-300 shadow-sm transition-all">
                            Explore Destinations
                        </a>
                    </div>
                </div>
            </header>

            {/* Services Grid */}
            <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">Full-Service Relocation Support</h2>
                    <p className="text-slate-600 text-[13px] md:text-lg max-w-2xl mx-auto">We've helped hundreds of LGBTQ+ individuals and couples make the move to Connecticut. Here's what we do differently.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((svc, i) => {
                        const Icon = svc.icon;
                        return (
                            <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 hover:border-purple-300 hover:shadow-xl transition-all duration-500 group">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-purple-200/50 flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-purple-700 transition-colors">{svc.title}</h3>
                                <p className="text-slate-600 text-[13px] md:text-base leading-relaxed mb-4 md:mb-6">{svc.description}</p>
                                <ul className="space-y-2">
                                    {svc.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                                            <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Destinations */}
            <section id="destinations" className="bg-gradient-to-b from-stone-50 to-slate-50 py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">Top Destinations for LGBTQ+ Relocators</h2>
                        <p className="text-slate-600 text-[13px] md:text-lg max-w-2xl mx-auto">Connecticut is smaller than you think — but the range of communities is enormous. Here's where our clients land most often and why.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((dest) => (
                            <div key={dest.name} className="bg-white/70 backdrop-blur-md rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-purple-700 transition-colors">{dest.name}</h3>
                                    <span className="text-xs font-semibold px-3 py-1 bg-purple-100/80 text-purple-700 rounded-full border border-purple-200">{dest.badge}</span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">{dest.desc}</p>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm font-semibold text-slate-700">{dest.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial-style */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 md:px-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-gold-400 to-brand-500" />
                    <div className="relative z-10">
                        <div className="flex text-gold-400 justify-center text-xl mb-4 md:mb-6">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-gold-400" />)}
                        </div>
                        <blockquote className="text-white text-xl md:text-2xl font-serif italic leading-relaxed mb-4 md:mb-6 max-w-2xl mx-auto">
                            "We moved from Brooklyn and had no idea where to even start. The team found us West Hartford, introduced us to a community group, and we had friends before we'd even unpacked."
                        </blockquote>
                        <p className="text-slate-400 text-xs md:text-sm font-medium">— Gay couple, relocated from Brooklyn, NY · 2025</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-brand-600 to-brand-800 py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Phone className="w-10 h-10 text-white/60 mx-auto mb-4" />
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Ready to Make the Move?</h2>
                    <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">No pressure consultation. Tell us where you are and where you want to be. We'll handle the rest.</p>
                    <a href="/#contact" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-brand-700 font-bold rounded-full hover:bg-gold-50 transition-all shadow-lg hover:shadow-xl">
                        Start Your Free Consultation <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default RelocationServices;
