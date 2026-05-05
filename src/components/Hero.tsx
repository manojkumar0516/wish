import { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const WEDDING_DATE = new Date('2026-05-18T10:00:00').getTime();

function calculateTimeLeft() {
  const diff = WEDDING_DATE - new Date().getTime();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / 1000 / 60) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

/*
  Realistic dove silhouette viewed from the SIDE, flying LEFT.
  
  Single visible wing sweeps up-and-down. The body, head, beak,
  eye, and tail are fixed. The one large wing pivots at the
  shoulder and flaps with a smooth alternate animation.

  viewBox: 0 0 160 100
  The bird occupies roughly the centre; overflow:visible lets
  the wing exceed the box when it sweeps up.
*/
function Dove({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 160 100"
      fill={color}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/*
        ── WING ──
        A single large, elegant curved wing.
        Pivots from the shoulder at (92, 52).
        CSS alternate animation swings it up then back down.
      */}
      <g style={{
        transformOrigin: '92px 52px',
        animation: 'doveWing var(--wdur) ease-in-out infinite alternate',
      }}>
        {/* Primary feather — long graceful sweep */}
        <path d="
          M 92 52
          C 85 30, 60 10, 28 4
          C 50 18, 70 32, 88 50
          Z
        " opacity={0.95} />
        {/* Secondary feather — slightly shorter, adds width */}
        <path d="
          M 92 52
          C 100 25, 125 8, 148 6
          C 132 22, 112 36, 94 52
          Z
        " opacity={0.88} />
        {/* Tertiary / covert — fills the base of the wing */}
        <path d="
          M 92 52
          C 95 40, 115 28, 136 24
          C 122 36, 105 44, 93 54
          Z
        " opacity={0.78} />
      </g>

      {/* ── BODY ── smooth teardrop shape */}
      <ellipse cx="88" cy="62" rx="28" ry="14" />

      {/* ── NECK JOIN ── fills gap between head and body */}
      <ellipse cx="72" cy="56" rx="14" ry="10" />

      {/* ── HEAD ── round, slightly above body */}
      <circle cx="58" cy="48" r="14" />

      {/* ── BEAK — points LEFT ── */}
      <path d="M 45 47 L 24 44 L 45 51 Z" />

      {/* ── EYE ── dark with white highlight */}
      <circle cx="52" cy="45" r="3.5" fill="#0a1628" />
      <circle cx="50.8" cy="43.8" r="1.2" fill="#ffffff" opacity={0.7} />

      {/*
        ── TAIL — fans out to the RIGHT ──
        Two overlapping wedge shapes for a natural fan tail.
      */}
      <path d="
        M 114 62
        C 128 52, 148 42, 158 36
        C 148 52, 140 60, 116 68
        Z
      " opacity={0.90} />
      <path d="
        M 114 66
        C 130 62, 150 62, 158 58
        C 146 66, 132 70, 114 72
        Z
      " opacity={0.78} />

      {/* ── FEET — tiny, tucked under body ── */}
      <path d="M 80 75 L 76 84 M 76 84 L 70 88 M 76 84 L 78 89 M 76 84 L 82 88"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={0.55} />
      <path d="M 92 76 L 88 85 M 88 85 L 82 89 M 88 85 L 90 90 M 88 85 L 94 89"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={0.45} />
    </svg>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 800], ['0%', '16%']);
  const textY  = useTransform(scrollY, [0, 500], [0, -55]);
  const fadeOp = useTransform(scrollY, [0, 380], [1, 0]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const doves = useMemo(() =>
    [...Array(12)].map((_, i) => ({
      id:         i,
      top:        5 + Math.random() * 72,
      size:       28 + Math.random() * 32,
      dur:        22 + Math.random() * 18,
      delay:      -(Math.random() * 40),
      wingDur:    0.5 + Math.random() * 0.55,
      opacity:    0.6 + Math.random() * 0.35,
      driftAmp:   8 + Math.random() * 16,
      color:      Math.random() > 0.28 ? '#FFFFFF' : '#EEE0C8',
      depthScale: 0.42 + Math.random() * 0.62,
    })), []);

  const stars = useMemo(() =>
    [...Array(40)].map((_, i) => ({
      id:    i,
      left:  `${Math.random() * 100}%`,
      top:   `${Math.random() * 100}%`,
      size:  1 + Math.random() * 2.5,
      dur:   2 + Math.random() * 4,
      delay: Math.random() * 5,
    })), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=Raleway:wght@300;400;500&display=swap');

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
          --white:      #FFFFFF;
        }

        @keyframes bgZoomDrift {
          0%   { transform: scale(1.12) translate(  0px,   0px) rotate(0deg);    }
          25%  { transform: scale(1.17) translate(-12px, -10px) rotate(0.3deg);  }
          50%  { transform: scale(1.20) translate( -6px, -18px) rotate(0deg);    }
          75%  { transform: scale(1.17) translate(  8px, -12px) rotate(-0.3deg); }
          100% { transform: scale(1.12) translate(  0px,   0px) rotate(0deg);    }
        }
        @keyframes navyPulse {
          0%,100% { opacity:.42; transform:translate(-50%,-50%) scale(1);    }
          50%     { opacity:.70; transform:translate(-50%,-50%) scale(1.14); }
        }
        @keyframes sapphireRoam {
          0%   { transform:translate(0%,0%)    scale(1);    opacity:.30; }
          40%  { transform:translate(18%,22%)  scale(1.18); opacity:.52; }
          100% { transform:translate(0%,0%)    scale(1);    opacity:.30; }
        }
        @keyframes cobaltDrift {
          0%   { transform:translate(0%,0%)     scale(1);    opacity:.25; }
          55%  { transform:translate(-20%,-15%) scale(1.12); opacity:.45; }
          100% { transform:translate(0%,0%)     scale(1);    opacity:.25; }
        }
        @keyframes twinkle {
          0%,100% { opacity:0.15; transform:scale(1);   }
          50%     { opacity:0.80; transform:scale(1.6); }
        }

        /* Dove glides right→left with gentle vertical wave */
        @keyframes doveGlide {
          0%   { left: 115%; transform: translateY(0px); }
          12%  {             transform: translateY(calc(var(--da) * -1)); }
          25%  {             transform: translateY(0px); }
          37%  {             transform: translateY(var(--da)); }
          50%  {             transform: translateY(0px); }
          62%  {             transform: translateY(calc(var(--da) * -1)); }
          75%  {             transform: translateY(0px); }
          88%  {             transform: translateY(var(--da)); }
          100% { left: -22%; transform: translateY(0px); }
        }

        /*
          Wing flap — shoulder pivot at (92,52).
          alternate: sweeps up on forward beat, back on reverse.
          -14deg = resting slightly raised (natural glide pose).
          +32deg = full upstroke.
        */
        @keyframes doveWing {
          0%   { transform: rotate(-14deg); }
          100% { transform: rotate(32deg);  }
        }

        @keyframes shimmerGold {
          0%   { background-position:-280% center; }
          100% { background-position: 280% center; }
        }
        @keyframes linePulse {
          0%,100% { opacity:.3; }
          50%     { opacity:.9; }
        }
        @keyframes arrowBounce {
          0%,100% { transform:translateX(-50%) translateY(0);  }
          50%     { transform:translateX(-50%) translateY(9px); }
        }

        .f-cormorant { font-family:'Cormorant Garamond',serif; }
        .f-cinzel    { font-family:'Cinzel',serif; }
        .f-raleway   { font-family:'Raleway',sans-serif; }

        .gold-shimmer {
          background:linear-gradient(90deg,
            #8B5E1A 0%,#C9933A 22%,#F5E4C0 46%,#E2B96A 68%,#C9933A 82%,#8B5E1A 100%);
          background-size:280% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmerGold 4s linear infinite;
        }
        .cd-card {
          background:rgba(6,16,46,0.55);
          border:1px solid rgba(201,147,58,0.50);
          border-radius:10px;
          padding:11px 6px 9px;
          backdrop-filter:blur(16px);
          box-shadow:0 0 20px rgba(34,85,204,0.20) inset,
                     0 0 12px rgba(201,147,58,0.12);
        }
        .date-pill {
          display:inline-flex; align-items:center; gap:10px;
          background:rgba(11,31,82,0.55);
          border:1px solid rgba(201,147,58,0.55);
          border-radius:40px; padding:9px 24px;
          backdrop-filter:blur(12px);
          box-shadow:0 0 28px rgba(34,85,204,0.22);
        }
        .divider {
          height:1px; width:160px; margin:0 auto;
          background:linear-gradient(90deg,transparent,#C9933A 30%,#F5E4C0 50%,#C9933A 70%,transparent);
          animation:linePulse 3.5s ease-in-out infinite;
        }
        .corner {
          position:absolute; width:70px; height:70px;
          opacity:0.28; pointer-events:none;
        }
      `}</style>

      <section style={{
        position:'relative', width:'100%', height:'100dvh',
        overflow:'hidden', display:'flex',
        alignItems:'center', justifyContent:'center',
        background:'var(--navy)',
      }}>

        {/* ══ BACKGROUND ══ */}
        <motion.div style={{ y:bgY, position:'absolute', inset:0, zIndex:0 }}>
          <div style={{ position:'absolute', inset:0, animation:'bgZoomDrift 45s ease-in-out infinite' }}>
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2560&auto=format&fit=crop"
              alt="Flower decorated mandapam"
              style={{
                width:'100%', height:'100%', objectFit:'cover',
                objectPosition:'center 38%',
                filter:'brightness(0.30) saturate(1.15) hue-rotate(200deg) sepia(0.10)',
              }}
            />
          </div>
          <div style={{
            position:'absolute', top:'42%', left:'50%',
            width:'780px', height:'580px', borderRadius:'50%',
            background:'radial-gradient(ellipse,rgba(34,85,204,0.38) 0%,rgba(10,30,100,0.18) 45%,transparent 72%)',
            animation:'navyPulse 9s ease-in-out infinite', pointerEvents:'none',
          }} />
          <div style={{
            position:'absolute', top:'5%', left:'-8%',
            width:'560px', height:'480px', borderRadius:'50%',
            background:'radial-gradient(ellipse,rgba(26,58,143,0.32) 0%,transparent 70%)',
            animation:'sapphireRoam 20s ease-in-out infinite', pointerEvents:'none',
          }} />
          <div style={{
            position:'absolute', bottom:'-8%', right:'-6%',
            width:'500px', height:'420px', borderRadius:'50%',
            background:'radial-gradient(ellipse,rgba(15,45,160,0.28) 0%,transparent 68%)',
            animation:'cobaltDrift 17s ease-in-out infinite', pointerEvents:'none',
          }} />
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(to top,rgba(4,10,32,0.97) 0%,rgba(4,10,32,0.22) 50%,rgba(4,10,32,0.60) 100%)',
          }} />
          <div style={{
            position:'absolute', inset:0,
            background:'radial-gradient(ellipse at center,transparent 34%,rgba(3,8,24,0.72) 100%)',
          }} />
        </motion.div>

        {/* ══ STARS ══ */}
        <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
          {stars.map(s => (
            <div key={s.id} style={{
              position:'absolute', left:s.left, top:s.top,
              width:`${s.size}px`, height:`${s.size}px`,
              borderRadius:'50%', background:'#FFFFFF',
              animation:`twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
            }} />
          ))}
        </div>

        {/* ══════════════════════════════════
            🕊 ROMANTIC FLYING DOVES
        ══════════════════════════════════ */}
        <div style={{
          position:'absolute', inset:0, zIndex:3,
          pointerEvents:'none', overflow:'hidden',
        }}>
          {doves.map(d => (
            <div
              key={d.id}
              style={{
                position:    'absolute',
                top:         `${d.top}%`,
                left:        '115%',
                opacity:     d.opacity,
                transform:   `scale(${d.depthScale})`,
                transformOrigin: 'left center',
                filter: `drop-shadow(0 2px ${Math.round(d.size * 0.25)}px rgba(200,220,255,0.45))`,
                '--da':   `${d.driftAmp}px`,
                '--wdur': `${d.wingDur}s`,
                animation: `doveGlide ${d.dur}s ${d.delay}s linear infinite`,
              } as React.CSSProperties}
            >
              <Dove size={d.size} color={d.color} />
            </div>
          ))}
        </div>

        {/* ══ CORNER ORNAMENTS ══ */}
        {[
          { s:{ top:14,    left:14   }, x:{} },
          { s:{ top:14,    right:14  }, x:{ transform:'scaleX(-1)' } },
          { s:{ bottom:14, left:14   }, x:{ transform:'scaleY(-1)' } },
          { s:{ bottom:14, right:14  }, x:{ transform:'scale(-1,-1)' } },
        ].map((c, i) => (
          <svg key={i} className="corner" style={{ ...c.s, ...c.x }} viewBox="0 0 70 70">
            <path d="M4 4 L4 32 M4 4 L32 4" stroke="#C9933A" strokeWidth="1.8" fill="none"/>
            <path d="M4 4 L18 4 L18 18 L4 18 Z" stroke="#C9933A" strokeWidth="1" fill="none"/>
            <circle cx="11" cy="11" r="3.5" stroke="#C9933A" strokeWidth="1" fill="none"/>
            <circle cx="11" cy="11" r="1" fill="#C9933A"/>
          </svg>
        ))}

        {/* ══ MAIN CONTENT ══ */}
        <motion.div style={{
          y:textY, opacity:fadeOp,
          position:'relative', zIndex:20,
          display:'flex', flexDirection:'column',
          alignItems:'center', textAlign:'center',
          padding:'0 1.25rem',
        }}>
          <motion.p className="f-raleway"
            initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.2, delay:0.2 }}
            style={{ color:'var(--gold-light)', fontSize:'0.63rem',
              letterSpacing:'0.55em', textTransform:'uppercase',
              marginBottom:'1.3rem', fontWeight:300 }}
          >
            Together We Begin
          </motion.p>

          <motion.div className="divider"
            initial={{ scaleX:0 }} animate={{ scaleX:1 }}
            transition={{ duration:1.4, delay:0.38 }}
          />

          <div style={{ margin:'1.55rem 0 0' }}>
            <motion.h1 className="f-cormorant"
              initial={{ opacity:0, y:42 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:1.2, delay:0.58 }}
              style={{ fontSize:'clamp(3.4rem,10.5vw,7.5rem)', fontWeight:400,
                fontStyle:'italic', lineHeight:1, margin:0, color:'var(--ivory)',
                letterSpacing:'0.045em',
                textShadow:'0 2px 60px rgba(34,85,204,0.55), 0 0 100px rgba(201,147,58,0.25)' }}
            >
              Anusha
            </motion.h1>

            <motion.div className="f-cormorant gold-shimmer"
              animate={{ scale:[1,1.14,1], rotate:[0,2,0,-2,0] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              style={{ fontSize:'clamp(2rem,5.5vw,3.8rem)', fontWeight:300,
                fontStyle:'italic', margin:'0.25rem 0', display:'block' }}
            >
              &amp;
            </motion.div>

            <motion.h1 className="f-cormorant"
              initial={{ opacity:0, y:42 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:1.2, delay:0.76 }}
              style={{ fontSize:'clamp(3.4rem,10.5vw,7.5rem)', fontWeight:400,
                fontStyle:'italic', lineHeight:1, margin:0, color:'var(--ivory)',
                letterSpacing:'0.045em',
                textShadow:'0 2px 60px rgba(34,85,204,0.55), 0 0 100px rgba(201,147,58,0.25)' }}
            >
              Harish
            </motion.h1>
          </div>

          <motion.div className="divider"
            initial={{ scaleX:0 }} animate={{ scaleX:1 }}
            transition={{ duration:1.4, delay:0.92 }}
            style={{ marginTop:'1.55rem' }}
          />

          <motion.div className="date-pill f-cinzel"
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, delay:1.18 }}
            style={{ marginTop:'1.5rem', marginBottom:'2rem' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="12" rx="2" stroke="#E2B96A" strokeWidth="1.4"/>
              <path d="M1 7h14" stroke="#E2B96A" strokeWidth="1.4"/>
              <path d="M5 1v3M11 1v3" stroke="#E2B96A" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span style={{ color:'var(--ivory-warm)', fontSize:'clamp(0.70rem,1.9vw,0.91rem)', letterSpacing:'0.22em', fontWeight:500 }}>
              18 MAY 2026
            </span>
            <span style={{ color:'rgba(226,185,106,0.38)', fontSize:'0.85rem' }}>•</span>
            <svg width="11" height="14" viewBox="0 0 12 16" fill="none">
              <path d="M6 1C3.79 1 2 2.79 2 5c0 3.5 4 9 4 9s4-5.5 4-9c0-2.21-1.79-4-4-4z" stroke="#E2B96A" strokeWidth="1.4"/>
              <circle cx="6" cy="5" r="1.5" stroke="#E2B96A" strokeWidth="1.2"/>
            </svg>
            <span style={{ color:'var(--ivory-warm)', fontSize:'clamp(0.70rem,1.9vw,0.91rem)', letterSpacing:'0.22em', fontWeight:500 }}>
              TRICHY, TAMIL NADU
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, delay:1.42 }}
            style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)',
              gap:'0.72rem', maxWidth:'370px', width:'100%' }}
          >
            {[
              { label:'Days',  val:timeLeft.d },
              { label:'Hours', val:timeLeft.h },
              { label:'Mins',  val:timeLeft.m },
              { label:'Secs',  val:timeLeft.s },
            ].map(item => (
              <div key={item.label} style={{ textAlign:'center' }}>
                <div className="cd-card">
                  <span className="f-cinzel" style={{ display:'block',
                    fontSize:'clamp(1.5rem,4.5vw,2.1rem)', fontWeight:500,
                    lineHeight:1, color:'var(--gold-pale)' }}>
                    {String(item.val).padStart(2,'0')}
                  </span>
                </div>
                <span className="f-raleway" style={{ display:'block', marginTop:'0.42rem',
                  fontSize:'0.55rem', letterSpacing:'0.22em', textTransform:'uppercase',
                  color:'var(--gold-light)', fontWeight:300 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ SCROLL ══ */}
        <div style={{
          position:'absolute', bottom:'1.8rem', left:'50%',
          animation:'arrowBounce 2.4s ease-in-out infinite',
          display:'flex', flexDirection:'column', alignItems:'center', zIndex:20,
        }}>
          <span className="f-raleway" style={{ color:'rgba(201,147,58,0.5)',
            fontSize:'0.54rem', letterSpacing:'0.3em', textTransform:'uppercase',
            marginBottom:'0.48rem', fontWeight:300 }}>
            Scroll
          </span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 1v14M1 11l6 7 6-7"
              stroke="rgba(201,147,58,0.65)" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </section>
    </>
  );
}