import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: React.ReactNode;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [active, setActive] = useState<string>(navItems[0]?.link || "");

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                // Always visible at top of page
                setVisible(true);
            } else {
                // Hide when scrolling down, show when scrolling up
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: 0,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.4, 0.25, 1],
                }}
                className={cn(
                    "flex max-w-fit fixed top-8 inset-x-0 mx-auto rounded-full z-[5000] p-1.5 items-center justify-center",
                    "bg-charcoal-900/90 border border-white/10 shadow-2xl backdrop-blur-xl",
                    className
                )}
            >
                {/* Premium gold accent line at top */}
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

                {navItems.map((navItem: any, idx: number) => (
                    <a
                        key={`link=${idx}`}
                        href={navItem.link}
                        onClick={(e) => {
                            e.preventDefault();
                            setActive(navItem.link);
                            setTimeout(() => {
                                const element = document.querySelector(navItem.link);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }, 100);
                        }}
                        className={cn(
                            "relative items-center flex space-x-1 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300",
                            active === navItem.link
                                ? "text-white"
                                : "text-slate-300 hover:text-white"
                        )}
                    >
                        {/* Active Pill Animation */}
                        {active === navItem.link && (
                            <motion.span
                                layoutId="active-pill"
                                className="absolute inset-0 rounded-full -z-10 bg-gradient-to-r from-white/20 to-white/10 border border-white/20 backdrop-blur-sm"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                        )}

                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block relative z-10 tracking-wide">{navItem.name}</span>
                    </a>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
