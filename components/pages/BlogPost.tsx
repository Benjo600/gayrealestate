import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    Calendar, 
    Clock, 
    User, 
    ArrowRight, 
    Star, 
    Send, 
    CheckCircle2, 
    Share2, 
    Twitter, 
    Facebook, 
    Linkedin as LinkedInIcon,
    ChevronRight,
    Bookmark
} from 'lucide-react';


import { BLOG_POSTS } from '../../data/blogs';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { agents } from '../../data/agents';

const BASE_URL = 'https://www.gayrealestatect.net';

const AUTHOR_AGENT_MAP: Record<string, string> = {
    'Arek Wtulich': 'arek',
    'Abby Dudarewicz': 'abby',
    'Travis Lipinski': 'travis',
    'Jake Earl': 'jake',
    'Carolyn Futtner': 'carolyn',
};

// ─── Inline Blog CTA Form ────────────────────────────────────────────────────
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface BlogCTAFormProps {
    postTitle: string;
    authorName: string;
}

const BlogCTAForm: React.FC<BlogCTAFormProps> = ({ postTitle, authorName }) => {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

    const change = (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm(prev => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
            const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

            if (!token || !chatId || token === 'YOUR_BOT_TOKEN_HERE') {
                throw new Error('Telegram credentials not configured.');
            }

            const now = new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
                dateStyle: 'medium',
                timeStyle: 'short',
            });

            const text = [
                `📰 *Blog Enquiry — "${postTitle}"*`,
                `_Submitted by a reader of ${authorName}'s article_`,
                '',
                `👤 *Name:* ${form.name}`,
                `📧 *Email:* ${form.email}`,
                `📞 *Phone:* ${form.phone}`,
                `💬 *Message:* ${form.message || 'None'}`,
                '',
                `🕐 _Received: ${now} ET_`,
            ].join('\n');

            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
            });

            if (!res.ok) throw new Error('Telegram API error');
            setStatus('success');
        } catch (err: unknown) {
            setErrorMsg('Something went wrong. Please try again.');
            setStatus('error');
            setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
        }
    };

    const inputCls = 'w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400/20 focus:border-brand-400 transition-all text-sm';

    if (status === 'success') {
        return (
            <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Expert Consultation Booked</h3>
                <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    A specialist will be in touch shortly to assist with your journey.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                   <input required value={form.name} onChange={change('name')} placeholder="Full Name *" className={inputCls} />
                </div>
                <div>
                   <input required type="email" value={form.email} onChange={change('email')} placeholder="Email Address *" className={inputCls} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                   <input required type="tel" value={form.phone} onChange={change('phone')} placeholder="Phone Number *" className={inputCls} />
                </div>
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                >
                    {status === 'submitting' ? 'Booking...' : 'Get Free Consultation'}
                </button>
            </div>
            {status === 'error' && <p className="text-xs text-red-600">{errorMsg}</p>}
        </form>
    );
};

