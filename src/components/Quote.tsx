import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function Quote() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-24 md:py-32 bg-transparent flex items-center justify-center px-6 relative">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center relative z-10 bg-white/70 backdrop-blur-md px-6 py-16 sm:px-12 sm:py-20 md:p-24 rounded-2xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60"
      >
        <div className="text-gold-400 opacity-40 font-serif text-7xl sm:text-8xl lg:text-9xl leading-none absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 -z-10 select-none">
          &ldquo;
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0C2B21] leading-relaxed md:leading-snug italic font-semibold drop-shadow-sm">
          "Two souls with but a single thought, <br className="hidden md:block" />
          two hearts that beat as one."
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4"
        >
          <div className="w-8 sm:w-12 h-[1px] bg-gold-500"></div>
          <span className="font-sans uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#0C2B21] text-[10px] sm:text-xs font-bold">Anusha & Harish</span>
          <div className="w-8 sm:w-12 h-[1px] bg-gold-500"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
