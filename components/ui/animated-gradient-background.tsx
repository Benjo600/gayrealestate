import { motion } from "framer-motion";
import React from "react";

interface AnimatedGradientBackgroundProps {
   gradientColors?: string[];
   gradientStops?: number[];
   animationSpeed?: number; // In seconds for the CSS animation
   containerClassName?: string;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
   gradientColors = [
      "#FFFFFF",
      "#f5f3ff",
      "#ede9fe",
      "#fae8ff",
      "#ffffff"
   ],
   gradientStops = [0, 25, 50, 75, 100],
   animationSpeed = 15,
   containerClassName = "",
}) => {
   const gradientString = gradientStops
      .map((stop, index) => `${gradientColors[index]} ${stop}%`)
      .join(", ");

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 2 }}
         className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClassName}`}
      >
         <style>
            {`
               @keyframes pulse-gradient {
                  0%, 100% { transform: scale(1) translateY(0); }
                  50% { transform: scale(1.1) translateY(-2%); }
               }
               .optimized-gradient {
                  background: radial-gradient(125% 125% at 50% 0%, ${gradientString});
                  animation: pulse-gradient ${animationSpeed}s ease-in-out infinite;
                  will-change: transform;
               }
            `}
         </style>
         <div className="absolute inset-0 optimized-gradient" />
      </motion.div>
   );
};

export default AnimatedGradientBackground;
