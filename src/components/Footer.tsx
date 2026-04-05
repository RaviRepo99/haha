import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Facebook from 'lucide-react/dist/esm/icons/facebook';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Send from 'lucide-react/dist/esm/icons/send';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';
import emailjs from '@emailjs/browser';
import { SubscriberManager } from '../utils/subscriberManager';
import { SITE_CONFIG } from '../config/seoData';

// centralised template data to avoid missing required fields and 422
const getEmailTemplateParams = (recipientEmail: string) => ({
    from_name: 'CCRC IT Club',
    from_email: SITE_CONFIG.email || 'noreply@ccrcitclub.com',
    to_name: 'CCRC Member',
    to_email: recipientEmail,
    recipient_email: recipientEmail,
    email: recipientEmail,
    user_email: recipientEmail,
    reply_to: recipientEmail,
    club_name: 'CCRC IT Club',
    subscription_date: new Date().toLocaleDateString(),
    website_url: window.location.origin,
    message: `Welcome ${recipientEmail}! You are now subscribed to CCRC IT Club updates.`
});

// Add this for testing EmailJS from browser console
if (typeof window !== 'undefined') {
    (window as any).testEmailJS = async (testEmail: string) => {
        try {
            console.log('Testing EmailJS with:', testEmail);
            const templateParams = getEmailTemplateParams(testEmail);
            console.log('Test email template params:', templateParams);
            const result = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams
            );
            console.log('Test email sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Test email failed:', error);
            throw error;
        }
    };
}

