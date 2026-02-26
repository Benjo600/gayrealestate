"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    // Only keeping 8 essential paths for a cleaner, faster experience
    const paths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
      "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
      "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
      "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
      "M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
      "M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
    ];

    return (
      <div
        className={cn(
          "absolute h-full w-full inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] flex items-center justify-center pointer-events-none",
          className
        )}
      >
        <svg
          className="z-0 h-full w-full absolute"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((path, index) => (
            <React.Fragment key={`group-${index}`}>
              <motion.path
                d={path}
                stroke={`url(#linearGradient-${index})`}
                strokeOpacity="0.3"
                strokeWidth="0.5"
                style={{ willChange: "transform" }}
              />
              <defs>
                <motion.linearGradient
                  id={`linearGradient-${index}`}
                  initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
                  animate={{
                    x1: ["0%", "100%"],
                    y1: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 20 + index * 2,
                    ease: "linear",
                    repeat: Infinity,
                    delay: index * 1,
                  }}
                >
                  <stop stopColor="#9333ea" stopOpacity="0" />
                  <stop stopColor="#7c3aed" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                </motion.linearGradient>
              </defs>
            </React.Fragment>
          ))}
        </svg>
      </div>
    );
  }
);


BackgroundBeams.displayName = "BackgroundBeams"
