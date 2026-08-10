import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Dock, DockIcon, DockItem } from './ui/dock';
import { Home, User, MessageSquare, BookOpen, ShoppingBag, Tag, Star, Calendar, Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Home', link: '/#hero', icon: <Home className="h-full w-full" /> },
  { name: 'Meet Agents', link: '/about#team', icon: <User className="h-full w-full" /> },
  { name: 'Insights', link: '/blog', icon: <BookOpen className="h-full w-full" /> },
  { name: 'For Buyers', link: '/first-time-buyers', icon: <ShoppingBag className="h-full w-full" /> },
  { name: 'For Sellers', link: '/sellers-guide', icon: <Tag className="h-full w-full" /> },
  { name: 'Reviews', link: '/reviews', icon: <MessageSquare className="h-full w-full" /> },
  { name: 'Community', link: '/community', icon: <Calendar className="h-full w-full" /> },
  { name: 'About', link: '/about', icon: <Star className="h-full w-full" /> },
  { name: 'Contact', link: '/contact', icon: <Mail className="h-full w-full" /> },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the dock on scroll-down, bring it back on scroll-up — mirrors the
  // native "get out of my way while I read" convention, with a slow enough
  // fade/slide that it never feels like it's snapping.
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastY.current;
    if (latest < 60) {
      setVisible(true);
    } else if (delta > 4) {
      setVisible(false);
    } else if (delta < -4) {
      setVisible(true);
    }
    lastY.current = latest;
  });

  const handleHashClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    const targetId = link.split('#')[1];

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {/* Apple-style dock — primary navigation, all breakpoints */}
      <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[6000] max-w-[calc(100vw-2rem)]">
        <motion.div
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
          <Dock
          className="items-start gap-7 px-7 pt-2.5 pb-0.5 bg-champagne-50/95 backdrop-blur-xl border border-gold-500/20 shadow-[0_8px_20px_-10px_rgba(20,15,5,0.18)]"
          magnification={58}
          distance={130}
          panelHeight={80}
        >
          {navItems.map((item, idx) => {
            const isActive = item.link.startsWith('/#')
              ? location.pathname === '/'
              : location.pathname === item.link;

            const itemContent = (
              <div className="flex flex-col items-center gap-1">
                <DockItem
                  className={cn(
                    'aspect-square rounded-full bg-white border transition-colors',
                    isActive ? 'border-gold-500 shadow-gold' : 'border-slate-200/70'
                  )}
                >
                  <DockIcon>
                    {React.cloneElement(item.icon, {
                      className: cn('h-full w-full', isActive ? 'text-gold-700' : 'text-slate-500'),
                    })}
                  </DockIcon>
                </DockItem>
                <span
                  className={cn(
                    'text-[8px] font-semibold uppercase tracking-tight whitespace-nowrap leading-none',
                    isActive ? 'text-gold-700' : 'text-slate-500'
                  )}
                >
                  {item.name}
                </span>
              </div>
            );

            return item.link.startsWith('/#') ? (
              <a key={idx} href={item.link} onClick={(e) => handleHashClick(e, item.link)} className="shrink-0">
                {itemContent}
              </a>
            ) : (
              <Link key={idx} to={item.link} className="shrink-0">
                {itemContent}
              </Link>
            );
          })}
          </Dock>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
