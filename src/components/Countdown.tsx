import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
    targetDate: number;
    title?: string;
    description?: string;
}

const Countdown = ({ targetDate, title, description }: CountdownProps) => {
    const [isExpired, setIsExpired] = useState(false);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = Date.now();
            const distance = targetDate - now;

            if (distance <= 0) {
                setIsExpired(true);
                return;
            }

            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((distance / (1000 * 60)) % 60),
                seconds: Math.floor((distance / 1000) % 60),
            });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (isExpired) return null;

    const units: Array<[string, number]> = [
        ['Days', countdown.days],
        ['Hours', countdown.hours],
        ['Mins', countdown.minutes],
        ['Secs', countdown.seconds],
    ];

    return (
        <div className="flex flex-col items-center space-y-4 px-2">
            {(title || description) && (
                <div className="text-center space-y-1 mb-2">
                    {title && <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{title}</h3>}
                    {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
                </div>
            )}

            <div className="flex items-center justify-center gap-3 sm:gap-6" role="group" aria-label="Countdown timer">
                {units.map(([key, value]) => (
                    <div key={key} className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                        <motion.div
                            key={`${key}-${value}`}
                            initial={{ y: -4, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-black text-cyan-600 dark:text-cyan-400 tabular-nums"
                        >
                            {value < 10 ? `0${value}` : value}
                        </motion.div>
                        <div className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mt-1">
                            {key}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Countdown;
