import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const sections = [
    {
        title: 'Information We Collect',
        content: `When you use GayRealEstate.com, we may collect the following types of information:

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

To exercise any of these rights, contact us at info@gayrealestateconnecticut.com. We will respond within 45 days as required by law.`,
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

**GayRealEstate.com — Connecticut**
Email: info@gayrealestateconnecticut.com
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
        <div className="min-h-screen bg-slate-50">
            <SEOHead
                title="Privacy Policy | GayRealEstate.com"
                description="GayRealEstate.com privacy policy — how we collect, use, and protect your personal information, with a specific commitment to LGBTQ+ community privacy."
                canonical="https://www.gayrealestateconnecticut.com/privacy-policy"
                keywords="GayRealEstate.com privacy policy, Connecticut real estate privacy"
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
            <header className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_60%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-white/10 rounded-full border border-white/10 mb-6 md:mb-8">
                        <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" />
                        <span className="text-[10px] md:text-xs font-bold text-gold-300 uppercase tracking-widest">Privacy Policy</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 md:mb-4 leading-tight">
                        Your Privacy Matters.<br />
                        <span className="bg-gradient-to-r from-brand-300 to-gold-300 bg-clip-text text-transparent">Especially Here.</span>
                    </h1>
                    <p className="text-slate-400 text-xs md:text-sm mt-3 md:mt-4">Last Updated: February 25, 2026</p>
                </div>
            </header>

            {/* Intro */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="bg-brand-50 border border-brand-100 rounded-xl md:rounded-2xl p-5 md:p-8">
                    <p className="text-slate-700 text-[13px] md:text-base leading-relaxed">
                        GayRealEstate.com is committed to protecting your privacy. We understand that for many people in the LGBTQ+ community, privacy around real estate activities is not just a preference — it's a matter of personal safety and comfort. This policy explains what information we collect, how we use it, and the specific commitments we make to our community. If you have any questions, please don't hesitate to <a href="mailto:info@gayrealestateconnecticut.com" className="text-brand-600 font-semibold hover:underline">contact us directly</a>.
                    </p>
                </div>
            </section>

            {/* Sections */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16 md:pb-24 space-y-6 md:space-y-8">
                {sections.map((section, i) => (
                    <div key={i} className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-800 px-5 py-4 md:px-8 md:py-5">
                            <h2 className="text-white font-bold text-base md:text-lg font-serif">{section.title}</h2>
                        </div>
                        <div className="px-5 py-5 md:px-8 md:py-6 space-y-1">
                            {renderContent(section.content)}
                        </div>
                    </div>
                ))}
            </section>

            {/* Footer CTA */}
            <section className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-slate-600 mb-4">Questions about your privacy or how we handle your data?</p>
                    <a href="mailto:info@gayrealestateconnecticut.com" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-xl hover:from-brand-500 hover:to-brand-600 transition-all shadow-lg hover:shadow-brand-500/30">
                        Email Us Directly <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
