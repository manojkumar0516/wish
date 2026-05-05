import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { X, Loader2, Sparkles } from 'lucide-react';

const photos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop' },
  { id: 7, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop' },
  { id: 8, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop' },
];

function ImageWithLoader({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="w-full h-full relative bg-transparent overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-blue-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}

export function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; url: string } | null>(null);

  const stars = useMemo(() => [...Array(40)], []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#06102E' }}>
      
      {/* --- BACKGROUND ANIMATION SYSTEM --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 1, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
        >
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2560" className="w-full h-full object-cover" alt="" />
        </motion.div>

        {stars.map((_, i) => (
          <motion.div
            key={i}
            initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: Math.random() }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
          />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-blue-400 w-4 h-4" />
            <span className="font-sans uppercase tracking-[0.5em] text-blue-300 text-xs font-bold">The Moments</span>
            <Sparkles className="text-blue-400 w-4 h-4" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">Gallery of Love</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-6"></div>
        </motion.div>

        {/* --- ANIMATED GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40, rotate: idx % 2 === 0 ? -2 : 2 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ 
                delay: idx * 0.15, 
                duration: 0.8, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
            >
              {/* Floating Animation Wrapper */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
                whileHover={{ scale: 1.03, zIndex: 20 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06102E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <ImageWithLoader
                  src={photo.url}
                  alt="Wedding Memory"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Animated Border on Hover */}
                <div className="absolute inset-0 border-2 border-blue-400/0 group-hover:border-blue-400/40 rounded-2xl transition-colors duration-500 z-20 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#06102E]/98 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 text-white bg-white/10 p-4 rounded-full z-[110] hover:bg-blue-500 transition-colors"
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full aspect-video md:aspect-auto md:h-[80vh] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.3)] border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt="Selected"
                className="w-full h-full object-contain md:object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}