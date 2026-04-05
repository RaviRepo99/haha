import Hero from '../components/Hero';
import EventPopup from '../components/EventPopup';
import Features from '../components/Features';
import { getPageSEO, getOrganizationSchema, getWebsiteSchema, getMetaTags } from '../config/seoData';

const HomePage = () => {
    const seoData = getPageSEO('home');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : seoData.url;
    const metaTags = getMetaTags({
        title: seoData.title!,
        description: seoData.description!,
        url: pageUrl,
        image: seoData.ogImage!,
        keywords: seoData.keywords,
    });

    const organizationSchema = getOrganizationSchema();
    const websiteSchema = getWebsiteSchema();

    return (
        <>
            <EventPopup />
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

            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>

            <main>
                <Hero />
                <Features />
            </main>
        </>
    );
};

export default HomePage;
