import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const sections = [
    {
        title: 'Information We Collect',
        content: `When you use GayRealEstateCT.net, we may collect the following types of information:

**Information you provide directly:**
- Contact information (name, email address, phone number)
- Property information submitted through valuation or inquiry forms
- Messages and communications you send through our contact forms

**Information collected automatically:**
- Browser type and version
- Pages visited and time spent on pages
- Referring website or search query
- General geographic location (city/state level, based on IP)

We do not collect sensitive personal information such as Social Security numbers, financial account numbers, or payment card information through this website.`,
    },
    {
        title: 'How We Use Your Information',
        content: `We use the information we collect to:

- Respond to your inquiries and provide the services you request
- Connect you with the appropriate agent or professional on our team
- Send you relevant property information, market updates, and resources you've requested
- Improve our website and service offerings
- Comply with applicable legal obligations

We do not sell your personal information to third parties. We do not share your information with data brokers or marketing aggregators.`,
    },
    {
        title: 'Cookies and Tracking Technologies',
        content: `Our website may use cookies and similar tracking technologies to:

- Remember your preferences and settings
- Understand how visitors use our site (analytics)
- Display relevant advertising on third-party platforms (if you have opted in)

You can control cookies through your browser settings. Disabling cookies may affect some functionality of our website. We use Google Analytics for anonymous traffic analysis. For more information on how Google handles this data, visit google.com/analytics/terms.`,
    },
    {
        title: 'Third-Party Services',
        content: `We use select third-party services to operate our website and communications:

- **Email communications**: We may use third-party email platforms to send inquiry confirmations and updates. These platforms process your email address in accordance with their own privacy policies.
- **Analytics**: We use Google Analytics to understand traffic patterns. This data is anonymized and aggregated.
- **Hosting and infrastructure**: Our website is hosted on secure, industry-standard hosting services.

We do not share your identifiable personal information with these services beyond what is necessary to operate our website.`,
    },
    {
        title: 'Data Retention',
        content: `We retain your personal information for as long as necessary to:

- Provide the services you've requested
- Maintain records required for our real estate operations
- Comply with applicable legal and regulatory requirements

If you wish to request deletion of your personal data from our systems, please contact us at the email address listed below. We will respond within 30 days.`,
    },
    {
        title: 'LGBTQ+ Privacy Commitment',
        content: `We recognize that for some members of the LGBTQ+ community — particularly those who are not yet fully out in all areas of their lives — privacy around their real estate activities is especially important.

We take this seriously. We will never:
- Share your inquiry or contact information with your employer, family members, neighbors, or any third party without your explicit consent
- Use your sexual orientation or gender identity in any marketing or data-sharing activity
- Store or process information about your identity in ways beyond what's necessary for your real estate transaction

If you have specific privacy concerns about how you engage with us, please reach out directly. We're happy to discuss accommodations.`,
    },
    {
        title: 'Your Rights (Connecticut Residents)',
        content: `As a Connecticut resident, you have rights under Connecticut's data privacy laws, including the right to:

- **Know** what personal data we hold about you
- **Correct** inaccurate personal data
- **Delete** your personal data (subject to certain legal exceptions)
- **Opt out** of the sale of your personal data (we do not sell personal data)
- **Non-discrimination** — exercising any of these rights will not affect the quality of our services

To exercise any of these rights, contact us securely via our website's contact form. We will respond within 45 days as required by law.`,
    },
    {
        title: 'Security',
        content: `We implement reasonable technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:

- SSL/TLS encryption for all data transmission
- Access controls limiting who on our team can access your information
- Regular security reviews of our systems and practices

No internet transmission or electronic storage is 100% secure. If you have reason to believe your information has been compromised, please contact us immediately.`,
    },
    {
        title: 'Children\'s Privacy',
        content: `Our services are intended for adults. We do not knowingly collect personal information from individuals under the age of 18. If you believe a minor has provided personal information through our website, please contact us and we will promptly delete it.`,
    },
    {
        title: 'Changes to This Policy',
        content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will post the updated policy on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.

Material changes — changes that significantly affect how we handle your personal information — will be communicated via prominent notice on our website.`,
    },
    {
        title: 'Contact Us',
        content: `If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us:

**GayRealEstateCT.net — Connecticut**
Contact Form: https://www.gayrealestatect.net/#contact
Phone: (860) 404-2188

We are committed to resolving privacy concerns promptly and transparently.`,
    },
];

const PrivacyPolicy: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const renderContent = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold text-slate-900 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('- ')) {
                const parts = line.substring(2).split('**');
                return (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                        <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-slate-700">{p}</strong> : p)}</span>
                    </li>
                );
            }
            if (line === '') return <div key={i} className="h-2" />;
            const parts = line.split('**');
            return (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">
                    {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-800">{part}</strong> : part)}
                </p>
            );
        });
    };

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Privacy Policy | GayRealEstateCT.net"
                description="GayRealEstateCT.net privacy policy — how we collect, use, and protect your personal information, with a specific commitment to LGBTQ+ community privacy."
                canonical="https://www.gayrealestatect.net/privacy-policy"
                keywords="GayRealEstateCT.net privacy policy, Connecticut real estate privacy"
                noIndex={false}
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
                        <Shield className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Privacy Policy</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 leading-tight">
                        Your Privacy Matters.<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Especially Here.</span>
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-3 md:mt-4 font-medium uppercase tracking-wider">Last Updated: February 25, 2026</p>
                </div>
            </header>

            {/* Intro */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
                <div className="bg-white/60 backdrop-blur-md border border-purple-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                        GayRealEstateCT.net is committed to protecting your privacy. We understand that for many people in the LGBTQ+ community, privacy around real estate activities is not just a preference — it's a matter of personal safety and comfort. This policy explains what information we collect, how we use it, and the specific commitments we make to our community. If you have any questions, please don't hesitate to <a href="/#contact" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: '#6B008A' }}>contact us directly</a>.
                    </p>
                </div>
            </section>

            {/* Sections */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16 md:pb-24 space-y-6 md:space-y-8 relative z-10">
                {sections.map((section, i) => (
                    <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 overflow-hidden">
                        <div className="px-6 py-5 md:px-10 md:py-6 border-b border-purple-100/50" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(247,242,255,0.8))' }}>
                            <h2 className="font-display font-bold text-lg md:text-xl text-slate-900">{section.title}</h2>
                        </div>
                        <div className="px-6 py-6 md:px-10 md:py-8 space-y-1">
                            {renderContent(section.content)}
                        </div>
                    </div>
                ))}
            </section>

            {/* Footer CTA */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-20 relative z-10">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-purple-100 p-10 md:p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <p className="text-slate-600 mb-6 font-medium text-lg">Questions about your privacy or how we handle your data?</p>
                    <a 
                        href="/#contact" 
                        className="inline-flex items-center gap-3 px-10 py-4 text-white font-bold rounded-full hover:opacity-90 transition-opacity shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                    >
                        Email Us Directly <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
