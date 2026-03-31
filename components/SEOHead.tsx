import React, { useEffect } from 'react';

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
 * Manages document <head> SEO tags declaratively via useEffect.
 * Cleans up on unmount / re-render so each page gets correct meta.
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
    useEffect(() => {
        // --- Title ---
        const prevTitle = document.title;
        document.title = title;

        // --- Helper to upsert a <meta> tag ---
        const createdElements: HTMLElement[] = [];

        const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
            let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
                createdElements.push(el);
            }
            el.setAttribute('content', content);
        };

        // --- Standard meta ---
        setMeta('name', 'description', description);

        if (keywords) {
            setMeta('name', 'keywords', keywords);
        }
        if (author) {
            setMeta('name', 'author', author);
        }
        if (noIndex) {
            setMeta('name', 'robots', 'noindex, nofollow');
        }

        // --- Open Graph ---
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:type', ogType);
        if (ogImage) {
            setMeta('property', 'og:image', ogImage);
        }
        if (ogImageAlt) {
            setMeta('property', 'og:image:alt', ogImageAlt);
        }
        if (canonical) {
            setMeta('property', 'og:url', canonical);
        }
        setMeta('property', 'og:site_name', 'GayRealEstateCT.net');

        // --- Twitter Card ---
        setMeta('name', 'twitter:card', twitterCard);
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        if (ogImage) {
            setMeta('name', 'twitter:image', ogImage);
        }
        if (ogImageAlt) {
            setMeta('name', 'twitter:image:alt', ogImageAlt);
        }

        // --- Extra meta ---
        if (extraMeta) {
            (Object.entries(extraMeta) as [string, string][]).forEach(([name, content]) => {
                setMeta('name', name, content);
            });
        }

        // --- Canonical link ---
        let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (canonical) {
            if (!canonicalEl) {
                canonicalEl = document.createElement('link');
                canonicalEl.setAttribute('rel', 'canonical');
                document.head.appendChild(canonicalEl);
                createdElements.push(canonicalEl);
            }
            canonicalEl.setAttribute('href', canonical);
        }

        // --- JSON-LD Structured Data ---
        let ldScript: HTMLScriptElement | null = null;
        if (structuredData) {
            ldScript = document.createElement('script');
            ldScript.setAttribute('type', 'application/ld+json');
            ldScript.setAttribute('data-seo-head', 'true');
            const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
            ldScript.textContent = JSON.stringify(
                dataArray.length === 1 ? dataArray[0] : dataArray
            );
            document.head.appendChild(ldScript);
        }

        // --- Cleanup on unmount / re-render ---
        return () => {
            document.title = prevTitle;
            createdElements.forEach((el) => {
                if (el.parentNode) el.parentNode.removeChild(el);
            });
            if (ldScript && ldScript.parentNode) {
                ldScript.parentNode.removeChild(ldScript);
            }
            // Remove any previous JSON-LD injected by this component
            document.querySelectorAll('script[data-seo-head="true"]').forEach((el) => el.remove());
        };
    }, [title, description, canonical, ogType, ogImage, ogImageAlt, twitterCard, keywords, author, structuredData, extraMeta, noIndex]);

    return null; // Renders nothing — side-effect only
};

export default SEOHead;
