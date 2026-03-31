import React, { useState, useMemo } from 'react';
import { ArrowRight, Calendar, Clock, BookOpen, MapPin, Sparkles, GraduationCap, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogs';

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const tabs = [
    { id: 'ALL', label: 'All Articles', icon: Sparkles },
    { id: 'RELOCATION', label: 'Moving to CT', icon: ArrowRight },
    { id: 'NEIGHBORHOODS', label: 'Town Guides', icon: MapPin },
    { id: 'FAMILY', label: 'Family & Schools', icon: GraduationCap },
    { id: 'ADVICE', label: 'Expert Advice', icon: Scale }
  ];

  const filteredPosts = useMemo(() => {
    if (activeTab === 'ALL') return BLOG_POSTS;
    
    return BLOG_POSTS.filter(post => {
      const category = post.category.toUpperCase();
      if (activeTab === 'RELOCATION') return category.includes('RELOCATION') || category.includes('LIVING GUIDE') || category.includes('EVENTS');
      if (activeTab === 'NEIGHBORHOODS') return category.includes('LOCAL') || category.includes('SPOTLIGHT') || category.includes('LITCHFIELD');
      if (activeTab === 'FAMILY') return category.includes('FAMILY') || category.includes('SCHOOL');
      if (activeTab === 'ADVICE') return category.includes('LEGAL') || category.includes('MARKET') || category.includes('EXPERT');
      return true;
    });
  }, [activeTab]);

  return (
    <section id="resources" className="py-12 md:py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}>
      {/* LGBTQ-toned radial washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_10%,rgba(255,141,0,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_80%,rgba(2,129,33,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(119,0,136,0.05),transparent_55%)]" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Premium Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          {/* Decorative badge */}
          <div className="inline-flex items-center gap-2 md:gap-2.5 px-4 py-1.5 md:px-5 md:py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200/50 shadow-sm mb-6 md:mb-8">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500" />
            <span className="text-[10px] md:text-[11px] font-semibold text-slate-600 tracking-[0.15em] uppercase">Resource Center</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">
            Knowledge Hub <br className="hidden md:block" />
            <span className="pride-gradient-text italic">& Insights</span>
          </h2>

          <p className="text-base md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mt-4 md:mt-0 px-4 md:px-0">
            Expert guides, local spotlights, and community resources curated specifically for LGBTQ+ home buyers and sellers in Connecticut.
          </p>
        </div>

        {/* Premium Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12 md:mb-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  isActive 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Premium Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="group h-full animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-purple-300/60 transition-all duration-500 flex flex-col h-full block hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-56 md:h-64 overflow-hidden bg-stone-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Category Tag */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-brand-700 rounded-lg shadow-sm border border-brand-100 group-hover:bg-brand-50 transition-colors">
                      {post.category}
                    </span>
                  </div>

                  {/* Date/Read Time Float */}
                  <div className="absolute bottom-5 left-5 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider uppercase">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider uppercase">
                      <Clock className="w-3.5 h-3.5 text-brand-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Read More Pulse */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 z-20 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                       <ArrowRight className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex-col flex-grow bg-white relative">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 flex-grow font-light line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-[10px]">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {post.author}
                      </span>
                    </div>

                    <span className="text-[10px] font-black tracking-widest text-brand-500 uppercase flex items-center gap-2 group-hover:text-brand-700">
                      View Details
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Results Counter */}
        <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Showing {filteredPosts.length} of {BLOG_POSTS.length} expert articles
            </p>
        </div>

      </div>

    </section>
  );
};

export default Resources;