'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  Palette,
  Code2,
  BarChart3,
  Database,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Download,
} from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

const roles = [
  'Data Science',
  'UI/UX',
  'Web Development',
  'Data Analyst',
  'Machine Learning',
];


const marqueeItems = [
  'Data Science',
  'UI/UX',
  'Web Development',
  'Data Analyst',
  'Machine Learning',
  'Python & SQL',
  'Artificial Intelligence',
  'Universitas Negeri Surabaya',
];

// ─── 3D Parametric Torus Wireframe SVG Component (Continuous 3D Auto-Rotation) ───
function TorusWireframe({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const [autoAngle, setAutoAngle] = useState(0);

  useEffect(() => {
    let animId: number;
    let t = 0;
    const loop = () => {
      t += 0.008; // smooth continuous 3D rotation
      setAutoAngle(t);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const rings = useMemo(() => {
    const majorR = 145;
    const minorR = 68;
    const numRings = 16;
    const numSlices = 24;

    const yaw = 0.55 + autoAngle + mouseX * 0.08;
    const pitch = 0.42 + Math.sin(autoAngle * 0.5) * 0.06 + mouseY * 0.08;
    const roll = -0.25 + Math.cos(autoAngle * 0.3) * 0.04;

    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const cr = Math.cos(roll), sr = Math.sin(roll);

    const project = (x0: number, y0: number, z0: number) => {
      const x1 = x0 * cr - y0 * sr;
      const y1 = x0 * sr + y0 * cr;
      const z1 = z0;
      const x2 = x1 * cy + z1 * sy;
      const z2 = -x1 * sy + z1 * cy;
      const y3 = y1 * cp - z2 * sp;
      const z3 = y1 * sp + z2 * cp;

      const scale = 1 + z3 * 0.0018;
      return {
        x: x2 * scale + 240,
        y: y3 * scale + 230,
        z: z3,
      };
    };

    const ringPaths: { d: string; zAvg: number }[] = [];
    for (let i = 0; i < numRings; i++) {
      const u = (i / numRings) * Math.PI * 2;
      let pathStr = '';
      let zTotal = 0;
      for (let j = 0; j <= numSlices; j++) {
        const v = (j / numSlices) * Math.PI * 2;
        const x = (majorR + minorR * Math.cos(v)) * Math.cos(u);
        const y = (majorR + minorR * Math.cos(v)) * Math.sin(u);
        const z = minorR * Math.sin(v);
        const pt = project(x, y, z);
        zTotal += pt.z;
        pathStr += `${j === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `;
      }
      pathStr += 'Z';
      ringPaths.push({ d: pathStr, zAvg: zTotal / (numSlices + 1) });
    }

    const longPaths: { d: string; zAvg: number }[] = [];
    for (let j = 0; j < 8; j++) {
      const v = (j / 8) * Math.PI * 2;
      let pathStr = '';
      let zTotal = 0;
      for (let i = 0; i <= numRings * 2; i++) {
        const u = (i / (numRings * 2)) * Math.PI * 2;
        const x = (majorR + minorR * Math.cos(v)) * Math.cos(u);
        const y = (majorR + minorR * Math.cos(v)) * Math.sin(u);
        const z = minorR * Math.sin(v);
        const pt = project(x, y, z);
        zTotal += pt.z;
        pathStr += `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `;
      }
      pathStr += 'Z';
      longPaths.push({ d: pathStr, zAvg: zTotal / (numRings * 2 + 1) });
    }

    return { ringPaths, longPaths };
  }, [mouseX, mouseY]);

  return (
    <svg
      viewBox="0 0 480 460"
      className="absolute -top-10 -right-6 sm:right-4 w-[380px] sm:w-[460px] md:w-[520px] h-auto pointer-events-none select-none z-0 opacity-85"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="torusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {rings.ringPaths
        .filter((r) => r.zAvg < 0)
        .map((r, idx) => (
          <path
            key={`r-back-${idx}`}
            d={r.d}
            fill="none"
            stroke="url(#torusGrad)"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
        ))}

      {rings.longPaths.map((l, idx) => (
        <path
          key={`long-${idx}`}
          d={l.d}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="1"
          strokeOpacity={l.zAvg > 0 ? '0.6' : '0.25'}
        />
      ))}

      {rings.ringPaths
        .filter((r) => r.zAvg >= 0)
        .map((r, idx) => (
          <path
            key={`r-front-${idx}`}
            d={r.d}
            fill="none"
            stroke="url(#torusGrad)"
            strokeWidth="1.4"
            strokeOpacity="0.75"
          />
        ))}
    </svg>
  );
}

// ─── 3D Floating Isometric Cube Component ───
function IsometricCube() {
  return (
    <div className="absolute -left-4 sm:-left-8 top-[36%] z-[15] pointer-events-none animate-float-medium">
      <svg width="70" height="70" viewBox="0 0 100 100" className="drop-shadow-[0_8px_16px_rgba(59,130,246,0.25)]">
        <polygon
          points="50,15 85,35 50,55 15,35"
          fill="#93C5FD"
          fillOpacity="0.45"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <polygon
          points="15,35 50,55 50,90 15,70"
          fill="#3B82F6"
          fillOpacity="0.35"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <polygon
          points="50,55 85,35 85,70 50,90"
          fill="#60A5FA"
          fillOpacity="0.25"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1="50" y1="55" x2="50" y2="15" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      </svg>
    </div>
  );
}



export default function Hero() {
  const mouse = useMousePosition();
  const heroRef = useRef<HTMLElement>(null);

  // Top section role typewriter
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);


  // Typewriter for top role tag
  useEffect(() => {
    const current = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeletingRole && displayedRole.length < current.length) {
      timer = setTimeout(() => {
        setDisplayedRole(current.slice(0, displayedRole.length + 1));
      }, 75);
    } else if (!isDeletingRole && displayedRole.length === current.length) {
      timer = setTimeout(() => setIsDeletingRole(true), 2200);
    } else if (isDeletingRole && displayedRole.length > 0) {
      timer = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 40);
    } else if (isDeletingRole && displayedRole.length === 0) {
      setIsDeletingRole(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeletingRole, roleIndex]);



  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="relative bg-[#F8FAFD] pt-24 pb-8 overflow-hidden text-[#0F172A]">
      {/* Soft ambient background glows */}
      <div className="absolute top-16 left-[5%] w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-28 right-[5%] w-[480px] h-[480px] rounded-full bg-indigo-50/50 blur-3xl pointer-events-none" />

      {/* ════════════════════════════════════════════════════════════════════════════════
          1. AWALAN HERO (Sesuai Referensi Gambar dengan Foto Cutout Tanpa Background)
         ════════════════════════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">

          {/* ─── LEFT COLUMN: Typography & Actions ─── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10">

            {/* Status Pill Badge: "🟢 ikuzooo" */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-xs font-semibold text-slate-700 mb-6 hover:shadow-md transition-shadow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>Savira</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-[68px] font-black tracking-[-0.035em] text-[#0F172A] leading-[1.05] mb-5">
              Halo, I'm <br />
              <span className="text-[#0F172A]">Kartika Nur</span> <br />
              <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#4F46E5] bg-clip-text text-transparent">
                Savira.
              </span>
            </h1>

            {/* Subtitle / Role with Amber Highlight Cursor */}
            <div className="flex items-center gap-1.5 mb-5 font-bold text-lg sm:text-xl text-[#D97706]">
              <span>{displayedRole || 'Data Science'}</span>
              <span className="inline-block w-2.5 h-5 sm:h-6 bg-[#D97706] rounded-[1px] animate-pulse" />
            </div>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
              Data Science, UI/UX, Web Development, Data Analyst, dan Machine Learning. Universitas Negeri Surabaya, Jawa Timur.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToProjects}
                className="px-6 py-3 rounded-full bg-[#3B66F5] hover:bg-[#2B54E0] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(59,102,245,0.32)] hover:shadow-[0_10px_24px_rgba(59,102,245,0.42)] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                View Work <ArrowUpRight size={14} />
              </button>

              <button
                onClick={scrollToContact}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-semibold text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all"
              >
                Contact Me
              </button>

            
            </div>
          </div>

          {/* ─── RIGHT COLUMN: 3D Torus, Transparent Cutout Photo & Floating Badges ─── */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-[480px] sm:min-h-[540px]">

            {/* 1. 3D Torus Wireframe SVG Background */}
            <TorusWireframe mouseX={mouse.x} mouseY={mouse.y} />

            {/* 2. Floating Isometric 3D Cube */}
            <IsometricCube />

            {/* 3. Floating Amber Spheres */}
            <div
              className="absolute -right-2 sm:right-6 top-16 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 shadow-[0_4px_16px_rgba(251,191,36,0.55)] pointer-events-none animate-float-slow z-[5]"
              style={{
                transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px)`,
              }}
            />
            <div
              className="absolute left-6 bottom-16 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-[0_2px_12px_rgba(251,191,36,0.45)] pointer-events-none animate-float-medium z-[5]"
              style={{
                transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)`,
              }}
            />
            <div
              className="absolute right-2 bottom-8 w-11 h-11 rounded-full bg-amber-300/30 blur-md pointer-events-none"
            />

            {/* 4. Central Cutout Photo (Transparent Background - Matches Reference Exactly) */}
            <div
              className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`,
              }}
            >
              <div
                className="relative w-[300px] sm:w-[350px] md:w-[390px] h-[400px] sm:h-[450px] md:h-[490px]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
                }}
              >
                <Image
                  src="/images/profile-nobg.png"
                  alt="Kartika Nur Savira"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_24px_38px_rgba(15,23,42,0.2)] select-none pointer-events-none"
                  sizes="(max-width: 768px) 320px, 400px"
                />
              </div>
            </div>

            {/* ─── 5. Floating Badge Pills Around Photo ─── */}

            {/* Badge A: "🎨 UI/UX" (Top Center / Left of Head) */}
            <div
              className="absolute top-4 left-10 sm:left-14 z-20 pointer-events-auto"
              style={{
                transform: `translate(${mouse.x * 14}px, ${mouse.y * 14}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:scale-105 transition-transform cursor-default">
                <span className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                  <Palette size={12} />
                </span>
                <span className="text-xs font-bold text-slate-800">UI/UX</span>
              </div>
            </div>

            {/* Badge B: "💻 Web Dev" (Top Right of Head) */}
            <div
              className="absolute top-16 right-0 sm:-right-4 z-20 pointer-events-auto"
              style={{
                transform: `translate(${mouse.x * -10}px, ${mouse.y * -10}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:scale-105 transition-transform cursor-default">
                <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                  <Code2 size={12} />
                </span>
                <span className="text-xs font-bold text-slate-800">Web Dev</span>
              </div>
            </div>

            {/* Badge C: "📊 Data Analyst" (Bottom Left of Photo) */}
            <div
              className="absolute bottom-16 -left-4 sm:left-2 z-20 pointer-events-auto"
              style={{
                transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform cursor-default">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <BarChart3 size={12} />
                </span>
                <span className="text-xs font-bold text-slate-800">Data Analyst</span>
              </div>
            </div>

            {/* Badge D: "⚙️ Backend" (Bottom Right of Photo) */}
            <div
              className="absolute bottom-8 right-2 sm:right-6 z-20 pointer-events-auto"
              style={{
                transform: `translate(${mouse.x * -12}px, ${mouse.y * -12}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform cursor-default">
                <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Database size={12} />
                </span>
                <span className="text-xs font-bold text-slate-800">Backend</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════════════════════════
          2. MARQUEE RUNNING TICKER
         ════════════════════════════════════════════════════════════════════════════════ */}
      <div className="w-full border-y border-slate-200/80 bg-[#E8F5FD]/85 backdrop-blur-sm py-3.5 overflow-hidden select-none">
        <div className="marquee-track flex w-max">
          <div className="flex items-center gap-8 shrink-0 pr-8 text-xs font-black text-[#1E3A8A] tracking-wider uppercase">
            {marqueeItems.map((item, idx) => (
              <span key={`m1-${idx}`} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] inline-block shrink-0 shadow-sm shadow-[#D97706]/40" />
              </span>
            ))}
          </div>
          <div className="flex items-center gap-8 shrink-0 pr-8 text-xs font-black text-[#1E3A8A] tracking-wider uppercase" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <span key={`m2-${idx}`} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] inline-block shrink-0 shadow-sm shadow-[#D97706]/40" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes marqueeContinuous {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeContinuous 24s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
