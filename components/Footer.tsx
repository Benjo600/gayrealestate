import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

export const GOOGLE_BUSINESS_PROFILE_URL = 'https://share.google/Dd3f6SV4a50W2mTaZ';

/** Official 4-color Google "G" logomark, inline so no external asset request is needed. */
const GoogleGIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="text-slate-600 pt-12 md:pt-20 pb-8 md:pb-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}>
      {/* Soft LGBTQ-toned radial washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.06),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_10%,rgba(255,141,0,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_80%,rgba(2,129,33,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(119,0,136,0.05),transparent_55%)] pointer-events-none" />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Premium CTA Section */}
        <div className="text-center mb-12 md:mb-20 pb-10 md:pb-16 border-b border-slate-200">
          <p className="font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ready to find your home?</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-slate-900 mb-4 md:mb-6 tracking-tight">
            Start Your <span className="pride-gradient-text italic">Journey</span> Today
          </h2>
          <p className="text-slate-500 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto font-light px-4 md:px-0">
            Connect with our network of trusted, LGBTQ+ friendly agents and find a home where you truly belong.
          </p>
          <Link to="/about#team" className="group px-8 py-3.5 md:px-10 md:py-4 text-white font-semibold text-[13px] md:text-base rounded-full transition-all duration-300 shadow-lg hover:opacity-90 inline-flex items-center gap-2 md:gap-3" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
            Find Your Agent 
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8 pb-10 md:pb-16">

          {/* Brand Section - Larger on desktop */}
          <div className="lg:col-span-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  GayRealEstateCT<span style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>.net</span>
                </span>
              </Link>
            <p className="text-[13px] md:text-sm text-slate-500 mb-8 md:mb-10 leading-relaxed max-w-sm font-light">
              We're dedicated to ensuring the LGBTQ+ community is represented, respected, and welcomed in every real estate transaction.
            </p>
            <a
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 group-hover:bg-white transition-colors">
                <GoogleGIcon className="w-5 h-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-slate-800">
                  Find Us on Google
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-[1px] text-amber-400" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5">
                        <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
                      </svg>
                    ))}
                  </span>
                  5.0 rating &middot; Read reviews
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* For Buyers */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px]" style={{ background: 'linear-gradient(to right, #770088, #004CFF)' }} />
              For Buyers
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'First-Time Home Buying', href: '/first-time-buyers' },
                { label: 'Mortgage Calculator', href: '/mortgage-calculator' },
                { label: 'Relocation Services', href: '/relocation' },
                { label: "Buyer's Guide", href: '/buyers-guide' }
              ].map(({ label, href }, i) => (
                <li key={i}>
                  {href.includes('#') ? (
                    <a href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center group font-light">
                      <span className="w-0 group-hover:w-3 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ background: 'linear-gradient(to right, #770088, #004CFF)' }} />
                      {label}
                    </a>
                  ) : (
                    <Link to={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center group font-light">
                      <span className="w-0 group-hover:w-3 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ background: 'linear-gradient(to right, #770088, #004CFF)' }} />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* For Sellers */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px]" style={{ background: 'linear-gradient(to right, #028121, #004CFF)' }} />
              For Sellers
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Free Home Valuation', href: '/home-valuation' },
                { label: "Seller's Guide", href: '/sellers-guide' },
                { label: 'Marketing Your Home', href: '/marketing-your-home' },
                { label: 'Find a Listing Agent', href: '/about#team' }
              ].map(({ label, href }, i) => (
                <li key={i}>
                  {href.includes('#') ? (
                    <a href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center group font-light">
                      <span className="w-0 group-hover:w-3 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ background: 'linear-gradient(to right, #028121, #004CFF)' }} />
                      {label}
                    </a>
                  ) : (
                    <Link to={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center group font-light">
                      <span className="w-0 group-hover:w-3 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ background: 'linear-gradient(to right, #028121, #004CFF)' }} />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px]" style={{ background: 'linear-gradient(to right, #E50000, #FF8D00)' }} />
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Client Reviews', href: '/reviews' },
                { label: 'Community Hub', href: '/community' },
                { label: 'Blog & News', href: '/blog' },
                { label: 'Contact Support', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' }
              ].map(({ label, href }, i) => (
                <li key={i}>
                  {href.includes('#') ? (
                    <a href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center group font-light">
                      <span className="w-0 group-hover:w-3 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ background: 'linear-gradient(to right, #E50000, #FF8D00)' }} />
                      {label}
                    </a>
                  ) : (
                    <Link to={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center group font-light">
                      <span className="w-0 group-hover:w-3 h-px mr-0 group-hover:mr-2 transition-all duration-300" style={{ background: 'linear-gradient(to right, #E50000, #FF8D00)' }} />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-400 flex items-center gap-2">
            © 2026 GayRealEstateCT.net Made with &lt;3 for our community.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />
              <span>Fair Housing</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #6B008A, #004CFF)' }} />
              <span>Equal Opportunity</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #C0003A, #FF8D00)' }} />
              <span>LGBTQ+ Owned</span>
            </div>
          </div>
        </div>

      </div>


    </footer>
  );
};

export default Footer;