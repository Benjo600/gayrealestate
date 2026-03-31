import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOHeadProps {
    title: string;
    description: string;
    canonical?: string;
    ogType?: 'website' | 'article' | 'profile';
    ogImage?: string;
    ogImageAlt?: string;
    twitterCard?: 'summary' | 'summary_large_image';
    keywords?: string;
    author?: string;
    /** JSON-LD structured data object(s) — will be serialized into a <script> tag */
    structuredData?: Record<string, any> | Record<string, any>[];  // eslint-disable-line @typescript-eslint/no-explicit-any
    /** Additional meta tags as name→content pairs */
    extraMeta?: Record<string, string>;
    noIndex?: boolean;
}

/**
 * Manages document <head> SEO tags using react-helmet-async.
 */
const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage,
    ogImageAlt,
    twitterCard = 'summary_large_image',
    keywords,
    author,
    structuredData,
    extraMeta,
    noIndex = false,
}) => {
    return (
        <Helmet>
            {/* Standard tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}
            {noIndex && <meta name="robots" content="noindex, nofollow" />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
            {canonical && <meta property="og:url" content={canonical} />}
            <meta property="og:site_name" content="GayRealEstateCT.net" />

            {/* Twitter Card */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
            {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}

            {/* Extra meta tags */}
            {extraMeta && Object.entries(extraMeta).map(([name, content]) => (
                <meta key={name} name={name} content={content} />
            ))}

            {/* JSON-LD Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;

