"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, ArrowRight, Play, Star } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

// CT Highlights slideshow images
const ctHighlightImages = [
    "/images/ct-highlights/anastasia-oDpiy4LNyIs-unsplash.jpg",
    "/images/ct-highlights/balazs-busznyak-MAIq7eiPLEQ-unsplash.jpg",
    "/images/ct-highlights/christopher-luther-85O7wucKcdY-unsplash.jpg",
    "/images/ct-highlights/hayrullah-gozcu-GytLIxS302k-unsplash.jpg",
    "/images/ct-highlights/richard-liu-7AxIUra4j3E-unsplash.jpg",
    "/images/ct-highlights/richard-liu-M2GrqHZMc4U-unsplash.jpg",
    "/images/ct-highlights/rusty-watson-4L4UzXB9lD4-unsplash.jpg",
    "/images/ct-highlights/rusty-watson-Uq5Nqfzr5zU-unsplash.jpg",
];

interface HeroGeometricProps {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
    backgroundImage?: string;
    storyHref?: string;
}

function HeroGeometric({
    badge = "Award-Winning Service",
    title1 = "Find Your Place",
    title2 = "With Pride",
    description = "Connect with local, friendly, and trusted real estate agents who understand your journey and share your values.",
    ctaText = "Our Agents",
    ctaHref = "#find-agent",
    storyHref = "/about",
    backgroundImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=60&w=1600&auto=format&fit=crop"
}: HeroGeometricProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % ctHighlightImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

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

            {/* Main Hero Content */}

            {/* Background Slideshow Layer */}
            <div className="absolute inset-0 z-0">
                {/* Premium multi-layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/20 to-zinc-900/85 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-900/15 via-transparent to-brand-900/15 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.5)_100%)] z-10" />

                {/* Subtle pride gradient accent */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.1)_0%,transparent_50%)] z-10" />

                {/* CT Highlights Slideshow */}
                <AnimatePresence mode="sync">
                    <motion.img
                        key={currentSlide}
                        src={ctHighlightImages[currentSlide]}
                        alt={`Connecticut scenery ${currentSlide + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full animate-pride-border animate-float z-20 opacity-60" />
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

                        {/* Connecticut welcomes you + Description */}
                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="pride-gradient-text text-lg md:text-xl font-bold tracking-wide mb-2 animate-rainbow-text">
                                Connecticut welcomes you
                            </p>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl mb-6 md:mb-10">
                                {description}
                            </p>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link
                                    to="/about#team"
                                    className="group px-8 py-4 bg-white text-zinc-950 font-bold rounded-xl flex items-center gap-2 hover:bg-gold-400 hover:text-zinc-900 transition-all duration-300 shadow-xl"
                                >
                                    {ctaText}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="/#contact"
                                    className="px-8 py-4 bg-zinc-900/50 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                                >
                                    Get Started
                                </a>
                            </div>
                        </motion.div>



                    </div>
                </div>
            </div>

            {/* Slideshow indicator dots */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                {ctHighlightImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            i === currentSlide ? "bg-gold-400 w-6" : "bg-white/30 hover:bg-white/50"
                        )}
                    />
                ))}
            </div>

            {/* Premium gradient transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-champagne-50 via-champagne-50/30 to-transparent pointer-events-none z-40" />

        </div>
    );
}

export { HeroGeometric }