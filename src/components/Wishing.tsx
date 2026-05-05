import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useMemo } from 'react';

type Wish = {
  id: string;
  name?: string;
  message: string;
  time: string;
};

const STORAGE_KEY = 'wedding_wishes_v1';

export function Wishing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);

  // 🌟 Generate 40 twinkling stars
  const stars = useMemo(() => [...Array(40)], []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWishes(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load wishes', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
      console.error('Failed to save wishes', e);
    }
  }, [wishes]);

  function submitWish(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    const newWish: Wish = {
      id: String(Date.now()),
      name: name.trim() || undefined,
      message: trimmed,
      time: new Date().toISOString(),
    };
    setWishes((s) => [newWish, ...s].slice(0, 200));
    setMessage('');
    setName('');
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 overflow-hidden" style={{ backgroundColor: '#06102E' }}>
      
      {/* --- CELESTIAL BACKGROUND SYSTEM --- */}
      
      {/* 1. bgZoomDrift: Cinematic Texture */}
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

      {/* 3. Sapphire & Cobalt Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* navyPulse: Centre */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/20 rounded-full blur-[160px]"
        />
        {/* sapphireRoam: Upper Left */}
        <motion.div 
          animate={{ x: [-30, 50, -30], y: [-20, 40, -20] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"
        />
        {/* cobaltDrift: Bottom Right */}
        <motion.div 
          animate={{ x: [30, -50, 30], y: [30, -40, 30] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        
        {/* Form Container */}
        <div className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">Wishing You Both</h2>
          <p className="font-sans text-sm sm:text-base text-blue-100/70 mb-8 leading-relaxed">
            Leave your wish below for the couple. Your message will be cherished as they begin their new journey together.
          </p>

          <form onSubmit={submitWish} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-200/30 outline-none focus:border-blue-400/50 transition-colors"
            />

            <textarea
              placeholder="Write your beautiful wish..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={400}
              rows={5}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-200/30 outline-none focus:border-blue-400/50 transition-colors resize-none"
            />

            <div className="flex items-center justify-between gap-3 mt-2">
              <span className="text-blue-300/50 text-xs font-medium tracking-widest">{message.length}/400</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setMessage(''); setName(''); }}
                  className="px-5 py-2.5 rounded-full bg-transparent text-blue-200 border border-white/10 hover:bg-white/5 transition-all text-sm font-semibold"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold shadow-lg shadow-blue-500/20 transition-all text-sm active:scale-95"
                >
                  Send Wish
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Wishes Feed */}
        <div className="flex flex-col">
          <h3 className="font-serif text-xl text-blue-100 mb-6 flex items-center gap-2">
            Recent Wishes 
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          </h3>
          
          <div className="max-h-[50vh] lg:max-h-[60vh] overflow-y-auto pr-4 space-y-4 custom-scrollbar">
            {wishes.length === 0 && (
              <div className="text-blue-200/40 italic py-10 text-center border border-dashed border-white/10 rounded-2xl">
                No wishes yet — be the first to send one!
              </div>
            )}

            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="truncate">
                    <div className="font-bold text-blue-50 truncate tracking-wide">{w.name || 'Anonymous'}</div>
                    <div className="text-blue-400/50 text-[10px] uppercase font-black mt-1">
                      {new Date(w.time).toLocaleDateString()} • {new Date(w.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-blue-100/80 leading-relaxed font-serif italic text-sm sm:text-base">
                  "{w.message}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Simple Custom Scrollbar Style */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}