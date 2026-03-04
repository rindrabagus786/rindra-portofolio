'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Terminal, Eye, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
    { label: 'BERANDA', href: '#home' },
    { label: 'KEAHLIAN', href: '#skills' },
    { label: 'PROYEK', href: '#projects' },
    { label: 'DASBOR', href: '#dashboard' },
    { label: 'SARAN', href: '#saran' },
    { label: 'KONTAK', href: '#contact' },
];

interface NavbarProps {
    isHighContrast: boolean;
    toggleTheme: () => void;
}

export default function Navbar({ isHighContrast, toggleTheme }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            setIsOpen(false);
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        },
        []
    );

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-primary/20'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div
                        onClick={scrollToTop}
                        className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
                    >
                        <Terminal className="w-8 h-8 text-cyber-primary group-hover:text-cyber-secondary transition-all duration-1000 ease-in-out group-hover:rotate-[360deg]" />
                        <span className="font-display font-bold text-2xl tracking-wider text-white group-hover:text-cyber-primary transition-colors duration-300">
                            R<span className="text-cyber-primary">2.0</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="font-display text-sm relative group overflow-hidden px-2 py-1"
                                >
                                    <span className="relative z-10 text-gray-300 group-hover:text-cyber-black transition-colors duration-300">
                                        {item.label}
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0 bg-cyber-primary group-hover:h-full transition-all duration-300 -z-0 ease-out" />
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary hover:text-cyber-black transition-all duration-300"
                            title={isHighContrast ? 'Switch to Cyber Mode' : 'Switch to High Contrast'}
                            suppressHydrationWarning
                        >
                            {isHighContrast ? <Zap size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="-mr-2 flex md:hidden items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary hover:text-cyber-black transition-all duration-300"
                            suppressHydrationWarning
                        >
                            {isHighContrast ? <Zap size={20} /> : <Eye size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-cyber-primary hover:text-white hover:bg-cyber-gray focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-cyber-black/95 backdrop-blur-xl border-b border-cyber-primary/30"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="text-gray-300 hover:text-cyber-primary block px-3 py-2 rounded-md text-base font-medium font-display tracking-widest cursor-pointer"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
