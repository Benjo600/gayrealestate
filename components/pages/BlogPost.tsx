import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Star, Send, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { agents } from '../../data/agents';

const BASE_URL = 'https://www.gayrealestateconnecticut.com';

// Map blog author names to agent IDs for profile linking
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
                throw new Error('Telegram credentials not configured. Check your .env.local file.');
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

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.description ?? `Telegram API error (${res.status})`);
            }

            setStatus('success');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            console.error('Telegram blog CTA error:', err);
            setErrorMsg(msg);
            setStatus('error');
            setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
        }
    };

    const inputCls = 'w-full px-3 py-2.5 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg md:rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all text-[13px] md:text-sm';

    if (status === 'success') {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-slate-300 text-sm max-w-xs mx-auto">
                    Our team will be in touch within one business day. We look forward to speaking with you.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
                <label className="block text-[11px] md:text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 md:mb-2">Your Name *</label>
                <input
                    required
                    value={form.name}
                    onChange={change('name')}
                    placeholder="Jane Smith"
                    className={inputCls}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                    <label className="block text-[11px] md:text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 md:mb-2">Email Address *</label>
                    <input
                        required
                        type="email"
                        value={form.email}
                        onChange={change('email')}
                        placeholder="your@email.com"
                        className={inputCls}
                    />
                </div>
                <div>
                    <label className="block text-[11px] md:text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 md:mb-2">Phone Number *</label>
                    <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={change('phone')}
                        placeholder="(860) 555-0100"
                        className={inputCls}
                    />
                </div>
            </div>
            <div>
                <label className="block text-[11px] md:text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 md:mb-2">Message (optional)</label>
                <textarea
                    value={form.message}
                    onChange={change('message')}
                    rows={3}
                    placeholder="Tell us what you're looking for — buying, selling, relocating..."
                    className={`${inputCls} resize-none`}
                />
            </div>

            {status === 'error' && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{errorMsg}</div>
            )}

            <button
                type="submit"
                disabled={status === 'submitting'}
                id="blog-cta-submit"
                className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 text-white font-bold rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl hover:shadow-brand-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait text-[13px] md:text-sm"
            >
                {status === 'submitting' ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Get a Free Consultation
                    </>
                )}
            </button>
            <p className="text-xs text-white/30 flex items-center gap-1.5">
                <span>🔒</span> Your information is private and shared only with our licensed team.
            </p>
        </form>
    );
};
// ────────────────────────────────────────────────────────────────────────────

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const post = BLOG_POSTS.find(p => p.slug === slug);

    useEffect(() => {
        if (post) {
            window.scrollTo(0, 0);
        }
    }, [post]);

    const agentId = post ? AUTHOR_AGENT_MAP[post.author] : undefined;
    const agent = agentId ? agents[agentId] : undefined;

    // Build SEO data for this blog post
    const blogSEOData = useMemo(() => {
        if (!post) return null;
        const pageTitle = `${post.title} | Gay Real Estate Connecticut`;
        const pageDescription = post.excerpt;
        const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

        const structuredData = [
            {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: post.title,
                description: post.excerpt,
                image: post.image,
                datePublished: post.date,
                author: {
                    '@type': 'Person',
                    name: post.author,
                    jobTitle: post.authorRole,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Gay Real Estate Connecticut',
                    url: BASE_URL,
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': canonicalUrl,
                },
                articleSection: post.category,
            },
            {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Insights & Stories', item: `${BASE_URL}/#resources` },
                    { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
                ],
            },
        ];

        return { pageTitle, pageDescription, canonicalUrl, structuredData };
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <SEOHead
                    title="Article Not Found | Gay Real Estate Connecticut"
                    description="The article you are looking for does not exist or has been moved."
                    noIndex={true}
                />
                <h1 className="text-3xl font-serif text-slate-900 mb-4">Article Not Found</h1>
                <p className="text-slate-600 mb-8">The article you are looking for does not exist or has been moved.</p>
                <Link to="/" className="text-brand-600 font-semibold hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Dynamic Blog Post SEO */}
            {blogSEOData && (
                <SEOHead
                    title={blogSEOData.pageTitle}
                    description={blogSEOData.pageDescription}
                    canonical={blogSEOData.canonicalUrl}
                    ogType="article"
                    ogImage={post.image}
                    ogImageAlt={post.title}
                    keywords={post.seoKeywords || `${post.category}, LGBTQ real estate Connecticut, ${post.title}`}
                    author={post.author}
                    structuredData={blogSEOData.structuredData}
                />
            )}

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10" aria-label="Back navigation">
                <div className="max-w-7xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-semibold text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </nav>

            <article>
                {/* Article Header with Hero Image */}
                <header className="relative h-[65vh] min-h-[420px]">
                    <div className="absolute inset-0">
                        <img
                            src={post.image}
                            alt={`Featured image for: ${post.title}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-slate-900/40" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
                        <div className="max-w-4xl mx-auto text-white">
                            <span className="inline-block px-3 py-1 bg-brand-500/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full mb-4 md:mb-6 text-white shadow-sm">
                                {post.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[13px] md:text-sm font-medium text-slate-200">
                                <div className="flex items-center gap-2">
                                    {agent ? (
                                        <Link to={`/agent/${agent.id}`} className="flex items-center gap-2 hover:text-brand-300 transition-colors">
                                            <img
                                                src={agent.image}
                                                alt={agent.name}
                                                className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover border border-white/30"
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                            />
                                            <span>{post.author}</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-400" />
                                            <span>{post.author}</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-400" />
                                    <time dateTime={post.date}>{post.date}</time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-400" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">

                    {/* Article Content */}
                    <div
                        className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Author Bio Section */}
                    <aside className="mt-14 pt-8 border-t border-slate-200" aria-label="About the author">
                        {agent ? (
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <Link to={`/agent/${agent.id}`} className="shrink-0 group">
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 group-hover:border-brand-400 transition-colors shadow-md"
                                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </Link>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Written by</p>
                                    <Link to={`/agent/${agent.id}`} className="hover:text-brand-600 transition-colors">
                                        <p className="text-xl font-serif font-bold text-slate-900">{agent.name}</p>
                                    </Link>
                                    <p className="text-brand-600 text-sm font-medium mb-3">{post.authorRole}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {agent.credentials.slice(0, 2).map((c, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                                                {c.type === 'award' && <Star className="w-3 h-3 text-gold-500" />}
                                                {c.label}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        to={`/agent/${agent.id}`}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                                    >
                                        View full profile <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">Written by</p>
                                    <p className="text-lg font-serif text-slate-800">{post.author}, <span className="text-slate-500 italic text-base">{post.authorRole}</span></p>
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* ── SINGLE CLOSING CTA — Inline Telegram Form ── */}
                    <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl relative">
                        {/* Background layers */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.25),transparent_55%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.15),transparent_55%)]" />
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-gold-400 to-brand-500" />

                        <div className="relative z-10 p-5 sm:p-10 md:p-14">
                            {/* Header */}
                            <div className="text-center mb-6 md:mb-10">
                                {/* Per-agent face position overrides so each thumbnail crops correctly */}
                                {(() => {
                                    const facePos: Record<string, string> = {
                                        arek: '60% 8%',
                                        abby: '50% 10%',
                                        travis: '50% 12%',
                                        jake: '50% 10%',
                                    };
                                    return (
                                        <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6">
                                            {(['arek', 'abby', 'travis', 'jake'] as const).map((id) => {
                                                const a = agents[id];
                                                return (
                                                    <img
                                                        key={id}
                                                        src={a.image}
                                                        alt={a.name}
                                                        title={a.name}
                                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-slate-600 shadow-lg"
                                                        style={{ objectPosition: facePos[id] }}
                                                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })()}
                                <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                                    <div className="flex text-gold-400 text-[10px] md:text-sm">★★★★★</div>
                                    <span className="text-slate-400 text-[10px] md:text-xs font-medium">Trusted by 250+ LGBTQ+ clients</span>
                                </div>
                                <h2 className="text-xl md:text-3xl font-serif font-bold text-white mb-2 md:mb-3 leading-tight">
                                    Ready to Talk to Someone Who Gets It?
                                </h2>
                                <p className="text-slate-300 text-[13px] md:text-sm leading-relaxed max-w-lg mx-auto">
                                    Our LGBTQ+-led team — agents, a Top 1% lender, and a real estate attorney — is ready to answer your questions. No pressure, no commitment.
                                </p>
                            </div>

                            {/* Inline form */}
                            <BlogCTAForm postTitle={post.title} authorName={post.author} />
                        </div>
                    </div>

                </div>
            </article >

            <Footer />
        </div >
    );
};

export default BlogPost;
