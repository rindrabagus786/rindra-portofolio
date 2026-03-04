'use client';

import { useEffect, useRef } from 'react';

interface CyberBackgroundProps {
    isHighContrast: boolean;
}

export default function CyberBackground({ isHighContrast }: CyberBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const particles: { x: number; y: number; speed: number; size: number; color: string }[] = [];
        const particleCount = isHighContrast ? 40 : 80;

        const colors = isHighContrast
            ? ['#ffff00', '#ffffff', '#00ff00']
            : ['#00f3ff', '#bc13fe', '#2a2a2a'];

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
            if (isHighContrast) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, width, height);
            } else {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, 'rgba(26, 11, 46, 0.2)');
                gradient.addColorStop(0.5, 'rgba(5, 5, 5, 0.2)');
                gradient.addColorStop(1, 'rgba(11, 46, 46, 0.2)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

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

            ctx.strokeStyle = isHighContrast ? 'rgba(255, 255, 0, 0.1)' : 'rgba(0, 243, 255, 0.03)';
            ctx.lineWidth = 1;
            const gridSize = 50;

            ctx.beginPath();
            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            const offset = (Date.now() / 50) % gridSize;
            for (let y = offset; y <= height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

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
}
