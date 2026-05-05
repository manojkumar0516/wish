import { motion, AnimatePresence, useAnimationControls } from 'motion/react';
import confetti from 'canvas-confetti';
import { useState, useMemo, useEffect } from 'react';

interface WelcomeGateProps {
  onOpen: () => void;
  isOpen: boolean;
}

export function WelcomeGate({ onOpen, isOpen }: WelcomeGateProps) {
  const [clicked, setClicked] = useState(false);
  const petalControls = useAnimationControls();

  const petalColors = [
    '#FDF2F8', '#FCE7F3', '#F9A8D4', '#F5D0FE', '#E9D5FF', '#D8B4FE', '#ffffff',
  ];

  const stars = useMemo(() => [...Array(40)], []);
  const petals = useMemo(() => [...Array(20)], []);

  useEffect(() => {
    if (!isOpen) {
      petalControls.start('fall');
    }
  }, [isOpen, petalControls]);

  const handleOpen = () => {
    setClicked(true);

    // Immediate Confetti Burst
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#D4AF37', '#ffffff', '#94bbe9']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#D4AF37', '#ffffff', '#94bbe9']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());

    // SUCCESS: Reduced from 1800ms to 400ms for near-instant transition
    setTimeout(() => {
      onOpen();
    }, 400);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }} // Faster exit
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#06102E' }}
        >
          {/* 1. Cinematic Background */}
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1.1, 1.2, 1],
              rotate: [0, 1, -1, 0.5, 0],
              x: [0, -15, 15, -7, 0],
              y: [0, 8, -8, 4, 0]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2560&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-30 mix-blend-screen"
              alt="Night Wedding Scene"
            />
          </motion.div>

          {/* 2. Twinkling Stars */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
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
                className="absolute w-[2px] h-[2px] bg-white rounded-full blur-[1px]"
              />
            ))}
          </div>

          {/* 3. Falling Petals */}
          <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
            {petals.map((_, i) => {
              const color = petalColors[Math.floor(Math.random() * petalColors.length)];
              const scale = 0.5 + Math.random() * 0.5;
              return (
                <motion.div
                  key={i}
                  custom={scale}
                  initial={{ 
                    top: '-10%', 
                    left: `${Math.random() * 100}%`, 
                    opacity: 0,
                    scale
                  }}
                  variants={{
                    fall: {
                      top: '110%',
                      opacity: [0, 1, 1, 0],
                      left: [
                        `${Math.random() * 100}%`,
                        `${Math.random() * 100 + (Math.random() - 0.5) * 20}%`,
                        `${Math.random() * 100}%`
                      ],
                      rotateX: [0, 360 * scale, 720 * scale],
                      rotateY: [0, 180, 360],
                      transition: {
                        duration: 12 + Math.random() * 8,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: 'linear',
                        times: [0, 0.5, 1]
                      },
                    }
                  }}
                  animate={petalControls}
                  className="absolute"
                  style={{ color }}
                >
                  🌸
                </motion.div>
              );
            })}
          </div>

          {/* 4. Ambient Glows */}
          <div className="absolute inset-0 z-[3] pointer-events-none">
            <motion.div 
              animate={{ x: [0, 120, -60, 0], y: [0, 60, 120, 0], scale: [1, 1.3, 0.9, 1] }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[140px]"
            />
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-navy-900/40 rounded-full blur-[160px]"
            />
          </div>

          {/* 5. Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 flex flex-col items-center text-center backdrop-blur-2xl 
                       bg-white/[0.03] border border-white/10 rounded-[3rem] 
                       px-8 py-14 sm:px-20 mx-4 max-w-[90vw] sm:max-w-xl"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-[1px] w-24 bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-8"
            />

            <span className="text-blue-200 tracking-[0.4em] text-[10px] sm:text-xs uppercase font-bold mb-6">
              A Journey to Forever
            </span>

            <h1 className="text-white text-5xl sm:text-7xl md:text-8xl font-cursive leading-tight mb-6">
              Anusha
              <span className="block sm:inline text-gold-400 font-serif text-3xl sm:text-5xl mx-4 italic">&amp;</span>
              Harish
            </h1>

            <p className="text-blue-100/70 font-serif italic text-lg sm:text-xl mb-12 tracking-wide">
              With love in our hearts, we invite you to our forever.
            </p>

            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500 rounded-full blur-2xl"
              />
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 
                           bg-gradient-to-br from-blue-700 via-indigo-800 to-navy-900 
                           rounded-full flex items-center justify-center 
                           border border-white/20 shadow-[0_0_40px_rgba(30,58,138,0.5)]"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-4xl"
                >
                  ❤️
                </motion.span>
              </motion.button>
            </div>

            <p className="text-blue-300/60 text-[9px] mt-10 tracking-[0.5em] font-bold uppercase">
              Enter the Celebration
            </p>
          </motion.div>

          {/* REVEAL EFFECT: Now much faster (0.5s instead of 1.8s) */}
          {clicked && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 40, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-40 h-40 rounded-full bg-white z-[100]"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}