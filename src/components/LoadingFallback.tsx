import { memo } from 'react';

const LoadingFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyan-200 dark:border-cyan-900 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
    </div>
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

export default LoadingFallback;
