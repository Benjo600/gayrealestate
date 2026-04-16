import React, { useEffect } from 'react';
import { FeatureSteps } from './ui/feature-section';
import { Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      step: 'Step 1',
      title: "One-Stop Shop",
      content: "From agents to a trusted lender and attorney, we have everything in place to support you through every step of your real estate journey — seamlessly and efficiently.",
      image: "/images/ct-highlights/one-stop-shop.jpg"
    },
    {
      step: 'Step 2',
      title: "LGBTQ+ Friendly & Affirming",
      content: "We're part of the community, proudly serving the community, with a deep understanding of the unique experiences and needs of LGBTQ+ buyers and sellers.",
      image: "/images/ct-highlights/lgbtq-friendly.jpg"
    },
    {
      step: 'Step 3',
      title: "Local Specialists",
      content: "We don't just know the market — we know the neighborhoods, the towns, the vibe, and the community. From local insights and events to pricing strategy and timing, we help you make informed decisions with confidence.",
      image: "/images/ct-highlights/aerial-hartford.jpg"
    }
  ];

  // Preload images for snappier transitions
  useEffect(() => {
    features.forEach(feature => {
      const img = new Image();
      img.src = feature.image;
    });
  }, []);

  return (
    <section id="why-us" className="py-12 md:py-20 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}>
      {/* LGBTQ-toned radial washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_10%,rgba(255,141,0,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_80%,rgba(2,129,33,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(119,0,136,0.05),transparent_55%)]" />


      <div className="relative z-10">
        {/* Refined Section Header */}
        <div className="text-center mb-12 md:mb-24 max-w-4xl mx-auto px-4">
          {/* Minimalist badge */}
          <div className="inline-flex items-center gap-2 md:gap-3 px-5 py-2 md:px-6 md:py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200/50 shadow-sm mb-6 md:mb-8">
            <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5 text-purple-500" />
            <span className="text-[10px] md:text-[11px] font-bold text-slate-600 tracking-[0.2em] uppercase">Our Promise</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-slate-900 tracking-tight mb-6 md:mb-8 leading-[0.95]">
            Why Choose <span className="font-serif italic pride-gradient-text">Us</span>
          </h2>

          {/* Refined decorative line */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-400/40 to-brand-400/40" />
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full animate-pride-border" />
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent via-brand-400/40 to-brand-400/40" />
          </div>

          {/* Lead statement */}
          <p className="text-xl md:text-3xl text-slate-800 font-medium max-w-3xl mx-auto leading-snug tracking-tight mb-8 md:mb-10">
            Experience real estate the way it should be.
          </p>

          {/* Formatted paragraphs */}
          <div className="max-w-3xl mx-auto space-y-5 md:space-y-6 text-left">
            <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-4 md:pl-5 border-l-2 border-brand-400/60">
              We're a <span className="text-slate-800 font-medium">one-stop shop</span> with all your real estate needs covered, offering seamless access to trusted professionals every step of the way.
            </p>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-4 md:pl-5 border-l-2 border-brand-400/40">
              We created this initiative to deliver <span className="text-slate-800 font-medium">high-end, inclusive service</span> tailored specifically to the LGBTQ+ community.
            </p>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-4 md:pl-5 border-l-2 border-brand-500/60">
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


    </section>
  );
};

export default Features;