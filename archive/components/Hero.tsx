import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen min-h-[800px] overflow-hidden bg-slate-900">
      {/* LGBTQ Pride rainbow animation keyframes */}
      <style>{`
        @keyframes pride-flow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .pride-text {
          background: linear-gradient(
            90deg,
            #FF0018,
            #FFA52C,
            #FFFF41,
            #008018,
            #0000F9,
            #86007D,
            #FF0018,
            #FFA52C,
            #FFFF41,
            #008018,
            #0000F9,
            #86007D,
            #FF0018
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: pride-flow 2.5s linear infinite;
          display: inline-block;
        }
      `}</style>

      {/* Background Image (User Uploaded) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-ref-2.jpg"
          alt="Hero House"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Hero Headline */}
      <div className="absolute inset-0 z-10 flex flex-col items-center pt-[18%] md:pt-[12%] pointer-events-none select-none">
        <h1 className="text-center font-black tracking-tighter leading-[0.9] text-transparent">
          <span className="block text-[10vw] md:text-[8vw] opacity-0">FIND YOUR PLACE</span>
          <span className="block text-[10vw] md:text-[8vw] mt-[-1vw]">
            <span className="opacity-0">WITH </span>
            {/* PRIDE — LGBTQ rainbow gradient flowing through the letters */}
            <span
              className="pride-text font-black"
              style={{ fontWeight: 900 }}
            >
              PRIDE
            </span>
          </span>
        </h1>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 md:px-12">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-wide uppercase drop-shadow-md">Structa</span>
        </div>
        <button className="bg-white text-black px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-100 transition-colors shadow-md">
          Get Started
        </button>
      </nav>
    </div>
  );
};

export default Hero;
