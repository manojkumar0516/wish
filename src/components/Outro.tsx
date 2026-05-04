import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function Outro() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2560&auto=format&fit=crop"
          alt="Wedding Background" 
          className="w-full h-full object-cover"
        />
        {/* Multiple overlays for proper contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F8F6]/95 via-[#0C2B21]/20 to-black/30" />
        <div className="absolute inset-0 bg-[#0C2B21]/15" />
      </div>
      
      {/* Content */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative z-20 text-center flex flex-col items-center px-6"
      >
        <h2 className="font-cursive text-7xl sm:text-8xl md:text-9xl text-gold-400 mb-6 sm:mb-8 drop-shadow-lg text-shadow-lg">Forever</h2>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-400"></div>
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-white tracking-[0.2em] sm:tracking-[0.4em] uppercase font-semibold drop-shadow-lg">Begins Now</p>
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold-400"></div>
        </div>
      </motion.div>
    </section>
  );
}
