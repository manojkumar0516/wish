import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const WEDDING_DATE = new Date('2026-05-18T10:00:00').getTime();

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = WEDDING_DATE - new Date().getTime();
    if (difference <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#F4F8F6]">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 bg-[#DCE5E0]"
      >
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2560&auto=format&fit=crop"
          alt="Wedding Background" 
          className="w-full h-[120%] object-cover object-[center_40%] -mt-10 opacity-90 origin-center"
        />
        
        {/* Floating Light Particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gold-300 rounded-full blur-[1px]"
              initial={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                top: [`${Math.random() * 100}%`, `${Math.random() * 20 - 10}%`],
                opacity: [0, Math.random() * 0.6 + 0.2, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Soft, warm vignette & gradient rather than hard black overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F8F6]/90 via-[#F4F8F6]/10 to-black/30 z-20 pointer-events-none" />
      </motion.div>

      {/* Content Container without Frosted Glass Frame */}
      <motion.div 
        style={{ opacity }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-20 flex flex-col items-center text-center px-6 mx-4 w-full max-w-4xl cursor-default"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-3 sm:gap-6 mb-8"
        >
          <div className="w-12 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-gold-400"></div>
          <p className="font-sans tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#1E4034] text-[10px] sm:text-xs md:text-sm font-semibold">
            We are getting married
          </p>
          <div className="w-12 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-gold-400"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          className="relative inline-block mb-6 md:mb-8"
        >
          <h1 className="font-cursive text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#0C2B21] leading-tight flex flex-col md:flex-row items-center justify-center drop-shadow-sm">
            <span className="block">Anusha</span>
            <span className="text-gold-500 mx-2 sm:mx-6 font-serif text-4xl sm:text-6xl md:text-7xl my-2 md:my-0">&amp;</span>
            <span className="block">Harish</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="font-serif text-lg sm:text-xl md:text-3xl text-[#1E4034] mb-10 md:mb-14 font-medium italic"
        >
          May 18, 2026 &bull; Trichy
        </motion.p>

        {/* Countdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex gap-4 sm:gap-6 md:gap-10 justify-center w-full"
        >
          {[
            { label: 'Days', value: timeLeft.d },
            { label: 'Hours', value: timeLeft.h },
            { label: 'Mins', value: timeLeft.m },
            { label: 'Secs', value: timeLeft.s },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center border border-gold-400/40 bg-white/60 text-[#0C2B21] font-serif text-xl sm:text-2xl md:text-3xl rounded-full shadow-sm">
                {item.value.toString().padStart(2, '0')}
              </div>
              <span className="mt-3 uppercase tracking-widest text-[10px] sm:text-xs text-[#0C2B21] font-sans font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
