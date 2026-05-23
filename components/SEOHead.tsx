import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_DOMAIN = 'https://www.gayrealestatect.net';

export interface SEOHeadProps {
    title: string;
    description: string;
    canonical?: string;
    ogType?: 'website' | 'article' | 'profile';
    ogImage?: string;
    ogImageAlt?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    twitterCard?: 'summary' | 'summary_large_image';
    twitterCreator?: string;
    keywords?: string;
    author?: string;
    /** JSON-LD structured data object(s) — will be serialized into a <script> tag */
    structuredData?: Record<string, any> | Record<string, any>[];  // eslint-disable-line @typescript-eslint/no-explicit-any
    /** Additional meta tags as name→content pairs */
    extraMeta?: Record<string, string>;
    noIndex?: boolean;
}

/** Ensures og:image is always an absolute URL */
const toAbsoluteUrl = (url: string): string =>
    url.startsWith('http') ? url : `${BASE_DOMAIN}${url}`;

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
    ogImageWidth = 1200,
    ogImageHeight = 630,
    twitterCard = 'summary_large_image',
    twitterCreator,
    keywords,
    author,
    structuredData,
    extraMeta,
    noIndex = false,
}) => {
    const absoluteOgImage = ogImage ? toAbsoluteUrl(ogImage) : undefined;

    return (
        <Helmet>
            {/* Standard tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}
            <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            {absoluteOgImage && <meta property="og:image" content={absoluteOgImage} />}
            {absoluteOgImage && <meta property="og:image:width" content={String(ogImageWidth)} />}
            {absoluteOgImage && <meta property="og:image:height" content={String(ogImageHeight)} />}
            {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
            {canonical && <meta property="og:url" content={canonical} />}
            <meta property="og:site_name" content="GayRealEstateCT.net" />

            {/* Twitter Card */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:site" content="@GayRealEstateCT" />
            {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {absoluteOgImage && <meta name="twitter:image" content={absoluteOgImage} />}
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

