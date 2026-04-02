import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <div className="relative w-full h-screen min-h-[800px] overflow-hidden bg-slate-900">
            {/* Optimized Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata" // Only load metadata on mobile, not full video
                    poster="/hero-ref-2.jpg" // Show poster while loading
                    className="w-full h-full object-cover object-center"
                    // Reduce quality on mobile
                    style={{
                        transform: 'translateZ(0)', // GPU acceleration
                        willChange: 'transform',
                    }}
                >
                    {/* Use different video sources based on screen size */}
                    {/* Mobile - lower quality, smaller file */}
                    <source
                        src="/your-video-mobile.mp4"
                        type="video/mp4"
                        media="(max-width: 768px)"
                    />
                    {/* Desktop - higher quality */}
                    <source
                        src="/your-video-desktop.mp4"
                        type="video/mp4"
                        media="(min-width: 769px)"
                    />
                    {/* Fallback */}
                    <source src="/your-video.mp4" type="video/mp4" />
                    {/* Fallback image for browsers that don't support video */}
                    <img
                        src="/hero-ref-2.jpg"
                        alt="Hero House"
                        className="w-full h-full object-cover"
                    />
                </video>
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Rainbow Glow Overlay for "PRIDE" */}
            <div className="absolute inset-0 z-10 flex flex-col items-center pt-[18%] md:pt-[12%] pointer-events-none select-none">
                <h1 className="text-center font-black tracking-tighter leading-[0.9] text-transparent">
                    <span className="block text-[10vw] md:text-[8vw] opacity-0">FIND YOUR PLACE</span>
                    <span className="block text-[10vw] md:text-[8vw] mt-[-1vw]">
                        <span className="opacity-0">WITH </span>
                        <motion.span
                            animate={{
                                color: [
                                    "#FF0000", "#FF7F00", "#FFFF00", "#00FF00",
                                    "#0000FF", "#4B0082", "#9400D3", "#FF0000"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="inline-block font-black !text-opacity-100"
                            style={{
                                WebkitTextStroke: '2px currentColor',
                                paintOrder: 'stroke fill',
                                fontWeight: 900,
                            }}
                        >
                            PRIDE
                        </motion.span>
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
