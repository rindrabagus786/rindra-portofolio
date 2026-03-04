import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Skill } from '../types';

// Updated skill list
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

// Optimization: Memoize the heavy SVG component
const TechLogo = React.memo(({ name, isShadow = false, isHighContrast }: TechLogoProps) => {
  const commonClasses = `w-full h-full transition-all duration-300 ${isShadow ? 'opacity-40 blur-[1px] brightness-50' : 'drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]'}`;
  
  switch (name) {
    case 'react':
      return (
        <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} text-[#61DAFB]`}>
          <circle cx="0" cy="0" r="2.2" fill="currentColor"></circle>
          <g stroke="currentColor" strokeWidth="1.2" fill="none">
            <ellipse rx="10" ry="4.5"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
          </g>
        </svg>
      );
    case 'ts':
      return (
        <svg viewBox="0 0 128 128" className={commonClasses}>
           {!isShadow && <rect width="128" height="128" rx="20" fill="#3178C6" />}
           <path d="M71.3 84.7v-35c0-1.8.8-2.6 2.6-2.6h25.4v9.6h-16.7v28h-11.3zm-39.7 0v-26.3h-12v-8.7h35.3v8.7h-12v26.3h-11.3z" fill={isShadow ? "#3178C6" : "white"} />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={`${commonClasses} text-[#38BDF8]`}>
          <path fill="currentColor" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 32 32" className={`${commonClasses} text-[#68A063]`}>
           <path fill="currentColor" d="M16 2 L2 10 L2 24 L16 32 L30 24 L30 10 L16 2 Z" fillOpacity={isShadow ? "1" : "0.2"} />
           <path d="M16 4.5 L26 10.5 L26 21.5 L16 27.5 L6 21.5 L6 10.5 L16 4.5 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
           <path fill="currentColor" d="M14 10 h 4 v 12 h -4 Z"/>
        </svg>
      );
    case 'three':
      return (
        <svg viewBox="0 0 100 100" className={`${commonClasses} text-white`}>
          <path d="M20,80 L80,80 L50,20 Z" stroke="currentColor" strokeWidth="6" fill="none"/>
          <path d="M50,35 L70,70 L30,70 Z" fill="currentColor"/>
        </svg>
      );
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" className={`${commonClasses} text-[#336791]`}>
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      );
    default:
      return null;
  }
});

interface SkillCardProps {
  skill: Skill;
  index: number;
  isHighContrast: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isHighContrast }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [25, -25]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-25, 25]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Optimization: throttling this isn't strictly necessary with MotionValues, 
    // but ensure we don't do heavy calc here.
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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
        
        {/* Animated Logo Container - will-change added for GPU promotion */}
        <motion.div
           className="relative w-28 h-28 cursor-pointer preserve-3d will-change-transform"
           style={{
             rotateX,
             rotateY,
           }}
        >
          <motion.div
            className="w-full h-full preserve-3d"
            animate={{ 
              y: [0, -15, 0], 
              rotateZ: [-5, 5, -5],
              scale: [0.95, 1.05, 0.95], 
              rotateY: [-15, 15, -15] 
            }}
            transition={{ 
              duration: 5 + index * 0.2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.1 
            }}
            whileHover={{ scale: 1.15 }}
          >

              <div className={`absolute inset-0 blur-3xl opacity-20 group-hover:opacity-60 transition-all duration-500 rounded-full transform scale-150 ${
                  skill.icon === 'react' ? 'bg-[#61DAFB]' : 
                  skill.icon === 'ts' ? 'bg-[#3178C6]' : 
                  skill.icon === 'node' ? 'bg-[#68A063]' : 
                  skill.icon === 'tailwind' ? 'bg-[#38BDF8]' :
                  'bg-cyber-primary'
                }`}>
              </div>

              <div className="absolute inset-0 transform translate-x-1 translate-y-1 translate-z-[-20px] opacity-70">
                  <TechLogo name={skill.icon} isShadow={true} isHighContrast={isHighContrast} />
              </div>

              <div className="absolute inset-0 z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] translate-z-[20px]">
                <TechLogo name={skill.icon} isHighContrast={isHighContrast} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
              </div>

          </motion.div>
        </motion.div>
        
        <motion.div 
            className="absolute bottom-4 w-24 h-4 bg-black/60 blur-lg rounded-[100%]"
            animate={{ scale: [1, 0.85, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ 
                duration: 5 + index * 0.2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.1
            }}
        />
      </div>

      <div className="w-full bg-cyber-dark/40 backdrop-blur-md border border-gray-800/80 pt-12 pb-6 px-6 rounded-2xl group-hover:border-cyber-primary/50 group-hover:bg-cyber-dark/80 transition-all duration-500 relative overflow-hidden text-center shadow-2xl">
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        
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
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className={`h-full bg-gradient-to-r transition-all duration-500 ${
              isHighContrast 
                ? 'from-cyber-primary to-cyber-secondary shadow-[0_0_15px_var(--color-primary)]' 
                : `shadow-[0_0_15px_rgba(255,255,255,0.4)] ${
                    skill.icon === 'react' ? 'from-[#61DAFB] to-blue-600' : 
                    skill.icon === 'ts' ? 'from-[#3178C6] to-blue-800' : 
                    skill.icon === 'node' ? 'from-[#68A063] to-green-800' : 
                    skill.icon === 'tailwind' ? 'from-[#38BDF8] to-cyan-600' : 
                    'from-cyber-primary to-cyber-secondary'
                  }`
            }`}
          />
        </div>

      </div>

    </motion.div>
  );
};

interface SkillsProps {
  isHighContrast?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isHighContrast = false }) => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none ${isHighContrast ? 'bg-cyber-primary/20' : 'bg-cyber-secondary/10'}`}></div>

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
          <div className="h-1 w-24 bg-gradient-to-r from-cyber-primary to-transparent mx-auto md:mx-0"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} isHighContrast={isHighContrast} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;