import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Code2 from 'lucide-react/dist/esm/icons/code-2';
import Users from 'lucide-react/dist/esm/icons/users';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { preloadPage } from '../utils/performance';

const Hero = memo(() => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 px-3 sm:px-4 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            {/* Gradient Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 animate-pulse delay-1000" />

            <div className="container relative z-10 mx-auto px-3 sm:px-4">
                <div className="flex flex-col items-center text-center space-y-6 sm:space-y-10">

                    {/* Badge */}
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-cyan-100/50 dark:bg-cyan-950/30 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs sm:text-sm font-medium animate-fade-in backdrop-blur-sm shadow-sm flex-wrap justify-center">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span className="font-semibold">Innovate. Connect. Transform.</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight flex flex-col gap-4 sm:gap-6 items-center text-center">

                        <span className="flex flex-wrap items-center justify-center gap-3 max-w-4xl">
                            {['Computer', 'Science', 'Innovation'].map((word, idx) => (
                                <span
                                    key={`word-${word}-${idx}`}
                                    className="inline-block text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 dark:text-white opacity-0 animate-letter-pop"
                                    style={{ animationDelay: `${idx * 160 + 140}ms` }}
                                >
                                    {word}
                                </span>
                            ))}
                        </span>

                        <span
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.45)] opacity-0 animate-flicker"
                            style={{ animationDelay: '650ms' }}
                        >
                            &
                        </span>

                        <span className="flex flex-wrap justify-center gap-1 leading-none">
                            {('IT CLUB'.split('')).map((char, idx) => (
                                <span
                                    key={`${char}-${idx}`}
                                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 opacity-0 animate-slide-in-up"
                                    style={{ animationDelay: `${idx * 60 + 900}ms` }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </span>

                        <span className="absolute -inset-1 bg-cyan-500/20 blur-2xl -z-10 opacity-50" />

                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in [animation-delay:400ms]">
                        Join the premier student community at CCRC. Where lines of code turn into
                        <span className="text-slate-900 dark:text-slate-200 font-medium"> innovation</span> and students become
                        <span className="text-slate-900 dark:text-slate-200 font-medium"> leaders</span>.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-fade-in [animation-delay:600ms]">
                        <Link
                            to="/join"
                            className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-violet-500 text-white font-black rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-fuchsia-500/30"
                            onMouseEnter={() => preloadPage('join')}
                            onFocus={() => preloadPage('join')}
                        >
                            <span className="relative flex items-center gap-2 text-center justify-center text-sm sm:text-base leading-tight animate-button-text">
                                Join the Club
                                <ArrowRight className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>

                        <Link
                            to="/events"
                            className="relative w-full sm:w-auto px-8 py-4 text-cyan-700 dark:text-cyan-100 font-semibold rounded-2xl border-2 border-cyan-300 dark:border-cyan-500 bg-white/80 dark:bg-slate-900/60 backdrop-blur-lg hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:text-cyan-900 transition-all duration-300 overflow-hidden group"
                            onMouseEnter={() => preloadPage('events')}
                            onFocus={() => preloadPage('events')}
                        >
                            <span className="inline-flex items-center gap-2 animate-button-text">
                                Explore Events
                                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-400/30 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-300 dark:group-hover:bg-cyan-600">
                                    <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </span>
                        </Link>

                    </div>

                    {/* Stats / Interactive Elements */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-10 sm:pt-14 border-t border-slate-200 dark:border-white/5 animate-fade-in [animation-delay:800ms]">
                        {[
                            { label: 'Active Members', value: '15+', icon: Users, accent: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300' },
                            { label: 'Events Hosted', value: '1+', icon: Calendar, accent: 'bg-rose-500/20 text-rose-600 dark:text-rose-300' },
                            { label: 'Projects Built', value: '3+', icon: Code2, accent: 'bg-lime-500/20 text-lime-600 dark:text-lime-300' },
                        ].map((stat, idx) => (
                            <div
                                key={stat.label}
                                className="flex gap-3 items-center p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md duration-300"
                                style={{ animationDelay: `${idx * 90 + 790}ms` }}
                            >
                                <span className={`flex items-center justify-center w-11 h-11 rounded-lg ${stat.accent}`}>
                                    <stat.icon className="w-5 h-5" />
                                </span>
                                <div>
                                    <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs sm:text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;
