'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Code, Cpu, Database, Terminal } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
    isHighContrast: boolean;
}

export default function Hero({ isHighContrast }: HeroProps) {
    const [bgParticles, setBgParticles] = useState<
        { id: number; size: number; left: number; duration: number; delay: number }[]
    >([]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            x.set(mouseX / rect.width - 0.5);
            y.set(mouseY / rect.height - 0.5);
        },
        [x, y]
    );

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    useEffect(() => {
        const particles = [...Array(8)].map((_, i) => ({
            id: i,
            size: 15 + Math.random() * 30,
            left: Math.random() * 100,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * 5,
        }));
        setBgParticles(particles);
    }, []);

    const handleScroll = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
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

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32 pb-20"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-20 will-change-transform">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 border border-dashed border-cyber-primary/30 rounded-full will-change-transform"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-16 md:inset-24 border border-dotted border-cyber-secondary/30 rounded-full will-change-transform"
                    />
                    <div className="absolute inset-0 bg-cyber-primary/5 rounded-full blur-[100px] animate-pulse" />
                </div>

                {bgParticles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute border border-cyber-primary/20 bg-cyber-primary/5 backdrop-blur-[1px] rounded-sm will-change-transform"
                        initial={{ y: '110vh', x: Math.random() * 50 - 25, opacity: 0, rotate: 0 }}
                        animate={{ y: '-10vh', opacity: [0, 0.4, 0], rotate: 360 }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay }}
                        style={{ width: p.size, height: p.size, left: `${p.left}%` }}
                    />
                ))}

                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyber-primary/10 rounded-full blur-[120px] mix-blend-screen will-change-transform"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], x: [0, -50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyber-secondary/10 rounded-full blur-[120px] mix-blend-screen will-change-transform"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12">
                {/* Top Hero Section */}
                <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="mb-8">
                            <span className="block font-sans text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-[0.2em] mb-2 uppercase">
                                Creative Beginner
                            </span>
                            <span className="block font-display text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-secondary drop-shadow-[0_0_20px_rgba(0,243,255,0.3)] tracking-tight leading-tight">
                                PROBLEM SOLVER //
                            </span>
                        </h1>

                        <p className="font-sans text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                            Menciptakan pengalaman digital yang luar biasa melalui desain yang cermat dan solusi
                            inovatif.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-12">
                            <a
                                href="#projects"
                                onClick={(e) => handleScroll(e, '#projects')}
                                className="group relative px-8 py-3 bg-cyber-primary text-cyber-black font-display font-bold text-lg overflow-hidden cursor-pointer w-full sm:w-auto text-center"
                                style={{
                                    clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)',
                                }}
                            >
                                <span className="relative z-10 text-cyber-black group-hover:text-cyber-black transition-colors duration-300">
                                    LIHAT PROYEK
                                </span>
                                <div className="absolute inset-0 bg-cyber-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                            </a>

                            <a
                                href="#contact"
                                onClick={(e) => handleScroll(e, '#contact')}
                                className="group relative w-full sm:w-auto text-center px-8 py-3 border border-cyber-primary font-display font-bold text-lg transition-all duration-300 cursor-pointer text-cyber-primary hover:bg-cyber-primary hover:text-cyber-black"
                                style={{
                                    clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)',
                                }}
                            >
                                HUBUNGI SAYA
                            </a>
                        </div>

                        <div className="flex justify-center gap-8 sm:gap-12 opacity-80">
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: 5,
                                    filter: 'drop-shadow(0 0 25px rgba(0,243,255,1))',
                                }}
                                className="cursor-pointer will-change-transform"
                            >
                                <Code className="w-8 h-8 sm:w-10 sm:h-10 text-cyber-primary" />
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: -5,
                                    filter: 'drop-shadow(0 0 30px rgba(188,19,254,1))',
                                }}
                                className="cursor-pointer will-change-transform"
                            >
                                <Database className="w-8 h-8 sm:w-10 sm:h-10 text-cyber-secondary" />
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -12, 0], rotateY: [0, 180, 360] }}
                                transition={{
                                    y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                                    rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                                }}
                                whileHover={{
                                    scale: 1.2,
                                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,1))',
                                }}
                                className="cursor-pointer will-change-transform"
                            >
                                <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Scroll Arrow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{
                            opacity: { delay: 1, duration: 1 },
                            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        className="my-8 z-20 relative will-change-transform"
                    >
                        <a
                            href="#skills"
                            onClick={(e) => handleScroll(e, '#skills')}
                            className="cursor-pointer block p-2"
                            aria-label="Scroll to skills"
                        >
                            <ChevronDown className="w-10 h-10 text-cyber-primary hover:text-white transition-colors duration-300" />
                        </a>
                    </motion.div>
                </div>

                {/* About Section */}
                <div className="w-full max-w-6xl mx-auto mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal size={20} className="text-cyber-secondary" />
                            <span className="text-cyber-secondary font-mono tracking-[0.2em] text-sm">
                                IDENTITAS_PENGGUNA
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
                            TENTANG{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
                                SAYA
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Photo Card with 3D effect */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center md:justify-end relative"
                        >
                            <div
                                className="relative w-72 h-96 group perspective-1000"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <motion.div
                                    className="w-full h-full relative preserve-3d transition-shadow duration-500 ease-out will-change-transform"
                                    style={{ rotateX, rotateY }}
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
                                >
                                    <div className="absolute inset-0 bg-cyber-dark/80 backdrop-blur-xl border-2 border-cyber-primary/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.15)] group-hover:border-cyber-primary/60 transition-colors duration-300">
                                        <div className="h-8 bg-cyber-primary/10 border-b border-cyber-primary/30 flex items-center justify-between px-4">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-400/50" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 border border-yellow-400/50" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 border border-green-400/50" />
                                            </div>
                                            <div className="text-[10px] font-mono text-cyber-primary tracking-widest opacity-70">
                                                RINDRA BAGUS HARYO PUTRANTO
                                            </div>
                                        </div>

                                        <div className="relative h-[calc(100%-6.5rem)] w-full p-4">
                                            <div className="w-full h-full relative overflow-hidden rounded-lg border border-white/10 bg-cyber-black">
                                                <motion.div
                                                    className="w-full h-full relative"
                                                    animate={{ scale: [1, 1.05, 1], x: [-5, 5, -5] }}
                                                    transition={{
                                                        scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                                                        x: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
                                                    }}
                                                >
                                                    <Image
                                                        src="/fotoprofile.jpg"
                                                        alt="Profile"
                                                        fill
                                                        sizes="288px"
                                                        className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                        priority
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    className="absolute w-full h-[2px] bg-cyber-primary/50 shadow-[0_0_10px_#00f3ff] z-10"
                                                    animate={{ top: ['0%', '100%', '0%'] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                                />
                                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 h-[4.5rem] bg-cyber-black/60 border-t border-cyber-primary/30 p-4 flex items-center justify-between backdrop-blur-sm">
                                            <div className="flex flex-col">
                                                <h3 className="font-display font-bold text-white text-lg leading-tight tracking-wide">
                                                    Rindra
                                                </h3>
                                                <p className="font-mono text-[10px] text-cyber-primary tracking-wider">
                                                    BEGINNER DEV
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="px-2 py-0.5 rounded bg-cyber-secondary/20 border border-cyber-secondary/40 text-[10px] font-bold text-cyber-secondary">
                                                    LVL. 5
                                                </div>
                                                <div className="text-[9px] text-gray-500 mt-1 font-mono">
                                                    STATUS: ONLINE
                                                </div>
                                            </div>
                                        </div>

                                        <motion.div
                                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-20 pointer-events-none"
                                            initial={{ x: '-150%' }}
                                            animate={{ x: '150%' }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 4,
                                                ease: 'linear',
                                            }}
                                        />
                                    </div>

                                    <div className="absolute -z-10 -right-3 -bottom-3 w-full h-full border border-cyber-secondary/30 bg-cyber-secondary/5 rounded-2xl" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* About Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col items-center md:items-start text-center md:text-left"
                        >
                            <div className="prose prose-invert prose-lg text-gray-400 mb-8">
                                <p className="mb-6 leading-relaxed">
                                    Saya seorang pemula kreatif yang penuh semangat dengan pengalaman kurang dari 1
                                    tahun di bidang desain dan pengembangan digital. Pendekatan saya menggabungkan
                                    pemikiran strategis dengan kepekaan estetika untuk menciptakan karya yang bermakna
                                    dan berdampak.
                                </p>
                                <p className="leading-relaxed">
                                    Saya percaya pada kekuatan kesederhanaan dan pentingnya desain yang berpusat pada
                                    pengguna. Setiap proyek adalah kesempatan untuk memecahkan masalah dan menciptakan
                                    sesuatu yang indah dan fungsional.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 w-full max-w-sm md:max-w-none md:mr-auto mx-auto">
                                <div className="bg-cyber-dark/80 backdrop-blur border border-gray-800 p-4 hover:-translate-y-1 transition-all duration-300 hover:border-cyber-primary group rounded-tl-xl rounded-br-xl shadow-lg">
                                    <div className="text-4xl font-display font-bold text-white group-hover:text-cyber-primary transition-colors">
                                        -1
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono mt-1 group-hover:text-gray-300">
                                        TAHUN PENGALAMAN
                                    </div>
                                </div>
                                <div className="bg-cyber-dark/80 backdrop-blur border border-gray-800 p-4 hover:-translate-y-1 transition-all duration-300 hover:border-cyber-secondary group rounded-tl-xl rounded-br-xl shadow-lg">
                                    <div className="text-4xl font-display font-bold text-white group-hover:text-cyber-secondary transition-colors">
                                        2
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono mt-1 group-hover:text-gray-300">
                                        PROYEK SELESAI
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
