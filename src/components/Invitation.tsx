import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export function Invitation() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-24 md:py-32 bg-transparent flex items-center justify-center px-4 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-[800px] bg-gold-200/50 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, rotateX: 20, filter: "blur(15px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 50, rotateX: 20, filter: "blur(15px)" }
        }
        transition={{
          duration: 1.5,
          type: "spring",
          stiffness: 45,
          damping: 20,
        }}
        className="w-full max-w-2xl relative z-10"
        style={{ perspective: 1000 }}
      >
        {/* Card */}
        <div className="border-gradient-gold p-[2px] rounded-sm bg-white/60 backdrop-blur-md shadow-[0_20px_50px_-12px_rgba(150,135,115,0.3)] w-full">
          <div className="bg-white/80 backdrop-blur-sm px-6 py-12 sm:p-12 md:p-16 text-center rounded-sm relative overflow-hidden w-full">
            {/* Corner Filigree Borders */}
            <CornerOrnament className="top-4 left-4" />
            <CornerOrnament className="top-4 right-4 rotate-90" />
            <CornerOrnament className="bottom-4 right-4 rotate-180" />
            <CornerOrnament className="bottom-4 left-4 -rotate-90" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="uppercase tracking-[0.3em] text-gold-600 text-xs md:text-sm font-sans mb-8 font-medium"
            >
              Wedding Invitation
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="font-serif text-lg md:text-xl text-[#0C2B21] leading-relaxed mb-10 italic font-medium"
            >
              With the heavenly blessings of our parents, we invite you to share
              our joy as we begin our new life together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <h2 className="font-cursive text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 sm:mb-4 text-gradient-gold drop-shadow-sm">
                Anusha
              </h2>
              <p className="font-serif text-[#0C2B21] mb-2 sm:mb-4 text-xl sm:text-2xl font-semibold">
                &amp;
              </p>
              <h2 className="font-cursive text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 sm:mb-12 text-gradient-gold drop-shadow-sm">
                Harish
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
            >
              <p className="font-serif text-lg sm:text-xl text-[#0C2B21] font-medium">
                Monday, May 18
              </p>
              <p className="font-serif text-lg sm:text-xl text-[#0C2B21] font-medium mt-1">
                2026
              </p>
              <p className="font-sans text-xs sm:text-sm tracking-widest text-gold-600 mt-6 md:mt-8 uppercase font-bold">
                MRJ Mahal, Trichy
              </p>
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
      className={`absolute w-12 h-12 text-gold-400/40 ${className || ""}`}
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="M0,0 L0,10 C20,10 40,30 40,50 C40,70 60,90 80,90 L90,90 L90,100 C90,80 70,60 70,40 C70,20 50,0 30,0 L0,0 Z" />
    </svg>
  );
}
