import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Lock, Eye, FileText, Trash2, CheckCircle, Smartphone, UserCheck } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const cards = [
        {
            icon: Eye,
            title: 'Information We Collect',
            details: [
                'Direct inquiries via our secure contact forms',
                'Property preferences for curated listings',
                'Anonymized website usage & traffic analytics',
                'General geographic location (city/state level)'
            ]
        },
        {
            icon: UserCheck,
            title: 'How We Use Your Data',
            details: [
                'Connecting you with an inclusive LGBTQ+ agent',
                'Sending relevant property market updates',
                'Improving our website browsing experience',
                'Ensuring a safe and secure inquiry process'
            ]
        },
        {
            icon: Lock,
            title: 'LGBTQ+ Privacy Guard',
            details: [
                'Strict confidentiality on identity & status',
                'Zero data sharing with employers or family',
                'No storage of identity-related marketing data',
                'Full discretion throughout the closing process'
            ]
        },
        {
            icon: Trash2,
            title: 'Your Data Rights',
            details: [
                'Right to request data access or deletion',
                'Right to correct inaccurate information',
                'Full compliance with CT Data Privacy laws',
                'No-commitment inquiry cancellation'
            ]
        }
    ];

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Privacy Policy & Data Protection | GayRealEstateCT.net"
                description="Our premium commitment to your privacy. Learn how we protect your data with a specific focus on LGBTQ+ security and non-disclosure."
                canonical="https://www.gayrealestatect.net/privacy-policy"
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
            <header className="relative pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden text-center text-balance">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.07),transparent_55%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.07),transparent_50%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-6 md:mb-8">
                        <Shield className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Premium Protection</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                        Secured Privacy.<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Total Discretion.</span>
                    </h1>
                    <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
                        We understand that privacy isn't just a legal requirement—it's a foundation of trust in the LGBTQ+ community. Our policy is built to keep your move confidential and your data secure.
                    </p>
                </div>
            </header>

            {/* Privacy Dashboard Grid */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pb-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <div key={i} className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-purple-200 transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-purple-50 transition-colors">
                                    <Icon className="w-6 h-6 text-purple-600/80" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-6">{card.title}</h2>
                                <ul className="space-y-4">
                                    {card.details.map((detail, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-600 text-sm md:text-base">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Secure Commitment Banner */}
                <div className="mt-8 md:mt-12 bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Non-Disclosure Guarantee</h2>
                            <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                                Our team members are part of the CT LGBTQ+ Real Estate Alliance. We will never share your inquiry with neighbors, family, or employers without your explicit consent. Your move is your business.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <a 
                                href="/#contact" 
                                className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl hover:bg-purple-50 transition-all flex items-center gap-3 shadow-xl"
                            >
                                Contact Privacy Officer <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Legal Links Footer Area */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-24 text-center">
                <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest font-bold mb-8">Data Governance & Compliance</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-10 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
                        <Smartphone className="w-4 h-4" /> SSL Encrypted
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
                        <FileText className="w-4 h-4" /> CT Privacy Act Compliant
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
                        <Lock className="w-4 h-4" /> No Third-Party Selling
                    </div>
                </div>
                <div className="mt-16 text-slate-400 text-[10px] md:text-xs max-w-2xl mx-auto leading-relaxed">
                    GayRealEstateCT.net is a premium real estate platform serving the Connecticut community. We use industry-standard encryption for all data transmissions. This policy is updated periodically to reflect new legal standards and technological upgrades.
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
