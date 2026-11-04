'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  UserRound,
  Sparkles,
  ArrowRight,
  BarChart3,
  Brain,
  TrendingUp,
  Activity,
  Cpu,
} from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

const rotatingRoles = [
  'Data Scientist',
  'Data Analyst',
  'Machine Learning',
  'AI Enthusiast',
  'Data Storyteller',
];

export default function Hero() {
  const mouse = useMousePosition();
  const heroRef = useRef<HTMLElement>(null);

  // Typewriter effect for rotating roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = rotatingRoles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedRole.length < current.length) {
      timer = setTimeout(() => {
        setDisplayedRole(current.slice(0, displayedRole.length + 1));
      }, 75);
    } else if (!isDeleting && displayedRole.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedRole.length > 0) {
      timer = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 40);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#F0F6FF] via-[#E4EFFF] to-[#F0F6FF] dark:from-[#020718] dark:via-[#051133] dark:to-[#030719] overflow-hidden text-[#071744] dark:text-white flex flex-col justify-between pt-16 sm:pt-20 select-none transition-colors duration-500"
    >
      {/* ─── 1. Blueprint Grid, Animated Circuit Schematic & Floating Tech Elements ─── */}
      <div className="absolute inset-0 pointer-events-none select-none -z-0 opacity-50 dark:opacity-75 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:36px_36px] opacity-15 dark:opacity-25" />

        {/* Dynamic Circuit / Blueprint Line Overlay */}
        <svg
          viewBox="0 0 1440 900"
          className="w-full h-full object-cover text-blue-500/25 dark:text-blue-400/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Horizontal and vertical circuit traces */}
          <path d="M 0 140 H 380 V 260 H 680" strokeDasharray="6 6" />
          <path d="M 120 0 V 180 H 480" />
          <path d="M 380 70 H 760 V 160 H 1040" strokeDasharray="8 6" opacity="0.6" />
          <path d="M 900 60 H 1220 V 220" strokeDasharray="8 6" />
          <path d="M 720 380 H 1440" opacity="0.4" />
          <path d="M 280 560 H 740 V 820" strokeDasharray="4 6" />

          {/* Animated Circuit nodes / pulsing dots */}
          <circle cx="380" cy="70" r="3.5" fill="#38BDF8" className="animate-ping" />
          <circle cx="380" cy="70" r="2.5" fill="#38BDF8" />

          <circle cx="760" cy="160" r="3" fill="#60A5FA" />
          <circle cx="760" cy="160" r="6" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" className="animate-pulse" />

          <circle cx="480" cy="180" r="3" fill="#60A5FA" />
          <circle cx="680" cy="260" r="3.5" fill="#38BDF8" className="animate-ping" />
          <circle cx="680" cy="260" r="2.5" fill="#38BDF8" />

          <circle cx="1220" cy="220" r="3" fill="#38BDF8" />
        </svg>

        {/* Ambient Electric Blue & Cyan Glow Flares */}
        <div className="absolute top-[10%] left-[8%] w-[520px] h-[520px] rounded-full bg-blue-500/15 dark:bg-blue-600/30 blur-[130px] pointer-events-none animate-pulse duration-[7000ms]" />
        <div className="absolute top-[20%] right-[12%] w-[580px] h-[580px] rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-[140px] pointer-events-none" />

        {/* Floating Ambient Constellation Stars in Upper Space */}
        <div className="absolute top-24 left-[28%] text-cyan-400/40 animate-pulse hidden md:block">
          ✦
        </div>
        <div className="absolute top-36 left-[48%] text-blue-400/30 animate-pulse delay-700 hidden lg:block">
          ✦
        </div>
        <div className="absolute top-28 right-[32%] text-cyan-300/40 animate-pulse delay-1000 hidden md:block">
          ✦
        </div>
      </div>

      {/* ─── 2. Floating High-Tech Telemetry Chips (Fills Upper Center Space Naturally) ─── */}
      <div className="absolute top-20 sm:top-24 inset-x-0 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 z-10 pointer-events-none flex items-center justify-between">
        {/* Telemetry Chip Left/Center */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 dark:bg-[#071638]/75 backdrop-blur-md border border-cyan-400/25 shadow-sm text-[10.5px] font-mono font-medium text-cyan-700 dark:text-cyan-300 animate-float-medium ml-[40%]">
          <Activity size={12} className="text-cyan-400 animate-pulse" />
          <span>Model Accuracy: 99.2%</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Telemetry Chip Right */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/65 dark:bg-[#071638]/65 backdrop-blur-md border border-blue-400/20 shadow-sm text-[10px] font-mono text-blue-700 dark:text-blue-200 animate-float-slow mr-12">
          <Cpu size={12} className="text-blue-400" />
          <span>Neural Net · MobileNetV2</span>
        </div>
      </div>

      {/* ─── 3. Main Center Content Container (Shifted Upwards to Eliminate Gap) ─── */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 z-10 w-full flex-1 flex flex-col justify-center -mt-6 sm:-mt-10 lg:-mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">

          {/* ─── LEFT COLUMN: Title, Badge, Scrubber & Action Buttons ─── */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start z-10 py-2 sm:py-3">
            
            {/* Top Micro Label: "✦ Data Science Portfolio" */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-cyan-400 mb-3">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
              <span>Data Science Portfolio</span>
            </div>

            {/* Giant Name Headline */}
            <div className="relative mb-4">
              {/* Glowing Lens Flare Star On The Top-Left Of Name */}
              <div className="absolute -top-4 -left-6 pointer-events-none">
                <svg viewBox="0 0 24 24" className="w-9 h-9 text-cyan-400 dark:text-cyan-300 animate-pulse drop-shadow-[0_0_12px_#38BDF8]">
                  <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" fill="currentColor" />
                </svg>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] font-serif font-normal text-[#071744] dark:text-white leading-[1.02] tracking-tight drop-shadow-[0_0_35px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_0_35px_rgba(59,130,246,0.45)] transition-colors duration-500">
                Kartika <br />
                <span className="italic font-normal bg-gradient-to-r from-[#0B2559] via-[#1E3A8A] to-[#2563EB] dark:from-white dark:via-blue-100 dark:to-cyan-200 bg-clip-text text-transparent">
                  Nur Savira
                </span>
              </h1>
            </div>

            {/* ─── Subtitle Row: Rotating Role + Blue Badge (Moves dynamically with typing) ─── */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              {/* Left Role (Typewriter Effect) */}
              <div className="inline-flex items-center font-bold text-lg sm:text-xl md:text-2xl text-[#0B2559] dark:text-white tracking-wide shrink-0">
                <span>{displayedRole || 'Data Scientist'}</span>
                <span className="inline-block w-[2px] h-5 sm:h-6 bg-blue-600 dark:bg-cyan-400 ml-1.5 animate-pulse" />
              </div>

              {/* Right Dual-Color Pill Badge: [ Kartika N. S. | 👤 ] */}
              <div className="inline-flex items-center rounded-lg overflow-hidden border border-blue-400/30 shadow-[0_4px_16px_rgba(37,99,235,0.25)] shrink-0 transition-all duration-75">
                <span className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-xs sm:text-sm tracking-wide">
                  Kartika N. S.
                </span>
                <span className="px-2.5 py-1.5 bg-white text-blue-950 flex items-center justify-center">
                  <UserRound size={15} className="text-blue-900" />
                </span>
              </div>
            </div>

            {/* ─── Glowing Progress / Scrubber Line ─── */}
            <div className="w-full max-w-md h-[2px] bg-blue-200/70 dark:bg-blue-900/40 relative rounded-full overflow-hidden my-3">
              <div className="absolute left-0 top-0 bottom-0 w-36 sm:w-44 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-full shadow-[0_0_12px_#38BDF8] animate-pulse" />
            </div>

            {/* ─── Action Buttons ─── */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4">
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_30px_rgba(56,189,248,0.4)] active:scale-95 transition-all"
              >
                Explore Projects <ArrowRight size={15} />
              </button>

              <button
                onClick={scrollToContact}
                className="px-6 py-3.5 rounded-full border border-blue-300 dark:border-blue-400/30 hover:bg-blue-500/10 text-blue-900 dark:text-blue-100 font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-sm"
              >
                Contact Me
              </button>
            </div>

          </div>

          {/* Spacer for desktop layout so right side can breathe */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

        </div>
      </div>

      {/* ─── 4. Persona Photo & Floating Interactive Skill Cards ─── */}
      <div
        className="relative lg:absolute lg:right-16 xl:right-28 2xl:right-40 lg:bottom-0 z-20 flex items-end justify-center pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouse.x * 8}px, 0px)`,
        }}
      >
        {/* Animated Rotating Orbital Blueprint Rings Behind Persona Head & Shoulders */}
        {/* Outer Rotating Dashed Ring */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[580px] lg:w-[640px] h-[520px] sm:h-[580px] lg:h-[640px] rounded-full border border-dashed border-cyan-400/20 dark:border-cyan-400/30 animate-[spin_60s_linear_infinite] pointer-events-none -z-10" />

        {/* Middle Counter-Rotating Dotted Ring with Glowing Blip */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[440px] lg:w-[500px] h-[380px] sm:h-[440px] lg:h-[500px] rounded-full border border-dotted border-blue-400/20 dark:border-blue-400/30 animate-[spin_40s_linear_infinite_reverse] pointer-events-none -z-10">
          <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-ping" />
        </div>

        {/* Inner Solid Blueprint Ring */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] lg:w-[340px] h-[240px] sm:h-[280px] lg:h-[340px] rounded-full border border-blue-300/15 dark:border-cyan-500/20 pointer-events-none -z-10" />

        {/* ─── Floating Interactive Skill Cards Flanking Photo ─── */}

        {/* Card 1 (Left Upper): 📊 Data Analyst */}
        <div
          className="absolute -left-8 sm:-left-16 lg:-left-24 top-[18%] z-30 pointer-events-auto animate-float-slow group"
          style={{
            transform: `translate(${mouse.x * -10}px, ${mouse.y * -8}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-[#071638]/90 backdrop-blur-md border border-blue-300/40 dark:border-cyan-500/30 shadow-[0_8px_22px_rgba(2,7,24,0.14)] dark:shadow-[0_8px_24px_rgba(2,7,24,0.55)] group-hover:border-cyan-400 dark:group-hover:border-cyan-400 group-hover:shadow-[0_12px_28px_rgba(56,189,248,0.35)] group-hover:scale-105 group-hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/30 dark:to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <BarChart3 size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#071744] dark:text-white leading-tight">
                Data Analyst
              </span>
              <span className="text-[10px] font-medium text-cyan-700 dark:text-cyan-300/80">
                SQL & BI Insights
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 (Right Upper): 🧠 Machine Learning */}
        <div
          className="absolute -right-6 sm:-right-12 lg:-right-16 top-[15%] z-30 pointer-events-auto animate-float-medium group"
          style={{
            transform: `translate(${mouse.x * 10}px, ${mouse.y * -8}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-[#071638]/90 backdrop-blur-md border border-indigo-300/40 dark:border-indigo-400/30 shadow-[0_8px_22px_rgba(2,7,24,0.14)] dark:shadow-[0_8px_24px_rgba(2,7,24,0.55)] group-hover:border-indigo-400 dark:group-hover:border-indigo-400 group-hover:shadow-[0_12px_28px_rgba(129,140,248,0.35)] group-hover:scale-105 group-hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Brain size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#071744] dark:text-white leading-tight">
                Machine Learning
              </span>
              <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-300/80">
                Predictive AI
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 (Left Mid): 🔬 Data Scientist */}
        <div
          className="absolute -left-6 sm:-left-12 lg:-left-20 top-[50%] z-30 pointer-events-auto animate-float-fast group"
          style={{
            transform: `translate(${mouse.x * -8}px, ${mouse.y * 8}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-[#071638]/90 backdrop-blur-md border border-blue-300/40 dark:border-blue-400/30 shadow-[0_8px_22px_rgba(2,7,24,0.14)] dark:shadow-[0_8px_24px_rgba(2,7,24,0.55)] group-hover:border-blue-400 dark:group-hover:border-blue-400 group-hover:shadow-[0_12px_28px_rgba(59,130,246,0.35)] group-hover:scale-105 group-hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500/20 to-sky-500/20 dark:from-blue-500/30 dark:to-sky-600/30 border border-blue-400/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <TrendingUp size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#071744] dark:text-white leading-tight">
                Data Scientist
              </span>
              <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300/80">
                Python & Analytics
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 (Right Mid): 📈 Data Storytelling */}
        <div
          className="absolute -right-6 sm:-right-12 lg:-right-16 top-[48%] z-30 pointer-events-auto animate-float-slow group"
          style={{
            transform: `translate(${mouse.x * 6}px, ${mouse.y * 10}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-[#071638]/90 backdrop-blur-md border border-amber-300/40 dark:border-amber-400/30 shadow-[0_8px_22px_rgba(2,7,24,0.14)] dark:shadow-[0_8px_24px_rgba(2,7,24,0.55)] group-hover:border-amber-400 dark:group-hover:border-amber-400 group-hover:shadow-[0_12px_28px_rgba(245,158,11,0.35)] group-hover:scale-105 group-hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2.5 sm:gap-3 cursor-pointer">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 dark:from-amber-500/30 dark:to-orange-600/30 border border-amber-400/40 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles size={16} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#071744] dark:text-white leading-tight">
                Data Storytelling
              </span>
              <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300/80">
                Impact & Visuals
              </span>
            </div>
          </div>
        </div>

        {/* Photo Container: High Definition & Smooth Bottom Grounding */}
        <div
          className="relative aspect-[1119/1406] h-[380px] sm:h-[450px] md:h-[490px] lg:h-[530px] xl:h-[570px] max-h-[590px]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.3) 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.3) 92%, transparent 100%)',
          }}
        >
          <Image
            src="/images/viracantik.png"
            alt="Kartika Nur Savira"
            fill
            priority
            unoptimized
            className="object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)] contrast-[1.04] brightness-[1.01] select-none pointer-events-none"
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 460px"
          />
        </div>
      </div>

      {/* ─── 5. Bottom Atmospheric Gradient Haze ─── */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-[#F0F6FF] via-[#F0F6FF]/60 to-transparent dark:from-[#020718] dark:via-[#030719]/80 pointer-events-none z-20" />
    </section>
  );
}
