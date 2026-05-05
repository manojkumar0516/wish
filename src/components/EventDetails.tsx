import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useMemo } from 'react';

export function EventDetails() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // 🌟 Generate 40 tiny twinkling stars
  const stars = useMemo(() => [...Array(40)], []);

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#06102E' }}>
      
      {/* --- CELESTIAL BACKGROUND SYSTEM --- */}
      
      {/* 1. bgZoomDrift: Cinematic Image Texture */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1.05, 1.15, 1],
          rotate: [0, 1, -1, 0.5, 0],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2560" 
          className="w-full h-full object-cover"
          alt=""
        />
      </motion.div>

      {/* 2. Twinkling Stars Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() 
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
          />
        ))}
      </div>

      {/* 3. Deep Sea & Sapphire Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/20 rounded-full blur-[160px]"
        />
        <motion.div 
          animate={{ x: [-30, 50, -30], y: [-20, 40, -20] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [30, -50, 30], y: [30, -40, 30] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.4em] text-blue-300 text-sm font-bold">Where & When</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-4 text-white">Event Details</h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Centered Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 sm:p-10 md:p-16 shadow-2xl relative overflow-hidden rounded-3xl mx-auto"
        >
          {/* Decorative Celestial Ring */}
          <div className="absolute -top-10 -right-10 opacity-10">
            <svg viewBox="0 0 100 100" className="w-64 h-64 text-blue-300 fill-current">
              <path d="M50,0 C77.614,0 100,22.386 100,50 C100,77.614 77.614,100 50,100 C22.386,100 0,77.614 0,50 C0,22.386 22.386,0 50,0 Z M50,10 C27.909,10 10,27.909 10,50 C10,72.091 27.909,90 50,90 C72.091,90 90,72.091 90,50 C90,27.909 72.091,10 50,10 Z" />
            </svg>
          </div>

          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-white border-b border-white/10 pb-4 inline-block">
              The Muhurtham
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 relative z-10">
            {/* Date */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-300 mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Calendar size={24} />
              </div>
              <h4 className="font-serif text-xl mb-2 text-white">Date</h4>
              <p className="text-blue-100/80 font-medium">Monday, May 18, 2026</p>
            </div>
            
            {/* Time */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-300 mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Clock size={24} />
              </div>
              <h4 className="font-serif text-xl mb-2 text-white">Time</h4>
              <p className="text-blue-100/80 font-medium leading-tight">10:00 AM - 12:00 PM</p>
              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-2">Reception at 7:00 PM</p>
            </div>

            {/* Venue */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-300 mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <MapPin size={24} />
              </div>
              <h4 className="font-serif text-xl mb-2 text-white">Venue</h4>
              <p className="text-blue-100/80 font-medium">MRJ Mahal</p>
              <p className="text-blue-200/60 text-xs mt-2 leading-relaxed">
                Somarasapettai, Trichy
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
             <p className="text-blue-200/40 text-sm italic">Kalaiyammal Kovil Street, Somarasapettai, Trichy, Tamil Nadu</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}