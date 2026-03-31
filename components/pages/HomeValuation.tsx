import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home, TrendingUp, CheckCircle, Send, Phone, Mail } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';

const benefits = [
    { title: 'Accurate Local Comps', desc: 'We analyze recent sales within your neighborhood — not county-wide averages that can mislead by hundreds of thousands of dollars.' },
    { title: 'LGBTQ+-Aware Pricing', desc: 'We understand which CT neighborhoods are commanding premiums from LGBTQ+ buyers, and how to position your home accordingly.' },
    { title: 'No Pressure, No Obligation', desc: 'This is an information service, not a sales pitch. Use the valuation to make smart decisions — whether that\'s selling now, waiting, or just knowing.' },
    { title: `Your Personal Agent Review`, desc: `Unlike automated tools, your valuation comes with a real agent walkthrough — explaining the comps, adjustments, and what we'd do to maximize your number.` },
];

const HomeValuation: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', bedrooms: '', bathrooms: '', sqft: '', updates: '', timeline: '', notes: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1200));
        setSending(false);
        setSubmitted(true);
    };

    return (
        <div 
            className="min-h-screen font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Free Home Valuation in Connecticut | GayRealEstateCT.net"
                description="Get a free, accurate home valuation from LGBTQ+-allied Connecticut real estate agents. Know what your home is worth with real local comps — no algorithms, no pressure."
                canonical="https://www.gayrealestateconnecticut.com/home-valuation"
                keywords="free home valuation Connecticut, what is my home worth CT, Connecticut home value estimate LGBTQ, sell my Connecticut home"
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
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Free Home Valuation</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                        What Is Your<br />
                        <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Home Worth Today?</span>
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Get a free, agent-prepared home valuation — not an algorithm. Real comps. Local expertise. No strings attached.
                    </p>
                </div>
            </header>

            {/* Main Content: Form + Benefits */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white/70 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 p-6 md:p-10 relative z-10">
                            {submitted ? (
                                <div className="text-center py-10 md:py-16">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                        <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-3 md:mb-4">We've Got Your Request!</h2>
                                    <p className="text-slate-600 text-sm md:text-lg max-w-md mx-auto mb-6 md:mb-8">
                                        A member of our team will prepare your home valuation and reach out within <strong>24 hours</strong> — usually same business day.
                                    </p>
                                    <p className="text-slate-500 text-xs md:text-sm">Questions? <a href="/#contact" className="text-brand-600 hover:underline">Contact us</a></p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 md:mb-8">
                                        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-2">Request Your Free Valuation</h2>
                                        <p className="text-slate-600 text-[13px] md:text-sm">Fill in what you know — we'll handle the rest. Takes 2 minutes.</p>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                                                <input required name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                                                <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone (optional)</label>
                                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="(860) 555-0100" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Property Address *</label>
                                            <input required name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, West Hartford, CT 06110" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms</label>
                                                <select name="bedrooms" value={form.bedrooms} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm">
                                                    <option value="">Select</option>
                                                    {['1', '2', '3', '4', '5', '6+'].map(v => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Bathrooms</label>
                                                <select name="bathrooms" value={form.bathrooms} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm">
                                                    <option value="">Select</option>
                                                    {['1', '1.5', '2', '2.5', '3', '3.5', '4+'].map(v => <option key={v} value={v}>{v}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Sq Ft (est.)</label>
                                                <input name="sqft" value={form.sqft} onChange={handleChange} placeholder="1,800" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Recent Updates / Renovations</label>
                                            <input name="updates" value={form.updates} onChange={handleChange} placeholder="New kitchen 2022, roof replaced 2019, etc." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Selling Timeline</label>
                                            <select name="timeline" value={form.timeline} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm">
                                                <option value="">Not sure yet</option>
                                                <option value="asap">As soon as possible</option>
                                                <option value="3months">Within 3 months</option>
                                                <option value="6months">3–6 months</option>
                                                <option value="year">6–12 months</option>
                                                <option value="curious">Just curious about value</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Anything else we should know?</label>
                                            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Unique features, concerns, special circumstances..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none" />
                                        </div>
                                        <button type="submit" disabled={sending} className="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
                                            {sending ? (
                                                <><RefreshCwIcon /> Sending…</>
                                            ) : (
                                                <><Send className="w-4 h-4" /> Get My Free Valuation</>
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-slate-400">🔒 Your information is 100% private. We will not spam you or sell your data.</p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Benefits Sidebar */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6 sticky top-8">
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 text-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100/60 relative overflow-hidden z-10">
                            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)' }} />
                            <Home className="w-8 h-8 md:w-10 md:h-10 text-purple-500 mb-3 md:mb-4" />
                            <h3 className="text-xl md:text-2xl font-display font-bold mb-2 md:mb-3">Why a Real Agent Valuation?</h3>
                            <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed mb-4 md:mb-6">
                                Zillow's "Zestimate" can be off by $50,000–$150,000 in Connecticut. Our agents know your specific street, your specific buyer pool, and what updates actually add value vs. what looks nice but doesn't move the needle.
                            </p>
                            <div className="space-y-2 md:space-y-3">
                                {['Response within 24 hours', 'No obligation to list with us', 'Professional CMA report included', 'Based on real sold comps'].map((item) => (
                                    <div key={item} className="flex items-center gap-2 md:gap-3">
                                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500 flex-shrink-0" />
                                        <span className="text-[13px] md:text-sm text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {benefits.map((b, i) => (
                            <div key={i} className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-1 md:mb-2 text-[15px] md:text-base">{b.title}</h4>
                                <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed">{b.desc}</p>
                            </div>
                        ))}

                        <div className="bg-brand-50 border border-brand-200 rounded-xl md:rounded-2xl p-5 md:p-6">
                            <p className="text-brand-800 font-semibold text-[13px] md:text-sm mb-2 md:mb-3">Prefer to connect directly?</p>
                            <a href="/#contact" className="inline-flex items-center gap-2 text-brand-700 font-bold hover:text-brand-900 transition-colors mb-2 text-sm md:text-base border border-brand-300 px-4 py-2 rounded-lg bg-white shadow-sm">
                                Open Contact Form <ArrowRight className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

function RefreshCwIcon() {
    return (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
    );
}

export default HomeValuation;
