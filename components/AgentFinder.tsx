import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Medal, Target, MapPin, Building2, Quote, BadgeCheck, Star, CheckCircle2, Landmark, Scale, Instagram, Briefcase } from 'lucide-react';
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
        {/* Card Container with Subtle Glow Effect */}
        <div className="absolute -inset-[1px] rounded-[2.2rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700 bg-gradient-to-r from-gold-400/50 via-brand-400/50 to-gold-400/50" />

        <div className="relative glass-dark rounded-[2rem] shadow-2xl backdrop-blur-2xl border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col h-full">

          {/* Agent Image Area */}
          <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Role Label - Top Left */}
            <div className="absolute top-5 left-5">
              <div className="px-3 py-1 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg">
                <span className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">{badge.label}</span>
              </div>
            </div>

            {/* Name/Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pt-10 md:pt-12 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-0.5 md:mb-1 group-hover:text-gold-200 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-gold-300 font-medium text-sm md:text-base">{agent.title}</p>
                {(agent as any).instagram && (
                  <a
                    href={`https://instagram.com/${(agent as any).instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-xs font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    {(agent as any).instagram}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content Area - LGBTQ Pastel Theme */}
          <div className="p-4 md:p-6 flex-1 flex flex-col" style={{ background: 'linear-gradient(145deg, #fdf4ff 0%, #f0f4ff 50%, #f0fff8 100%)' }}>
            {/* Tagline */}
            <div className="relative mb-3 md:mb-4">
              <Quote className="absolute -top-1 -left-2 w-6 h-6 md:w-7 md:h-7 text-purple-100 -z-10" />
              <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed relative z-10 pl-2 not-italic">
                "{agent.tagline}"
              </p>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-4">
              {agent.specialties.slice(0, 3).map((spec, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-[10px] md:text-xs font-medium" style={{ background: 'rgba(119,0,136,0.08)', border: '1px solid rgba(119,0,136,0.18)', color: '#5b006b' }}>
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              {/* Key Stat Row */}
              <div className="grid grid-cols-2 gap-4 py-4" style={{ borderTop: '1px solid rgba(119,0,136,0.12)', borderBottom: '1px solid rgba(0,76,255,0.10)' }}>
                {/* Area/Award Stat */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,76,255,0.08)', border: '1px solid rgba(0,76,255,0.15)' }}>
                    <Target className="w-4 h-4" style={{ color: '#004CFF' }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: '#004CFF99' }}>{agent.stats.find(s => s.label === 'Areas' || s.label === 'Award')?.label || 'Areas'}</span>
                    <span className="text-xs font-semibold text-slate-800 line-clamp-1">{agent.stats.find(s => s.label === 'Areas' || s.label === 'Award')?.value || 'Top Performer'}</span>
                  </div>
                </div>
                
                {/* Experience Stat */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(2,129,33,0.08)', border: '1px solid rgba(2,129,33,0.15)' }}>
                    <Briefcase className="w-4 h-4" style={{ color: '#028121' }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: '#02812199' }}>Experience</span>
                    <span className="text-xs font-semibold text-slate-800 line-clamp-1">{agent.stats.find(s => s.label.includes('Experience') || s.label.includes('Service'))?.value || 'Experienced'}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
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
    <section id="find-agent" className="py-12 md:py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}>
      {/* Soft LGBTQ-toned radial washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_10%,rgba(255,141,0,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_80%,rgba(2,129,33,0.07),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.07),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(119,0,136,0.06),transparent_55%)]" />

      {/* Refined top accent */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-slate-900 tracking-tight leading-[1.1]">
            Meet the{' '}
            <span style={{
              background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              animation: 'pride-hue 4s linear infinite',
            }}>Team</span>
          </motion.h2>

          {/* Premium decorative line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 'auto' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 md:gap-4"
          >
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-purple-400/60 bg-purple-400/10" />
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
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

    </section>
  );
};

export default AgentFinder;