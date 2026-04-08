import React, { useState } from 'react';
import { FloatingNav } from './ui/floating-navbar';
import { Home, User, MessageSquare, BookOpen, Menu, X, ShoppingBag, Tag, Star, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      link: "/#hero",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Meet Agents",
      link: "/about#team",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Insights",
      link: "/#resources",
      icon: <BookOpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "For Buyers",
      link: "/about#team",
      icon: <ShoppingBag className="h-4 w-4 text-neutral-500 dark:text-white" />,
      isDropdown: true,
      dropdownItems: [
        { label: 'First-Time Home Buying', href: '/first-time-buyers' },
        { label: 'Mortgage Calculator', href: '/mortgage-calculator' },
        { label: 'Relocation Services', href: '/relocation-services' },
        { label: "Buyer's Guide", href: '/buyers-guide' },
      ]
    },
    {
      name: "For Sellers",
      link: "/about#team",
      icon: <Tag className="h-4 w-4 text-neutral-500 dark:text-white" />,
      isDropdown: true,
      dropdownItems: [
        { label: 'Free Home Valuation', href: '/home-valuation' },
        { label: "Seller's Guide", href: '/sellers-guide' },
        { label: 'Marketing Your Home', href: '/marketing-your-home' },
      ]
    },
    {
      name: "Reviews",
      link: "/reviews",
      icon: <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" />,
      isPage: true,
    },
    {
      name: "Community",
      link: "/community",
      icon: <Calendar className="h-4 w-4 text-neutral-500 dark:text-white" />,
      isPage: true,
    },
    {
      name: "About",
      link: "/about",
      icon: <Star className="h-4 w-4 text-neutral-500 dark:text-white" />,
      isPage: true,
    },
    {
      name: "Contact",
      link: "/#contact",
      icon: <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  const handleMobileNavClick = (e: React.MouseEvent, link: string) => {
    if (link.startsWith("/#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const targetId = link.split("#")[1];

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* Desktop Floating Navbar */}
      <div className="hidden md:block">
        <FloatingNav navItems={navItems} />
      </div>

      {/* Mobile Burger Menu Button - Thumb Reachable Zone */}
      <div className="md:hidden fixed bottom-8 right-6 z-[6000]">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-4 bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/50 rounded-full backdrop-blur-xl transition-all active:scale-90 hover:scale-110 flex items-center justify-center group" 
          style={{ color: '#6B008A' }}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Compact Bottom Slide-Up - Optimized for speed and visibility */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - Minimal blur for high performance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[5999]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10, x: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10, x: 10 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} // Snappy Ease
              className="md:hidden fixed bottom-24 right-6 z-[6000] bg-white border border-slate-200/80 rounded-[2.2rem] shadow-[0_25px_60px_rgba(0,0,0,0.2)] w-[300px] max-h-[75vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 overflow-y-auto custom-scrollbar-hide">
                <div className="flex flex-col space-y-1 pt-1 pb-4">
                  {navItems.map((item: any, idx: number) => {
                    // Page link (Reviews, Community, About)
                    if (item.isPage) {
                      return (
                        <Link
                          key={idx}
                          to={item.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 px-5 py-4.5 text-slate-900 hover:bg-slate-50 rounded-2xl transition-colors active:scale-[0.98] group"
                        >
                          <div className="p-2.5 bg-slate-100 group-hover:bg-purple-100 text-purple-700 rounded-xl transition-colors">{item.icon}</div>
                          <span className="font-bold text-[16px] tracking-tight">{item.name}</span>
                        </Link>
                      );
                    }

                    // Dropdown items (For Buyers, For Sellers) - High Contrast Redesign
                    if (item.isDropdown && item.dropdownItems) {
                      return (
                        <div key={idx} className="bg-slate-50/80 rounded-[1.8rem] p-1.5 mb-2 mt-1">
                          <div className="flex items-center gap-3 px-4 py-3 text-purple-800/60">
                             <div className="scale-90">{item.icon}</div>
                             <span className="font-black text-[10px] uppercase tracking-[0.15em]">{item.name}</span>
                          </div>
                          <div className="space-y-0.5 px-1 pb-1">
                            {item.dropdownItems.map((sub: any, i: number) => (
                              <Link
                                key={i}
                                to={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3.5 text-[14.5px] font-bold text-slate-800 hover:text-purple-700 hover:bg-white rounded-[1.2rem] transition-all active:pl-6 shadow-sm border border-transparent hover:border-slate-100"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // Normal anchor
                    return (
                      <a
                        key={idx}
                        href={item.link}
                        onClick={(e) => handleMobileNavClick(e, item.link)}
                        className="flex items-center gap-4 px-5 py-4.5 text-slate-900 hover:bg-slate-50 rounded-2xl transition-colors active:scale-[0.98] group"
                      >
                         <div className="p-2.5 bg-slate-100 group-hover:bg-purple-100 text-purple-700 rounded-xl transition-colors">{item.icon}</div>
                        <span className="font-bold text-[16px] tracking-tight">{item.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
