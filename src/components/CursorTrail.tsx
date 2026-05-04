import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type TrailParticle = {
  id: number;
  x: number;
  y: number;
  icon: string;
  type: 'trail' | 'burst';
  angle?: number;
  speed?: number;
};

const ICONS = ['💖', '🌸', '✨', '🤍'];
const BURST_ICONS = ['🌟', '✨', '💖', '💫'];

export function CursorTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([]);

  useEffect(() => {
    let particleId = 0;
    
    // Trail on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.15) return; // Keep trail subtle

      const newParticle: TrailParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        type: 'trail'
      };

      setParticles((prev) => [...prev, newParticle].slice(-25));
      
      setTimeout(() => {
        setParticles((prev) => prev.filter(p => p.id !== newParticle.id));
      }, 1200);
    };

    // Burst on click
    const handleMouseClick = (e: MouseEvent) => {
      const burstCount = 8;
      const newParticles: TrailParticle[] = [];
      
      for (let i = 0; i < burstCount; i++) {
        newParticles.push({
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          icon: BURST_ICONS[Math.floor(Math.random() * BURST_ICONS.length)],
          type: 'burst',
          angle: (Math.PI * 2 * i) / burstCount,
          speed: 40 + Math.random() * 40
        });
      }

      setParticles((prev) => [...prev, ...newParticles].slice(-40));
      
      newParticles.forEach(p => {
        setTimeout(() => {
          setParticles((prev) => prev.filter(particle => particle.id !== p.id));
        }, 1000);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map(p => {
          if (p.type === 'burst') {
            const dx = Math.cos(p.angle!) * p.speed!;
            const dy = Math.sin(p.angle!) * p.speed!;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 0, x: p.x, y: p.y }}
                animate={{ 
                  opacity: 0, 
                  scale: 2, 
                  x: p.x + dx,
                  y: p.y + dy - 20
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed text-2xl drop-shadow-md"
              >
                {p.icon}
              </motion.div>
            );
          }

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.6, scale: 0.3, x: p.x, y: p.y, rotate: 0 }}
              animate={{ 
                opacity: 0, 
                scale: 1.2, 
                y: p.y - 50,
                x: p.x + (Math.random() * 60 - 30),
                rotate: Math.random() * 180 - 90
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="fixed text-base drop-shadow-sm"
            >
              {p.icon}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
