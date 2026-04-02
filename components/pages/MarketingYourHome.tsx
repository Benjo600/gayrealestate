import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Globe, Share2, Users, TrendingUp, CheckCircle, Star } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const strategies = [
    {
        icon: Camera,
        title: 'Professional Photography & Video',
        description: 'First impressions happen online — 97% of buyers search on the internet before ever visiting a home. We work with professional real estate photographers with twilight shoots, drone aerials where applicable, and video walkthroughs for out-of-state buyers.',
        stats: 'Homes with professional photography sell 32% faster and for an average of $11,000 more.',
        checklist: ['HDR professional photography', 'Twilight exterior shots', 'Drone aerials for properties with land', 'Video walkthrough for remote buyers'],
    },
    {
        icon: Globe,
        title: 'MLS + Major Portal Syndication',
        description: 'Your listing will appear on the CT MLS, Zillow, Realtor.com, Homes.com, Redfin, and dozens of syndicated partner sites the moment it goes live — giving maximum exposure from day one.',
        stats: 'Over 95% of buyers visit Zillow at some point in their search. We ensure your listing shines there.',
        checklist: ['CT MLS premium listing', 'Zillow, Realtor.com, Redfin, Homes.com', 'Facebook Marketplace real estate', 'Hundreds of syndicated partner portals'],
    },
    {
        icon: Share2,
        title: 'Targeted Social Media Advertising',
        description: 'We run geo-targeted Facebook and Instagram ad campaigns aimed at buyer profiles most likely to purchase your specific home — not just generic reach campaigns, but audience-targeted ads built on real buyer persona data.',
        stats: 'Our social ads campaigns reach qualified buyers actively looking in your price range and zip code.',
        checklist: ['Facebook + Instagram paid campaigns', 'Audience targeting by zip, income, and search behavior', 'Retargeting pool for engaged viewers', 'Ad spend included in listing service'],
    },
    {
        icon: Users,
        title: 'LGBTQ+ Buyer Network Outreach',
        description: 'Our network within the Connecticut LGBTQ+ Real Estate Alliance — and our connections to agents in NYC, Boston, and beyond who work with LGBTQ+ buyers looking to relocate — is a distribution channel no other CT brokerage can match.',
        stats: 'Many of our sales come through our LGBTQ+ network before the home even hits the public MLS.',
        checklist: ['CT LGBTQ+ Real Estate Alliance network', 'NYC and Boston relocation agent referrals', 'LGBTQ+ buyer community outreach', 'Off-market early access to vetted buyers'],
    },
    {
        icon: TrendingUp,
        title: 'Strategic Open Houses',
        description: 'Open houses aren\'t just for foot traffic. They create urgency and social proof — buyers who see other buyers interested are more likely to make competitive offers quickly. We choreograph open houses to maximize this psychological dynamic.',
        stats: 'Properties that hold a first open house within 3 days of listing receive 30% more offers on average.',
        checklist: ['Broker open house for agent network', 'Public open house within first weekend', 'Virtual open house for remote buyers', 'Post-open-house offer review strategy'],
    },
];

const MarketingYourHome: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Marketing Your Home in Connecticut | GayRealEstateCT.net"
                description="See how we market your Connecticut home to get top dollar — professional photography, MLS syndication, social media targeting, and LGBTQ+ buyer network outreach."
                canonical="https://www.gayrealestatect.net/marketing-your-home"
                keywords="how to market your home Connecticut, sell home fast CT, real estate marketing Connecticut, LGBTQ real estate marketing CT"
            />

            {/* Back Nav */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-semibold text-slate-700 hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.07),transparent_55%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.07),transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(119,0,136,0.06),transparent_55%)] pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-6 md:mb-8">
                        <Share2 className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Marketing Your Home</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                        Maximum Exposure.<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Maximum Result.</span>
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        We don't just list your home — we launch it. Here's exactly what our full-service marketing package includes, and why it produces results other agents can't match.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-10">
                        <a href="/#contact" className="px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                            List With Us <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                        <a href="/home-valuation" className="px-8 py-4 bg-white/60 backdrop-blur-sm border border-purple-200 text-slate-700 font-semibold rounded-full hover:bg-white hover:border-purple-300 shadow-sm transition-all">
                            Get a Free Valuation
                        </a>
                    </div>
                </div>
            </header>

            {/* Stats Strip */}
            <section className="bg-white/40 backdrop-blur-sm border-y border-purple-100/60 py-8 md:py-10">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                        {[
                            { n: '250+', label: 'LGBTQ+ Homes Sold', sub: 'Since 2020' },
                            { n: '102%', label: 'Avg. List-to-Sale', sub: 'Ratio in competitive towns' },
                            { n: '11 days', label: 'Avg. Days on Market', sub: 'West Hartford 2025' },
                            { n: '$0', label: 'Extra for Full Marketing', sub: 'Included in our service' },
                        ].map(({ n, label, sub }) => (
                            <div key={label}>
                                <p className="text-2xl md:text-4xl font-sans tracking-tight font-bold text-purple-600 mb-1">{n}</p>
                                <p className="text-[13px] md:text-sm font-semibold text-slate-800">{label}</p>
                                <p className="text-[11px] md:text-xs text-slate-500 mt-1">{sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategies */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 space-y-6 md:space-y-10">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">Our Full Marketing Stack</h2>
                    <p className="text-slate-600 text-[13px] md:text-lg max-w-2xl mx-auto">Every strategy below is included — not a premium add-on, not a negotiated perk. This is how we list every home.</p>
                </div>

                {strategies.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 overflow-hidden group hover:border-purple-300 hover:shadow-xl transition-all duration-500">
                            <div className="p-5 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-purple-700 transition-colors">{s.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-4 text-[13px] md:text-base">{s.description}</p>
                                    <div className="bg-purple-50/80 border border-purple-100 rounded-xl px-4 py-3 md:px-5 md:py-3 mb-4 md:mb-5 text-[13px] md:text-sm text-purple-800 font-medium italic">
                                        📊 {s.stats}
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {s.checklist.map((item, j) => (
                                            <li key={j} className="flex items-center gap-2 text-[13px] md:text-sm text-slate-600">
                                                <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Testimonial + CTA */}
            <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 md:px-6">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-12 text-center relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60">
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)' }} />
                    <div className="relative z-10">
                        <div className="flex justify-center gap-1 text-purple-400 text-lg md:text-xl mb-4 md:mb-6">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-purple-400" />)}
                        </div>
                        <blockquote className="text-slate-900 text-xl md:text-2xl font-display italic leading-relaxed mb-4 md:mb-6 max-w-2xl mx-auto">
                            "We had three agents come through. The marketing plan was not even close. Professional photos, a social ad campaign, and the LGBTQ+ network outreach — we had an accepted offer in 9 days."
                        </blockquote>
                        <p className="text-slate-600 font-medium text-xs md:text-sm mb-8 md:mb-12">— Seller, Glastonbury CT, 2025</p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <a href="/#contact" className="px-6 py-3.5 md:px-10 md:py-4 text-white font-bold rounded-xl md:rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base w-full sm:w-auto" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                Start Your Listing Conversation <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                            </a>
                            <a href="/home-valuation" className="px-6 py-3.5 md:px-10 md:py-4 bg-white border border-purple-100 text-slate-700 font-semibold rounded-xl md:rounded-2xl hover:border-purple-300 shadow-sm transition-all text-sm md:text-base flex justify-center w-full sm:w-auto">
                                Free Valuation First
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MarketingYourHome;
