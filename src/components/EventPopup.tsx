
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
        navigate('/result');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none p-3 sm:p-4">
            <div
                className="pointer-events-auto relative w-full max-w-xl translate-y-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm opacity-100 transition-all duration-150 ease-out dark:border-cyan-500/30 dark:bg-[#0f172a] dark:shadow-[0_0_15px_-6px_rgba(6,182,212,0.18)] sm:mb-4"
            >
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex flex-col gap-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 dark:bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 dark:bg-red-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide uppercase">RESULTS LIVE</span>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Competiton Image */}
                    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-cyan-500/20">
                        <img
                            src="/media/resultxddd.png"
                            alt="Join us CCRC 2026 - IT CLUB"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#0f172a]/80 to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-2xl font-bold text-slate-900 text-transparent dark:from-white dark:via-cyan-200 dark:to-slate-400 dark:text-white">
                            Interview Results Published
                        </h3>
                        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                            The interview results for CCRC IT Club 2026 are now available. Click "View Results" to find out your status.
                        </p>
                    </div>

                    {/* Action */}
                    <button
                        onClick={handleRegister}
                        className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-base font-semibold text-white transition-all duration-200 hover:from-cyan-500 hover:to-blue-500 active:scale-[0.98]"
                    >
                        <span>View Result</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventPopup;
