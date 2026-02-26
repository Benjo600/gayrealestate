"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Circle, ArrowRight, Play, Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface HeroGeometricProps {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
    backgroundImage?: string;
}

function HeroGeometric({
    badge = "Award-Winning Service",
    title1 = "Find Your Place",
    title2 = "With Pride",
    description = "Connect with local, friendly, and trusted real estate agents who understand your journey and share your values.",
    ctaText = "Our Agents",
    ctaHref = "#find-agent",
    backgroundImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=60&w=1600&auto=format&fit=crop"
}: HeroGeometricProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.1 + i * 0.1,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">

            {/* Static LGBTQ flag colours inside the word */}
            <style>{`
                .pride-word {
                    display: inline-block;
                    font-weight: 800;
                    background: linear-gradient(
                        90deg,
                        hsl(0,   100%, 50%) 0%,
                        hsl(12,  100%, 51%) 8%,
                        hsl(25,  100%, 52%) 16%,
                        hsl(38,  100%, 52%) 24%,
                        hsl(52,  100%, 50%) 32%,
                        hsl(60,  100%, 47%) 38%,
                        hsl(85,  100%, 38%) 46%,
                        hsl(120, 100%, 35%) 54%,
                        hsl(165, 100%, 35%) 60%,
                        hsl(210, 100%, 48%) 68%,
                        hsl(235, 100%, 52%) 76%,
                        hsl(260, 80%,  45%) 85%,
                        hsl(280, 80%,  38%) 93%,
                        hsl(295, 75%,  33%) 100%
                    );
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                }
            `}</style>

            {/* Decorative Corner Accents */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-500/30 z-40 pointer-events-none" />
            <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-gold-500/30 z-40 pointer-events-none" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-gold-500/30 z-40 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-gold-500/30 z-40 pointer-events-none" />

            {/* Background Video Layer */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    {/* Premium multi-layer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/20 to-zinc-900/85 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900/15 via-transparent to-brand-900/15 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.5)_100%)] z-10" />

                    {/* Subtle gold gradient accent */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08)_0%,transparent_50%)] z-10" />

                    <video
                        ref={videoRef}
                        src="/hero-video.mp4#t=2"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover hidden md:block"
                        style={{
                            willChange: 'transform',
                            transform: 'translateZ(0)'
                        }}
                    />
                    {/* Mobile background image placeholder */}
                    <img
                        src="/images/home_hero_mobile.png"
                        alt="Stunning Real Estate at Sunset"
                        className="w-full h-full object-cover md:hidden"
                    />
                </div>
            )}

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-gold-500/60 animate-float z-20" />
            <div className="absolute top-1/3 right-16 w-1.5 h-1.5 rounded-full bg-brand-400/60 animate-float z-20" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 left-20 w-1 h-1 rounded-full bg-white/40 animate-float z-20" style={{ animationDelay: '2s' }} />

            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/[0.03] via-transparent to-gold-500/[0.03] blur-3xl z-10" />

            <div className="relative z-50 container mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-8 md:pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">


                        {/* Heading */}
                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1
                                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[1.05] md:leading-[0.9] mb-4 md:mb-8"
                            >
                                <span className="block text-white">
                                    {title1}
                                </span>
                                <span className="block mt-2">
                                    {title2 && title2.includes("Pride") ? (
                                        <>
                                            <span className="bg-gradient-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                                                {title2.split("Pride")[0]}
                                            </span>
                                            {/* LGBTQ flag colours flowing inside the word only */}
                                            <span className="pride-word">Pride</span>
                                            <span className="bg-gradient-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                                                {title2.split("Pride")[1]}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="bg-gradient-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                                            {title2}
                                        </span>
                                    )}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl mb-6 md:mb-10">
                                {description}
                            </p>
                        </motion.div>

                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto mt-2"
                        >
                            <a
                                href={ctaHref}
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 md:px-8 md:py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98] w-full sm:w-auto"
                            >
                                {ctaText}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>

                            <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 md:px-8 md:py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20 w-full sm:w-auto">
                                <Play className="w-4 h-4 fill-current" />
                                Watch Story
                            </button>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Premium gradient transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-champagne-50 via-champagne-50/30 to-transparent pointer-events-none z-40" />

            {/* Decorative bottom accent line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent z-50" />
        </div>
    );
}

export { HeroGeometric }