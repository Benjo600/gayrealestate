import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="relative w-full h-screen min-h-[800px] overflow-hidden bg-slate-900">
            {/* Pride rainbow static gradient */}
            <style>{`
                .pride-text {
                    background: linear-gradient(
                        90deg,
                        hsl(0,   100%, 50%) 0%,
                        hsl(10,  100%, 50%) 7%,
                        hsl(22,  100%, 52%) 14%,
                        hsl(35,  100%, 53%) 21%,
                        hsl(50,  100%, 50%) 28%,
                        hsl(60,  100%, 48%) 33%,
                        hsl(80,  100%, 40%) 40%,
                        hsl(120, 100%, 36%) 48%,
                        hsl(160, 100%, 35%) 54%,
                        hsl(200, 100%, 45%) 61%,
                        hsl(225, 100%, 52%) 68%,
                        hsl(245, 100%, 52%) 74%,
                        hsl(270, 80%,  42%) 83%,
                        hsl(290, 80%,  35%) 92%,
                        hsl(300, 80%,  32%) 100%
                    );
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    display: inline-block;
                    font-weight: 900;
                }
            `}</style>

            {/* Background Video/Image - Video only on desktop */}
            <div className="absolute inset-0 z-0">
                {isMobile ? (
                    // Static image on mobile for better performance
                    <img
                        src="/hero-ref-2.jpg"
                        alt="Hero House"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />
                ) : (
                    // Video on desktop
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover object-center"
                        poster="/hero-ref-2.jpg"
                    >
                        <source src="/your-video.mp4" type="video/mp4" />
                        {/* Fallback image */}
                        <img src="/hero-ref-2.jpg" alt="Hero House" className="w-full h-full object-cover" />
                    </video>
                )}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Rainbow Glow Overlay for "PRIDE" */}
            <div className="absolute inset-0 z-10 flex flex-col items-center pt-[18%] md:pt-[12%] pointer-events-none select-none">
                <h1 className="text-center font-black tracking-tighter leading-[0.9] text-transparent">
                    <span className="block text-[10vw] md:text-[8vw] opacity-0">FIND YOUR PLACE</span>
                    <span className="block text-[10vw] md:text-[8vw] mt-[-1vw]">
                        <span className="opacity-0">WITH </span>
                        {/* The Flowing PRIDE - smooth gradient shimmer */}
                        <span className="pride-text">
                            PRIDE
                        </span>
                    </span>
                </h1>
            </div>

            {/* Navbar (Minimal, to not obscure the image too much as requested) */}
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
