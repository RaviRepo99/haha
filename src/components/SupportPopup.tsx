import { useNavigate } from 'react-router-dom';
import X from 'lucide-react/dist/esm/icons/x';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Mail from 'lucide-react/dist/esm/icons/mail';
import User from 'lucide-react/dist/esm/icons/user';

declare global {
    interface Window {
        $crisp?: {
            push: (...args: any[]) => void;
        } | any[];
        CRISP_WEBSITE_ID?: string;
    }
}

interface SupportPopupProps {
    onClose: () => void;
}

const SupportPopup = ({ onClose }: SupportPopupProps) => {
    const navigate = useNavigate();

    const tryOpenCrispChat = () => {
        if (window.$crisp && typeof window.$crisp.push === 'function') {
            window.$crisp.push(['do', 'chat:open']);
            window.$crisp.push(['do', 'chat:show']);
            console.log('Crisp chat opened successfully');
            return true;
        }
        return false;
    };

    const handleClose = () => {
        onClose();
    };

    const handleJoinClub = () => {
        onClose();
        navigate('/join');
    };

    const handleEmail = () => {
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=support@ccrcit.com', '_blank');
        onClose();
    };

    const handleLiveChat = () => {
        const opened = tryOpenCrispChat();
        if (opened) {
            onClose();
            return;
        }

        const checkCrispReady = window.setInterval(() => {
            if (tryOpenCrispChat()) {
                window.clearInterval(checkCrispReady);
                onClose();
            }
        }, 500);

        window.setTimeout(() => {
            window.clearInterval(checkCrispReady);
            console.warn('Crisp chat failed to load within timeout');
        }, 10000);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none p-4">
            <div
                className="pointer-events-auto relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-cyan-500/30 p-6 shadow-2xl dark:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in zoom-in-95"
            >
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 dark:bg-green-500/10 dark:border-green-500/20 w-fit">
                            <MessageCircle size={14} className="text-green-600 dark:text-green-400" />
                            <span className="text-xs font-semibold text-green-600 dark:text-green-400 tracking-wide uppercase">Support</span>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-center">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Need Help?
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            We're here to help! Contact us for support or join our community.
                        </p>
                    </div>

                    {/* Contact Options */}
                    <div className="space-y-3">
                        <button
                            onClick={handleLiveChat}
                            className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                        >
                            <User size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-slate-900 dark:text-white text-sm">Live Chat with Agent</div>
                                <div className="text-slate-500 dark:text-slate-400 text-xs">Connect with our team</div>
                            </div>
                        </button>

                        <button
                            onClick={handleEmail}
                            className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                        >
                            <Mail size={18} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-slate-900 dark:text-white text-sm">Email Support</div>
                                <div className="text-slate-500 dark:text-slate-400 text-xs">support@ccrcitclub.com</div>
                            </div>
                        </button>

                        <button
                            onClick={handleJoinClub}
                            className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                        >
                            <MessageCircle size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-slate-900 dark:text-white text-sm">Join Our Community</div>
                                <div className="text-slate-500 dark:text-slate-400 text-xs">Become a member</div>
                            </div>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                        Available 24/7 for our members
                    </div>
                </div>
            </div>
        </div>
    );

    // Chat Interface - Now handled by separate ChatPopup component
    // This code has been moved to ChatPopup.tsx
};

export default SupportPopup;