import React, { useEffect, useState } from 'react';
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
    const [activeSvc, setActiveSvc] = useState(0);
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="LGBTQ+ Relocation Services in Connecticut | GayRealEstateCT.net"
                description="Relocating to Connecticut? Our LGBTQ+-led team provides full-service relocation support — neighborhood matching, community integration, vendor introductions, and remote closing support."
                canonical="https://www.gayrealestatect.net/relocation-services"
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

            {/* Services Section - Hybrid Mobile/Desktop Layout */}
            <section className="py-16 md:py-32 max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4 md:mb-6 leading-tight">Full-Service Relocation Support</h2>
                    <p className="text-slate-600 text-sm md:text-xl max-w-3xl mx-auto leading-relaxed">We've helped hundreds of LGBTQ+ individuals and couples make the move to Connecticut. Here's what we do differently.</p>
                </div>

                {/* Mobile Tabs - Only visible on small screens to reduce scroll length */}
                <div className="lg:hidden mb-8 overflow-x-auto custom-scrollbar-hide flex gap-2 pb-2">
                    {services.map((svc, i) => (
                        <button 
                            key={i}
                            onClick={() => setActiveSvc(i)}
                            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeSvc === i ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'}`}
                        >
                            {svc.title.split(' ')[0]}
                        </button>
                    ))}
                </div>

                {/* Desktop Grid / Mobile Single View */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {services.map((svc, i) => {
                        const Icon = svc.icon;
                        const isHiddenOnMobile = activeSvc !== i;
                        return (
                            <div 
                                key={i} 
                                className={`
                                    bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:border-purple-200 group
                                    ${isHiddenOnMobile ? 'hidden lg:block' : 'block'}
                                `}
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] md:rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 tracking-tight group-hover:text-purple-700 transition-colors">{svc.title}</h3>
                                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 font-light italic border-l-2 border-slate-100 pl-6">{svc.description}</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {svc.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-3.5 text-sm md:text-base text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <CheckCircle className="w-3 h-3 text-green-600" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Destinations - Mobile Swipeable / Desktop Grid */}
            <section id="destinations" className="bg-slate-900 py-20 md:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-6">Top Neighborhoods for Relocators</h2>
                        <p className="text-slate-400 text-sm md:text-xl max-w-3xl mx-auto">Connecticut is smaller than you think — but the range of communities is enormous.</p>
                    </div>

                    {/* Desktop Grid and Mobile Horizontal Scroll */}
                    <div className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto lg:overflow-x-visible pb-10 lg:pb-0 px-4 md:px-0 -mx-4 md:mx-0 snap-x snap-mandatory hide-scrollbar">
                        {destinations.map((dest) => (
                            <div key={dest.name} className="min-w-[85vw] lg:min-w-0 snap-center bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-500 group flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between mb-8">
                                        <h3 className="text-2xl font-bold font-display text-white group-hover:text-purple-400 transition-colors tracking-tight">{dest.name}</h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">{dest.badge}</span>
                                    </div>
                                    <p className="text-slate-400 text-base leading-relaxed mb-8 font-light italic pr-4">"{dest.desc}"</p>
                                </div>
                                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 leading-none mb-1.5">Typical Range</p>
                                        <p className="text-lg font-bold text-white leading-none">{dest.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <Footer />
        </div>
    );
};

export default RelocationServices;
