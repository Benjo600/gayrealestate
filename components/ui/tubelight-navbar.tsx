"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const isNavigating = useRef(false) // Block scroll events during click interaction

  useEffect(() => {
    const handleScroll = () => {
      // If we are in the middle of a click->animate->hide sequence, ignore scroll events
      if (isNavigating.current) return

      const currentScrollY = window.scrollY

      // Hide on scroll down, show on scroll up
      // Threshold of 10px to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        lastScrollY.current = currentScrollY
      }

      // Scroll Spy Logic
      const spyScrollPosition = currentScrollY + window.innerHeight / 3
      let currentSection = items[0].name

      for (const item of items) {
        const id = item.url.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (spyScrollPosition >= offsetTop && spyScrollPosition < offsetTop + offsetHeight) {
            currentSection = item.name
          }
        }
      }

      if ((window.innerHeight + currentScrollY) >= document.body.offsetHeight - 50) {
        currentSection = items[items.length - 1].name
      }

      setActiveTab(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, name: string) => {
    e.preventDefault()

    // 1. Move the lamp immediately to the clicked item
    setActiveTab(name)

    // 2. Lock scroll listener to prevent conflict
    isNavigating.current = true

    // 3. Perform smooth scroll
    const id = url.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      // Removed history.pushState to avoid SecurityError in sandboxed environments
    }

    // 4. Wait for the lamp animation to settle (600ms), then slowly hide the navbar
    setTimeout(() => {
      setIsVisible(false)

      // 5. Release the lock after the hide animation finishes (1000ms duration)
      setTimeout(() => {
        isNavigating.current = false
      }, 1000)
    }, 600)
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-[100] mb-6 sm:pt-6 transition-transform duration-1000 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-[200%] sm:-translate-y-[200%]",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/80 border border-slate-200/60 backdrop-blur-md py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleNavClick(e, item.url, item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-slate-600 hover:text-slate-900",
                isActive && "text-slate-900",
              )}
            >
              <span className="relative z-10 hidden md:inline">{item.name}</span>
              <span className="relative z-10 md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-full overflow-hidden"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Rainbow Gradient Background - Vibrant */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-200/40 via-yellow-200/40 via-green-200/40 to-blue-200/40" />

                  {/* Top Rainbow Line - The 'Light' in Front */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 blur-[2px]" />

                  {/* Shine/Glow Effect */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/60 to-transparent" />
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}