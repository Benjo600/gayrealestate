import React from 'react';
import { motion } from 'framer-motion';
import { communityVenues } from '../data/events';
import { ExternalLink, ArrowRight, MapPin, Sparkles, Star, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunitySpotlight: React.FC = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-champagne-50">
            {/* Soft Pinkish & Rainbow Radial Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.06),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[#fdf4ff] opacity-40 mix-blend-overlay" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 text-center md:text-left">
                    <div className="max-w-4xl mx-auto md:mx-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/80 backdrop-blur-md border border-purple-100 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] text-purple-600 shadow-sm mb-10"
                        >
                            <Sparkles className="w-4 h-4 fill-purple-600" />
                            Connect With Our Vibe
                        </motion.div>
                        <h2 className="text-5xl md:text-8xl font-display font-semibold text-slate-900 mb-8 tracking-tighter leading-[0.95]">
                            Connect with the <br /> <span className="pride-gradient-text italic">Lifestyle</span> you deserve.
                        </h2>
                        <p className="text-xl text-slate-500 leading-relaxed font-light max-w-2xl italic px-4 md:px-0">
                            "Real estate is about more than property. It's about finding your place in the local culture."
                        </p>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <Link
                            to="/community"
                            className="group flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-full font-black text-lg shadow-2xl hover:bg-purple-600 hover:-translate-y-2 transition-all"
                        >
                            Explore Community Hub
                            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    {communityVenues.map((venue, idx) => (
                        <motion.div
                            key={venue.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="group relative flex flex-col h-full"
                        >
                            <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-luxury border-4 border-white mb-10 group-hover:shadow-2xl transition-all duration-500">
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="w-5 h-5 text-pink-400" />
                                        <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">{venue.category}</span>
                                    </div>
                                    <h3 className="text-4xl font-display font-bold text-white mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {venue.name}
                                    </h3>
                                    <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="flex gap-2">
                                            {venue.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[9px] font-bold uppercase tracking-widest border border-white/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-2xl">
                                             <ArrowRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="px-6 relative">
                                <Link 
                                    to="/community" 
                                    className="absolute -top-10 right-10 w-16 h-16 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-xl border border-purple-50 group-hover:bg-purple-600 group-hover:text-white transition-all transform group-hover:rotate-[360deg] duration-700"
                                >
                                    <ExternalLink className="w-7 h-7" />
                                </Link>
                                <p className="text-slate-500 text-lg leading-relaxed italic border-l-2 border-pink-100 pl-6 max-w-sm">
                                    "{venue.description}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <p className="text-slate-400 font-black tracking-[0.4em] uppercase text-[10px] mb-12">Support local. Live inclusive.</p>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 font-black text-xl text-slate-400 uppercase italic"><Star size={24} /> Icons.</div>
                        <div className="flex items-center gap-2 font-black text-xl text-slate-400 uppercase italic"><Calendar size={24} /> Events.</div>
                        <div className="flex items-center gap-2 font-black text-xl text-slate-400 uppercase italic"><Heart size={24} /> Community.</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunitySpotlight;
