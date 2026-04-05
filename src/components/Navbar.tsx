import { useState, useEffect, useCallback, memo } from 'react';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = memo(() => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    setIsScrolled(currentScrollY > 20);

                    if (currentScrollY > 100) {
                        if (currentScrollY > lastScrollY) {
                            if (!isMobileMenuOpen) setIsVisible(false);
                        } else {
                            setIsVisible(true);
                        }
                    } else {
                        setIsVisible(true);
                    }

                    setLastScrollY(currentScrollY);
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMobileMenuOpen]);

    const handleHomeClick = useCallback(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', type: 'route' },
        { name: 'About', href: '/#about', type: 'anchor' },
        { name: 'Events', href: '/events', type: 'route' },
        { name: 'Team', href: '/team', type: 'route' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                    } ${isScrolled ? 'py-4' : 'py-6'}`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    {/* Desktop & Mobile Navbar Container */}
                    <div
                        className={`mx-auto max-w-7xl transition-all duration-500 relative ${isMobileMenuOpen ? 'rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl' : 'rounded-full'
                            } ${isScrolled || isMobileMenuOpen
                                ? 'bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl shadow-lg px-6 py-3'
                                : 'bg-transparent ring-transparent px-0 py-2'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={handleHomeClick}>
                                <div className={`relative flex items-center justify-center transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'w-10 h-10' : 'w-20 h-20'}`}>
                                    <img src="/ccrc_it_logo.jpg" alt="ITCLUB Logo" width="480" height="209" className="w-full h-full object-contain" fetchPriority="high" />
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center bg-black/5 dark:bg-white/[0.03] rounded-full px-2 py-1 border border-black/5 dark:border-white/[0.05]">
                                {navLinks.map((link) => (
                                    link.type === 'route' ? (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={link.name === 'Home' ? handleHomeClick : undefined}
                                            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive(link.href)
                                                ? 'text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-500/10'
                                                : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05]'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05] rounded-full transition-all duration-300"
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}
                            </div>

                            {/* Desktop Action & Theme Toggle */}
                            <div className="hidden md:flex items-center gap-4">
                                <ThemeToggle />
                                <Link
                                    to="/join"
                                    className="group relative px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full overflow-hidden hover:bg-slate-800 dark:hover:bg-cyan-50 transition-colors"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                    <span className="relative flex items-center gap-2">
                                        Join Club <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </div>

                            {/* Mobile Controls */}
                            <div className="flex md:hidden items-center gap-3">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all active:scale-90"
                                >
                                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                                </button>
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* Mobile Menu Content (Expands inside) */}
                        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 py-10' : 'max-h-0 opacity-0 py-0'
                            }`}>
                            <div className="flex flex-col space-y-6 px-4">
                                {navLinks.map((link) => (
                                    link.type === 'route' ? (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={handleHomeClick}
                                            className={`text-xl font-bold transition-all ${isActive(link.href)
                                                ? 'text-rose-600 dark:text-rose-500 translate-x-1'
                                                : 'text-slate-700 dark:text-slate-300 hover:translate-x-1'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-xl font-bold text-slate-700 dark:text-slate-300 hover:translate-x-1 transition-transform"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}

                                <div className="pt-8 border-t border-rose-100 dark:border-rose-900/10">
                                    <Link
                                        to="/join"
                                        className="flex items-center justify-center px-8 py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-xl shadow-rose-500/20 w-fit min-w-[200px]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Join Club Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Backdrop for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[45] bg-black/5 backdrop-blur-[2px] md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;
