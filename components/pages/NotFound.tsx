import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import SEOHead from '../SEOHead';
import Footer from '../Footer';

const NotFound: React.FC = () => {
    return (
        <div 
            className="min-h-screen font-sans flex flex-col selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Page Not Found | GayRealEstateCT.net"
                description="The page you are looking for could not be found."
                noIndex={true} // Crucial for 404s so Google doesn't index them
            />

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden h-[80vh]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.04),transparent_55%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.04),transparent_50%)] pointer-events-none" />
                
                <div className="relative z-10 space-y-6">
                    <h1 
                        className="text-8xl md:text-9xl font-display font-black tracking-tight"
                        style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                    >
                        404
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900">
                        Looks like you're lost.
                    </h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/60 backdrop-blur-sm border border-purple-200/60 text-slate-700 font-semibold rounded-full hover:bg-white hover:border-purple-300 shadow-sm transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </Link>
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                        >
                            <Home className="w-4 h-4" /> Homepage
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
