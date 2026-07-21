import { useEffect } from 'react';

interface TallyWindow extends Window {
  Tally?: {
    loadEmbeds: () => void;
  };
}

const AIRegistrationPage = () => {
  const TARGET_DATE = new Date('2026-01-18T00:00:00+05:45').getTime();
  const isExpired = Date.now() >= TARGET_DATE;

  useEffect(() => {
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
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white transition-colors duration-300 py-16 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] font-semibold text-cyan-600 dark:text-cyan-300 mb-3">
            AI Prompt to Image Competition
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isExpired ? 'Register Now for the AI Competition' : 'AI Image Prompting Competition 2026'}
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {isExpired
              ? 'Submit your registration details below to join the competition.'
              : 'Prepare yourself. The competition starts soon, and registration is open.'}
          </p>
        </div>

        <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl bg-white dark:bg-[#020617]">
          <iframe
            data-tally-src="https://tally.so/r/BzVKlY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="1000"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="AI Prompting"
            className="tally-embed w-full rounded-[2rem]"
            style={{ minHeight: '1000px', minWidth: '100%' }}
          />
        </div>
      </div>
    </main>
  );
};

export default AIRegistrationPage;

