import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { X, Loader2 } from 'lucide-react';

const photos = [
  // Curated marriage-specific high-quality imagery (Rings, flowers, wedding couple, proposal)
  { id: 1, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop' }, // Wedding rings held together
  { id: 2, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop' }, // Bridal bouquet
  { id: 3, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop' }, // Married couple holding hands close up
  { id: 4, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop' }, // Romantic marriage moment // Holding hands engagement ring
  { id: 6, url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop' }, // Bride and groom
  { id: 7, url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop' }, // Wedding dress / groom moment // Elegant wedding decor / table
];

function ImageWithLoader({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full relative bg-transparent">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-gold-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}

export function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; url: string } | null>(null);

  return (
    <section className="py-24 md:py-32 bg-transparent px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.2em] text-gold-600 text-sm font-medium">Moments</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 text-[#0C2B21]">Capturing Memories</h2>
        </motion.div>

        {/* Grid Layout strictly enforcing aspect ratio */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full">
          {photos.map((photo, idx) => (
            <motion.div
              layoutId={`photo-container-${photo.id}`}
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, opacity: { duration: 0.6, delay: idx * 0.1 }, y: { duration: 0.6, delay: idx * 0.1 } }}
              className="relative overflow-hidden group cursor-pointer rounded-md aspect-square shadow-sm hover:shadow-xl bg-white/40 backdrop-blur-sm border border-white/40"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#0C2B21]/0 group-hover:bg-[#0C2B21]/20 transition-colors duration-500 z-10 pointer-events-none" />
              
              <ImageWithLoader
                src={photo.url}
                alt="Beautiful Wedding Moment"
                className="w-full h-full block object-cover group-hover:scale-[1.05] transition-all duration-700 ease-out absolute inset-0"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 text-[#0C2B21] hover:text-gold-600 transition-colors bg-white/50 backdrop-blur-md p-2 rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              layoutId={`photo-container-${selectedPhoto.id}`}
              className="max-w-[90vw] max-h-[90vh] shadow-2xl rounded-sm overflow-hidden bg-transparent relative flex items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // don't close when clicking image
            >
              <ImageWithLoader
                src={selectedPhoto.url}
                alt="Expanded view"
                className="max-w-full max-h-[90vh] object-contain transition-opacity duration-300"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
