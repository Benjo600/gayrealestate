import * as React from "react"
import { cn } from "../../lib/utils"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  bottomImage?: {
    light: string
    dark: string
  }
  gridOptions?: any
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle = {
        regular: "Find Your Place With ",
        gradient: "Pride.",
      },
      description,
      ctaText = "Find an Agent",
      ctaHref = "#",
      bottomImage,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative min-h-[95vh] flex items-center justify-center overflow-hidden", className)} ref={ref} {...props}>
        {/* Background Image */}
        {bottomImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={bottomImage.light}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70 backdrop-blur-[1px]" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          {title && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
              <span className="text-brand-50 font-medium tracking-widest text-xs uppercase font-sans">{title}</span>
            </div>
          )}

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1] animate-fade-in [animation-delay:200ms] opacity-0 fill-mode-forwards font-serif">
            {subtitle.regular}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 via-purple-200 to-pink-200 italic">
              {subtitle.gradient}
            </span>
          </h1>

          {description && (
            <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards text-shadow-sm">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:600ms] opacity-0 fill-mode-forwards">
            <a
              href={ctaHref}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_-5px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_-5px_rgba(124,58,237,0.6)] transform hover:-translate-y-1"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#why-us"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-semibold text-lg transition-all backdrop-blur-md hover:bg-white/25"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }