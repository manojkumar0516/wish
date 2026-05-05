import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

/* ─────────────────────────────────────────────
   Sparkle particle shown on touch / click
───────────────────────────────────────────── */
interface Spark {
  id: number;
  x: number;
  y: number;
}

export function Quote() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const isInView     = useInView(sectionRef, { once: true, amount: 0.25 });

  const [touched,  setTouched]  = useState(false);
  const [sparks,   setSparks]   = useState<Spark[]>([]);
  const sparkId                 = useRef(0);

  /* Fire sparks + reveal quote on any interaction */
  function handleInteract(e: React.MouseEvent | React.TouchEvent) {
    if (!touched) setTouched(true);

    /* Calculate click/touch position relative to card */
    const card = cardRef.current;
    if (!card) return;
    const rect  = card.getBoundingClientRect();
    let cx: number, cy: number;

    if ('touches' in e) {
      cx = e.touches[0].clientX - rect.left;
      cy = e.touches[0].clientY - rect.top;
    } else {
      cx = (e as React.MouseEvent).clientX - rect.left;
      cy = (e as React.MouseEvent).clientY - rect.top;
    }

    /* Burst of 10 sparks from touch point */
    const burst: Spark[] = Array.from({ length: 10 }, () => ({
      id: ++sparkId.current,
      x:  cx,
      y:  cy,
    }));
    setSparks(prev => [...prev, ...burst]);
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !burst.find(b => b.id === s.id)));
    }, 1200);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Cinzel:wght@400;500&family=Raleway:wght@300;400;500&display=swap');

        /* ── Palette (same as Hero) ── */
        :root {
          --navy:       #06102E;
          --navy-mid:   #0B1F52;
          --blue-glow:  #1A3A8F;
          --sapphire:   #2255CC;
          --gold:       #C9933A;
          --gold-light: #E2B96A;
          --gold-pale:  #F5E4C0;
          --ivory:      #FDF9F2;
          --ivory-warm: #FAF1E0;
        }

        /* ── Background glows ── */
        @keyframes navyPulse {
          0%,100% { opacity:.38; transform:translate(-50%,-50%) scale(1);    }
          50%     { opacity:.65; transform:translate(-50%,-50%) scale(1.12); }
        }
        @keyframes sapphireRoam {
          0%   { transform:translate(0%,0%)   scale(1);    opacity:.28; }
          40%  { transform:translate(18%,22%) scale(1.16); opacity:.48; }
          100% { transform:translate(0%,0%)   scale(1);    opacity:.28; }
        }
        @keyframes cobaltDrift {
          0%   { transform:translate(0%,0%)     scale(1);    opacity:.22; }
          55%  { transform:translate(-18%,-14%) scale(1.11); opacity:.40; }
          100% { transform:translate(0%,0%)     scale(1);    opacity:.22; }
        }

        /* ── Twinkle stars ── */
        @keyframes twinkle {
          0%,100% { opacity:.12; transform:scale(1);   }
          50%     { opacity:.75; transform:scale(1.7); }
        }

        /* ── Spark burst ── */
        @keyframes sparkBurst {
          0%   { transform:translate(var(--tx),var(--ty)) scale(1);   opacity:1;   }
          100% { transform:translate(var(--tx2),var(--ty2)) scale(0); opacity:0;   }
        }

        /* ── Shimmer on quote marks ── */
        @keyframes shimmerGold {
          0%   { background-position:-280% center; }
          100% { background-position: 280% center; }
        }

        /* ── Divider pulse ── */
        @keyframes linePulse {
          0%,100% { opacity:.3; }
          50%     { opacity:.9; }
        }

        /* ── Hint ripple (before touch) ── */
        @keyframes rippleHint {
          0%   { transform:scale(0.92); opacity:.7; box-shadow:0 0 0 0 rgba(201,147,58,0.5); }
          70%  { transform:scale(1);    opacity:1;  box-shadow:0 0 0 18px rgba(201,147,58,0); }
          100% { transform:scale(0.92); opacity:.7; box-shadow:0 0 0 0 rgba(201,147,58,0); }
        }

        /* ── Fonts ── */
        .fq-cormorant { font-family:'Cormorant Garamond',serif; }
        .fq-cinzel    { font-family:'Cinzel',serif; }
        .fq-raleway   { font-family:'Raleway',sans-serif; }

        .gold-shimmer-q {
          background:linear-gradient(90deg,
            #8B5E1A 0%,#C9933A 22%,#F5E4C0 46%,#E2B96A 68%,#C9933A 82%,#8B5E1A 100%);
          background-size:280% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmerGold 4s linear infinite;
        }

        .divider-q {
          height:1px;
          width:48px;
          background:linear-gradient(90deg,transparent,#C9933A,transparent);
          animation:linePulse 3.5s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position:'relative',
          padding:'6rem 1.5rem',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          overflow:'hidden',
          background:'var(--navy)',
          minHeight:'60vh',
        }}
      >

        {/* ══ BG GLOWS (navy/blue — same as Hero) ══ */}
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
          <div style={{
            position:'absolute', top:'45%', left:'50%',
            width:'700px', height:'500px', borderRadius:'50%',
            background:'radial-gradient(ellipse,rgba(34,85,204,0.34) 0%,rgba(10,30,100,0.14) 45%,transparent 72%)',
            animation:'navyPulse 9s ease-in-out infinite',
          }} />
          <div style={{
            position:'absolute', top:'5%', left:'-8%',
            width:'480px', height:'400px', borderRadius:'50%',
            background:'radial-gradient(ellipse,rgba(26,58,143,0.28) 0%,transparent 70%)',
            animation:'sapphireRoam 20s ease-in-out infinite',
          }} />
          <div style={{
            position:'absolute', bottom:'-6%', right:'-5%',
            width:'440px', height:'360px', borderRadius:'50%',
            background:'radial-gradient(ellipse,rgba(15,45,160,0.24) 0%,transparent 68%)',
            animation:'cobaltDrift 17s ease-in-out infinite',
          }} />
        </div>

        {/* ══ TWINKLING STARS ══ */}
        <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} style={{
              position:'absolute',
              left:`${Math.random()*100}%`,
              top:`${Math.random()*100}%`,
              width:`${1+Math.random()*2.2}px`,
              height:`${1+Math.random()*2.2}px`,
              borderRadius:'50%',
              background:'#FFFFFF',
              animation:`twinkle ${2+Math.random()*4}s ${Math.random()*5}s ease-in-out infinite`,
            }} />
          ))}
        </div>

        {/* ══ QUOTE CARD ══ */}
        <motion.div
          ref={cardRef}
          initial={{ opacity:0, scale:0.94, filter:'blur(12px)' }}
          animate={isInView
            ? { opacity:1, scale:1, filter:'blur(0px)' }
            : { opacity:0, scale:0.94, filter:'blur(12px)' }
          }
          transition={{ duration:1.6, ease:'easeOut' }}
          onClick={handleInteract}
          onTouchStart={handleInteract}
          style={{
            position:'relative',
            zIndex:10,
            maxWidth:'820px',
            width:'100%',
            margin:'0 auto',
            textAlign:'center',
            background:'rgba(6,16,46,0.72)',
            border:'1px solid rgba(201,147,58,0.45)',
            borderRadius:'20px',
            padding:'clamp(2.5rem,6vw,5rem) clamp(1.5rem,5vw,4rem)',
            backdropFilter:'blur(18px)',
            boxShadow:`
              0 0 0 1px rgba(201,147,58,0.12),
              0 20px 70px -10px rgba(4,10,30,0.7),
              0 0 60px rgba(34,85,204,0.18) inset
            `,
            cursor: touched ? 'default' : 'pointer',
            animation: !touched && isInView ? 'rippleHint 2.8s ease-in-out infinite' : 'none',
            userSelect:'none',
          }}
        >
          {/* Spark particles */}
          {sparks.map((s, idx) => {
            const angle   = (idx / 10) * Math.PI * 2;
            const dist    = 40 + Math.random() * 60;
            const tx  = Math.cos(angle) * dist;
            const ty  = Math.sin(angle) * dist;
            return (
              <div key={s.id} style={{
                position:'absolute',
                left: s.x, top: s.y,
                width:'6px', height:'6px',
                borderRadius:'50%',
                background: idx % 2 === 0 ? '#E2B96A' : '#FFFFFF',
                pointerEvents:'none',
                zIndex:30,
                '--tx':  `${tx}px`,
                '--ty':  `${ty}px`,
                '--tx2': `${tx * 2.2}px`,
                '--ty2': `${ty * 2.2}px`,
                animation:'sparkBurst 1.1s ease-out forwards',
              } as React.CSSProperties} />
            );
          })}

          {/* Decorative top-left corner */}
          <svg style={{ position:'absolute', top:14, left:14, width:44, height:44, opacity:0.3 }}
            viewBox="0 0 44 44">
            <path d="M3 3 L3 22 M3 3 L22 3" stroke="#C9933A" strokeWidth="1.5" fill="none"/>
            <rect x="3" y="3" width="11" height="11" stroke="#C9933A" strokeWidth="0.8" fill="none"/>
          </svg>
          {/* Decorative top-right */}
          <svg style={{ position:'absolute', top:14, right:14, width:44, height:44, opacity:0.3, transform:'scaleX(-1)' }}
            viewBox="0 0 44 44">
            <path d="M3 3 L3 22 M3 3 L22 3" stroke="#C9933A" strokeWidth="1.5" fill="none"/>
            <rect x="3" y="3" width="11" height="11" stroke="#C9933A" strokeWidth="0.8" fill="none"/>
          </svg>

          {/* Giant decorative quote mark */}
          <div
            className="fq-cormorant gold-shimmer-q"
            style={{
              fontSize:'clamp(6rem,14vw,10rem)',
              lineHeight:1,
              position:'absolute',
              top:'-1.6rem',
              left:'50%',
              transform:'translateX(-50%)',
              opacity:0.25,
              pointerEvents:'none',
              zIndex:0,
            }}
          >
            &ldquo;
          </div>

          {/* ── TOUCH HINT (before interaction) ── */}
          {!touched && isInView && (
            <motion.div
              initial={{ opacity:0, y:6 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0 }}
              transition={{ delay:1.8, duration:0.8 }}
              className="fq-raleway"
              style={{
                position:'absolute',
                bottom:'1.1rem',
                left:'50%',
                transform:'translateX(-50%)',
                color:'rgba(226,185,106,0.55)',
                fontSize:'0.58rem',
                letterSpacing:'0.35em',
                textTransform:'uppercase',
                whiteSpace:'nowrap',
                fontWeight:300,
              }}
            >
              ✦ Touch to reveal ✦
            </motion.div>
          )} 
          

          {/* ── QUOTE TEXT — reveals on touch ── */}
          <motion.div
            initial={{ opacity:0, y:18, filter:'blur(6px)' }}
            animate={touched
              ? { opacity:1, y:0, filter:'blur(0px)' }
              : { opacity:0, y:18, filter:'blur(6px)' }
            }
            transition={{ duration:1.2, ease:'easeOut' }}
            style={{ position:'relative', zIndex:2 }}
          >
            <h2
              className="fq-cormorant"
              style={{
                fontSize:'clamp(1.55rem,4vw,3rem)',
                fontStyle:'italic',
                fontWeight:400,
                lineHeight:1.55,
                margin:0,
                color:'var(--ivory)',
                textShadow:'0 2px 40px rgba(34,85,204,0.4)',
                letterSpacing:'0.02em',
              }}
            >
              "We met as strangers,
              <br />
              We stayed as lovers,
              <br />
              We live as one soul."
            </h2>

            {/* Byline */}
            <motion.div
              initial={{ opacity:0, y:10 }}
              animate={touched ? { opacity:1, y:0 } : { opacity:0, y:10 }}
              transition={{ duration:1, delay:0.65 }}
              style={{
                marginTop:'2rem',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:'1rem',
              }}
            >
              <div className="divider-q" />
              <span
                className="fq-cinzel"
                style={{
                  color:'var(--gold-light)',
                  fontSize:'clamp(0.58rem,1.4vw,0.75rem)',
                  letterSpacing:'0.28em',
                  textTransform:'uppercase',
                  fontWeight:500,
                }}
              >
                Anusha &amp; Harish
              </span>
              <div className="divider-q" />
            </motion.div>
          </motion.div>

          {/* ── LOCKED STATE (before touch) — blurred placeholder ── */}
          {!touched && (
            <div
              aria-hidden
              style={{
                position:'absolute',
                inset:0,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:'20px',
                zIndex:1,
              }}
            >
              <div style={{
                color:'var(--ivory)',
                fontFamily:'Cormorant Garamond, serif',
                fontStyle:'italic',
                fontSize:'clamp(1.55rem,4vw,3rem)',
                lineHeight:1.55,
                filter:'blur(12px)',
                opacity:0.25,
                pointerEvents:'none',
                textAlign:'center',
                padding:'0 2rem',
              }}>
                We met as strangers,<br/>
                We stayed as lovers,<br/>
                We live as one soul.
              </div>
            </div>
          )}

        </motion.div>

      </section>
    </>
  );
}