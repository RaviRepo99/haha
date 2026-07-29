interface MainLoadingScreenProps {
  progress: number;
}

const MainLoadingScreen = ({ progress }: MainLoadingScreenProps) => (
  <div
    id="main-loading-screen"
    className="fixed inset-0 z-[9998] flex items-center justify-center bg-white"
  >
    <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-[42px] bg-white px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition-all duration-300 loader-enter">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 opacity-80" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)] animate-pulse">
          <div className="absolute inset-0 rounded-full bg-white/90 blur-sm" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <img
              src="/ccrc_it_logo.jpg"
              alt="CCRC IT CLUB Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            CCRC IT CLUB
          </h1>
        </div>

        <div className="relative flex h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(59,130,246,0.18),_transparent_30%)]" />
        </div>
      </div>
    </div>
  </div>
);

export default MainLoadingScreen;
