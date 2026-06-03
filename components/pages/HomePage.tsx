import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { HeroGeometric } from '../ui/shape-landing-hero';
import Header from '../Header';
import AnimatedGradientBackground from '../ui/animated-gradient-background';
// Lazy load below-the-fold components
const Features = lazy(() => import('../Features'));
const AgentFinder = lazy(() => import('../AgentFinder'));
const Resources = lazy(() => import('../Resources'));
const CommunitySpotlight = lazy(() => import('../CommunitySpotlight'));
const EnquiryForm = lazy(() => import('../EnquiryForm'));
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { Home, Search, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';

// Loading skeleton for lazy components
const SectionLoader = () => (
    <div className="w-full h-48 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
    </div>
);

const BASE_URL = 'https://www.gayrealestatect.net';

const HomePage: React.FC = () => {
    const navItems = [
        { name: 'Home', url: '#hero', icon: Home },
        { name: 'Find Agent', url: '#find-agent', icon: Search },
        { name: 'Resources', url: '#resources', icon: BookOpen },
        { name: 'Why Us', url: '#why-us', icon: Heart }
    ];

    const homepageStructuredData = [
        // BreadcrumbList
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: `${BASE_URL}/`,
                },
            ],
        },
        // FAQPage — helps win rich results for common questions
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'What is GayRealEstateCT.net?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'GayRealEstateCT.net is a one-stop real estate service connecting the LGBTQ+ community with trusted, inclusive agents, mortgage lenders, and attorneys in Connecticut.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'How do I find an LGBTQ+ friendly real estate agent?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Browse our curated network of LGBTQ+ friendly professionals directly on our website. Each agent profile includes credentials, specialties, and community involvement.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'What areas of Connecticut do you serve?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'We serve all of Connecticut, with specialized knowledge in areas including Litchfield County, the Farmington Valley, and the greater Hartford area.',
                    },
                },
            ],
        },
    ];

    return (
        <div className="h-auto bg-champagne-50 font-sans relative selection:bg-brand-500/20 selection:text-brand-900">

            {/* Page-level SEO */}
            <SEOHead
                title="GayRealEstateCT.net | LGBTQ+ Friendly Real Estate Agents in Connecticut"
                description="Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut. GayRealEstateCT.net — your one-stop shop for inclusive home buying and selling."
                canonical={`${BASE_URL}/`}
                ogType="website"
                ogImage="https://www.gayrealestatect.net/hero-house.png"
                ogImageAlt="GayRealEstateCT.net — LGBTQ+ Friendly Real Estate in Connecticut"
                keywords="LGBTQ real estate, gay friendly realtor, Connecticut real estate agents, inclusive housing, LGBTQ mortgage lender, LGBTQ attorney, buy home Connecticut"
                structuredData={homepageStructuredData}
            />

            {/* Global Premium Animated Background - Fixed */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatedGradientBackground
                    gradientColors={[
                        "#fdfcf9", // Champagne white
                        "#fef2f2", // Light red
                        "#fffbeb", // Light orange/yellow
                        "#f0fdf4", // Light green
                        "#eff6ff", // Light blue
                        "#f5f3ff", // Light purple
                        "#fdfcf9"  // Champagne white
                    ]}
                    gradientStops={[0, 15, 30, 45, 60, 80, 100]}
                    animationSpeed={15}
                />
            </div>

            {/* Header / Navbar */}
            <Header />

            {/* Integrated Hero */}
            <main className="relative z-10 mobile-gpu-boost">
                <div id="hero" className="relative z-20">
                    <HeroGeometric />
                </div>

                <Suspense fallback={<SectionLoader />}>
                    <div className="content-auto">
                        <Features />
                    </div>
                </Suspense>
                
                <Suspense fallback={<SectionLoader />}>
                    <div className="content-auto border-t border-purple-50">
                        <AgentFinder />
                    </div>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <div className="content-auto">
                        <CommunitySpotlight />
                    </div>
                </Suspense>

                {/* Featured Pride Month 2026 Guide — placed right after Community Spotlight */}
                {(() => {
                    const post = BLOG_POSTS.find(p => p.id === 29);
                    if (!post) return null;
                    return (
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                            <Link
                                to={`/blog/${post.slug}`}
                                className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-purple-300/60 transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-5 left-5">
                                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-brand-700 rounded-lg shadow-sm border border-brand-100">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center md:w-3/5">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-500 mb-3">Featured Guide · {post.readTime}</p>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed mb-8 font-light">
                                        {post.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest text-brand-500 uppercase group-hover:text-brand-700 transition-colors">
                                        Read the Full Guide
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    );
                })()}

                <Suspense fallback={<SectionLoader />}>
                    <div className="content-auto">
                        <Resources />
                    </div>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <div className="content-auto">
                        <EnquiryForm />
                    </div>
                </Suspense>
                <Footer />
            </main>
        </div>
    );
};

export default HomePage;