// ────────────────────────────────────────────────────────────────────────────

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = BLOG_POSTS.find(p => p.slug === slug);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Extract headings for Table of Contents
    useEffect(() => {
        if (post && contentRef.current) {
            const hElements = contentRef.current.querySelectorAll('h2');
            const hData = Array.from(hElements).map((h, i) => {
                const id = `heading-${i}`;
                (h as HTMLElement).id = id;
                return { id, text: (h as HTMLElement).innerText };
            });
            setHeadings(hData);
        }
    }, [post]);

    // Handle scroll progress and active section
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollProgress((totalScroll / windowHeight) * 100);

            // Find active heading (using standard find with reversed array for compatibility)
            const hElements = Array.from(document.querySelectorAll('h2'));
            const currentHeading = [...hElements].reverse().find(h => h.getBoundingClientRect().top < 150);
            if (currentHeading) setActiveId(currentHeading.id);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (post) window.scrollTo(0, 0);
    }, [post]);

    const agentId = post ? AUTHOR_AGENT_MAP[post.author] : undefined;
    const agent = agentId ? agents[agentId] : undefined;

    const blogSEOData = useMemo(() => {
        if (!post) return null;
        return {
            title: `${post.title} | Gay Real Estate CT`,
            description: post.excerpt,
            canonical: `${BASE_URL}/blog/${post.slug}`,
            structuredData: [
                {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: post.title,
                    description: post.excerpt,
                    image: post.image,
                    datePublished: post.date,
                    author: { '@type': 'Person', name: post.author, jobTitle: post.authorRole },
                    publisher: { '@type': 'Organization', name: 'GayRealEstateCT.net', url: BASE_URL },
                }
            ]
        };
    }, [post]);

    if (!post) return <div className="text-center p-20">Article Not Found</div>;

    return (
        <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900 font-sans">
            {blogSEOData && <SEOHead {...blogSEOData} ogType="article" ogImage={post.image} ogImageAlt={post.title} keywords={post.seoKeywords} />}

            {/* Sticky Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] bg-slate-100/50 backdrop-blur-sm origin-left">
                <div 
                    className="h-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Premium Floating Back Button */}
            <div className="fixed top-8 left-8 z-[60] hidden md:block">
                <Link 
                    to="/" 
                    className="group flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                >
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:-translate-x-1">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">Return</span>
                        <span className="text-sm font-bold text-slate-900 leading-none">Home</span>
                    </div>
                </Link>
            </div>

            {/* Post Header / Hero */}
            <header className="relative w-full pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-50">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,63,94,0.05),transparent_50%)]" />
                
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4 mb-8 md:mb-12"
                        >
                            <span className="px-4 py-1.5 bg-white border border-slate-200 text-brand-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] rounded-full shadow-sm">
                                {post.category}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-brand-500" />
                                {post.readTime}
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-10 md:mb-16 leading-[1.05] tracking-tight"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap items-center gap-8 md:gap-12"
                        >
                            {agent ? (
                                <Link to={`/agent/${agent.id}`} className="flex items-center gap-4 group">
                                    <div className="relative p-1 rounded-2xl bg-white border border-slate-200 group-hover:border-brand-400 transition-colors shadow-sm">
                                        <img src={agent.image} alt={agent.name} className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover grayscale-[0.05] group-hover:grayscale-0 transition-all" style={{ objectPosition: 'center 20%' }} />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-bold text-lg mb-0.5 group-hover:text-brand-600 transition-colors">{post.author}</p>
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{post.authorRole}</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center">
                                        <User className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <p className="text-slate-900 font-bold text-lg">{post.author}</p>
                                </div>
                            )}
                            
                            <div className="hidden sm:block h-12 w-px bg-slate-200" />
                            
                            <div className="flex flex-col">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1.5">Published</span>
                                <span className="text-slate-900 font-bold text-lg">{post.date}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Featured Image Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 md:-mt-16">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white"
                >
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
            </div>

            {/* Layout Body */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 md:gap-24 px-6 md:px-12 py-20 md:py-32">
                
                {/* Article Content */}
                <article className="relative">
                    <p className="text-2xl md:text-3xl text-slate-900 font-serif italic leading-relaxed mb-16 md:mb-24 relative">
                        <span className="absolute -left-10 top-0 text-7xl text-brand-100 font-serif leading-none opacity-50">"</span>
                        {post.excerpt}
                    </p>

                    <div 
                        ref={contentRef}
                        className="blog-content prose prose-2xl prose-slate max-w-none 
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900
                        prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:tracking-tight
                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-10 prose-p:text-lg md:prose-p:text-xl md:prose-p:font-light
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-a:text-brand-600 prose-a:no-underline prose-a:font-bold hover:prose-a:text-brand-800 transition-colors border-b border-brand-200/50
                        prose-ul:list-none prose-ul:pl-0 prose-li:pl-0 prose-li:mb-6
                        prose-li:before:content-[''] prose-li:before:inline-block prose-li:before:w-2.5 prose-li:before:h-2.5 
                        prose-li:before:bg-brand-500 prose-li:before:rounded-full prose-li:before:mr-5 prose-li:before:mb-0.5"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />


                </article>

                {/* Sidebar */}
                <aside className="relative">
                    <div className="sticky top-24 space-y-10">
                        
                        {/* Table of Contents Card */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-6 opacity-5">
                                <Bookmark className="w-16 h-16" />
                             </div>
                             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                                <span className="w-6 h-px bg-slate-200" />
                                On this page
                            </h4>
                            <nav className="space-y-4">
                                {headings.map((h) => (
                                    <a 
                                        key={h.id} 
                                        href={`#${h.id}`}
                                        className={`group flex items-start gap-4 text-sm font-bold leading-snug transition-all duration-300 ${
                                            activeId === h.id 
                                            ? 'text-brand-600' 
                                            : 'text-slate-400 hover:text-slate-900'
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 transition-all ${
                                            activeId === h.id ? 'bg-brand-500 scale-125' : 'bg-slate-200 group-hover:bg-slate-400'
                                        }`} />
                                        <span>{h.text}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Author Card - Premium */}
                        {agent && (
                             <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
                                
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-8 relative z-10">Expert Author</p>
                                
                                <div className="flex items-center gap-5 mb-8 relative z-10">
                                    <div className="relative group/photo">
                                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl opacity-20 group-hover/photo:opacity-40 transition-opacity blur-[2px]" />
                                        <img src={agent.image} alt={agent.name} className="relative w-32 h-32 rounded-xl object-cover border-2 border-white/10 shadow-2xl" style={{ objectPosition: 'center 20%' }} />
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-500 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-lg">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-display font-bold text-lg">{agent.name}</p>
                                        <p className="text-xs text-brand-400 font-bold uppercase tracking-widest">{post.authorRole}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed mb-8 relative z-10 font-light">
                                   Dedicated to helping the LGBTQ+ community find a place to call home since 2010.
                                </p>
                                <Link to={`/agent/${agent.id}`} className="relative z-10 flex items-center justify-between group/btn px-6 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300">
                                    Explore Profile
                                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}


                    </div>
                </aside>
            </main>

            {/* Next Step Section - Ultra Modern */}
            <section className="bg-white pb-32 px-6">
                 <div className="max-w-7xl mx-auto">
                    <div className="relative bg-slate-50 rounded-[4rem] p-10 md:p-24 overflow-hidden border border-slate-200/50">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-300 via-brand-600 to-brand-800" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                                    Reach out to <span className="pride-gradient-text italic">{post.author.split(' ')[0]}</span> Today.
                                </h2>
                                <p className="text-lg text-slate-500 font-light leading-relaxed mb-4 max-w-lg">
                                    Have questions about this article? Connect with {post.author.split(' ')[0]} for expert, LGBTQ+ inclusive real estate guidance in Connecticut.
                                </p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-white">
                                <BlogCTAForm postTitle={post.title} authorName={post.author} />
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

            {/* Related Discoveries */}
             <section className="py-32 px-6 bg-white border-t border-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-20">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Related Discoveries</h3>
                            <p className="text-3xl font-display font-bold text-slate-900">Recommended for you</p>
                        </div>
                        <Link to="/#resources" className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors">
                            View All Articles <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                        {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3).map((p) => (
                            <Link key={p.id} to={`/blog/${p.slug}`} className="group block">
                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-lg">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="space-y-4 px-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 block">{p.category}</span>
                                    <h4 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-brand-700 transition-colors">{p.title}</h4>
                                    <div className="flex items-center gap-4 pt-2">
                                        <div className="h-px flex-1 bg-slate-100 group-hover:bg-brand-200 transition-colors" />
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogPost;
