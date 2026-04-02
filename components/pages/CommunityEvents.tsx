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
                {/* Stunning Light Hub Hero */}
                <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/80 backdrop-blur-md border border-purple-100 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] text-purple-600 shadow-sm mb-10">
                                <Star className="w-3.5 h-3.5 fill-purple-600" />
                                Community & Culture
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-display font-semibold text-slate-900 mb-8 tracking-tighter leading-[0.95]">
                                Your <span className="pride-gradient-text italic">Journey</span> <br />
                                to Community.
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                                We help you find more than a house. We connect you with the vibrant, inclusive heartbeat of Connecticut life.
                            </p>

                            <div className="flex flex-wrap gap-5 justify-center">
                                <a href="#venues" className="btn-premium px-10 py-5 rounded-full text-white font-bold shadow-xl shadow-purple-200/50 flex items-center gap-3 group">
                                    Local Venues
                                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </a>
                                <a href="#events" className="btn-gold px-10 py-5 rounded-full text-slate-900 font-bold shadow-xl shadow-gold-100/50 flex items-center gap-3">
                                    Upcoming Shows
                                    <Sparkles className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Floating Decorative Blobs */}
                    <motion.div 
                        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-20 right-[15%] w-64 h-64 bg-pink-100/40 rounded-full blur-[100px] -z-10" 
                    />
                    <motion.div 
                        animate={{ x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-20 left-[10%] w-96 h-96 bg-purple-100/40 rounded-full blur-[120px] -z-10" 
                    />
                </section>

                {/* Featured Spectacles - Soft High-End Feel */}
                <section id="events" className="py-24 bg-white/40 backdrop-blur-3xl border-y border-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-display font-semibold text-slate-900 mb-6 tracking-tight">Main Stage <span className="pride-gradient-text italic">Highlights</span></h2>
                                <p className="text-lg text-slate-500 font-light max-w-xl">Curated premier events and legendary productions that define our local spirit.</p>
                            </div>
                            <Link to="/" className="text-purple-600 font-bold text-sm tracking-widest uppercase hover:text-purple-700 transition-colors flex items-center gap-3 group">
                                View News Feed
                                <div className="w-8 h-8 rounded-full border border-purple-100 flex items-center justify-center group-hover:bg-purple-50">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {featuredEvents.map((event, idx) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 cursor-pointer border-4 border-white"
                                    onClick={() => window.open(event.link, '_blank')}
                                >
                                    <img 
                                        src={communityVenues.find(v => v.id === event.venueId)?.image} 
                                        alt={event.title} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                                    
                                    <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            <span className="px-5 py-2 bg-purple-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Featured Event</span>
                                            <span className="px-5 py-2 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">{event.date}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">{event.title}</h3>
                                        <p className="text-white/80 text-sm md:text-lg mb-8 line-clamp-2 max-w-xl italic font-light">"{event.description}"</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-white/90">
                                                <Clock className="w-5 h-5 text-pink-400" />
                                                <span className="text-sm font-semibold tracking-wide">{event.time}</span>
                                            </div>
                                            <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl group-hover:rotate-45 transition-transform duration-500">
                                                <ExternalLink className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Local Icons - Venue Grid */}
                <section id="venues" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl md:text-7xl font-display font-semibold text-slate-900 mb-8 tracking-tight">Iconic Venue Partners</h2>
                            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                                Our trusted community landmarks where legends are made and history is written every day.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-20">
                            {communityVenues.map((venue, idx) => (
                                <motion.div
                                    key={venue.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-luxury border-4 border-white mb-10 group">
                                        <img 
                                            src={venue.image} 
                                            alt={venue.name} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        
                                        <a 
                                            href={venue.websiteUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-purple-600 transform scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-purple-600 hover:text-white"
                                        >
                                            <ExternalLink className="w-7 h-7" />
                                        </a>

                                        <div className="absolute bottom-8 left-8 flex gap-3">
                                            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900">{venue.category}</span>
                                        </div>
                                    </div>

                                    <div className="px-4">
                                        <h3 className="text-4xl font-display font-bold text-slate-900 mb-6">{venue.name}</h3>
                                        <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light italic border-l-3 border-pink-200 pl-6">
                                            "{venue.description}"
                                        </p>
                                        
                                        <div className="flex items-center gap-3 text-slate-400 mb-8">
                                            <MapPin className="w-5 h-5 text-pink-500" />
                                            <span className="text-sm font-medium tracking-wide">{venue.address}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {venue.tags.map(tag => (
                                                <span key={tag} className="px-4 py-2 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-purple-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modern List Header for Regular Events */}
                <section className="py-32 bg-white/60 backdrop-blur-2xl border-t border-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Users className="w-16 h-16 text-purple-200 mx-auto mb-8" />
                            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Recurring Community <span className="pride-gradient-text italic">Circle</span></h2>
                            <p className="text-slate-500 font-light">The reliable heartbeats of our local social calendar. Free, fun, and inclusive.</p>
                        </div>

                        <div className="space-y-4">
                            {regularEvents.map((event, idx) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col md:flex-row md:items-center justify-between p-10 rounded-[2.5rem] bg-white border border-purple-50 hover:border-purple-200 hover:shadow-xl transition-all cursor-pointer"
                                    onClick={() => window.open(event.link, '_blank')}
                                >
                                    <div className="flex items-center gap-8 mb-6 md:mb-0">
                                        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl transition-colors group-hover:bg-purple-600 group-hover:text-white">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-display font-bold text-slate-900 mb-2">{event.title}</h4>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{event.date}</span>
                                                <span className="w-1 h-1 bg-purple-200 rounded-full" />
                                                <span className="text-[11px] font-bold text-pink-500 uppercase tracking-widest">{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-full border border-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ArrowUpRight className="w-5 h-5 text-purple-600" />
                                        </div>
                                    </div>
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