const Footer = memo(() => {
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    // Initialize EmailJS
    useEffect(() => {
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
        }
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subscribeEmail.trim()) return;

        setIsLoading(true);
        setEmailError(false);

        try {
            // Check if email already exists
            if (SubscriberManager.isSubscribed(subscribeEmail)) {
                setAlreadySubscribed(true);
                setTimeout(() => setAlreadySubscribed(false), 5000);
            } else {
                // Add new subscriber
                const success = SubscriberManager.addSubscriber(subscribeEmail, 'footer');

                if (success) {
                    // Send welcome email via EmailJS
                    try {
                        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

                        if (serviceId && templateId) {
                            const templateParams = getEmailTemplateParams(subscribeEmail);
                            console.log('Sending welcome email to:', subscribeEmail, templateParams);
                            const result = await emailjs.send(serviceId, templateId, templateParams);
                            console.log('Email sent successfully:', result);
                        } else {
                            console.warn('EmailJS credentials not configured');
                        }
                    } catch (emailError) {
                        console.error('Email sending failed:', emailError);
                        const e = emailError as any;
                        const statusCode = e?.status || e?.statusCode || (e?.response && e.response.status);
                        const statusText = e?.statusText || e?.text || e?.message || 'Unknown error';
                        const methodMsg = statusCode === 405 ? ' (Method Not Allowed; check EmailJS service/template IDs and network policy)' : '';

                        setEmailError(true);
                        setEmailErrorMessage(`${statusCode || 'Error'}: ${statusText}${methodMsg}`);
                        setTimeout(() => setEmailError(false), 5000);
                        setTimeout(() => setEmailErrorMessage(''), 5000);
                        // Continue with subscription even if email fails
                    }

                    setIsSubscribed(true);
                    setSubscribeEmail('');
                    setTimeout(() => setIsSubscribed(false), 5000);
                } else {
                    setEmailError(true);
                    setTimeout(() => setEmailError(false), 5000);
                }
            }
        } catch (error) {
            console.error('Subscription error:', error);
            setEmailError(true);
            setTimeout(() => setEmailError(false), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const DiscordIcon = ({ size = 18 }: { size?: number }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 71 55"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Discord"
        >
            <path
                fill="currentColor"
                d="M60.104 4.556A58.54 58.54 0 0 0 47.019 2.45c-.26.438-.55 1.03-.75 1.488-4.487-.666-8.958-.666-13.357 0-.2-.458-.49-1.05-.75-1.488A58.53 58.53 0 0 0 10.896 4.556C3.478 18 0 31.147 0 44.357c4.324 3.187 8.59 5.503 12.79 6.872 2.13.8 4.252 1.377 6.333 1.793 2.144.43 4.287.74 6.407.935 2.11.197 4.229.3 6.344.3 2.115 0 4.234-.103 6.344-.3 2.12-.195 4.264-.505 6.407-.935 2.08-.416 4.203-.993 6.333-1.793 4.2-1.37 8.465-3.686 12.79-6.872C71 31.147 67.522 18 60.104 4.556zM24.646 38.392c-3.532 0-6.403-3.256-6.403-7.27 0-4.014 2.862-7.27 6.403-7.27 3.56 0 6.43 3.256 6.403 7.27 0 4.014-2.862 7.27-6.403 7.27zm22.94 0c-3.532 0-6.403-3.256-6.403-7.27 0-4.014 2.862-7.27 6.403-7.27 3.56 0 6.43 3.256 6.403 7.27 0 4.014-2.843 7.27-6.403 7.27z"
            />
        </svg>
    );

    const socialIcons = {
        instagram: Instagram,
        facebook: Facebook,
        discord: DiscordIcon,
    };

    const navigationLinks: { name: string; path: string; external?: boolean }[] = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/#about' },
        { name: 'Events', path: '/events' },
        { name: 'Our Team', path: '/team' },
        { name: 'Join Club', path: '/join' },
    ];

    return (
        <footer className="relative border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617] pt-24 pb-12 overflow-hidden transition-colors duration-300">
            {/* Background Texture & Gradients */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-5 pointer-events-none" />
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">

                    <div className="space-y-8">
                        <div className="group inline-block">
                            <div className="flex items-center gap-3">
                                <div className="relative w-40 h-40">
                                    <img src="/ccrc_it_logo.jpg" alt="ITCLUB Logo Light" width="480" height="209" className="w-full h-full object-contain dark:hidden" />
                                    <img src="/ccrc_it_logo.jpg" alt="ITCLUB Logo Dark" width="480" height="209" className="w-full h-full object-contain hidden dark:block" />
                                </div>
                            </div>
                            <p className="text-[18px] font-mono font-bold tracking-[0.2em] text-cyan-600 dark:text-rose-500 uppercase">
                                EST. 2011
                            </p>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                            Fostering a culture of innovation and excellence in computer science at CCRC. Join us to transform ideas into reality.
                        </p>
                        <div className="flex items-center gap-3">
                            {Object.entries(SITE_CONFIG.social).map(([platform, url]) => {
                                const Icon = socialIcons[platform as keyof typeof socialIcons];
                                if (!Icon) return null;
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 transition-all duration-300 border border-slate-200 dark:border-white/5 shadow-sm"
                                        aria-label={platform}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-white mb-8 border-l-2 border-rose-500 pl-4">
                            Navigation
                        </h3>
                        <ul className="space-y-4">
                            {navigationLinks.map((link) => (
                                <li key={link.name}>
                                    {link.external ? (
                                        <a
                                            href={link.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all flex items-center gap-2 group w-fit"
                                        >
                                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all flex items-center gap-2 group w-fit"
                                        >
                                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-white mb-8 border-l-2 border-rose-500 pl-4">
                            Get in Touch
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-slate-400 group">
                                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/10 dark:border-cyan-500/20">
                                    <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</span>
                                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors font-medium">
                                        {SITE_CONFIG.email}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400 group">
                                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors border border-indigo-500/10 dark:border-indigo-500/20">
                                    <DiscordIcon />
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Discord Community</span>
                                    <a href={SITE_CONFIG.social.discord} target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors font-medium">
                                        Join our Discord
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400 group">
                                <div className="w-11 h-11 rounded-xl bg-orange-500/10 dark:bg-orange-500/5 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors border border-orange-500/10 dark:border-orange-500/20">
                                    <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Our Location</span>
                                    <span className="text-slate-700 dark:text-slate-200 font-medium leading-tight">
                                        CCRC, Balkumari,<br />Lalitpur, Nepal
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Subscribe Section */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-white mb-8 border-l-2 border-rose-500 pl-4">
                            Stay Updated
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            Get notified about upcoming events, workshops, and tech news from CCRC IT Club.
                        </p>
                        {emailError ? (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                                    ❌ Failed to subscribe. {emailErrorMessage || 'Please try again later.'}
                                </p>
                            </div>
                        ) : alreadySubscribed ? (
                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                                <p className="text-orange-800 dark:text-orange-200 text-sm font-medium">
                                    📧 This email is already subscribed to CCRC IT Club updates!
                                </p>
                            </div>
                        ) : isSubscribed ? (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                                    🎉 Thanks for subscribing! Welcome to the CCRC IT Club community.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={subscribeEmail}
                                        onChange={(e) => setSubscribeEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all disabled:opacity-50"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading || !subscribeEmail.trim()}
                                        className="flex-1 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        )}
                                        {isLoading ? 'Subscribing...' : 'Subscribe to Updates'}
                                    </button>

                                </div>
                            </form>
                        )}
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-slate-500 dark:text-slate-500 text-xs font-medium">
                        © {new Date().getFullYear()} IT CLUB. Crafted for Innovation. Made by{" "}
                        <a
                            href="https://www.instagram.com/mites.shh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-semibold"
                        >
                            Mitesh Mandal 
                        </a>
                        .
                    </p>
                    <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <div className="h-4 w-px bg-slate-200 dark:bg-white/10 hidden md:block" />
                        <button
                            onClick={scrollToTop}
                            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 transition-all duration-300 border border-slate-200 dark:border-white/5 shadow-sm animate-bounce"
                            aria-label="Scroll to top"
                        >
                            <ChevronUp size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;
