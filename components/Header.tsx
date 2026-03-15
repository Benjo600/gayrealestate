import React, { useState } from 'react';
import { FloatingNav } from './ui/floating-navbar';
import { Home, User, MessageSquare, BookOpen, Menu, X, ShoppingBag, Tag, Star } from 'lucide-react';
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
      name: "Why Us",
      link: "/#why-us",
      icon: <Star className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Find Agents",
      link: "/#find-agent",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Stories",
      link: "/#resources",
      icon: <BookOpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "For Buyers",
      link: "/#find-agent",
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
      link: "/#find-agent",
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
      name: "About",
      link: "/about",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
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

      {/* Mobile Burger Menu Button */}
      <div className="md:hidden fixed top-6 right-6 z-[6000]">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-charcoal-900 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 rounded-full backdrop-blur-xl text-white transition-transform active:scale-95"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[80px] right-6 z-[6000] bg-charcoal-900/95 border border-white/10 backdrop-blur-xl rounded-2xl p-2 shadow-2xl min-w-[220px] max-h-[70vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item: any, idx: number) => {
                // Page link (Reviews)
                if (item.isPage) {
                  return (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                      {item.icon}
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  );
                }

                // Dropdown items (For Buyers, For Sellers)
                if (item.isDropdown && item.dropdownItems) {
                  return (
                    <div key={idx}>
                      <div className="flex items-center gap-3 px-4 py-3 text-slate-400">
                        {item.icon}
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        {item.dropdownItems.map((sub: any, i: number) => (
                          <Link
                            key={i}
                            to={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
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
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    {item.icon}
                    <span className="font-medium text-sm">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
