import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

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
    <section className="relative min-h-[60vh] flex items-start justify-center py-12 px-4 bg-[#F4F8F6]">

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 text-[#0C2B21]"
      >
        
        <div className="bg-white p-6 rounded-md border border-gold-200">
          <h2 className="font-cursive text-3xl sm:text-4xl text-[#0C2B21] mb-2">Wishing You Both</h2>
          <p className="font-serif text-sm sm:text-base text-[#1E4034] mb-4">
            May your years together be filled with joy, laughter and endless love. Leave your wish below and it will appear on this page.
          </p>

          <form onSubmit={submitWish} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 rounded-md bg-white placeholder-[#6B8B80] text-[#0C2B21] outline-none border border-gold-100"
            />

            <textarea
              placeholder="Write your wish..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={400}
              rows={4}
              className="px-3 py-2 rounded-md bg-white placeholder-[#6B8B80] text-[#0C2B21] outline-none border border-gold-100 resize-none"
            />

            <div className="flex items-center justify-between gap-3">
              <span className="text-[#34574C] text-sm">{message.length}/400</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setMessage(''); setName(''); }}
                  className="px-4 py-2 rounded-md bg-transparent text-[#34574C] border border-gold-100"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-gold-400 text-[#08221a] font-semibold shadow-md"
                >
                  Send Wish
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <h3 className="font-serif text-lg text-[#0C2B21] mb-4">Recent Wishes</h3>
          <div className="flex flex-col gap-3">
            {wishes.length === 0 && (
              <div className="text-[#34574C]">No wishes yet — be the first to send one!</div>
            )}

            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 rounded-md border border-gold-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="truncate">
                    <div className="font-semibold text-[#0C2B21] truncate">{w.name || 'Anonymous'}</div>
                    <div className="text-[#34574C] text-sm truncate">{new Date(w.time).toLocaleString()}</div>
                  </div>
                </div>
                <p className="mt-3 text-[#0C2B21] leading-relaxed">{w.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
