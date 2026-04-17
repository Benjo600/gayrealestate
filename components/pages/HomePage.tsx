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
import { ScrollToTop } from '../ui/scroll-to-top';
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
                ogImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=60&w=1200&auto=format&fit=crop"
                ogImageAlt="Modern luxury home — GayRealEstateCT.net"
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
                    <div className="content-auto border-t border-purple-50">
                        <AgentFinder />
                    </div>
                    <div className="content-auto">
                        <CommunitySpotlight />
                    </div>
                    <div className="content-auto">
                        <Resources />
                    </div>
                    <div className="content-auto">
                        <EnquiryForm />
                    </div>
                </Suspense>
                <Footer />
            </main>
            <ScrollToTop />
        </div>
    );
};

export default HomePage;

