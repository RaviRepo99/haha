import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb';
import Users from 'lucide-react/dist/esm/icons/users';
import Telescope from 'lucide-react/dist/esm/icons/telescope';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import { memo } from 'react';

const Features = memo(() => {
    return (
        <section id="about" className="py-32 relative">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                            Driven by <span className="text-gradient">Purpose.</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            We are more than just a club. We are a movement to revolutionize
                            tech culture at CCRC through three core pillars.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-medium transition-colors group">
                        Learn more about us <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: Innovation (Large) */}
                    <div className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between space-y-12">
                            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-500/10">
                                <Lightbulb className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">Innovation</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
                                    We foster a culture of creative thinking, encouraging students to turn
                                    their unique ideas into tangible projects. From hackathons to project
                                    demonstrations, we provide the platform.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Collaboration (Tall) */}
                    <div className="glass-card rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/10">
                                <Users className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">Collaboration</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Connect with like-minded peers, form teams, and work together on
                                    exciting tech challenges.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Growth (Wide) */}
                    <div className="md:col-span-3 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="shrink-0 w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
                            <Telescope className="w-10 h-10" />
                        </div>

                        <div className="relative z-10 text-center md:text-left">
                            <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-200 transition-colors">Growth & Mentorship</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                                Accelerate your professional growth through hands-on workshops, expert mentorship,
                                and real-world experience. We bridge the gap between academia and industry.
                            </p>
                        </div>

                        <div className="ml-auto shrink-0">
                            <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                                <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
});

Features.displayName = 'Features';

export default Features;
