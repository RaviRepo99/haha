import { useEffect } from 'react';
import { getPageSEO, getMetaTags } from '../config/seoData';

interface TallyWindow extends Window {
    Tally?: {
        loadEmbeds: () => void;
    };
}

const JoinClubPage = () => {
    const seoData = getPageSEO('join');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : seoData.url;
    const metaTags = getMetaTags({
        title: seoData.title!,
        description: seoData.description!,
        url: pageUrl,
        image: seoData.ogImage!,
        keywords: seoData.keywords,
    });

    useEffect(() => {
        // Load Tally embed script
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = () => {
            if (typeof window !== 'undefined' && (window as TallyWindow).Tally) {
                (window as TallyWindow).Tally?.loadEmbeds();
            }
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup script if needed
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            {/* Primary Meta Tags */}
            <title>{metaTags.title}</title>
            <meta name="title" content={metaTags.meta.title} />
            <meta name="description" content={metaTags.meta.description} />
            <link rel="canonical" href={pageUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={metaTags.og.type} />
            <meta property="og:url" content={metaTags.og.url} />
            <meta property="og:title" content={metaTags.og.title} />
            <meta property="og:description" content={metaTags.og.description} />
            <meta property="og:image" content={metaTags.og.image} />
            <meta property="og:site_name" content={metaTags.og.siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content={metaTags.twitter.card} />
            <meta name="twitter:url" content={metaTags.twitter.url} />
            <meta name="twitter:title" content={metaTags.twitter.title} />
            <meta name="twitter:description" content={metaTags.twitter.description} />
            <meta name="twitter:image" content={metaTags.twitter.image} />

            {/* Additional SEO */}
            <meta name="keywords" content={metaTags.meta.keywords} />
            <meta name="author" content={metaTags.meta.author} />
            <meta name="robots" content={metaTags.meta.robots} />

            <main className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300 flex items-center justify-center pt-24 px-4">
                {/* Tally Form Embed */}
                <div className="w-full max-w-2xl">
                    <iframe
                        data-tally-src="https://tally.so/embed/KYVWk8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                        loading="lazy"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="💼 CCRC Reserve"
                        className="tally-embed rounded-2xl dark:invert"
                        style={{ minHeight: '600px' }}
                    />
                </div>
            </main>
        </>
    );
};

export default JoinClubPage;
