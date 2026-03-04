
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CyberBackground from './components/CyberBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleTheme = () => {
    setIsHighContrast(!isHighContrast);
  };

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
        <Certificates />
        <Contact />
      </main>
      
      <ScrollToTop />

      <footer className="bg-cyber-black border-t border-cyber-primary/30 relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50"></div>

        <div className="py-6 flex relative z-10">
          <motion.div
            className="flex flex-nowrap gap-12 whitespace-nowrap font-mono text-sm tracking-widest text-gray-500"
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Duplicating content to create a seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span>&copy; {new Date().getFullYear()} RindraPortoV2.0 | Design & Developer</span>
                <span className="text-cyber-primary/30">//</span>
                
                <span className="text-gray-300">DEVELOPED BY <span className="text-white font-bold">RINDRA</span></span>
                <span className="text-cyber-primary/30">//</span>
                
                <span>POWERED BY REACT & TAILWIND</span>
                <span className="text-cyber-primary/30">//</span>
                
                <span>ALL RIGHTS RESERVED</span>
                <span className="text-cyber-primary/30">//</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Side Fades for depth */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-cyber-black to-transparent pointer-events-none z-20"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyber-black to-transparent pointer-events-none z-20"></div>
      </footer>
    </div>
  );
};

export default App;
