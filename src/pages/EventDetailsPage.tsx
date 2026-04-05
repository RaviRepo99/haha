import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Clock from 'lucide-react/dist/esm/icons/clock';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { EventData, Event } from '../types';
import { getPageSEO, getMetaTags, getEventSchema, SITE_CONFIG } from '../config/seoData';

const EventDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/events.json')
            .then((res) => res.json())
            .then((data: EventData) => {
                const foundEvent = data.events.find((e) => e.id === id);
                setEvent(foundEvent || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching event data:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center bg-white dark:bg-[#0f172a] transition-colors duration-300">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-white dark:bg-[#0f172a] transition-colors duration-300">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Event Not Found</h2>
                <Link to="/events" className="text-cyan-600 hover:text-cyan-500 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>
            </div>
        );
    }

    const isRunning = event.status === 'running';

    const seoPageData = getPageSEO('events');
    const pageTitle = `${event.title} - CCRC Event`;
    const pageDescription = event.description.substring(0, 160) + '...';
    const pageUrl = typeof window !== 'undefined' ? window.location.href : `${SITE_CONFIG.url}/events/${event.id}`;
    const keywords = `${event.title}, CCRC event, ${event.tags?.join(', ')}, ${seoPageData.keywords}`;

    const metaTags = getMetaTags({
        title: pageTitle,
        description: pageDescription,
        url: pageUrl,
        image: event.image,
        keywords: keywords,
    });

    const eventSchema = getEventSchema(event);

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

            <script type="application/ld+json">
                {JSON.stringify(eventSchema)}
            </script>

            <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-[#0f172a] transition-colors duration-300">
                {/* Hero Image */}
                <div className='h-10'></div>
                <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent" />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
                        <Link to="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Events
                        </Link>
                        <div className="flex flex-wrap gap-3 mb-4">
                            {event.tags?.map(tag => (
                                <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-100 backdrop-blur-md border border-cyan-500/30">
                                    {tag}
                                </span>
                            ))}
                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isRunning
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-slate-700 text-slate-200'
                                }`}>
                                {event.status}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            {event.title}
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
                        {/* Sidebar Info - Moved to top on mobile */}
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-white/10 sticky top-24 shadow-sm dark:shadow-none">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Event Details</h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Date</p>
                                            <p className="text-slate-900 dark:text-slate-200 font-semibold">{event.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Time</p>
                                            <p className="text-slate-900 dark:text-slate-200 font-semibold">{event.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Location</p>
                                            <p className="text-slate-900 dark:text-slate-200 font-semibold">{event.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {isRunning && event.registration_link && (
                                    <div className="mt-8">
                                        {event.registration_link.includes(' ccrcitclub.digital') || event.registration_link.startsWith('/') ? (
                                            <Link
                                                to={event.registration_link.replace('https://ccrcitclub.digital', '')}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 dark:bg-cyan-500 px-6 py-4 text-white font-bold transition-all hover:bg-cyan-700 dark:hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1"
                                            >
                                                Register Now <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        ) : (
                                            <a
                                                href={event.registration_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 dark:bg-cyan-500 px-6 py-4 text-white font-bold transition-all hover:bg-cyan-700 dark:hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1"
                                            >
                                                Register Now <ArrowRight className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content - Moves below details on mobile */}
                        <div className="order-2 lg:order-1 lg:col-span-2 space-y-8">
                            <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">About the Event</h2>
                                <div className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {event.description}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Gallery Section for Past Events */}
                            {event.gallery && event.gallery.length > 0 && (
                                <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Event Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {event.gallery.map((img, index) => (
                                            <div key={index} className="relative aspect-video rounded-xl overflow-hidden group">
                                                <img
                                                    src={img}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetailsPage;
