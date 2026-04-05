
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import X from 'lucide-react/dist/esm/icons/x';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const EventPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show popup after a short delay for better UX
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('ai_event_popup_seen');
            if (!hasSeenPopup) {
                setIsVisible(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsVisible(false);
        sessionStorage.setItem('ai_event_popup_seen', 'true');
    };

    const handleRegister = () => {
        setIsVisible(false);
        sessionStorage.setItem('ai_event_popup_seen', 'true');
        navigate('/join');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none p-4 sm:p-0">
            {/* Backdrop - optional, removing for non-intrusive feel, or keeping simplified */}
            {/* <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={handleClose} /> */}

            <div
                className="pointer-events-auto relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-cyan-500/30 p-8 shadow-2xl dark:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 sm:mb-8"
            >
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 dark:bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 dark:bg-red-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide uppercase">New Member</span>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Competiton Image */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/20 shadow-lg group">
                        <img
                            src="/media/join us.avif"
                            alt="Join us CCRC 2026 - IT CLUB"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#0f172a]/80 to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-cyan-200 dark:to-slate-400">
                            Welcome to CCRC IT CLUB
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            Join our thriving tech community and be part of something extraordinary.
                        </p>
                    </div>

                    {/* Action */}
                    <button
                        onClick={handleRegister}
                        className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98]"
                    >
                        <span>Join Club</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:animate-shimmer">
                            <div className="relative h-full w-8 bg-white/20"></div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventPopup;
