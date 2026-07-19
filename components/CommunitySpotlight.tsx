import React from 'react';
import { motion } from 'framer-motion';
import { communityVenues } from '../data/events';
import { ExternalLink, ArrowRight, MapPin, Sparkles, Star, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunitySpotlight: React.FC = () => {
    return (
        <section className="py-10 md:py-16 relative overflow-hidden bg-champagne-50">
            {/* Soft Pinkish & Rainbow Radial Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.06),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[#fdf4ff] opacity-40 mix-blend-overlay" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-8 text-center md:text-left">
                    <div className="max-w-2xl mx-auto md:mx-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-md border border-purple-100 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600 shadow-sm mb-3 md:mb-4"
                        >
                            <Sparkles className="w-3 h-3 fill-purple-600" />
                            Connect With Our Vibe
                        </motion.div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-slate-900 mb-2 md:mb-3 tracking-tight leading-snug">
                            Connect with the <span className="pride-gradient-text italic">Lifestyle</span> you deserve.
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-light max-w-xl italic px-2 md:px-0">
                            "Real estate is about more than property. It's about finding your place in the local culture."
                        </p>
                    </div>

                    <div className="flex justify-center md:justify-end shrink-0">
                        <Link
                            to="/community"
                            className="group flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-slate-900 text-white rounded-full font-bold text-xs md:text-sm shadow-lg hover:bg-purple-600 hover:-translate-y-0.5 transition-all"
                        >
                            Explore Community Hub
                            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                    {communityVenues.map((venue, idx) => (
                        <motion.div
                            key={venue.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="group relative flex flex-col h-full"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-luxury border-2 border-white mb-4 md:mb-5 group-hover:shadow-2xl transition-all duration-500">
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                                    <div className="flex items-center gap-1.5 mb-1.5 md:mb-2">
                                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                                        <span className="text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">{venue.category}</span>
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-display font-bold text-white mb-2 md:mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {venue.name}
                                    </h3>
                                    <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="flex gap-1.5">
                                            {venue.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-lg text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest border border-white/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-1 md:px-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed italic border-l-2 border-pink-100 pl-3 md:pl-4 max-w-sm">
                                    "{venue.description}"
                                </p>
                                <a
                                    href={venue.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-center px-3.5 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-md hover:bg-purple-600 hover:-translate-y-0.5 transition-all"
                                >
                                    Visit site
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 md:mt-14 text-center">
                    <p className="text-slate-400 font-black tracking-[0.3em] uppercase text-[9px] mb-4 md:mb-6">Support local. Live inclusive.</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 grayscale opacity-40 hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-1.5 font-black text-xs md:text-sm text-slate-400 uppercase italic"><Star size={14} /> Icons.</div>
                        <div className="flex items-center gap-1.5 font-black text-xs md:text-sm text-slate-400 uppercase italic"><Calendar size={14} /> Events.</div>
                        <div className="flex items-center gap-1.5 font-black text-xs md:text-sm text-slate-400 uppercase italic"><Heart size={14} /> Community.</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunitySpotlight;
