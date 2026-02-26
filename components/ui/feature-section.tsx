"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = 100;
    const increment = 100 / (autoPlayInterval / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + increment;
        setCurrentFeature((prevFeat) => (prevFeat + 1) % features.length);
        return 0;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [features.length, autoPlayInterval]);

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-12 text-center text-slate-900">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-14">
          <div className="order-2 md:order-1 space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}
              >
                {/* Animated background pill - like navbar */}
                {index === currentFeature && (
                  <motion.div
                    layoutId="feature-selector"
                    className="absolute inset-0 bg-white rounded-2xl shadow-elevated border border-slate-100"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}

                <motion.div
                  className={cn(
                    "relative flex items-start gap-6 md:gap-8 p-5 rounded-2xl transition-colors duration-300",
                    index !== currentFeature && "hover:bg-white/30"
                  )}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: index === currentFeature ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative z-10">
                    <motion.div
                      className={cn(
                        "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border-2 flex-shrink-0 transition-all duration-300",
                        index === currentFeature
                          ? "bg-gradient-to-br from-brand-600 to-brand-700 border-brand-600 text-white shadow-lg shadow-brand-500/30"
                          : index < currentFeature
                            ? "bg-gradient-to-br from-gold-500 to-gold-600 border-gold-500 text-charcoal-900"
                            : "bg-slate-50 border-slate-200 text-slate-400",
                      )}
                    >
                      {index < currentFeature ? (
                        <span className="text-lg font-bold">✓</span>
                      ) : (
                        <span className="text-lg font-bold">{index + 1}</span>
                      )}
                    </motion.div>
                  </div>

                  <div className="flex-1 pt-1 relative z-10">
                    <h3 className={cn(
                      "text-xl md:text-2xl font-display font-semibold mb-2 transition-colors duration-300",
                      index === currentFeature ? "text-slate-900" : "text-slate-600"
                    )}>
                      {feature.title || feature.step}
                    </h3>
                    <p className={cn(
                      "text-sm md:text-base leading-relaxed transition-colors duration-300",
                      index === currentFeature ? "text-slate-600" : "text-slate-500"
                    )}>
                      {feature.content}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[280px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-2xl shadow-luxury",
              imageHeight
            )}
          >
            {/* Premium corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/40 z-30 pointer-events-none" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/40 z-30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/40 z-30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/40 z-30 pointer-events-none" />

            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-2xl overflow-hidden bg-slate-100"
                      initial={{ y: 100, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -100, opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

