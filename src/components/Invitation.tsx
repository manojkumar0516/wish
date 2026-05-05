import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";

export function Invitation() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // 🌟 Generate 40 tiny twinkling stars
  const stars = useMemo(() => [...Array(40)], []);

  return (
    <section className="relative py-24 md:py-32 flex items-center justify-center px-4 overflow-hidden" style={{ backgroundColor: '#06102E' }}>
      
      {/* --- CELESTIAL BACKGROUND SYSTEM --- */}
      
      {/* 1. bgZoomDrift: Cinematic Texture */}
      <motion.div
        animate={{ 
          scale: [1, 1.12, 1.05, 1.18, 1],
          rotate: [0, 1.5, -1, 0.5, 0],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2560" 
          className="w-full h-full object-cover"
          alt=""
        />
      </motion.div>

      {/* 2. Twinkling Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() 
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full blur-[0.5px]"
          />
        ))}
      </div>

      {/* 3. Celestial Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* navyPulse: Centre */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-blue-900/30 rounded-full blur-[140px]"
        />
        {/* sapphireRoam: Upper Left */}
        <motion.div 
          animate={{ x: [-40, 60, -40], y: [-30, 30, -30] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px]"
        />
        {/* cobaltDrift: Bottom Right */}
        <motion.div 
          animate={{ x: [40, -60, 40], y: [40, -40, 40] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-indigo-500/15 rounded-full blur-[100px]"
        />
      </div>

      {/* --- INVITATION CARD --- */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, rotateX: 15 }}
        animate={
          inView
            ? { opacity: 1, y: 0, rotateX: 0 }
            : { opacity: 0, y: 50, rotateX: 15 }
        }
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl relative z-10"
        style={{ perspective: 1200 }}
      >
        {/* Outer Silver Border */}
        <div className="p-[1px] rounded-3xl bg-gradient-to-br from-blue-200/40 via-white/10 to-blue-200/40 shadow-2xl">
          
          {/* Main Card Body */}
          <div className="bg-[#0A1635]/80 backdrop-blur-3xl px-6 py-16 sm:p-16 md:p-20 text-center rounded-3xl relative overflow-hidden w-full border border-white/5">
            
            {/* Corner Filigree: Silver Theme */}
            <CornerOrnament className="top-6 left-6 text-blue-200/30" />
            <CornerOrnament className="top-6 right-6 rotate-90 text-blue-200/30" />
            <CornerOrnament className="bottom-6 right-6 rotate-180 text-blue-200/30" />
            <CornerOrnament className="bottom-6 left-6 -rotate-90 text-blue-200/30" />

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={inView ? { opacity: 1, letterSpacing: "0.4em" } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="uppercase text-blue-300 text-[10px] sm:text-xs font-sans mb-10 font-bold"
            >
              Wedding Invitation
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-serif text-lg md:text-xl text-blue-50 leading-relaxed mb-12 italic opacity-80"
            >
              With the heavenly blessings of our parents, we invite you to share
              our joy as we begin our new life together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
              transition={{ delay: 1.1, duration: 1.2 }}
            >
              <h2 className="font-cursive text-6xl sm:text-7xl md:text-8xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-lg">
                Anusha
              </h2>
              <p className="font-serif text-blue-300/60 mb-4 text-2xl font-light italic">
                &amp;
              </p>
              <h2 className="font-cursive text-6xl sm:text-7xl md:text-8xl mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-lg">
                Harish
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="space-y-2"
            >
              <div className="h-px w-12 bg-blue-400/30 mx-auto mb-6" />
              <p className="font-serif text-xl sm:text-2xl text-white font-medium tracking-wide">
                Monday, May 18
              </p>
              <p className="font-serif text-xl sm:text-2xl text-blue-100 font-light opacity-70">
                2026
              </p>
              <div className="pt-8">
                <p className="font-sans text-[10px] sm:text-xs tracking-[0.5em] text-blue-400 uppercase font-black">
                  MRJ Mahal, Trichy
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={`absolute w-14 h-14 ${className || ""}`}
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="M0,0 L0,10 C20,10 40,30 40,50 C40,70 60,90 80,90 L90,90 L90,100 C90,80 70,60 70,40 C70,20 50,0 30,0 L0,0 Z" />
    </svg>
  );
}