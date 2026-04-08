"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    title1 = "Find Your Place",
    title2 = "With Pride",
    description = "Connect with local, friendly, and trusted real estate agents who understand your journey and share your values.",
    ctaText = "Our Agents",
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
        hidden: { opacity: 0, y: 15 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 mobile-gpu-boost">

            {/* Static LGBTQ flag colours inside the word - Pre-optimized */}
            <style>{`.pride-word { display: inline-block; font-weight: 800; background: linear-gradient(90deg, #E50000 0%, #FF8D00 16%, #FFEE00 32%, #028121 50%, #004CFF 68%, #770088 85%, #E50000 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }`}</style>

            {/* Background Slideshow Layer */}
            <div className="absolute inset-0 z-0 mobile-gpu-boost">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/10 to-zinc-900/90 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 via-transparent to-brand-900/20 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.1)_0%,transparent_60%)] z-10" />

                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentSlide}
                        src={ctHighlightImages[currentSlide]}
                        alt="CT Scenery"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            {/* Decorative elements - Hidden on Mobile for Performance */}
            <div className="hidden md:block absolute top-1/4 left-10 w-2 h-2 rounded-full animate-pride-border animate-float z-20 opacity-60" />
            <div className="hidden md:block absolute top-1/3 right-16 w-1.5 h-1.5 rounded-full bg-brand-400/60 animate-float z-20" />
            <div className="hidden md:block absolute bottom-1/3 left-20 w-1 h-1 rounded-full bg-white/40 animate-float z-20" />

            {/* Content Container */}
            <div className="relative z-50 container mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        {/* Heading */}
                        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 md:mb-8">
                                <span className="block text-white">{title1}</span>
                                <span className="block mt-2">
                                    <span className="bg-gradient-to-br from-white via-white to-orange-200 bg-clip-text text-transparent">
                                        {title2.split("Pride")[0]}
                                    </span>
                                    <span className="pride-word">Pride</span>
                                    <span className="bg-gradient-to-br from-white via-white to-orange-200 bg-clip-text text-transparent">
                                        {title2.split("Pride")[1]}
                                    </span>
                                </span>
                            </h1>
                        </motion.div>

                        {/* CT Welcome + Description */}
                        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                            <p className="inline-block text-sm md:text-md font-bold tracking-[0.2em] uppercase text-purple-400 mb-2">
                                Connecticut Welcomes You
                            </p>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl mb-10">
                                {description}
                            </p>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link
                                    to="/about#team"
                                    className="group px-8 py-4 bg-white text-zinc-950 font-bold rounded-xl flex items-center gap-2 hover:bg-orange-100 transition-all duration-300 shadow-xl active:scale-95"
                                >
                                    {ctaText}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="/#contact"
                                    className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 active:scale-95"
                                >
                                    Get Started
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Slideshow dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-2.5">
                {ctHighlightImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            i === currentSlide ? "bg-white w-6" : "bg-white/20"
                        )}
                    />
                ))}
            </div>

            {/* Floor gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-40" />
        </div>
    );
}

export { HeroGeometric };