import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import EnquiryForm from '../EnquiryForm';

const BASE_URL = 'https://www.gayrealestatect.net';

const contactStructuredData = [
    {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact GayRealEstateCT.net',
        description: 'Contact our LGBTQ+-led real estate team in Connecticut. Reach out to connect with a trusted inclusive agent, lender, or attorney.',
        url: `${BASE_URL}/contact`,
        isPartOf: { '@type': 'WebSite', url: BASE_URL },
        mainEntity: {
            '@type': 'RealEstateAgent',
            name: 'GayRealEstateCT.net',
            url: BASE_URL,
            areaServed: { '@type': 'State', name: 'Connecticut' },
        },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
        ],
    },
];

const ContactPage: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen font-sans">
            <SEOHead
                title="Contact Us | GayRealEstateCT.net — LGBTQ+ Real Estate Connecticut"
                description="Get in touch with our LGBTQ+-led Connecticut real estate team. Connect with a trusted agent, mortgage lender, or attorney who understands your community."
                canonical={`${BASE_URL}/contact`}
                keywords="contact GayRealEstateCT, LGBTQ real estate agent Connecticut contact, gay realtor CT phone email"
                ogImage={`${BASE_URL}/hero-house.png`}
                ogImageAlt="Contact GayRealEstateCT.net — LGBTQ+ Real Estate in Connecticut"
                structuredData={contactStructuredData}
            />

            <nav className="absolute top-0 left-0 right-0 p-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-semibold text-slate-700 hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </nav>

            <div className="pt-16">
                <EnquiryForm />
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
