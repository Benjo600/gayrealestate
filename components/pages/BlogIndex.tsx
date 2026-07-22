import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import SEOHead from '../SEOHead';
import { BLOG_POSTS } from '../../data/blogs';

const BASE_URL = 'https://www.gayrealestatect.net';

const blogIndexStructuredData = [
    {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'LGBTQ+ Real Estate Blog | GayRealEstateCT.net',
        description: 'Expert guides, neighborhood spotlights, and market insights for LGBTQ+ home buyers and sellers in Connecticut.',
        url: `${BASE_URL}/blog`,
        publisher: { '@type': 'Organization', name: 'GayRealEstateCT.net', url: BASE_URL },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'LGBTQ+ Real Estate Blog — All Articles',
        url: `${BASE_URL}/blog`,
        numberOfItems: BLOG_POSTS.length,
        itemListElement: BLOG_POSTS.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${BASE_URL}/blog/${post.slug}`,
            name: post.title,
        })),
    },
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
        ],
    },
];

const BlogIndex: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-100 selection:text-purple-900">
            <SEOHead
                title="LGBTQ+ Real Estate Blog | GayRealEstateCT.net"
                description="Expert guides, neighborhood spotlights, and market insights for LGBTQ+ home buyers and sellers in Connecticut. Browse our full library of in-depth articles."
                canonical="https://www.gayrealestatect.net/blog"
                keywords="LGBTQ real estate blog Connecticut, gay home buying guide CT, LGBTQ neighborhood guide Connecticut"
                ogImage="/hero-house.png"
                ogImageAlt="LGBTQ+ Real Estate Blog — Connecticut home insights"
                structuredData={blogIndexStructuredData}
            />

            <nav className="absolute top-0 left-0 right-0 p-4 z-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-slate-600 hover:text-purple-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Connecticut Real Estate Insights
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Expert advice, neighborhood guides, and market updates for LGBTQ+ buyers and sellers in Connecticut.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post) => (
                        <Link 
                            key={post.id} 
                            to={`/blog/${post.slug}`}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    style={{ objectPosition: 'center 30%' }}
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {post.category}
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                
                                <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>
                                
                                <div className="mt-auto pt-6 border-t border-slate-100">
                                    <div className="flex flex-wrap items-center text-sm text-slate-500 gap-y-2">
                                        <div className="flex items-center w-full mb-2">
                                            <User className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                                            <span className="truncate">{post.author}</span>
                                        </div>
                                        <div className="flex items-center mr-4">
                                            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-purple-500" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BlogIndex;
