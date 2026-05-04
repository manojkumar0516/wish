import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface WelcomeGateProps {
  onOpen: () => void;
  isOpen: boolean;
}

export function WelcomeGate({ onOpen, isOpen }: WelcomeGateProps) {
  const handleOpen = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#ffffff', '#e8d388'],
      zIndex: 9999
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#ffffff', '#e8d388'],
        zIndex: 9999
      });
    }, 200);

    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2560&auto=format&fit=crop"
          alt="Wedding Background" 
          className="w-full h-[120%] object-cover object-[center_40%] -mt-10 opacity-90 origin-center"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 
                       px-6 py-12 sm:px-12 sm:py-16 rounded-2xl 
                       flex flex-col items-center justify-center 
                       max-w-[90vw] md:max-w-lg w-full text-center shadow-2xl"
          >
            {/* Top Text */}
            <span className="uppercase tracking-[0.3em] text-gold-300 text-[10px] sm:text-xs font-semibold mb-6">
              You are cordially invited
            </span>

            {/* Names */}
            <h1 className="font-cursive text-4xl sm:text-6xl md:text-7xl text-white mb-6 leading-tight">
              Anusha <br className="md:hidden" />
              <span className="text-gold-400 font-serif text-3xl sm:text-5xl mx-2">&amp;</span>
              <br className="md:hidden" />
              Harish
            </h1>

            {/* Subtitle */}
            <p className="font-serif text-white/80 mb-10 text-sm sm:text-base italic leading-relaxed max-w-sm">
              Request the honor of your presence <br className="hidden sm:block" />
              at their wedding celebration
            </p>

            {/* Button */}
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 
                         text-white uppercase tracking-[0.2em] 
                         text-xs sm:text-sm py-4 px-8 sm:px-10 
                         rounded-full shadow-lg hover:shadow-xl 
                         transition-all flex items-center gap-3"
            >
              <span>Open Invitation</span>
              <span className="text-lg">&rarr;</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
