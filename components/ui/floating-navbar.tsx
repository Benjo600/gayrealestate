import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";


export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: React.ReactNode;
        isDropdown?: boolean;
        isPage?: boolean;
        dropdownItems?: { label: string; href: string }[];
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [active, setActive] = useState<string>(navItems[0]?.link || "");
    const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        if (link.startsWith("/#")) {
            e.preventDefault();
            const targetId = link.split("#")[1];
            
            if (location.pathname !== "/") {
                navigate("/");
                // Small delay to allow home page to mount before scrolling
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 300);
            } else {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
            setActive(link);
        }
    };

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
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className={cn(
                    "flex max-w-fit fixed top-5 inset-x-0 mx-auto rounded-full z-[5000] p-1 items-center justify-center",
                    "bg-charcoal-900/90 border border-slate-800/50 shadow-2xl backdrop-blur-xl gap-1 px-2.5",
                    className
                )}
            >


                {navItems.map((navItem: any, idx: number) => {
                    // Page link (like Reviews)
                    if (navItem.isPage) {
                        return (
                            <Link
                                key={`link=${idx}`}
                                to={navItem.link}
                                className={cn(
                                    "relative items-center flex space-x-1 font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300",
                                    location.pathname === navItem.link
                                        ? "text-white bg-white/10"
                                        : "text-slate-300 hover:text-white"
                                )}
                            >
                                <span className="block sm:hidden">{navItem.icon}</span>
                                <span className="hidden sm:block relative z-10 tracking-wide">{navItem.name}</span>
                            </Link>
                        );
                    }

                    // Dropdown nav item (For Buyers, For Sellers)
                    if (navItem.isDropdown) {
                        return (
                            <div
                                key={`link=${idx}`}
                                className="relative"
                                onMouseEnter={() => setHoveredDropdown(navItem.name)}
                                onMouseLeave={() => setHoveredDropdown(null)}
                            >
                                <button
                                    className={cn(
                                        "relative items-center flex space-x-1 font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300",
                                        "text-slate-300 hover:text-white"
                                    )}
                                >
                                    <span className="block sm:hidden">{navItem.icon}</span>
                                    <span className="hidden sm:block relative z-10 tracking-wide">{navItem.name}</span>
                                    <svg className="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {hoveredDropdown === navItem.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[220px] bg-charcoal-900/95 border border-slate-800/50 backdrop-blur-xl rounded-2xl p-2 shadow-2xl"
                                        >
                                            {navItem.dropdownItems?.map((item: any, i: number) => (
                                                <Link
                                                    key={i}
                                                    to={item.href}
                                                    className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    }

                    // Normal anchor nav item
                    return (
                        <a
                            key={`link=${idx}`}
                            href={navItem.link}
                            onClick={(e) => handleNavClick(e, navItem.link)}
                            className={cn(
                                "relative items-center flex space-x-1 font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300",
                                active === navItem.link
                                    ? "text-white"
                                    : "text-slate-300 hover:text-white"
                            )}
                        >
                            {/* Active Pill Animation */}
                            {active === navItem.link && (
                                <motion.span
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full -z-10 bg-gradient-to-r from-white/10 to-white/5 border border-slate-700/30 backdrop-blur-sm"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}

                            <span className="block sm:hidden">{navItem.icon}</span>
                            <span className="hidden sm:block relative z-10 tracking-wide">{navItem.name}</span>
                        </a>
                    );
                })}
            </motion.div>
        </AnimatePresence>
    );
};
