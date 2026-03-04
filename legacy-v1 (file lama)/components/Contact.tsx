import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

// Optimized Custom 3D Social Icons with React.memo
const SocialIcon3D = React.memo(({ name, isShadow = false }: { name: string; isShadow?: boolean }) => {
  const commonClasses = `w-full h-full transition-all duration-300 ${isShadow ? 'opacity-50 blur-[1px] brightness-0 translate-x-1 translate-y-1' : 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]'}`;

  switch (name) {
    case 'Email':
      return (
        <svg viewBox="0 0 24 24" className={`${commonClasses} text-cyan-400`}>
           <path fill="currentColor" d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,6l-8,5 L4,6H20z M4,18V8l8,5l8-5v10H4z" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" className={`${commonClasses} text-[#0077B5]`}>
          <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" className={`${commonClasses} text-white`}>
          <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'Instagram':
      return (
        <svg viewBox="0 0 24 24" className={`${commonClasses} text-[#E1306C]`}>
           <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    default:
      return null;
  }
});

const socialLinks = [
  {
    name: 'Email',
    value: 'rindrabagusharyoputranto14@gmail.com',
    link: 'mailto:rindrabagusharyoputranto14@gmail.com',
    iconName: 'Email',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'group-hover:border-cyan-400',
    shadow: 'group-hover:shadow-cyan-500/50'
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/rindra-bagus-haryo-putranto',
    link: 'https://www.linkedin.com/in/rindra-bagus-haryo-putranto-4aa074349/',
    iconName: 'LinkedIn',
    color: 'from-blue-600 to-blue-400',
    borderColor: 'group-hover:border-blue-400',
    shadow: 'group-hover:shadow-blue-500/50'
  },
  {
    name: 'GitHub',
    value: 'github.com/rindrabagus786',
    link: 'https://github.com/rindrabagus786',
    iconName: 'GitHub',
    color: 'from-purple-600 to-pink-500',
    borderColor: 'group-hover:border-purple-400',
    shadow: 'group-hover:shadow-purple-500/50'
  },
  {
    name: 'Instagram',
    value: 'instagram.com/_rindrabhp',
    link: 'https://instagram.com/_rindrabhp',
    iconName: 'Instagram',
    color: 'from-pink-500 to-orange-400',
    borderColor: 'group-hover:border-pink-400',
    shadow: 'group-hover:shadow-pink-500/50'
  }
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden flex flex-col items-center">
      
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-primary/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-cyber-dark border border-gray-800 text-gray-400 font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Terbuka untuk Bekerja
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            JARINGAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">DIGITAL</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Terhubung melalui berbagai dimensi digital. Pilih platform frekuensi Anda.
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {socialLinks.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              className="group relative perspective-1000 cursor-pointer"
            >
              {/* 3D Depth Layer (Shadow/Bottom) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl transform translate-y-4 scale-[0.95] blur-xl opacity-20 group-hover:opacity-60 transition-all duration-500`}></div>
              
              {/* Main Card Body */}
              <div className={`relative h-full bg-cyber-dark/80 backdrop-blur-xl border border-gray-800 ${item.borderColor} p-8 rounded-2xl flex flex-col items-center justify-center gap-6 text-center transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden`}>
                
                {/* Top Highlight Gradient */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                {/* Icon Container with Floating 3D Effect */}
                <motion.div 
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] shadow-lg relative flex items-center justify-center will-change-transform`}
                  // Continuous Idle Animation
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 5 + (index * 0.5), // Stagger animations for organic feel
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  // Active Hover Animation
                  whileHover={{ 
                    scale: 1.15,
                    rotate: [0, -5, 5, 0], // Shake
                    transition: { duration: 0.3 } 
                  }}
                >
                   {/* Main Icon Box */}
                   <div className="w-full h-full bg-cyber-black rounded-2xl flex items-center justify-center relative overflow-hidden">
                      {/* Depth/Shadow Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12">
                            <SocialIcon3D name={item.iconName} isShadow={true} />
                          </div>
                      </div>
                      
                      {/* Main Visible Icon */}
                      <div className="w-12 h-12 relative z-10 group-hover:scale-110 transition-transform duration-300">
                          <SocialIcon3D name={item.iconName} />
                      </div>

                      {/* Glossy Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                   </div>
                </motion.div>

                {/* Text Content */}
                <div className="space-y-2 z-10">
                   <h3 className="text-xl font-display font-bold text-white flex items-center justify-center gap-2">
                     {item.name}
                     <ArrowUpRight size={16} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-gray-400" />
                   </h3>
                   <p className="text-sm font-mono text-gray-500 group-hover:text-cyber-primary transition-colors truncate max-w-[200px]">
                     {item.value}
                   </p>
                </div>

                {/* Decorative Grid Background inside card */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Location Indicator (Visual Only) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-cyber-gray/20 border border-gray-800 text-gray-400 backdrop-blur-sm hover:border-cyber-primary/50 transition-colors duration-300">
             <MapPin size={18} className="text-red-500" />
             <span className="font-mono text-sm">Berbasis di Madiun, Jawa Timur, Indonesia</span>
             <span className="mx-2 text-gray-700">||</span>
             <span className="text-xs text-cyber-primary animate-pulse">TERSEDIA UNTUK FREELANCE</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;