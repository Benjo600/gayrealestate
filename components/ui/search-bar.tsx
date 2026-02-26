"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Search, Medal, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { agents, Agent } from "../../data/agents"

const AGENT_LIST = Object.values(agents);

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

const SearchBar = ({ placeholder = "Search...", onSearch }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Agent[]>([])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (value.trim()) {
      const filtered = AGENT_LIST.filter((agent) =>
        agent.name.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
      setIsFocused(false)
    }
  }

  return (
    <div className="relative w-full z-50 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center justify-center w-full max-w-[760px]"
      >
        {/* Premium Rainbow Border (Inside) with gold accent */}
        <div
          className={cn(
            "absolute inset-0 rounded-full -z-10 transition-all duration-500",
            isFocused ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-gold-500 via-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-500 animate-rainbow bg-[length:200%_auto] blur-[2px]" />
        </div>

        <div
          className={cn(
            "flex items-center w-full h-16 rounded-full bg-white relative overflow-hidden transition-all duration-300",
            isFocused
              ? "m-[3px] h-[calc(64px-6px)] w-[calc(100%-6px)] shadow-luxury"
              : "border border-slate-200 shadow-elevated hover:shadow-lg hover:border-slate-300"
          )}
          onClick={() => {
            if (!isFocused) handleFocus()
            inputRef.current?.focus()
          }}
        >
          <div className="pl-6 pr-4 relative z-20">
            <Search
              size={22}
              className={cn(
                "transition-colors duration-300",
                isFocused ? "text-brand-600" : "text-slate-400"
              )}
            />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full h-full bg-transparent outline-none placeholder:text-slate-400 font-medium text-base text-slate-900 pr-4 relative z-10"
          />

          {searchQuery && (
            <button
              type="submit"
              className="mr-3 px-8 h-11 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold text-sm hover:from-brand-500 hover:to-brand-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-500/20 whitespace-nowrap z-20 flex items-center gap-2"
            >
              Search
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Premium Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute top-full z-40 w-full max-w-[760px] bg-white rounded-2xl shadow-luxury border border-slate-100 overflow-hidden"
          >
            {/* Premium header */}
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-champagne-50 to-white">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggested Agents</p>
            </div>

            <div className="py-2">
              {suggestions.map((agent, index) => (
                <div
                  key={agent.id}
                  className="flex items-center gap-5 px-5 py-4 cursor-pointer hover:bg-gradient-to-r hover:from-brand-50/50 hover:to-transparent transition-all duration-200 border-b border-slate-50 last:border-0 group"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchQuery(agent.name);
                    if (onSearch) onSearch(agent.name);
                    setIsFocused(false);
                  }}
                >
                  {/* Premium Avatar */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-100 group-hover:border-brand-200 shadow-sm flex-shrink-0 transition-all duration-300">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover object-top scale-150 origin-[50%_15%]"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/100?text=No+Image";
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name & Title */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4 className="text-slate-900 font-bold text-base truncate group-hover:text-brand-700 transition-colors">{agent.name}</h4>
                      <span className="text-xs text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full truncate hidden sm:inline-block font-medium">
                        {agent.title.split('|')[0].trim()}
                      </span>
                    </div>

                    {/* Stats Preview with gold accents */}
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      {agent.stats.slice(0, 2).map((stat, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 truncate">
                          <Medal size={12} className="text-gold-500" />
                          <span className="font-medium">{stat.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { SearchBar }

