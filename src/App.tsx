import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { Quote } from './components/Quote';
import { Invitation } from './components/Invitation';
import { EventDetails } from './components/EventDetails';
import { Gallery } from './components/Gallery';
import { Outro } from './components/Outro';
import { Wishing } from './components/Wishing';
import { CursorTrail } from './components/CursorTrail';
import { WelcomeGate } from './components/WelcomeGate';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth Scroll Initialization
  useEffect(() => {
    // Disable scroll while welcome gate is closed
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }
    
    document.body.style.overflow = '';
    
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, [isOpen]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen text-[#0F2922] selection:bg-gold-400/30 selection:text-gold-600 font-sans transition-colors duration-500 overflow-x-hidden w-full">
      {/* Global Background for all pages except first (Hero covers it) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&blur=50&auto=format&fit=crop"
          alt="Wedding Theme Texture"
          className="w-full h-full object-cover opacity-[0.3]"
        />
        <div className="absolute inset-0 bg-[#F4F8F6]/85" />
      </div>

      <CursorTrail />
      
      <WelcomeGate isOpen={isOpen} onOpen={() => setIsOpen(true)} />

      {/* Main Content Sections */}
      <Hero />
      <Quote />
      <Invitation />
      <EventDetails />
      <Gallery />
      <Outro />
      <Wishing />
      
      {/* Footer */}
      <footer className="py-12 bg-[#F4F8F6]/80 backdrop-blur-sm text-center text-sm font-serif text-[#34574C] border-t border-gold-200/50">
        <p className="text-lg">Made with Love for Anusha & Harish</p>
        <p className="mt-2 text-xs opacity-70 tracking-widest uppercase">© {new Date().getFullYear()} All Rights Reserved.</p>
      </footer>
    </div>
  );
}

