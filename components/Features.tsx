import React from 'react';
import { FeatureSteps } from './ui/feature-section';
import { Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      step: 'Step 1',
      title: "One-Stop Shop",
      content: "From agents to a trusted lender and attorney, we have everything in place to support you through every step of your real estate journey — seamlessly and efficiently.",
      image: "/images/ct-highlights/01. One-stop shop 1.jpg"
    },
    {
      step: 'Step 2',
      title: "LGBTQ+ Friendly & Affirming",
      content: "We're part of the community, proudly serving the community, with a deep understanding of the unique experiences and needs of LGBTQ+ buyers and sellers.",
      image: "/images/ct-highlights/02. LGBTQ+ Friendly and Affirming.jpg"
    },
    {
      step: 'Step 3',
      title: "Local Specialists",
      content: "We don't just know the market — we know the neighborhoods, the towns, the vibe, and the community. From local insights and events to pricing strategy and timing, we help you make informed decisions with confidence.",
      image: "/images/ct-highlights/03. Local specialists.jpg"
    }
  ];

  return (
    <section id="why-us" className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-champagne-50 via-white to-champagne-50/30 relative overflow-hidden">
      {/* Subtle elegant background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.04),transparent_60%)]" />

      {/* Delicate pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Elegant top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

      <div className="relative z-10">
        {/* Refined Section Header */}
        <div className="text-center mb-12 md:mb-24 max-w-4xl mx-auto px-4">
          {/* Minimalist badge */}
          <div className="inline-flex items-center gap-2 md:gap-3 px-5 py-2 md:px-6 md:py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-gold-200/60 shadow-sm mb-6 md:mb-8">
            <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5 text-gold-500" />
            <span className="text-[10px] md:text-[11px] font-bold text-slate-700 tracking-[0.2em] uppercase">Our Promise</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-slate-900 tracking-tight mb-6 md:mb-8 leading-[0.95]">
            Why Choose <span className="font-serif italic text-gold-600">Us</span>
          </h2>

          {/* Refined decorative line */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400/60" />
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold-400" />
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400/60" />
          </div>

          {/* Lead statement */}
          <p className="text-xl md:text-3xl text-slate-800 font-medium max-w-3xl mx-auto leading-snug tracking-tight mb-8 md:mb-10">
            Experience real estate the way it should be.
          </p>

          {/* Formatted paragraphs */}
          <div className="max-w-3xl mx-auto space-y-5 md:space-y-6 text-left">
            <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-4 md:pl-5 border-l-2 border-gold-400/60">
              We're a <span className="text-slate-800 font-medium">one-stop shop</span> with all your real estate needs covered, offering seamless access to trusted professionals every step of the way.
            </p>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-4 md:pl-5 border-l-2 border-brand-400/40">
              We created this initiative to deliver <span className="text-slate-800 font-medium">high-end, inclusive service</span> tailored specifically to the LGBTQ+ community.
            </p>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-4 md:pl-5 border-l-2 border-gold-400/60">
              Every client's journey is different, and we meet you where you are — with <span className="text-slate-800 font-medium">expertise, discretion, and genuine care</span>.
            </p>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-4 md:pl-5 border-l-2 border-brand-400/40">
              Whether you're coming to Connecticut from afar or making a move closer to home, you'll always have a team that understands and supports you. This is real estate done <span className="text-slate-800 font-medium">thoughtfully, respectfully, and with you in mind</span>.
            </p>
          </div>
        </div>

        <FeatureSteps
          features={features}
          title=""
          autoPlayInterval={5000}
          imageHeight="h-[300px] sm:h-[400px] md:h-[500px]"
        />
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />
    </section>
  );
};

export default Features;