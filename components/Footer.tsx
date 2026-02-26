import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 text-slate-300 pt-12 md:pt-20 pb-8 md:pb-10 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                          linear-gradient(to bottom, #fff 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Premium CTA Section */}
        <div className="text-center mb-12 md:mb-20 pb-10 md:pb-16 border-b border-white/10">
          <p className="text-gold-500 font-semibold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">Ready to find your home?</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4 md:mb-6 tracking-tight">
            Start Your <span className="italic text-gold-400">Journey</span> Today
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto font-light px-4 md:px-0">
            Connect with our network of trusted, LGBTQ+ friendly agents and find a home where you truly belong.
          </p>
          <a href="#find-agent" className="group px-8 py-3.5 md:px-10 md:py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold text-[13px] md:text-base rounded-full hover:from-brand-500 hover:to-brand-600 transition-all duration-300 shadow-lg hover:shadow-brand-500/30 inline-flex items-center gap-2 md:gap-3">
            Find Your Agent
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8 pb-10 md:pb-16">

          {/* Brand Section - Larger on desktop */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6 md:mb-8">
              <div className="p-2 md:p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/20">
                <Home className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                GayRealEstate<span className="text-gold-500">.com</span>
              </span>
            </div>
            <p className="text-[13px] md:text-sm text-slate-400 mb-8 md:mb-10 leading-relaxed max-w-sm font-light">
              For over 25 years, we've been dedicated to ensuring the LGBTQ+ community is represented, respected, and welcomed in every real estate transaction.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { Icon: Twitter, href: 'https://twitter.com/gayrealestatecom', label: 'Twitter / X' },
                { Icon: Facebook, href: 'https://www.facebook.com/gayrealestatecom', label: 'Facebook' },
                { Icon: Instagram, href: 'https://www.instagram.com/gayrealestatecom', label: 'Instagram' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/gayrealestatecom', label: 'LinkedIn' }
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-brand-600 hover:border-brand-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-500/20 group"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* For Buyers */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-gold-500 to-transparent" />
              For Buyers
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'First-Time Home Buying', href: '/first-time-buyers' },
                { label: 'Mortgage Calculator', href: '/mortgage-calculator' },
                { label: 'Relocation Services', href: '/relocation-services' },
                { label: "Buyer's Guide", href: '/buyers-guide' }
              ].map(({ label, href }, i) => (
                <li key={i}>
                  <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center group font-light">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Sellers */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-gold-500 to-transparent" />
              For Sellers
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Free Home Valuation', href: '/home-valuation' },
                { label: "Seller's Guide", href: '/sellers-guide' },
                { label: 'Marketing Your Home', href: '/marketing-your-home' },
                { label: 'Find a Listing Agent', href: '/#find-agent' }
              ].map(({ label, href }, i) => (
                <li key={i}>
                  <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center group font-light">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-gold-500 to-transparent" />
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Blog & News', href: '/#resources' },
                { label: 'Contact Support', href: '/#contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' }
              ].map(({ label, href }, i) => (
                <li key={i}>
                  <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center group font-light">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-gold-500 to-transparent" />
              Get in Touch
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:info@gayrealestateconnecticut.com" className="text-sm text-slate-300 hover:text-white transition-colors font-light">
                    info@gayrealestateconnecticut.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:+18604042188" className="text-sm text-slate-300 hover:text-white transition-colors font-light">
                    (860) 404-2188
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Location</p>
                  <span className="text-sm text-slate-300 font-light">Nationwide Service</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 flex items-center gap-2">
            © {new Date().getFullYear()} GayRealEstate.com. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            for our community.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />
              <span>Fair Housing</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-brand-500 to-brand-700" />
              <span>Equal Opportunity</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gold-400 to-gold-600" />
              <span>LGBTQ+ Owned</span>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-gold-500/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-gold-500/20 pointer-events-none" />
    </footer>
  );
};

export default Footer;