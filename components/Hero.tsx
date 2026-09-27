'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown, ArrowUpRight, BarChart3, Database, Download, Sparkles, Terminal, WandSparkles, Zap, RotateCcw } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

const floatingCards = [
  { label: 'DATA SCIENCE', value: 'Data Visualization', icon: BarChart3, pos: 'right-[2%] top-[6%]' },
  { label: 'ENGINEERING', value: 'SQL & Big Data', icon: Database, pos: 'left-[2%] top-[35%]' },
  { label: 'SCRIPTING', value: 'Python & R', icon: Terminal, pos: 'left-[3%] bottom-[12%]' },
  { label: 'INFORMATICS', value: 'AI & Machine Learning', icon: WandSparkles, pos: 'left-[3%] bottom-[42%]' },
];

const roles = [
  'Data Science Undergraduate',
  'AI & ML Enthusiast',
  'Data Analyst',
  'Problem Solver',
];

const typewriterTexts = [
  'data visualization',
  'machine learning',
  'thoughtful problem solving',
  'data engineering',
];

// ─── Authentic Hanging Lanyard ID Card (Dynamic SVG Strap Pinned to Top) ───
function HangingLanyardCard() {
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isSpringing, setIsSpringing] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const animRef = useRef<number | null>(null);

  // Geometry dimensions in container space (Container is 210px wide, anchor at x = 105)
  const anchorX = 105; // Pinned top anchor at screen/container top edge
  const restHoleY = 130; // Y position of the punch hole inside card at rest
  const restClipY = 110; // Y position of D-ring clip bottom at rest

  // Current Hole and Clip positions incorporating drag/spring pos
  const holeX = anchorX + pos.x;
  const holeY = restHoleY + pos.y;
  const clipX = anchorX + pos.x;
  const clipY = restClipY + pos.y;

  // Idle Sway Pendulum Animation
  useEffect(() => {
    if (dragging || isSpringing) return;
    let frame: number;
    const startTime = Date.now();

    const idleLoop = () => {
      const t = (Date.now() - startTime) * 0.0022;
      setPos({
        x: Math.sin(t) * 8,
        y: (Math.cos(t * 2) + 1) * 1.5,
      });
      frame = requestAnimationFrame(idleLoop);
    };

    frame = requestAnimationFrame(idleLoop);
    return () => cancelAnimationFrame(frame);
  }, [dragging, isSpringing]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Pointer Down
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setDragging(true);
    setIsSpringing(false);
    setHasMoved(false);
    setStartPos({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos]);

  // Pointer Move
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) setHasMoved(true);

    // Constrain position so card can't go above top anchor
    setPos({
      x: e.clientX - dragOffset.x,
      y: Math.max(-60, e.clientY - dragOffset.y),
    });
  }, [dragging, dragOffset, startPos]);

  // Pointer Up
  const onPointerUp = useCallback((e: React.PointerEvent) => {
    setDragging(false);

    if (hasMoved) {
      setIsSpringing(true);
      // Spring Damped Oscillation Physics (Memantul Smooth Membal)
      let currX = pos.x;
      let currY = pos.y;
      let vx = 0;
      let vy = 0;
      const k = 0.082;      // Stiffness
      const damping = 0.76; // Damping ratio

      const springLoop = () => {
        const fx = -k * currX;
        const fy = -k * currY;
        vx = (vx + fx) * damping;
        vy = (vy + fy) * damping;
        currX += vx;
        currY += vy;

        setPos({ x: currX, y: currY });

        if (Math.hypot(currX, currY) > 0.25 || Math.hypot(vx, vy) > 0.25) {
          animRef.current = requestAnimationFrame(springLoop);
        } else {
          setPos({ x: 0, y: 0 });
          setIsSpringing(false);
        }
      };

      animRef.current = requestAnimationFrame(springLoop);
    } else {
      // Click -> Flip Card
      setFlipped((f) => !f);
    }

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  }, [hasMoved, pos]);

  // Calculate ribbon polygon coordinates (Top extends -300px UP to pin to top window edge)
  const ribbonTopLeftX = anchorX - 6;
  const ribbonTopRightX = anchorX + 6;
  const ribbonBottomLeftX = clipX - 5;
  const ribbonBottomRightX = clipX + 5;
  const ribbonBottomY = clipY - 10;

  return (
    <div className="absolute top-0 right-[4%] sm:right-[6%] md:right-[7%] lg:right-[8%] w-[210px] h-[550px] z-[25] select-none pointer-events-none">
      
      {/* Dynamic SVG Lanyard Ribbon & Clip (Pinned to top screen edge at y = -300, always 100% attached) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10">
        {/* 1. Black Woven Ribbon Strap (Extends -300px UP past top edge of screen) */}
        <polygon
          points={`${ribbonTopLeftX},-300 ${ribbonTopRightX},-300 ${ribbonBottomRightX},${ribbonBottomY} ${ribbonBottomLeftX},${ribbonBottomY}`}
          fill="#0B1229"
        />
        {/* Cyan center stripe accent on strap */}
        <line
          x1={anchorX}
          y1={-300}
          x2={clipX}
          y2={ribbonBottomY}
          stroke="#6FC7F1"
          strokeWidth="1.8"
          strokeOpacity="0.85"
        />

        {/* 2. Swivel Ring D-Clip Hook (Matches Reference Image) */}
        <path
          d={`M ${clipX - 10} ${ribbonBottomY} 
             C ${clipX - 10} ${clipY + 8}, ${clipX + 10} ${clipY + 8}, ${clipX + 10} ${ribbonBottomY}`}
          fill="none"
          stroke="#0B1229"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d={`M ${clipX - 10} ${ribbonBottomY} 
             C ${clipX - 10} ${clipY + 8}, ${clipX + 10} ${clipY + 8}, ${clipX + 10} ${ribbonBottomY}`}
          fill="none"
          stroke="#6FC7F1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Swivel metal base ring */}
        <ellipse
          cx={clipX}
          cy={clipY + 1}
          rx="5"
          ry="3"
          fill="#0B1229"
          stroke="#6FC7F1"
          strokeWidth="1"
        />

        {/* 3. Black String Connector (Runs directly from D-ring into Card Punch Hole) */}
        <line
          x1={clipX}
          y1={clipY + 3}
          x2={holeX}
          y2={holeY}
          stroke="#0B1229"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1={clipX}
          y1={clipY + 3}
          x2={holeX}
          y2={holeY}
          stroke="#6FC7F1"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </svg>

      {/* Interactive Card Container */}
      <div
        className="absolute top-[102px] left-0 w-[210px] h-[295px] pointer-events-auto cursor-grab active:cursor-grabbing touch-none z-20"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          willChange: 'transform',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Floating Hint Badge */}
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold text-[#0B1229] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#0B1229]/15 shadow-md flex items-center gap-1.5 transition-opacity duration-300 pointer-events-none z-30 ${
            !dragging && !isSpringing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <RotateCcw size={10} className="text-[#168AC2]" /> Tarik &amp; klik untuk balik
        </div>

        {/* Card 3D Flip Container */}
        <div
          className="w-full h-full relative"
          style={{
            perspective: '900px',
            filter: dragging
              ? 'drop-shadow(0 24px 38px rgba(11,18,41,0.45))'
              : 'drop-shadow(0 14px 22px rgba(11,18,41,0.25))',
            transition: 'filter 0.3s ease',
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              transformStyle: 'preserve-3d',
              transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: `rotateY(${flipped ? 180 : 0}deg) rotateZ(-2deg)`,
            }}
          >
            {/* ─── FRONT SIDE (Matches Purple Reference Image media_1789520705904.png) ─── */}
            <div
              className="absolute inset-0 rounded-2xl border-[3.5px] border-[#0B1229] shadow-2xl overflow-hidden flex flex-col justify-between p-3.5 select-none"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'linear-gradient(155deg, #0B1229 0%, #172042 50%, #0A0F24 100%)',
              }}
            >
              {/* Punch Hole at Top Center */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050B14] border-2 border-[#1E293B] z-30 flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0B1229]" />
              </div>

              {/* Top University Brand Bar */}
              <div className="pt-4 flex items-center justify-between border-b border-white/10 pb-1.5 z-10">
                <span className="text-[6.5px] font-black tracking-[0.14em] text-[#6FC7F1] uppercase">
                  UNIVERSITAS NEGERI SURABAYA
                </span>
                <span className="text-[6.5px] font-extrabold text-white/50 tracking-wider">
                  EST. 1964
                </span>
              </div>

              {/* Middle Section: Vertical Text + Avatar Graphic */}
              <div className="relative flex-1 my-2 flex items-center justify-between overflow-hidden">
                {/* Vertical "DATA SCIENCE" stacked text on left side */}
                <div className="flex flex-col justify-center gap-1 select-none pointer-events-none opacity-25">
                  <span className="text-[20px] font-black leading-none text-white tracking-tighter uppercase opacity-80 [writing-mode:vertical-lr] rotate-180">
                    DATA SCIENCE
                  </span>
                  <span className="text-[20px] font-black leading-none text-[#6FC7F1] tracking-tighter uppercase opacity-60 [writing-mode:vertical-lr] rotate-180">
                    DATA SCIENCE
                  </span>
                </div>

                {/* Right side portrait card background & illustration */}
                <div className="relative w-[118px] h-[145px] rounded-xl bg-gradient-to-br from-[#1E295D] via-[#168AC2]/30 to-[#0B1229] border border-[#6FC7F1]/30 flex flex-col items-center justify-center p-2 shadow-inner overflow-hidden">
                  {/* Subtle dot matrix grid background */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(111,199,241,0.8) 1px, transparent 1px)',
                      backgroundSize: '10px 10px',
                    }}
                  />
                  
                  {/* Soft avatar graphic emblem */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#168AC2] to-[#6FC7F1] p-0.5 shadow-lg mb-1 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#0B1229] flex items-center justify-center overflow-hidden">
                      <span className="text-2xl font-black text-[#A8E6FF] tracking-tight">KNS</span>
                    </div>
                  </div>

                  <span className="relative text-[9px] font-extrabold text-white tracking-wider uppercase text-center mt-1">
                    UNDERGRADUATE
                  </span>
                  <span className="relative text-[7px] font-bold text-[#6FC7F1] tracking-wide text-center">
                    NIM: 23091397001
                  </span>
                </div>
              </div>

              {/* Bottom White Floating Nameplate Badge (Matches Purple Reference) */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-white/50 text-[#0B1229] flex flex-col justify-center">
                <p className="text-[11px] font-black tracking-tight leading-tight uppercase text-[#0B1229]">
                  KARTIKA NUR SAVIRA
                </p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[8px] font-bold text-[#168AC2]">
                    kartikasavirao6@gmail.com
                  </p>
                  <span className="w-2 h-2 rounded-full bg-[#168AC2] animate-pulse" />
                </div>
              </div>
            </div>

            {/* ─── BACK SIDE (3D Flip Information) ─── */}
            <div
              className="absolute inset-0 rounded-2xl border-[3.5px] border-[#0B1229] shadow-2xl overflow-hidden flex flex-col justify-between p-4 select-none"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(155deg, #070D1E 0%, #101835 100%)',
              }}
            >
              {/* Punch Hole at Top Center */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050B14] border-2 border-[#1E293B] z-30 flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0B1229]" />
              </div>

              <div className="pt-4">
                <div className="text-[8px] font-black tracking-[0.16em] text-[#6FC7F1] uppercase mb-1.5">
                  STUDENT PROFILE
                </div>
                <p className="text-white/90 text-[10px] leading-relaxed font-medium">
                  Data Science undergraduate at UNESA. Passionate about machine learning, analytics, and data-driven solutions.
                </p>
              </div>

              <div>
                <div className="text-[8px] font-black tracking-[0.16em] text-[#6FC7F1] uppercase mb-1.5">
                  TECHNICAL SKILLS
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Python', 'SQL', 'Machine Learning', 'Pandas', 'R', 'Visualization'].map((s) => (
                    <span
                      key={s}
                      className="text-[7.5px] font-bold px-2 py-0.5 rounded-md bg-[#168AC2]/20 text-[#6FC7F1] border border-[#168AC2]/30"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[8px] font-black tracking-[0.16em] text-[#6FC7F1] uppercase mb-1">
                  AVAILABILITY
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/85 text-[9px] font-semibold">
                    Open for Internship &amp; Projects
                  </span>
                </div>
              </div>

              <div className="text-center pt-2 border-t border-white/10">
                <span className="text-[7px] font-extrabold text-[#6FC7F1]/60 tracking-widest uppercase">
                  KLIK UNTUK MEMBALIK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Magnetic Buttons ───
function MagneticButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  }, []);
  return (
    <button ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }} {...props}>
      {children}
    </button>
  );
}

