
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';
import { Certificate } from '../types';

const certificates: Certificate[] = [
  {
    id: 1,
    name: 'Belajar AI',
    issuer: 'Dicoding & Google cloud pertner',
    date: '29 September 2025',
    credentialId: ' ERZR2W5L2PYV',
    link: 'https://dicoding.com/certificates/ERZR2W5L2PYV',
    image: 'dicoding-logo.jpeg' // Placeholder logo/image
  },
  {
    id: 2,
    name: 'Coming Soon',
    issuer: 'XXXX',
    date: 'XXXX',
    credentialId: 'XXXX',
    link: 'rndr-logo.png',
    image: 'rndr-logo.png' // Placeholder logo/image
  }
];

const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary font-mono text-xs tracking-widest">
            <Award size={14} />
            <span>LISENSI_TERVERIFIKASI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            SERTIFIKASI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">DIGITAL</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Validasi kompetensi teknis melalui standar industri global.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-cyber-dark/60 border border-gray-800 hover:border-cyber-primary/50 transition-all duration-300 rounded-xl overflow-hidden flex flex-col"
            >
              
              {/* Image Section (Top) */}
              <div className="relative h-48 w-full overflow-hidden bg-white/5 p-8 flex items-center justify-center">
                 <div className="absolute inset-0 bg-cyber-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                 
                 {/* Decorative Scanline */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

                 <img 
                   src={cert.image} 
                   alt={cert.name} 
                   className="h-full w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 drop-shadow-lg relative z-0"
                 />

                 {/* Overlay Button Container */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40 backdrop-blur-[2px]">
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-full bg-cyber-primary text-cyber-black font-bold text-xs tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_15px_rgba(0,243,255,0.6)] hover:bg-white"
                    >
                      MENUJU LINK
                    </a>
                 </div>
              </div>

              {/* Text Info (Bottom) */}
              <div className="p-6 bg-cyber-gray/40 backdrop-blur-sm flex-grow border-t border-gray-800 relative">
                 <h3 className="text-xl font-display font-bold text-white group-hover:text-cyber-primary transition-colors mb-1">
                    {cert.name}
                  </h3>
                  <div className="text-sm text-gray-400 font-sans mb-4">
                    {cert.issuer}
                  </div>
                  
                  {/* Footer Meta */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                     <span className="text-xs font-mono text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        {cert.date}
                     </span>
                     <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider border border-gray-700 px-1.5 py-0.5 rounded">
                        ID: {cert.credentialId}
                     </span>
                  </div>

                  {/* Glow Line Bottom */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyber-primary group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;
