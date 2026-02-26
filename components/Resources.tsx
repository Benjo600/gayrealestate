import React from 'react';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogs';



const Resources: React.FC = () => {
  return (
    <section id="resources" className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-stone-50 via-slate-50 to-stone-50 relative overflow-hidden">
      {/* Refined neutral background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.06),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(120,113,108,0.04),transparent_70%)]" />

      {/* Subtle warm orbs */}
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gold-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-[10%] w-[450px] h-[450px] bg-stone-300/15 rounded-full blur-3xl"></div>

      {/* Delicate texture */}
      <div className="absolute inset-0 opacity-[0.01]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(120,113,108,0.1) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      {/* Refined top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Premium Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
          {/* Decorative badge */}
          <div className="inline-flex items-center gap-2 md:gap-2.5 px-4 py-1.5 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-sm rounded-full border border-stone-200 shadow-sm mb-6 md:mb-8">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-600" />
            <span className="text-[10px] md:text-[11px] font-semibold text-slate-700 tracking-[0.15em] uppercase">Latest Articles</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-slate-900 mb-4 md:mb-6 tracking-tight">
            Insights <span className="text-gold-600 italic">&</span> Stories
          </h2>

          {/* Premium decorative line */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8 mt-4 md:mt-0">
            <div className="w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-gold-400/50" />
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold-400" />
            <div className="w-16 md:w-20 h-px bg-gradient-to-l from-transparent via-gold-400/50 to-gold-400/50" />
          </div>

          <p className="text-base md:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed mt-4 md:mt-0 px-4 md:px-0">
            Expert advice, market trends, and community stories to help you make informed real estate decisions.
          </p>
        </div>

        {/* Premium Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <article
              key={post.id}
              className="group h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl hover:border-gold-300/60 transition-all duration-500 flex flex-col h-full block hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-stone-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-gold-700 rounded-full shadow-sm border border-gold-200/50">
                      {post.category}
                    </span>
                  </div>

                  {/* Hover overlay badge */}
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full flex items-center gap-2 shadow-lg">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-8 flex-col flex-grow bg-white">
                  <div className="flex items-center gap-3 md:gap-4 text-[11px] md:text-xs text-slate-500 mb-3 md:mb-4 font-medium uppercase tracking-wide">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5 text-gold-600" />
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 md:w-3.5 h-3 md:h-3.5 text-gold-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 mb-2 md:mb-3 group-hover:text-gold-700 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed mb-4 md:mb-6 flex-grow font-normal line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-stone-200">
                    <span className="inline-flex items-center gap-1.5 md:gap-2 text-[13px] md:text-sm font-semibold text-gold-700 group-hover:text-gold-800 transition-colors">
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                    </span>

                    {/* Reading progress indicator */}
                    <div className="h-1 w-12 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Premium View All Button */}
        <div className="mt-12 md:mt-20 text-center">
          <button className="group relative px-6 md:px-10 py-3 md:py-4 bg-white border-2 border-stone-200 text-slate-900 font-semibold text-[13px] md:text-base rounded-full hover:border-gold-400 hover:bg-stone-50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              View All Articles
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

      </div>

      {/* Subtle gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />
    </section>
  );
};

export default Resources;