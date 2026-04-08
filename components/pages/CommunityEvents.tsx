import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { communityVenues, recentEvents } from '../../data/events';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink, Sparkles, Users, Clock, ArrowUpRight, Star } from 'lucide-react';

const CommunityEvents: React.FC = () => {
    const featuredEvents = recentEvents.filter(e => e.featured);
    const regularEvents = recentEvents.filter(e => !e.featured);

    return (
        <div className="min-h-screen bg-[#fdf4ff] font-sans relative overflow-x-hidden text-slate-900 mt-12 transition-colors duration-700">
            <SEOHead
                title="Community Hub | Premium LGBTQ+ Events & Culture in CT"
                description="Join the vibrant heart of Connecticut's LGBTQ+ community. Explore legendary venues, iconic drag performances, and exclusive local events curated by GayRealEstateCT.net."
                canonical="https://www.gayrealestatect.net/community"
            />

            {/* Premium Soft Pink & Rainbow Radial Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.05),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[#fdf4ff] opacity-40 mix-blend-overlay" />
            </div>

            <Header />

            <main className="relative z-10">
                {/* Stunning Light Hub Hero - Compacted */}
                <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center pt-20 md:pt-24 pb-12 md:pb-20">
                    <div className="max-w-7xl mx-auto px-5 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-purple-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-purple-600 shadow-sm mb-6">
                                <Star className="w-3.5 h-3.5 fill-purple-600" />
                                Community Hub
                            </div>
                            
                            <h1 className="text-4xl md:text-[9rem] font-display font-semibold text-slate-900 mb-8 tracking-tighter leading-[1.1] md:leading-[0.85]">
                                Your <span className="pride-gradient-text italic">Journey</span> <br className="hidden md:block" />
                                to Community.
                            </h1>
                            
                            <p className="text-md md:text-3xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed mb-8 md:mb-16">
                                We connect you with the vibrant, inclusive heartbeat of Connecticut life.
                            </p>

                            <div className="flex flex-wrap gap-3 justify-center">
                                <a href="#venues" className="btn-premium px-8 py-4 rounded-xl text-white font-bold shadow-lg flex items-center gap-2 text-sm">
                                    Local Venues
                                </a>
                                <a href="#events" className="btn-gold px-8 py-4 rounded-xl text-slate-900 font-bold shadow-lg flex items-center gap-2 text-sm">
                                    Upcoming Shows
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Shows - Horizontal Swipe on Mobile */}
                <section id="events" className="py-16 md:py-24 bg-white/40 border-y border-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-between mb-8 md:mb-16">
                            <h2 className="text-2xl md:text-5xl font-display font-bold text-slate-900">Main Stage</h2>
                            <Link to="/" className="text-purple-600 font-bold text-xs uppercase hover:text-purple-700 transition-all flex items-center gap-2">
                                News Feed <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex md:grid md:grid-cols-2 gap-5 md:gap-16 overflow-x-auto md:overflow-visible no-scrollbar snap-x ml-[-1rem] md:ml-0 mr-[-1rem] md:mr-0 px-4 md:px-0">
                            {featuredEvents.map((event, idx) => (
                                <motion.div
                                    key={event.id}
                                    className="flex-shrink-0 w-[280px] md:w-auto snap-center relative h-[380px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border-2 border-white"
                                    onClick={() => window.open(event.link, '_blank')}
                                >
                                    <img 
                                        src={communityVenues.find(v => v.id === event.venueId)?.image} 
                                        alt={event.title} 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                    
                                    <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-end">
                                        <div className="flex gap-2 mb-4">
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-bold text-white uppercase">{event.date}</span>
                                        </div>
                                        <h3 className="text-xl md:text-5xl font-display font-bold text-white mb-2 md:mb-6">{event.title}</h3>
                                        <p className="text-white/80 text-[11px] md:text-lg mb-4 line-clamp-2 md:line-clamp-none italic font-light">"{event.description}"</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-white/90">
                                                <Clock className="w-4 h-4 text-pink-400" />
                                                <span className="text-[11px] font-bold">{event.time}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg">
                                                <ExternalLink className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Local Icons - 2 Column Grid on Mobile */}
                <section id="venues" className="py-20 md:py-32 relative">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 md:mb-24">
                            <h2 className="text-3xl md:text-7xl font-display font-bold text-slate-900 mb-4 tracking-tight">Iconic Venues</h2>
                            <p className="text-sm md:text-xl text-slate-500 max-w-2xl mx-auto font-light">
                                Trusted landmarks in our local social history.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-20">
                            {communityVenues.map((venue, idx) => (
                                <motion.div
                                    key={venue.id}
                                    className="flex flex-col h-full group"
                                >
                                    <div className="relative aspect-square md:aspect-[4/3] rounded-2xl md:rounded-[3.5rem] overflow-hidden shadow-sm border-2 border-white mb-4 md:mb-10">
                                        <img 
                                            src={venue.image} 
                                            alt={venue.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-3">
                                            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-900">{venue.category}</span>
                                        </div>
                                    </div>

                                    <div className="px-1 md:px-4">
                                        <h3 className="text-lg md:text-4xl font-display font-bold text-slate-900 mb-2 md:mb-6">{venue.name}</h3>
                                        <p className="hidden md:block text-slate-600 mb-10 leading-relaxed font-light italic border-l-3 border-pink-200 pl-6">
                                            "{venue.description}"
                                        </p>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <MapPin className="w-3.5 h-3.5 text-pink-500" />
                                            <span className="text-[10px] md:text-sm font-medium">{venue.address.split(',')[0]}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modern List Header for Regular Events - Compact */}
                <section className="py-20 md:py-40 bg-white/60 border-t border-white">
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="text-center mb-10 md:mb-24">
                            <h2 className="text-2xl md:text-6xl font-display font-bold text-slate-900">Community <span className="pride-gradient-text italic">Circle</span></h2>
                        </div>

                        <div className="space-y-3">
                            {regularEvents.map((event, idx) => (
                                <motion.div
                                    key={event.id}
                                    className="group flex items-center justify-between p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-white border border-purple-50 hover:shadow-lg transition-all cursor-pointer"
                                    onClick={() => window.open(event.link, '_blank')}
                                >
                                    <div className="flex items-center gap-4 md:gap-8">
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-md md:text-2xl font-display font-bold text-slate-900 mb-1">{event.title}</h4>
                                            <div className="flex items-center gap-2 text-[9px] md:text-[11px] font-bold text-slate-400">
                                                <span>{event.date}</span>
                                                <span className="w-1 h-1 bg-purple-200 rounded-full" />
                                                <span className="text-pink-500">{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


            </main>

            <Footer />
        </div>
    );
};

export default CommunityEvents;
