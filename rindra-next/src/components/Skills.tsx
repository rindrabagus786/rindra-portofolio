'use client';

import React, { memo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import type { Skill } from '@/types';

const skills: Skill[] = [
    { name: 'React / Next.js', level: 25, icon: 'react' },
    { name: 'TypeScript', level: 20, icon: 'ts' },
    { name: 'Tailwind CSS', level: 30, icon: 'tailwind' },
    { name: 'Node.js', level: 20, icon: 'node' },
    { name: 'Three.js', level: 10, icon: 'three' },
    { name: 'PostgreSQL', level: 5, icon: 'postgres' },
];

interface TechLogoProps {
    name: string;
    isShadow?: boolean;
    isHighContrast?: boolean;
}

const TechLogo = memo(function TechLogo({ name, isShadow = false }: TechLogoProps) {
    const commonClasses = `w-full h-full transition-all duration-300 ${isShadow
            ? 'opacity-40 blur-[1px] brightness-50'
            : 'drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]'
        }`;

    // Use SVG files from public folder where available
    const svgMap: Record<string, string> = {
        react: '/react-seeklogo.svg',
        ts: '/icons8-typescript.svg',
        tailwind: '/icons8-tailwind-css.svg',
        node: '/icons8-nodejs.svg',
        three: '/three-js-seeklogo.svg',
        postgres: '/postqresql-seeklogo.svg',
    };

    const src = svgMap[name];
    if (!src) return null;

    return (
        <div className={`relative w-full h-full ${isShadow ? 'opacity-40 blur-[1px] brightness-50' : 'drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]'}`}>
            <Image
                src={src}
                alt={name}
                fill
                sizes="112px"
                className="object-contain"
            />
        </div>
    );
});

interface SkillCardProps {
    skill: Skill;
    index: number;
    isHighContrast: boolean;
}

function SkillCard({ skill, index, isHighContrast }: SkillCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [25, -25]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-25, 25]), springConfig);

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX / rect.width - rect.left / rect.width - 0.5);
            y.set(event.clientY / rect.height - rect.top / rect.height - 0.5);
        },
        [x, y]
    );

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    const colorMap: Record<string, string> = {
        react: 'bg-[#61DAFB]',
        ts: 'bg-[#3178C6]',
        node: 'bg-[#68A063]',
        tailwind: 'bg-[#38BDF8]',
    };

    const gradientMap: Record<string, string> = {
        react: 'from-[#61DAFB] to-blue-600',
        ts: 'from-[#3178C6] to-blue-800',
        node: 'from-[#68A063] to-green-800',
        tailwind: 'from-[#38BDF8] to-cyan-600',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative flex flex-col items-center"
        >
            <div
                className="relative w-full h-40 flex items-center justify-center -mb-10 perspective-1000 z-20"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    className="relative w-28 h-28 cursor-pointer preserve-3d will-change-transform"
                    style={{ rotateX, rotateY }}
                >
                    <motion.div
                        className="w-full h-full preserve-3d"
                        animate={{
                            y: [0, -15, 0],
                            rotateZ: [-5, 5, -5],
                            scale: [0.95, 1.05, 0.95],
                            rotateY: [-15, 15, -15],
                        }}
                        transition={{
                            duration: 5 + index * 0.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.1,
                        }}
                        whileHover={{ scale: 1.15 }}
                    >
                        <div
                            className={`absolute inset-0 blur-3xl opacity-20 group-hover:opacity-60 transition-all duration-500 rounded-full transform scale-150 ${colorMap[skill.icon] || 'bg-cyber-primary'
                                }`}
                        />

                        <div className="absolute inset-0 transform translate-x-1 translate-y-1 opacity-70">
                            <TechLogo name={skill.icon} isShadow={true} isHighContrast={isHighContrast} />
                        </div>

                        <div className="absolute inset-0 z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <TechLogo name={skill.icon} isHighContrast={isHighContrast} />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute bottom-4 w-24 h-4 bg-black/60 blur-lg rounded-[100%]"
                    animate={{ scale: [1, 0.85, 1], opacity: [0.4, 0.2, 0.4] }}
                    transition={{
                        duration: 5 + index * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.1,
                    }}
                />
            </div>

            <div className="w-full bg-cyber-dark/40 backdrop-blur-md border border-gray-800/80 pt-12 pb-6 px-6 rounded-2xl group-hover:border-cyber-primary/50 group-hover:bg-cyber-dark/80 transition-all duration-500 relative overflow-hidden text-center shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />

                <h3 className="text-xl font-display font-bold text-gray-200 mb-2 group-hover:text-white transition-colors">
                    {skill.name}
                </h3>

                <div className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-600 group-hover:from-cyber-primary group-hover:to-cyber-secondary transition-all duration-500 mb-5 scale-90 group-hover:scale-105 origin-center">
                    {skill.level}%
                </div>

                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                        className={`h-full bg-gradient-to-r transition-all duration-500 ${isHighContrast
                                ? 'from-cyber-primary to-cyber-secondary shadow-[0_0_15px_var(--color-primary)]'
                                : `shadow-[0_0_15px_rgba(255,255,255,0.4)] ${gradientMap[skill.icon] || 'from-cyber-primary to-cyber-secondary'
                                }`
                            }`}
                    />
                </div>
            </div>
        </motion.div>
    );
}

interface SkillsProps {
    isHighContrast?: boolean;
}

export default function Skills({ isHighContrast = false }: SkillsProps) {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div
                className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none ${isHighContrast ? 'bg-cyber-primary/20' : 'bg-cyber-secondary/10'
                    }`}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        ARSENAL <span className="text-cyber-primary">TEKNOLOGI</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyber-primary to-transparent mx-auto md:mx-0" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={skill.name}
                            skill={skill}
                            index={index}
                            isHighContrast={isHighContrast}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
