import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, DollarSign, Calculator, TrendingDown, Info, RefreshCw } from 'lucide-react';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { ContactModal } from '../ui/ContactModal';

const MortgageCalculator: React.FC = () => {
    const [homePrice, setHomePrice] = useState(450000);
    const [downPayPct, setDownPayPct] = useState(20);
    const [interestRate, setInterestRate] = useState(6.875);
    const [loanTerm, setLoanTerm] = useState(30);
    const [propertyTax, setPropertyTax] = useState(6500);
    const [homeInsurance, setHomeInsurance] = useState(1800);
    const [hoa, setHoa] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [results, setResults] = useState<{
        monthlyTotal: number;
        principal: number;
        pAndI: number;
        monthlyTax: number;
        monthlyInsurance: number;
        monthlyHoa: number;
        pmi: number;
        loanAmount: number;
        totalInterest: number;
        totalCost: number;
        downPayAmount: number;
    } | null>(null);

    const calculate = useCallback(() => {
        const downPayAmount = homePrice * (downPayPct / 100);
        const loanAmount = homePrice - downPayAmount;
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTerm * 12;

        let pAndI = 0;
        if (monthlyRate > 0) {
            pAndI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        } else {
            pAndI = loanAmount / numPayments;
        }

        const monthlyTax = propertyTax / 12;
        const monthlyInsurance = homeInsurance / 12;
        const monthlyHoa = hoa;
        // PMI applies if down payment < 20%
        const pmi = downPayPct < 20 ? (loanAmount * 0.005) / 12 : 0;
        const monthlyTotal = pAndI + monthlyTax + monthlyInsurance + monthlyHoa + pmi;

        const totalInterest = (pAndI * numPayments) - loanAmount;
        const totalCost = loanAmount + totalInterest + (monthlyTax + monthlyInsurance) * numPayments;
        const principal = loanAmount;

        setResults({ monthlyTotal, pAndI, principal, monthlyTax, monthlyInsurance, monthlyHoa, pmi, loanAmount, totalInterest, totalCost, downPayAmount });
    }, [homePrice, downPayPct, interestRate, loanTerm, propertyTax, homeInsurance, hoa]);

    useEffect(() => { calculate(); }, [calculate]);
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
    const fmtDec = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

    type SliderInputProps = {
        label: string;
        value: number;
        min: number;
        max: number;
        step: number;
        onChange: (v: number) => void;
        prefix?: string;
        suffix?: string;
        format?: (v: number) => string;
    };

    const SliderInput = ({ label, value, min, max, step, onChange, prefix = '', suffix = '', format }: SliderInputProps) => (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">{label}</label>
                <div className="flex items-center gap-1 px-3 py-1 bg-brand-50 border border-brand-200 rounded-lg">
                    <span className="text-xs text-brand-600 font-medium">{prefix}</span>
                    <input
                        type="number"
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
                        className="w-20 text-sm font-bold text-brand-700 bg-transparent text-right focus:outline-none"
                    />
                    <span className="text-xs text-brand-600 font-medium">{suffix}</span>
                </div>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
                <span>{format ? format(min) : `${prefix}${min.toLocaleString()}${suffix}`}</span>
                <span>{format ? format(max) : `${prefix}${max.toLocaleString()}${suffix}`}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <SEOHead
                title="Connecticut Mortgage Calculator | LGBTQ+ Home Buying | GayRealEstate.com"
                description="Estimate your monthly mortgage payment for Connecticut homes. Includes principal, interest, taxes, insurance, PMI, and HOA. LGBTQ+-friendly mortgage guidance included."
                canonical="https://www.gayrealestateconnecticut.com/mortgage-calculator"
                keywords="Connecticut mortgage calculator, CT home loan calculator, LGBTQ mortgage estimate, monthly mortgage payment calculator Connecticut"
            />

            {/* Back Nav */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-semibold text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pt-24 md:pt-32 pb-10 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(124,58,237,0.2),transparent_60%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-5 md:mb-6">
                        <Calculator className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" />
                        <span className="text-[10px] md:text-xs font-bold text-gold-300 uppercase tracking-widest">Mortgage Calculator</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-3 md:mb-4 leading-tight">
                        Know Your Numbers <span className="bg-gradient-to-r from-brand-300 to-gold-300 bg-clip-text text-transparent">Before You Shop</span>
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto font-light">
                        Estimate your real monthly payment — including taxes, insurance, and PMI. No email required.
                    </p>
                </div>
            </header>

            {/* Calculator */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* Inputs Panel */}
                    <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 p-5 md:p-8 space-y-6 md:space-y-8">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-100 rounded-lg md:rounded-xl flex items-center justify-center">
                                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-brand-600" />
                            </div>
                            <h2 className="text-lg md:text-xl font-bold text-slate-900">Loan Details</h2>
                        </div>

                        <SliderInput label="Home Price" value={homePrice} min={100000} max={2000000} step={5000} onChange={setHomePrice} prefix="$" format={(v) => `$${(v / 1000).toFixed(0)}k`} />
                        <SliderInput label="Down Payment" value={downPayPct} min={0} max={60} step={1} onChange={setDownPayPct} suffix="%" />
                        <SliderInput label="Interest Rate" value={interestRate} min={2} max={12} step={0.125} onChange={setInterestRate} suffix="%" />
                        <SliderInput label="Loan Term" value={loanTerm} min={10} max={30} step={5} onChange={setLoanTerm} suffix=" yrs" />

                        <div className="border-t border-slate-100 pt-6 md:pt-8 space-y-6 md:space-y-8">
                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gold-100 rounded-lg md:rounded-xl flex items-center justify-center">
                                    <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-gold-600" />
                                </div>
                                <h2 className="text-lg md:text-xl font-bold text-slate-900">Monthly Costs</h2>
                            </div>
                            <SliderInput label="Annual Property Tax" value={propertyTax} min={0} max={30000} step={100} onChange={setPropertyTax} prefix="$" />
                            <SliderInput label="Annual Home Insurance" value={homeInsurance} min={0} max={10000} step={50} onChange={setHomeInsurance} prefix="$" />
                            <SliderInput label="Monthly HOA" value={hoa} min={0} max={2000} step={25} onChange={setHoa} prefix="$" />
                        </div>

                        <button
                            onClick={calculate}
                            className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-xl hover:from-brand-500 hover:to-brand-600 transition-all duration-300 shadow-lg hover:shadow-brand-500/30 flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Recalculate
                        </button>
                    </div>

                    {/* Results Panel */}
                    {results && (
                        <div className="lg:col-span-2 space-y-6 sticky top-8">
                            {/* Main Result */}
                            <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,0.2),transparent_60%)]" />
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-gold-400 to-brand-500" />
                                <div className="relative z-10">
                                    <p className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-widest mb-1 md:mb-2">Estimated Monthly Payment</p>
                                    <p className="text-5xl md:text-6xl font-bold text-white mb-1">{fmt(results.monthlyTotal)}</p>
                                    <p className="text-slate-400 text-sm">per month</p>
                                    <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                                        {[
                                            { label: 'Loan Amount', val: fmt(results.loanAmount) },
                                            { label: 'Down Payment', val: fmt(results.downPayAmount) },
                                        ].map(({ label, val }) => (
                                            <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                                                <p className="text-xs text-slate-400 mb-1">{label}</p>
                                                <p className="text-base font-bold text-white">{val}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide">Monthly Breakdown</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Principal & Interest', val: results.pAndI, color: 'bg-brand-500' },
                                        { label: 'Property Tax', val: results.monthlyTax, color: 'bg-gold-500' },
                                        { label: 'Home Insurance', val: results.monthlyInsurance, color: 'bg-green-500' },
                                        ...(results.pmi > 0 ? [{ label: 'PMI', val: results.pmi, color: 'bg-red-400' }] : []),
                                        ...(results.monthlyHoa > 0 ? [{ label: 'HOA', val: results.monthlyHoa, color: 'bg-slate-400' }] : []),
                                    ].map(({ label, val, color }) => (
                                        <div key={label} className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${color}`} />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm text-slate-600">{label}</span>
                                                    <span className="text-sm font-bold text-slate-800">{fmtDec(val)}/mo</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(100, (val / results.monthlyTotal) * 100)}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Lifetime Totals */}
                            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide">Over {loanTerm} Years</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Total Principal Paid', val: fmt(results.principal) },
                                        { label: 'Total Interest Paid', val: fmt(results.totalInterest) },
                                        { label: 'Total Cost of Home', val: fmt(results.totalCost) },
                                    ].map(({ label, val }) => (
                                        <div key={label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                                            <span className="text-sm text-slate-600">{label}</span>
                                            <span className="text-sm font-bold text-slate-800">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {results.pmi > 0 && (
                                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-800 leading-relaxed">
                                        <strong>PMI notice:</strong> Your down payment is under 20%, so PMI of {fmt(results.pmi)}/mo applies. It typically drops off once you reach 20% equity. Our lender Jake Earl can explore PMI-avoidance strategies for you.
                                    </p>
                                </div>
                            )}

                            <button onClick={() => setIsModalOpen(true)} className="block w-full py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-xl text-center hover:from-brand-500 hover:to-brand-600 transition-all shadow-lg hover:shadow-brand-500/30 text-sm">
                                Talk to Our Partner Lender — Jake Earl <ArrowRight className="inline w-4 h-4 ml-1" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section className="bg-white py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6 md:mb-8 text-center">Understanding Your Connecticut Mortgage</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                        {[
                            { title: 'CT Property Taxes', body: 'Connecticut property taxes vary significantly by town. West Hartford averages ~1.4%, while Hartford can exceed 3%. Our agents will help you understand the real monthly cost before you make an offer.' },
                            { title: 'CHFA Programs', body: 'Connecticut Housing Finance Authority offers below-market rates and down payment assistance for qualifying first-time buyers. Our partner lender Jake Earl works extensively with CHFA loans.' },
                            { title: 'Rate Lock Strategy', body: 'Rates fluctuate daily. A good lender will advise on optimal rate lock timing during your transaction — especially in a volatile market. Locking too early or too late can cost thousands.' },
                        ].map(({ title, body }) => (
                            <div key={title} className="bg-slate-50 rounded-xl md:rounded-2xl p-5 md:p-6">
                                <h3 className="font-bold text-slate-900 mb-2 md:mb-3 text-[15px] md:text-lg">{title}</h3>
                                <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {isModalOpen && (
                <ContactModal
                    agentName="Jake Earl"
                    agentTitle="Senior Vice President | Mortgage Banker"
                    defaultMethod="schedule"
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default MortgageCalculator;
