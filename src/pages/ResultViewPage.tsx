import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const ResultViewPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [animateOnOpen, setAnimateOnOpen] = useState(false);

    useEffect(() => {
        if ((location.state as { fromCheck?: boolean } | null)?.fromCheck) {
            setAnimateOnOpen(true);
        }
    }, [location.state]);

    const name = searchParams.get('name') ?? '';
    const phone = searchParams.get('phone') ?? '';
    const section = searchParams.get('section') ?? '';
    const status = searchParams.get('status');
    const result = status === 'selected'
        ? 'selected'
        : status === 'waiting'
            ? 'waiting'
            : status === 'not-selected'
                ? 'not-selected'
                : null;

    const title = useMemo(() => {
        if (result === 'selected') return 'Selected';
        if (result === 'waiting') return 'Waiting List';
        if (result === 'not-selected') return 'Not Selected';
        return 'Result not found';
    }, [result]);

    const statusBadgeClass = `inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-sm border ${result === 'selected'
        ? 'bg-emerald-600/15 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-100 border-emerald-500/30'
        : result === 'waiting'
            ? 'bg-amber-500/20 text-amber-700 dark:bg-amber-500/25 dark:text-amber-100 border-amber-500/40'
            : result === 'not-selected'
                ? 'bg-rose-600/20 text-rose-700 dark:bg-rose-500/30 dark:text-rose-100 border-rose-500/40'
                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'}`;

    return (
        <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-white px-4 pt-32 pb-8 sm:px-6 sm:pt-28 sm:pb-10 dark:bg-slate-950">
            <div className={`w-full max-w-[min(100%,420px)] rounded-[2rem] border border-red-200 bg-white p-4 sm:p-6 shadow-[0_20px_80px_rgba(220,38,38,0.12)] backdrop-blur-xl ring-1 ring-red-200/40 dark:border-red-900/40 dark:bg-slate-950/95 dark:ring-red-900/40 transition-all duration-500 ease-out motion-safe:transform-gpu hover:-translate-y-1 ${animateOnOpen ? 'animate-slide-in-up' : ''}`}>
                <div className="flex flex-col items-center gap-3 text-center">
                    <img src="/ccrc_it_logo.jpg" alt="CCRC IT Club Logo" className="h-20 w-20 object-contain" />
                    <div>
                        <h1 className="text-3xl font-bold text-rose-700 dark:text-rose-200">Interview Result</h1>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Your CCRC IT Club interview result is shown below.
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-2 rounded-[1.75rem] border border-red-200/80 bg-red-50/80 p-3 text-slate-700 shadow-sm dark:border-red-900/60 dark:bg-red-900/10 dark:text-slate-300">
                    <div className="rounded-[1.5rem] bg-white/95 p-2.5 dark:bg-slate-950/95">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Result Status</p>
                        <div className="mt-1.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className={`text-base font-bold ${result === 'selected' ? 'text-emerald-700 dark:text-emerald-100' : result === 'waiting' ? 'text-amber-700 dark:text-amber-100' : result === 'not-selected' ? 'text-rose-700 dark:text-rose-100' : 'text-slate-700 dark:text-slate-200'} ${animateOnOpen ? 'animate-letter-pop' : ''}`}>{title}</p>
                            <span className={statusBadgeClass}>
                                {result === 'selected' ? 'SELECTED' : result === 'waiting' ? 'WAITING LIST' : result === 'not-selected' ? 'NOT SELECTED' : 'UNKNOWN'}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-white/95 p-2.5 dark:bg-slate-950/95">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Name</p>
                        <p className="mt-1.5 font-semibold text-slate-900 dark:text-white capitalize">{name || 'N/A'}</p>
                    </div>

                    {(result === 'selected' || result === 'waiting') && (
                        <>
                            <div className="rounded-[1.5rem] bg-white/95 p-2.5 dark:bg-slate-950/95">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Phone Number</p>
                                <p className="mt-1.5 font-semibold text-slate-900 dark:text-white">{phone}</p>
                            </div>

                            <div className="rounded-[1.5rem] bg-white/95 p-2.5 dark:bg-slate-950/95">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Section</p>
                                <p className="mt-1.5 font-semibold text-slate-900 dark:text-white">{section}</p>
                            </div>
                        </>
                    )}

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => navigate('/result')}
                            className="rounded-[1.5rem] border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-red-50 dark:border-red-700 dark:bg-slate-950 dark:text-red-200 dark:hover:bg-red-950/70 motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5"
                        >
                            Check Another
                        </button>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="rounded-[1.5rem] bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5"
                        >
                            Print
                        </button>
                    </div>

                    <div className="mt-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950/95">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Join our community</p>
                        <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                            Contact admin via Instagram.
                        </p>
                        <a
                            href="https://www.instagram.com/mites.shh/"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex items-center justify-center rounded-full bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
                        >
                            Contact Admin
                        </a>
                    </div>
                </div>

                <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} CCRC IT CLUB | Secure • Fast • Accurate
                </p>
            </div>
        </section>
    );
};

export default ResultViewPage;
