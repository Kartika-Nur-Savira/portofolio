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

// ─── 3D Particle / Dot Wave Mesh Background (Animated 60 FPS Canvas) ───
function DotWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let isVisible = true;

    // Handle Resize & Retina DPI
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause loop when scrolled out of view (saves battery/CPU)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const numCurves = 24;
    const dotsPerCurve = 36;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.024;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Coordinate scaling base (virtual 1000x620 coordinate space)
      const scaleX = width / 1000;
      const scaleY = height / 620;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw parametric undulating stream curves (Waves in Blue & Cyan)
      for (let c = 0; c < numCurves; c++) {
        const curveFactor = c / numCurves;
        const isDeepBlue = curveFactor < 0.55;
        const color = isDeepBlue
          ? (c % 2 === 0 ? '#168AC2' : '#0284C7')
          : (c % 2 === 0 ? '#0EA5E9' : '#38BDF8');

        for (let d = 0; d < dotsPerCurve; d++) {
          const t = d / dotsPerCurve;
          
          // Fluid harmonic undulation math
          const wavePhase = t * 4.8 - time * 1.6 + c * 0.24;
          const waveOffsetY = Math.sin(wavePhase) * 18 + Math.cos(c * 0.35 + time * 1.1) * 9;
          const waveOffsetX = Math.sin(t * 3.4 + time * 1.2 + c * 0.2) * 8;

          // Parametric curve anchor
          const baseX = 440 + c * 24 - t * 480 + Math.sin(t * Math.PI) * 110;
          const baseY = 25 + t * 440 + Math.sin(c * 0.4 + t * 2.5) * 45;

          const x = (baseX + waveOffsetX) * scaleX;
          const y = (baseY + waveOffsetY) * scaleY;

          // Radii and opacity pulsation
          const distFromCenter = Math.abs(t - 0.5) * 2;
          const pulse = Math.sin(wavePhase * 1.1) * 0.35;
          const baseR = (1.3 + (1 - distFromCenter) * 1.7 + (c % 3 === 0 ? 0.7 : 0) + pulse) * Math.min(scaleX, scaleY);
          const opacity = Math.max(
            0.12,
            Math.min(0.85, 0.28 + (1 - distFromCenter * 0.4) * 0.52 + Math.cos(wavePhase) * 0.12)
          );

          ctx.beginPath();
          ctx.arc(x, y, Math.max(1, baseR), 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
      }

      // 2. Draw ambient floating orbs
      const ambientDots = [
        { cx: 880, cy: 90, r: 5, color: '#38BDF8', speed: 1.1, phase: 0 },
        { cx: 930, cy: 140, r: 6, color: '#38BDF8', speed: 0.9, phase: 1.2 },
        { cx: 960, cy: 260, r: 7, color: '#38BDF8', speed: 1.3, phase: 2.1 },
        { cx: 940, cy: 340, r: 8, color: '#38BDF8', speed: 0.8, phase: 3.5 },
        { cx: 890, cy: 400, r: 8.5, color: '#38BDF8', speed: 1.0, phase: 4.2 },
        { cx: 830, cy: 460, r: 7, color: '#38BDF8', speed: 1.2, phase: 5.1 },
        { cx: 770, cy: 500, r: 6, color: '#38BDF8', speed: 0.9, phase: 0.7 },
        { cx: 680, cy: 530, r: 5, color: '#38BDF8', speed: 1.1, phase: 1.8 },
        { cx: 580, cy: 560, r: 6, color: '#38BDF8', speed: 1.4, phase: 2.9 },
        { cx: 480, cy: 580, r: 6.5, color: '#38BDF8', speed: 0.7, phase: 4.0 },
        { cx: 80, cy: 200, r: 4.5, color: '#7DD3FC', speed: 1.0, phase: 3.1 },
        { cx: 120, cy: 480, r: 5, color: '#38BDF8', speed: 1.2, phase: 2.4 },
      ];

      for (const dot of ambientDots) {
        const floatY = Math.sin(time * dot.speed + dot.phase) * 14;
        const floatX = Math.cos(time * dot.speed * 0.7 + dot.phase) * 8;
        const x = (dot.cx + floatX) * scaleX;
        const y = (dot.cy + floatY) * scaleY;
        const r = dot.r * Math.min(scaleX, scaleY);

        ctx.beginPath();
        ctx.arc(x, y, Math.max(2, r), 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = 0.55 + Math.sin(time * dot.speed) * 0.2;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
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
      className="relative bg-[#F0F7FB] py-24 md:py-32 overflow-hidden text-[#0B1F3A]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* ─── Dynamic 3D Dot Wave Curved Mesh (Blue / Cyan) ─── */}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1F3A] text-[#E0F2FE] text-xs font-bold shadow-md mb-6 hover:bg-[#168AC2] transition-colors">
              <Sparkles size={13} className="text-[#38BDF8]" />
              <span>Available for Internships &amp; Projects</span>
            </div>

            {/* 2. Main Title: Editorial Serif / Italic (Blue / Navy Brand Palette) */}
            <h2 className="text-5xl sm:text-6xl md:text-[64px] font-black tracking-tight leading-[1.06] text-[#0B1F3A] font-serif italic mb-6">
              Hi, I&apos;m <span className="text-[#0B1F3A]">Kartika</span> <br />
              <span className="text-[#168AC2]">Nur Savira</span>
            </h2>

            {/* 3. Role Badges: Navy rounded pills */}
            <div className="flex flex-wrap gap-2.5 mb-7">
              <span className="px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-xs font-semibold shadow-sm hover:bg-[#168AC2] transition-colors">
                Data Science Undergraduate
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-xs font-semibold shadow-sm hover:bg-[#168AC2] transition-colors">
                AI &amp; ML Enthusiast
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-xs font-semibold shadow-sm hover:bg-[#168AC2] transition-colors">
                Data Analyst
              </span>
            </div>

            {/* 4. Expanded Self-Description */}
            <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-normal">
              <p>
                Data Science undergraduate at Universitas Negeri Surabaya. Aspiring Data Analyst &amp; Machine Learning practitioner passionate about uncovering actionable insights through exploratory data analysis, predictive modeling, and thoughtful data storytelling.
              </p>
              <p>
                Experienced in building end-to-end analytics pipelines — from structured querying in SQL, cleaning and statistical modeling in Python, to developing interactive dashboards that translate complex datasets into clear, intuitive decisions.
              </p>
              <p className="text-[#168AC2] text-xs sm:text-sm font-semibold">
                Always curious about exploring new algorithms, cloud architectures, and leveraging intelligent data solutions to solve impactful real-world challenges.
              </p>
            </div>

            {/* 5. Action Buttons (View Work & Download CV) */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Button 1: "View Work →" */}
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B1F3A] hover:bg-[#168AC2] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(11,31,58,0.22)] hover:shadow-[0_12px_24px_rgba(22,138,194,0.3)] active:scale-[0.98] transition-all"
              >
                View Work <ArrowRight size={16} />
              </button>

              {/* Button 2: "Download CV ⤓" */}
              <a
                href="/cv-kartika-nur-savira.pdf"
                download
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border-2 border-[#0B1F3A] text-[#0B1F3A] hover:text-[#168AC2] hover:border-[#168AC2] font-semibold text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all"
              >
                Download CV <Download size={15} />
              </a>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Framed Photo Card with Background Kept Intact ─── */}
          <div
            className={`lg:col-span-5 flex items-center justify-center transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative w-full max-w-[390px] sm:max-w-[430px]" {...tiltProps}>
              
              {/* Framed Photo Card with Crisp White Border and Soft Blue Shadow */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(11,31,58,0.18)] border-4 border-white bg-slate-100 transition-transform duration-300">
                
                {/* Subtle gradient vignette at bottom so badges stand out with clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none z-10" />
                
                {/* Photo: High-Res Cafe Portrait with Original Background Intact */}
                <Image
                  src="/images/profile-cafe.jpg"
                  alt="Kartika Nur Savira"
                  fill
                  priority
                  className="object-cover object-[50%_32%] select-none transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 360px, 440px"
                />

                {/* Bottom Left Badge: Data Science */}
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] shadow-md z-20">
                  Data Science
                </div>

                {/* Bottom Right Badge: UNESA */}
                <div className="absolute bottom-4 right-4 rounded-full bg-[#0B1F3A]/90 border border-white/20 backdrop-blur-md px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-[#E0F2FE] shadow-md z-20">
                  UNESA
                </div>
              </div>

              {/* Floating Ambient Glow Behind Card (Blue & Cyan Glow) */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#168AC2]/30 via-sky-400/25 to-[#0B1F3A]/25 rounded-[34px] blur-xl -z-10 pointer-events-none animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