function MagneticLink({ children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  }, []);
  return (
    <a ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }} {...props}>
      {children}
    </a>
  );
}

export default function Hero() {
  const mouse = useMousePosition();
  const heroRef = useRef<HTMLElement>(null);
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeRole, setActiveRole] = useState(0);

  // Typewriter
  useEffect(() => {
    const currentWord = typewriterTexts[typeIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTypeIndex((prev) => (prev + 1) % typewriterTexts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, typeIndex]);

  // Cycle active role
  useEffect(() => {
    const interval = setInterval(() => setActiveRole((p) => (p + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });

  const px = (strength: number) => ({
    transform: `translate(${mouse.x * strength}px, ${mouse.y * strength}px)`,
    transition: 'transform 0.15s linear',
  });

  return (
    <section id="hero" ref={heroRef} className="relative overflow-hidden bg-[#F4F9FE] pt-28 text-[#0B1F3A]">
      <div className="hero-dot-field absolute inset-0" aria-hidden="true" />
      <div className="hero-sky-orb hero-sky-orb-one" aria-hidden="true" style={px(-20)} />
      <div className="hero-sky-orb hero-sky-orb-two" aria-hidden="true" style={px(-15)} />

      {/* Decorative dots */}
      <div className="absolute left-[18%] top-[30%] w-3 h-3 rounded-full bg-[#168AC2]/30 animate-pulse" style={px(6)} aria-hidden="true" />
      <div className="absolute left-[35%] top-[55%] w-2 h-2 rounded-full bg-[#6FC7F1]/50" style={px(10)} aria-hidden="true" />
      <div className="absolute right-[30%] top-[25%] w-2.5 h-2.5 rounded-full bg-[#0B1F3A]/15 animate-pulse" style={{ ...px(8), animationDelay: '1s' }} aria-hidden="true" />
      <div className="absolute right-[20%] bottom-[35%] w-2 h-2 rounded-full bg-[#168AC2]/25" style={px(12)} aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] flex-col justify-center px-5 pb-20 md:px-10">
        <div className="relative flex flex-1 items-center justify-center py-16 md:py-24">

          {/* ─── MY PORTFOLIO box ─── */}
          <div
            className="relative z-[1] w-full max-w-[960px] border-2 border-[#0B1F3A]/15 rounded-[22px] bg-[#E8F9FF]/65 backdrop-blur-sm px-8 py-12 md:py-16"
            style={{
              ...px(3),
              boxShadow: '14px 18px 0 rgba(11,31,58,0.06)',
            }}
          >
            <p className="text-[#0B1F3A] font-black leading-[0.82] tracking-[-0.08em] text-center select-none"
               style={{ fontSize: 'clamp(3.2rem, 10vw, 9rem)' }}
            >
              MY PORTFOLIO
            </p>
          </div>

          {/* Connecting line decoration */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2] hidden md:block" aria-hidden="true">
            <line x1="38%" y1="35%" x2="58%" y2="28%" stroke="rgba(11,31,58,0.07)" strokeWidth="1.5" strokeDasharray="6 4" />
            <line x1="62%" y1="55%" x2="72%" y2="45%" stroke="rgba(11,31,58,0.05)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="38%" cy="35%" r="3" fill="rgba(22,138,194,0.25)" />
            <circle cx="72%" cy="45%" r="3" fill="rgba(22,138,194,0.2)" />
          </svg>

          {/* ─── Authentic Hanging Lanyard ID Card (Matches Purple Reference Exactly) ─── */}
          <HangingLanyardCard />

          {/* Role list card — positioned lower right away from ID card */}
          <div
            className="absolute z-[3] right-[2%] bottom-[4%] md:right-[3%] md:bottom-[5%]"
            style={px(6)}
          >
            <div className="bg-white/85 backdrop-blur-md rounded-xl border border-[#0B1F3A]/12 p-3.5 shadow-[6px_8px_0_rgba(11,31,58,0.06)] min-w-[170px]">
              {roles.map((role, i) => (
                <div
                  key={role}
                  className={`py-1 px-2 rounded-md text-[11px] font-semibold transition-all duration-300 ${
                    i === activeRole
                      ? 'bg-[#0B1F3A] text-white scale-[1.02]'
                      : 'text-[#5C7591] hover:text-[#153B66]'
                  }`}
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* Floating skill cards */}
          {floatingCards.map(({ label, value, icon: Icon, pos }, i) => (
            <div
              key={label}
              className={`hero-float-card absolute ${pos} z-[3]`}
              style={{ ...px(12 + i * 4), animationDelay: `${-i * 1}s` }}
            >
              <span className="hero-float-icon"><Icon size={17} /></span>
              <span><strong>{label}</strong><b>{value}</b></span>
            </div>
          ))}

          {/* Extra pills */}
          <div className="hero-pill-note absolute left-[10%] top-[13%] z-[3]" style={px(6)}>From raw data to clear direction</div>
          <div className="absolute z-[3] left-[20%] bottom-[18%]" style={px(10)}>
            <div className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#0B1F3A]/10 px-3 py-2 shadow-[5px_6px_0_rgba(11,31,58,0.06)] text-xs font-bold text-[#153B66]">
              <Zap size={13} className="text-[#168AC2]" />
              Model Acc: <span className="text-[#168AC2]">98.4%</span>
            </div>
          </div>
          <div className="hero-pill-note absolute right-[20%] bottom-[1%]" style={px(10)}>Open to opportunities</div>
        </div>

        <div className="flex items-center justify-between border-t border-[#0B1F3A]/15 pt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#24577A]">
          <span className="flex items-center gap-2"><ArrowDown size={14} className="animate-bounce" /> Scroll to explore</span>
          <span className="hidden md:block">Data · Models · Stories</span>
          <span>01 / 08</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-y border-[#0B1F3A]/10 bg-[#E9F8FF]/80 py-3 overflow-hidden">
        <div className="hero-marquee flex min-w-max items-center gap-12 px-6 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#22658C]">
          {['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'PostgreSQL', 'Pandas', 'Research', 'Analytics'].map((item) => <span key={item}>{item} <i>•</i></span>)}
        </div>
      </div>

      {/* Intro section */}
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-32">
        <div className="hero-intro-art">
          <div className="hero-intro-grid" aria-hidden="true" />
          <div className="hero-intro-card"><span>KNS</span><small>DATA<br />SCIENCE</small></div>
          <div className="hero-intro-sticker">ANALYZE · BUILD · SHARE</div>
        </div>
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#A8E6FF]"><Sparkles size={13} /> Available for internships &amp; projects</div>
          <h1 className="max-w-xl text-5xl font-extrabold leading-[0.95] tracking-[-0.06em] text-[#0B1F3A] sm:text-6xl md:text-7xl">Hi, I&apos;m <em className="text-[#168AC2]">Kartika<br />Nur Savira.</em></h1>
          <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-[#0B1F3A]"><span className="rounded-full border border-[#0B1F3A]/20 bg-white/60 px-4 py-2">Data Science Undergraduate</span><span className="rounded-full border border-[#0B1F3A]/20 bg-white/60 px-4 py-2">AI &amp; ML Enthusiast</span></div>
          <p className="mt-7 max-w-lg text-lg font-medium leading-relaxed text-[#24516C]">Data Science undergraduate at Universitas Negeri Surabaya, turning curiosity into practical insights through <span className="typewriter-cursor text-[#168AC2] font-bold">{displayed}</span></p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton onClick={scrollToProjects} className="group inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#168AC2] hover:shadow-lg hover:shadow-[#168AC2]/25">View work <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></MagneticButton>
            <MagneticLink href="/cv-kartika-nur-savira.pdf" download className="inline-flex items-center gap-2 rounded-full border-2 border-[#0B1F3A] bg-white/50 px-6 py-3 text-sm font-bold text-[#0B1F3A] transition hover:bg-white hover:shadow-lg"><Download size={15} /> Download CV</MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
