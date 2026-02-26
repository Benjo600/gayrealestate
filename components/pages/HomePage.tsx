import React from 'react';
import { HeroGeometric } from '../ui/shape-landing-hero';
import Header from '../Header';
import AnimatedGradientBackground from '../ui/animated-gradient-background';
import Features from '../Features';
import AgentFinder from '../AgentFinder';
import Resources from '../Resources';
import EnquiryForm from '../EnquiryForm';
import Footer from '../Footer';
import { ScrollToTop } from '../ui/scroll-to-top';
import SEOHead from '../SEOHead';
import { Home, Search, Heart, BookOpen } from 'lucide-react';

const BASE_URL = 'https://www.gayrealestateconnecticut.com';

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
                    name: 'What is GayRealEstate.com?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'GayRealEstate.com is a one-stop real estate service connecting the LGBTQ+ community with trusted, inclusive agents, mortgage lenders, and attorneys in Connecticut.',
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
                title="GayRealEstate.com | LGBTQ+ Friendly Real Estate Agents in Connecticut"
                description="Find trusted, LGBTQ+ friendly real estate agents, mortgage lenders, and attorneys in Connecticut. GayRealEstate.com — your one-stop shop for inclusive home buying and selling."
                canonical={`${BASE_URL}/`}
                ogType="website"
                ogImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=60&w=1200&auto=format&fit=crop"
                ogImageAlt="Modern luxury home — GayRealEstate.com"
                keywords="LGBTQ real estate, gay friendly realtor, Connecticut real estate agents, inclusive housing, LGBTQ mortgage lender, LGBTQ attorney, buy home Connecticut"
                structuredData={homepageStructuredData}
            />

            {/* Global Premium Animated Background - Fixed */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatedGradientBackground
                    gradientColors={[
                        "#fdfcf9", // Champagne white
                        "#f9f6f0", // Soft champagne
                        "#f5f3ff", // Light violet
                        "#fdf9e7", // Light gold
                        "#fdfcf9"  // Champagne white
                    ]}
                    gradientStops={[0, 25, 50, 75, 100]}
                    animationSpeed={0.001}
                    breathingRange={3}
                />
            </div>

            {/* Header / Navbar */}
            <Header />

            {/* Integrated Hero */}
            <main className="relative z-10">
                <div id="hero" className="relative z-20">
                    <HeroGeometric />
                </div>

                <Features />
                <AgentFinder />
                <Resources />
                <EnquiryForm />
                <Footer />
            </main>
            <ScrollToTop />
        </div>
    );
};

export default HomePage;

