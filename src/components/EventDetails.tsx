import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Clock } from 'lucide-react';

export function EventDetails() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.2em] text-gold-600 text-sm font-medium">Where &amp; When</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 text-[#0C2B21]">Event Details</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white/70 backdrop-blur-md border border-white/50 p-8 sm:p-10 md:p-12 shadow-[0_10px_40px_-15px_rgba(150,135,115,0.2)] relative overflow-hidden rounded-md"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <svg viewBox="0 0 100 100" className="w-64 h-64 text-gold-600 fill-current">
                <path d="M50,0 C77.614,0 100,22.386 100,50 C100,77.614 77.614,100 50,100 C22.386,100 0,77.614 0,50 C0,22.386 22.386,0 50,0 Z M50,10 C27.909,10 10,27.909 10,50 C10,72.091 27.909,90 50,90 C72.091,90 90,72.091 90,50 C90,27.909 72.091,10 50,10 Z M50,20 C66.569,20 80,33.431 80,50 C80,66.569 66.569,80 50,80 C33.431,80 20,66.569 20,50 C20,33.431 33.431,20 50,20 Z" />
              </svg>
            </div>

            <h3 className="font-serif text-3xl mb-8 border-b border-gold-200 pb-4 inline-block text-[#0C2B21]">Muhurtham</h3>
            
            <ul className="space-y-8 relative z-10">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 shrink-0 border border-gold-200">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-[#0C2B21]">Date</h4>
                  <p className="text-[#0F2922] font-medium">Monday, May 18, 2026</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 shrink-0 border border-gold-200">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-[#0C2B21]">Time</h4>
                  <p className="text-[#0F2922] font-medium">10:00 AM - 12:00 PM</p>
                  <p className="text-sm text-gold-500 font-medium mt-1">Reception starts at 7:00 PM</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 shrink-0 border border-gold-200">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-[#0C2B21]">Venue</h4>
                  <p className="text-[#0F2922] font-medium">MRJ Mahal</p>
                  <p className="text-[#0F2922] text-sm font-medium mt-1 leading-relaxed border-t border-dashed border-gold-200 pt-2 mt-2">Kalaiyammal Kovil Street,<br/>Somarasapettai, Trichy, Tamil Nadu</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Map Embed Container */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="aspect-[4/3] md:aspect-auto md:h-full min-h-[350px] w-full bg-[#DCE5E0] rounded-md overflow-hidden shadow-lg border border-gold-200/50"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15676.12199279093!2d78.6369062!3d10.8066504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50affffffff%3A0xabcdefabcdef!2sSomarasapettai%2C%20Tiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'sepia(0.3) saturate(1.2) hue-rotate(-15deg)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
