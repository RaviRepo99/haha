
import { memo } from 'react';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Clock from 'lucide-react/dist/esm/icons/clock';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { Link } from 'react-router-dom';
import type { Event } from '../types';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const isRunning = event.status === 'running';

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-none hover:border-cyan-500/30">
            <Link to={`/events/${event.id}`} className="block h-full">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isRunning
                        ? 'bg-red-500/90 text-white animate-pulse'
                        : 'bg-slate-800/80 text-white backdrop-blur-sm'
                        } `}>
                        {isRunning ? 'Live' : event.status}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {event.tags?.map(tag => (
                                <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {event.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                            {event.description.replace(/[#*_\[\]()~`>]/g, '').substring(0, 150)}
                        </p>
                    </div>

                    <div className="mt-auto space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar className="w-4 h-4 text-cyan-500" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Clock className="w-4 h-4 text-cyan-500" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin className="w-4 h-4 text-cyan-500" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>
            </Link>

            {isRunning && event.registration_link && (
                <div className="px-6 pb-6 mt-auto">
                    {event.registration_link.includes('ccrcitclub.digital') || event.registration_link.startsWith('/') ? (
                        <Link
                            to={event.registration_link.replace('https:// ccrcitclub.digital', '')}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 dark:bg-cyan-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-cyan-700 dark:hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 relative z-10"
                        >
                            Register Now <ArrowRight className="w-4 h-4" />
                        </Link>
                    ) : (
                        <a
                            href={event.registration_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 dark:bg-cyan-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-cyan-700 dark:hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 relative z-10"
                        >
                            Register Now <ArrowRight className="w-4 h-4" />
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(EventCard);
