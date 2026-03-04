import React, { useEffect, useRef } from 'react';

interface CyberBackgroundProps {
  isHighContrast: boolean;
}

const CyberBackground: React.FC<CyberBackgroundProps> = ({ isHighContrast }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no alpha on canvas context itself if possible, but we need transparency for trails.
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set explicit size to avoid scaling artifacts and reflows
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; speed: number; size: number; color: string }[] = [];
    // Reduce particle count slightly for better mobile performance
    const particleCount = isHighContrast ? 40 : 80; 
    
    // Choose colors based on mode
    const colors = isHighContrast 
      ? ['#ffff00', '#ffffff', '#00ff00'] // Yellow, White, Green
      : ['#00f3ff', '#bc13fe', '#2a2a2a']; // Cyan, Purple, Dark Gray

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      // Use logic based on mode outside the loop if possible, but keeping it here for dynamic switch support
      if (isHighContrast) {
        // Solid black background for High Contrast (faster clear)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
      } else {
        // Gradient with transparency for Cyber Trails
        // Re-creating gradient every frame is expensive, but needed for "trails". 
        // Optimization: Fill with a solid semi-transparent color instead of gradient for trails if lags occur.
        // Keeping gradient but optimizing context calls.
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(26, 11, 46, 0.2)');
        gradient.addColorStop(0.5, 'rgba(5, 5, 5, 0.2)');
        gradient.addColorStop(1, 'rgba(11, 46, 46, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Batch drawing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speed;
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
      }

      // Draw Grid - Optimize by reducing stroke calls
      ctx.strokeStyle = isHighContrast ? 'rgba(255, 255, 0, 0.1)' : 'rgba(0, 243, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      ctx.beginPath(); // Start one big path for the grid
      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal lines (moving down)
      const offset = (Date.now() / 50) % gridSize;
      for (let y = offset; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke(); // Draw all lines at once

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Debounce resize slightly or just use passive listener
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHighContrast]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-1000 will-change-contents"
    />
  );
};

export default CyberBackground;