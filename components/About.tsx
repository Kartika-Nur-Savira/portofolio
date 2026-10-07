'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── 3D Particle / Dot Wave Mesh Background (Matches Reference Image) ───
function DotWaveBackground() {
  const dots = useMemo(() => {
    const items: { cx: number; cy: number; r: number; color: string; opacity: number }[] = [];
    const numCurves = 22;
    const dotsPerCurve = 34;

    for (let c = 0; c < numCurves; c++) {
      const curveFactor = c / numCurves;
      // Interpolate color from deep purple to vibrant cyan
      const isPurple = curveFactor < 0.55;
      const color = isPurple ? (c % 2 === 0 ? '#7C3AED' : '#9333EA') : (c % 2 === 0 ? '#06B6D4' : '#38BDF8');

      for (let d = 0; d < dotsPerCurve; d++) {
        const t = d / dotsPerCurve;
        
        // Curved parametric streamline flowing from top-center/right to bottom-center
        const x = 440 + c * 24 - t * 480 + Math.sin(t * Math.PI) * 110;
        const y = 20 + t * 440 + Math.sin(c * 0.4 + t * 2.5) * 45;
        
        // Radii variation
        const distFromCenter = Math.abs(t - 0.5) * 2;
        const baseR = 1.2 + (1 - distFromCenter) * 1.6 + (c % 3 === 0 ? 0.8 : 0);
        const opacity = 0.2 + (1 - distFromCenter * 0.4) * 0.65;

        items.push({
          cx: x,
          cy: y,
          r: Math.max(1, baseR),
          color,
          opacity,
        });
      }
    }

    // Add some larger ambient floating dots (like in reference screenshot)
    const ambientDots = [
      { cx: 880, cy: 90, r: 5, color: '#38BDF8', opacity: 0.65 },
      { cx: 930, cy: 140, r: 6, color: '#38BDF8', opacity: 0.5 },
      { cx: 960, cy: 260, r: 7, color: '#38BDF8', opacity: 0.55 },
      { cx: 940, cy: 340, r: 8, color: '#38BDF8', opacity: 0.6 },
      { cx: 890, cy: 400, r: 9, color: '#38BDF8', opacity: 0.65 },
      { cx: 830, cy: 460, r: 7, color: '#38BDF8', opacity: 0.6 },
      { cx: 770, cy: 500, r: 6, color: '#38BDF8', opacity: 0.5 },
      { cx: 680, cy: 530, r: 5, color: '#38BDF8', opacity: 0.5 },
      { cx: 580, cy: 560, r: 6, color: '#38BDF8', opacity: 0.55 },
      { cx: 480, cy: 580, r: 7, color: '#38BDF8', opacity: 0.6 },
      { cx: 80, cy: 200, r: 4, color: '#A78BFA', opacity: 0.4 },
      { cx: 120, cy: 480, r: 5, color: '#67E8F9', opacity: 0.45 },
    ];

    return [...items, ...ambientDots];
  }, []);

  return (
    <svg
      viewBox="0 0 1000 620"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-visible opacity-80"
      aria-hidden="true"
    >
      {dots.map((dot, idx) => (
        <circle
          key={idx}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={dot.color}
          fillOpacity={dot.opacity}
        />
      ))}
    </svg>
  );
}

