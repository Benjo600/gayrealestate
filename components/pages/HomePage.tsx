import React, { Suspense, lazy } from 'react';
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
import { Home, Search, Heart, BookOpen } from 'lucide-react';

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

    // Breadcrumb only — no FAQPage schema without a visible FAQ UI (GEO/trust)
    const homepageStructuredData = [
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

