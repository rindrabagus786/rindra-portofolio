'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/types';

const projects: Project[] = [
    {
        id: 1,
        title: 'FTIClouds',
        description:
            'FTIClouds adalah platform penyimpanan awan (cloud storage) modern yang dirancang untuk membantu pengguna menyimpan, mengelola, dan membagikan file dengan cepat, aman, dan mudah. Mengusung slogan "Tetap Tenang dan Lega di Setiap Saat," FTIClouds hadir sebagai solusi penyimpanan digital yang memberikan ketenangan pikiran karena semua data tersimpan rapi dan dapat diakses kapan saja.',
        tags: ['Css', 'PHP'],
        link: 'https://fticlouds.xyz',
        image: 'fticlouds-xyz.png',
    },
    {
        id: 2,
        title: 'OryonWeb.com',
        description:
            'OryonWeb.com adalah platform layanan profesional yang berfokus pada jasa pembuatan dan pengembangan website untuk individu, bisnis, UMKM, hingga perusahaan. OryonWeb menghadirkan solusi web modern yang cepat, responsif, aman, dan dirancang sesuai kebutuhan pengguna.',
        tags: ['React', 'JavaScript', 'PHP'],
        link: 'https://oryonweb.com',
        image: 'oryonweb-com.png',
    },
    {
        id: 3,
        title: 'Coming Soon',
        description: 'XXXX',
        tags: ['XXXX'],
        link: '#',
        image: 'coming-soon.png',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -25, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 60, damping: 20, mass: 1.2 },
    },
};

export default function Projects() {
    return (
        <section id="projects" className="py-24 bg-black/30 relative perspective-2000">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyber-primary/30 bg-cyber-primary/5 text-cyber-primary font-mono text-xs mb-4">
                        <Zap size={14} className="fill-current" />
                        <span>Superiority</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        PROYEK <span className="text-cyber-secondary">UNGGULAN</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Inovasi kode dan desain visual dalam antarmuka digital.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            className="group relative bg-cyber-surface border border-gray-800 transition-all duration-500 rounded-xl flex flex-col transform-style-3d hover:z-10"
                        >
                            {/* Circuit Border Tracing */}
                            <div className="absolute top-0 left-0 w-0 h-[2px] bg-cyber-primary group-hover:w-full transition-all duration-700 ease-in-out delay-0 z-30 shadow-[0_0_10px_#00f3ff]" />
                            <div className="absolute top-0 right-0 w-[2px] h-0 bg-cyber-primary group-hover:h-full transition-all duration-500 ease-in-out delay-500 z-30 shadow-[0_0_10px_#00f3ff]" />
                            <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-cyber-primary group-hover:w-full transition-all duration-700 ease-in-out delay-300 z-30 shadow-[0_0_10px_#00f3ff]" />
                            <div className="absolute bottom-0 left-0 w-[2px] h-0 bg-cyber-primary group-hover:h-full transition-all duration-500 ease-in-out delay-0 z-30 shadow-[0_0_10px_#00f3ff]" />

                            {/* Image Section */}
                            <div className="relative h-52 overflow-hidden z-10 bg-cyber-black">
                                <Image
                                    src={`/${project.image}`}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-cyber-surface/60 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyber-primary/40 to-cyber-secondary/40 translate-y-0 group-hover:-translate-y-full transition-transform duration-700 ease-in-out z-20 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20 pointer-events-none" />
                                <div className="absolute top-4 right-4 z-30 bg-black/70 backdrop-blur border border-white/10 px-3 py-1 rounded text-xs font-mono text-white translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    ID: PRJ_{project.id.toString().padStart(2, '0')}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="p-6 relative z-10 bg-cyber-surface h-full flex flex-col group-hover:bg-cyber-surface-gray/50 transition-colors duration-500">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyber-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <ArrowRight
                                        className="text-gray-600 group-hover:text-cyber-primary transform -rotate-45 group-hover:rotate-0 transition-all duration-500"
                                        size={24}
                                    />
                                </div>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow group-hover:text-gray-300 transition-colors">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map((tag, i) => (
                                        <div
                                            key={tag}
                                            className="text-xs font-mono text-cyber-primary border border-cyber-primary/20 px-2 py-1 rounded bg-cyber-primary/5 transition-all duration-300 group-hover:border-cyber-primary/60 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                                            style={{ transitionDelay: `${i * 100}ms` }}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4 mt-auto transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 text-cyber-black bg-gray-200 hover:bg-cyber-primary hover:text-cyber-black transition-all duration-300 text-sm font-bold tracking-wider px-4 py-2 rounded shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                                    >
                                        <ExternalLink size={16} /> MENUJU LINK
                                    </a>
                                    <a
                                        href="#"
                                        className="flex-1 flex items-center justify-center gap-2 text-white border border-gray-600 hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-bold tracking-wider px-4 py-2 rounded"
                                    >
                                        <Github size={16} /> CODE
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
