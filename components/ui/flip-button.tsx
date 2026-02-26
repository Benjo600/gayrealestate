import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface FlipButtonProps {
  text1: React.ReactNode; // Active/Flipped state text (Back of card)
  text2: React.ReactNode; // Default state text (Front of card)
  className?: string;
  onClick?: () => void;
}

export function FlipButton({ text1, text2, className, onClick }: FlipButtonProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
  }

  return (
    <div className={cn("group [perspective:1000px]", className)}>
      <motion.button
        className="relative w-full h-12 cursor-pointer rounded-xl font-semibold text-base shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all outline-none focus:outline-none select-none"
        onClick={handleClick}
        initial={false}
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.15, type: "tween", ease: "easeInOut" }}
        whileTap={{ scale: 0.97 }}
        style={{ transformStyle: "preserve-3d" }}
        type="button"
      >
        {/* Front Face (Default) */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-brand-600 text-white rounded-xl border border-transparent"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {text2}
        </div>

        {/* Back Face (Flipped) */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-white text-brand-600 rounded-xl border-2 border-brand-100"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateX(180deg)"
          }}
        >
          {text1}
        </div>
      </motion.button>
    </div>
  );
};