export default function About() {
  const { ref, inView } = useInView();
  const tiltProps = useTilt<HTMLDivElement>({ max: 6, scale: 1.015, speed: 450 });

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative bg-[#F5F2F9] py-24 md:py-32 overflow-hidden text-[#1E1136]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* ─── Dynamic 3D Dot Wave Curved Mesh ─── */}
      <DotWaveBackground />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: Badge, Title, Badges, Expanded Bio, Buttons ─── */}
          <div
            className={`lg:col-span-7 flex flex-col items-start transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* 1. Status Pill Badge: "Available for Internships & Projects" */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A0E47] text-[#EDE9FE] text-xs font-bold shadow-md mb-6 hover:bg-[#38145E] transition-colors">
              <Sparkles size={13} className="text-[#C084FC]" />
              <span>Available for Internships &amp; Projects</span>
            </div>

            {/* 2. Main Title: Editorial Serif / Italic (Exact Match to Fio Octriyanti reference) */}
            <h2 className="text-5xl sm:text-6xl md:text-[64px] font-black tracking-tight leading-[1.06] text-[#240C3F] font-serif italic mb-6">
              Hi, I&apos;m <span className="text-[#3A1466]">Kartika</span> <br />
              <span className="text-[#4C1D95]">Nur Savira</span>
            </h2>

            {/* 3. Role Badges: Dark plum rounded pills */}
            <div className="flex flex-wrap gap-2.5 mb-7">
              <span className="px-4 py-1.5 rounded-full bg-[#2A0E47] text-white text-xs font-semibold shadow-sm">
                Data Science Undergraduate
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#2A0E47] text-white text-xs font-semibold shadow-sm">
                AI &amp; ML Enthusiast
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#2A0E47] text-white text-xs font-semibold shadow-sm">
                Data Analyst
              </span>
            </div>

            {/* 4. Expanded Self-Description ("bagian deskripsi dirinya ditambahin") */}
            <div className="space-y-3.5 text-[#2D164D]/90 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-normal">
              <p>
                Data Science undergraduate at Universitas Negeri Surabaya. Aspiring Data Analyst &amp; Machine Learning practitioner passionate about uncovering actionable insights through exploratory data analysis, predictive modeling, and thoughtful data storytelling.
              </p>
              <p>
                Experienced in building end-to-end analytics pipelines — from structured querying in SQL, cleaning and statistical modeling in Python, to developing interactive dashboards that translate complex datasets into clear, intuitive decisions.
              </p>
              <p className="text-[#4C1D95]/85 text-xs sm:text-sm font-medium">
                Always curious about exploring new algorithms, cloud architectures, and leveraging intelligent data solutions to solve impactful real-world challenges.
              </p>
            </div>

            {/* 5. Action Buttons (View Work & Download CV) */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Button 1: "View Work →" */}
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2A0E47] hover:bg-[#3D1466] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(42,14,71,0.25)] hover:shadow-[0_12px_24px_rgba(42,14,71,0.35)] active:scale-[0.98] transition-all"
              >
                View Work <ArrowRight size={16} />
              </button>

              {/* Button 2: "Download CV ⤓" */}
              <a
                href="/cv-kartika-nur-savira.pdf"
                download
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border-2 border-[#2A0E47] text-[#2A0E47] font-semibold text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all"
              >
                Download CV <Download size={15} />
              </a>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Framed Photo Card on Top of Dot Wave Mesh ─── */}
          <div
            className={`lg:col-span-5 flex items-center justify-center transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative w-full max-w-[390px] sm:max-w-[430px]" {...tiltProps}>
              
              {/* Framed Photo Card with Delicate Glowing Border (Matches Screenshot) */}
              <div className="relative aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(42,14,71,0.22)] border-4 border-white/95 bg-gradient-to-br from-[#2A0E47] via-[#431B75] to-[#1E0B36] transition-transform duration-300">
                
                {/* Subtle ambient lighting inside card */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none z-10" />
                
                {/* Photo: High-Res Clean Cutout of Kartika */}
                <Image
                  src="/images/profile-nobg.png"
                  alt="Kartika Nur Savira"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] select-none pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 360px, 440px"
                />

                {/* Bottom Left Badge: Data Science */}
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2A0E47] shadow-md z-20">
                  Data Science
                </div>

                {/* Bottom Right Badge: UNESA */}
                <div className="absolute bottom-4 right-4 rounded-full bg-[#2A0E47]/90 border border-white/30 backdrop-blur-md px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-[#EDE9FE] shadow-md z-20">
                  UNESA
                </div>
              </div>

              {/* Floating Ambient Glow Behind Card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-purple-500/20 via-cyan-400/20 to-purple-700/20 rounded-[34px] blur-xl -z-10 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
