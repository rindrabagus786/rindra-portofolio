'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for heavy components — reduces initial bundle
const CyberBackground = dynamic(() => import('@/components/CyberBackground'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'));
const Hero = dynamic(() => import('@/components/Hero'));
const Skills = dynamic(() => import('@/components/Skills'));
const Projects = dynamic(() => import('@/components/Projects'));
const Dashboard = dynamic(() => import('@/components/Dashboard'));
const Certificates = dynamic(() => import('@/components/Certificates'));
const Saran = dynamic(() => import('@/components/Saran'));
const Contact = dynamic(() => import('@/components/Contact'));
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });
const MusicToggle = dynamic(() => import('@/components/MusicToggle'), { ssr: false });

export default function Home() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleTheme = () => setIsHighContrast((prev) => !prev);

  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-cyber-primary selection:text-black">
      <CyberBackground isHighContrast={isHighContrast} />
      <Navbar isHighContrast={isHighContrast} toggleTheme={toggleTheme} />

      <main>
        <Hero isHighContrast={isHighContrast} />
        <Skills isHighContrast={isHighContrast} />
        <Projects />
        <Dashboard />
        <Certificates />
        <Saran />
        <Contact />
      </main>

      <ScrollToTop />
      <MusicToggle />

      <footer className="bg-cyber-black border-t border-cyber-primary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50" />

        <div className="py-6 flex relative z-10">
          <motion.div
            className="flex flex-nowrap gap-12 whitespace-nowrap font-mono text-sm tracking-widest text-gray-500"
            animate={{ x: '-50%' }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span>
                  &copy; {new Date().getFullYear()} RindraPortoV2.0 | Design &amp; Developer
                </span>
                <span className="text-cyber-primary/30">//</span>
                <span className="text-gray-300">
                  DEVELOPED BY <span className="text-white font-bold">RINDRA</span>
                </span>
                <span className="text-cyber-primary/30">//</span>
                <span>POWERED BY NEXT.JS &amp; TAILWIND</span>
                <span className="text-cyber-primary/30">//</span>
                <span>ALL RIGHTS RESERVED</span>
                <span className="text-cyber-primary/30">//</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-cyber-black to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyber-black to-transparent pointer-events-none z-20" />
      </footer>
    </div>
  );
}
