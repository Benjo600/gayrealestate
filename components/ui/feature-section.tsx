"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "../../lib/utils"
import { ChevronUp, ChevronDown } from "lucide-react"

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
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [direction, setDirection] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use page scroll within the component's range to drive the active slide
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // Transform scroll percentage (0-1) to feature index (0 to length-1)
  const featureIndex = useTransform(scrollYProgress, [0, 1], [0, features.length - 1])
  
  // Update state when scroll crosses a step boundary
  useEffect(() => {
    return featureIndex.onChange((v) => {
      const nextIndex = Math.round(v)
      if (nextIndex !== currentFeature) {
        setDirection(nextIndex > currentFeature ? 1 : -1)
        setCurrentFeature(nextIndex)
      }
    })
  }, [featureIndex, currentFeature])

  const handleNext = () => {
    setDirection(1)
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentFeature((prev) => (prev > 0 ? prev - 1 : features.length - 1))
  }

  return (
    <div ref={containerRef} className={cn("p-8 md:p-12", className)}>
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
                  setDirection(index > currentFeature ? 1 : -1);
                  setCurrentFeature(index);
                }}
              >
                {/* Animated background pill */}
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
              "order-1 md:order-2 relative h-[280px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-2xl shadow-luxury group",
              imageHeight
            )}
          >
            {/* Navigation Arrows Overlay */}
            <div className="absolute inset-0 z-40 flex flex-col pointer-events-none">
              <div 
                className="flex-1 flex items-start justify-center pt-8 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-b from-charcoal-900/40 to-transparent pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
              >
                <motion.div 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl"
                >
                  <ChevronUp className="w-8 h-8" />
                </motion.div>
              </div>

              <div 
                className="flex-1 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-charcoal-900/40 to-transparent pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <motion.div 
                  whileHover={{ y: 5, scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl"
                >
                  <ChevronDown className="w-8 h-8" />
                </motion.div>
              </div>
            </div>

            {/* Premium corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/40 z-30 pointer-events-none" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/40 z-30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/40 z-30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/40 z-30 pointer-events-none" />

            <AnimatePresence mode="popLayout" custom={direction}>
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={{
                        initial: (direction: number) => ({
                          y: direction > 0 ? 100 : -100,
                          opacity: 0,
                          scale: 0.95,
                        }),
                        animate: {
                          y: 0,
                          opacity: 1,
                          scale: 1,
                        },
                        exit: (direction: number) => ({
                          y: direction > 0 ? -100 : 100,
                          opacity: 0,
                          scale: 0.95,
                        }),
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                      className="absolute inset-0 rounded-2xl overflow-hidden bg-slate-100"
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            {/* Scroll progress dot bar at the bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
              {features.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === currentFeature ? "bg-gold-500 w-6" : "bg-white/30"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

