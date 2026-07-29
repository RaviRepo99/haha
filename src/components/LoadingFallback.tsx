import { memo, useEffect, useState } from 'react';

const messages = [
  'Initializing Innovation...',
  'Preparing Your Experience...',
  'Optimizing Connections...',
  'Building Smart Collaboration...',
];

const LoadingFallback = memo(() => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          window.clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 100);

    const messageInterval = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => {
      window.clearInterval(progressInterval);
      window.clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-900 px-4 py-8">
      <div className="w-full max-w-xs rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(37,99,235,0.12)] p-8">
        <div className="flex flex-col items-center gap-5">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 shadow-[0_20px_40px_rgba(37,99,235,0.12)]">
            <div className="absolute inset-0 rounded-full border border-blue-100" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <div className="h-3.5 w-3.5 rounded-full bg-blue-600 animate-pulse" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
              CCRC IT CLUB
            </h1>
            <p className="mt-2 text-sm text-slate-500">{messages[messageIndex]}</p>
          </div>

          <div className="w-full space-y-3">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-100 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <span>Loading</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-slate-400">
            Preparing the club experience with speed, security, and smart collaboration.
          </p>
        </div>
      </div>
    </div>
  );
});

LoadingFallback.displayName = 'LoadingFallback';

export default LoadingFallback;
