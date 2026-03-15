import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Medal, Target, MapPin, Building2, Quote, BadgeCheck, Star, CheckCircle2, Landmark, Scale } from 'lucide-react';
import { agents } from '../data/agents';
import { motion } from 'framer-motion';
import { ExploreProfileButton } from './ui/explore-profile-button';

const AgentFinder: React.FC = () => {
  const navigate = useNavigate();
  const allMembers = Object.values(agents);

  // Separate agents (top row) from support professionals (bottom row)
  const topRow = allMembers.filter(a => a.role === 'agent'); // Arek, Abby, Travis
  const bottomRow = allMembers.filter(a => a.role === 'lender' || a.role === 'attorney'); // Jake, Carolyn

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'agent': return { label: 'Realtor' };
      case 'lender': return { label: 'Mortgage Lender' };
      case 'attorney': return { label: 'Attorney' };
      default: return { label: 'Professional' };
    }
  };

  const renderCard = (agent: typeof allMembers[0], index: number) => {
    const badge = getRoleBadge(agent.role);

    return (
      <motion.div
        key={agent.id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        className="group relative"
      >
        {/* Card Container with Animated Border Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-400/20 via-purple-400/15 to-brand-400/20 rounded-[2.2rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700" />

        <div className="relative glass-premium rounded-[2rem] shadow-2xl backdrop-blur-2xl bg-white/5 border border-white/10 hover:border-brand-400/30 transition-all duration-500 overflow-hidden flex flex-col h-full">

          {/* Agent Image Area */}
          <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

            {/* Role Label - Top Left — subtle, no icon, no "verified" */}
            <div className="absolute top-5 left-5">
              <div className="px-3 py-1 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg">
                <span className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">{badge.label}</span>
              </div>
            </div>

            {/* Stats overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pt-10 md:pt-12 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-0.5 md:mb-1 group-hover:text-gold-200 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-gold-300 font-medium text-sm md:text-base">{agent.title}</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6 flex-1 flex flex-col bg-gradient-to-b from-slate-800/50 to-slate-900/50">
            {/* Tagline */}
            <div className="relative mb-3 md:mb-4">
              <Quote className="absolute -top-1 -left-2 w-6 h-6 md:w-7 md:h-7 text-brand-400/30 -z-10" />
              <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed relative z-10 pl-2 not-italic">
                "{agent.tagline}"
              </p>
            </div>

            {/* Fact-based Highlights */}
            <div className="flex flex-wrap gap-2 mb-6">
              {agent.specialties.slice(0, 3).map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-700/50 text-slate-300 border border-slate-600/50 rounded-lg text-xs font-medium group-hover:border-gold-400/50 group-hover:bg-gold-500/10 transition-colors"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              {/* Key Stat Row */}
              <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-300">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{agent.stats.find(s => s.label === 'Areas' || s.label === 'Award')?.label || 'Areas'}</span>
                    <span className="text-xs font-semibold text-slate-200 line-clamp-1">{agent.stats.find(s => s.label === 'Areas' || s.label === 'Award')?.value || 'Top Performer'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-300">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Experience</span>
                    <span className="text-xs font-semibold text-slate-200 line-clamp-1">{agent.stats.find(s => s.label.includes('Experience') || s.label.includes('Service'))?.value || 'Experienced'}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <ExploreProfileButton
                  label="View Full Profile"
                  onClick={() => navigate(`/agent/${agent.id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="find-agent" className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-700 via-slate-700/95 to-slate-800 relative overflow-hidden">
      {/* Subtle sophisticated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(124,58,237,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.06),transparent_60%)]" />

      {/* Refined subtle orbs */}
      <div className="absolute top-20 left-[5%] w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-[5%] w-[600px] h-[600px] bg-purple-500/4 rounded-full blur-3xl"></div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                          linear-gradient(to bottom, #fff 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Refined top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 md:gap-2.5 px-4 py-1.5 md:px-5 md:py-2 bg-brand-500/10 backdrop-blur-xl rounded-full border border-brand-400/20 shadow-sm mb-1 md:mb-2">
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-400 fill-brand-400" />
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-slate-200 uppercase">Expert Representation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-white tracking-tight leading-[1.1]">
            Meet the <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">Team</span>
          </motion.h2>

          {/* Premium decorative line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 'auto' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 md:gap-4"
          >
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-brand-400/60 bg-brand-400/10" />
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
          >
            Our dedicated professionals are committed to turning your real estate goals into reality with integrity and expertise.
          </motion.p>
        </div>

        {/* Top Row: 3 Agents */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-10">
          {topRow.map((agent, index) => renderCard(agent, index))}
        </div>

        {/* Bottom Row: Jake (Lender) and Carolyn (Attorney) side by side */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
          {bottomRow.map((agent, index) => renderCard(agent, index + topRow.length))}
        </div>

      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />
    </section>
  );
};

export default AgentFinder;