'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Download, Sparkles, BarChart3, Database } from 'lucide-react';
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

// ─── Clean Ambient Background (Ensures 100% Text Legibility) ───
function AboutBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10" aria-hidden="true">
      {/* 1. Subtle Architectural Micro-Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0B1F3A_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035]" />

      {/* 2. Soft Ambient Blurred Aurora Lights (Right & Corners) */}
      <div className="absolute -top-24 -right-24 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-[#38BDF8]/20 via-[#168AC2]/15 to-transparent blur-[110px] animate-float-slow" />
      <div className="absolute -bottom-24 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#168AC2]/20 via-sky-200/25 to-transparent blur-[100px] animate-float-medium" />
      <div className="absolute top-1/3 -left-32 w-[380px] h-[380px] rounded-full bg-sky-100/40 blur-[90px] pointer-events-none" />
    </div>
  );
}

// ─── 3D Orbital Tech Rings (Positioned Behind Photo Card on Right) ───
function OrbitalTechRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 select-none overflow-visible">
      {/* Outer Rotating Dashed Orbit */}
      <svg
        viewBox="0 0 560 560"
        className="w-[500px] h-[500px] sm:w-[560px] sm:h-[560px] animate-[spin_55s_linear_infinite] opacity-60"
        aria-hidden="true"
      >
        <circle
          cx="280"
          cy="280"
          r="255"
          fill="none"
          stroke="#168AC2"
          strokeWidth="1.2"
          strokeDasharray="6 14"
          strokeOpacity="0.45"
        />
        {/* Orbital Satellite Dots */}
        <circle cx="280" cy="25" r="4.5" fill="#38BDF8" className="animate-pulse" />
        <circle cx="280" cy="535" r="3" fill="#168AC2" />
        <circle cx="25" cy="280" r="3.5" fill="#0284C7" />
        <circle cx="535" cy="280" r="4" fill="#38BDF8" />
      </svg>

      {/* Middle Counter-Rotating Data Arc Ring */}
      <svg
        viewBox="0 0 460 460"
        className="absolute w-[420px] h-[420px] sm:w-[460px] sm:h-[460px] animate-[spin_38s_linear_infinite_reverse] opacity-75"
        aria-hidden="true"
      >
        <circle
          cx="230"
          cy="230"
          r="200"
          fill="none"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeDasharray="24 36 8 16"
          strokeOpacity="0.5"
        />
        <circle cx="430" cy="230" r="4" fill="#38BDF8" />
        <circle cx="30" cy="230" r="3" fill="#0EA5E9" />
      </svg>

      {/* Inner Subtle Rotating Ring */}
      <svg
        viewBox="0 0 380 380"
        className="absolute w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] animate-[spin_24s_linear_infinite] opacity-50"
        aria-hidden="true"
      >
        <circle
          cx="190"
          cy="190"
          r="165"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1"
          strokeDasharray="4 10"
          strokeOpacity="0.55"
        />
      </svg>
    </div>
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
      className="relative bg-gradient-to-b from-[#F0F7FB] via-[#F8FBFE] to-[#F0F7FB] py-24 md:py-32 overflow-hidden text-[#0B1F3A]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* ─── Clean Ambient Background (Zero Clutter on Text) ─── */}
      <AboutBackground />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: Framed Photo Card with Orbital Tech Rings & Floating Pills ─── */}
          <div
            className={`lg:col-span-5 flex items-center justify-center transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative w-full max-w-[390px] sm:max-w-[430px]" {...tiltProps}>
              
              {/* 1. Animated Tech Orbitals (Behind Card Only) */}
              <OrbitalTechRings />

              {/* 2. Floating Interactive Badges Around Photo Card */}
              {/* Badge Top-Left: Data Analytics */}
              <div className="absolute -top-3 -left-4 sm:-left-6 z-30 animate-float-slow">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_8px_20px_rgba(11,31,58,0.12)] text-xs font-bold text-[#0B1F3A] hover:scale-105 transition-transform cursor-default">
                  <span className="w-2 h-2 rounded-full bg-[#168AC2] animate-ping inline-block" />
                  <BarChart3 size={13} className="text-[#168AC2]" />
                  <span>Data Analytics</span>
                </div>
              </div>

              {/* Badge Bottom-Right: SQL & Python */}
              <div className="absolute -bottom-3 -right-3 sm:-right-5 z-30 animate-float-medium">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_8px_20px_rgba(11,31,58,0.12)] text-xs font-bold text-[#0B1F3A] hover:scale-105 transition-transform cursor-default">
                  <Database size={13} className="text-[#0284C7]" />
                  <span>SQL &amp; Python</span>
                </div>
              </div>

              {/* 3. Framed Photo Card with Crisp White Border and Soft Blue Shadow */}
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

              {/* 4. Floating Ambient Glow Behind Card (Blue & Cyan Glow) */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#168AC2]/30 via-sky-400/25 to-[#0B1F3A]/25 rounded-[34px] blur-2xl -z-20 pointer-events-none animate-pulse" />
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Unobstructed Typography & Description ─── */}
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
              <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">
                Nur Savira
              </span>
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

            {/* 4. Expanded Self-Description (Completely Clear, High-Contrast & Readable) */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-normal">
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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0B1F3A] via-[#102A4C] to-[#1E3A8A] hover:from-[#102A4C] hover:to-[#2563EB] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(11,31,58,0.25)] hover:shadow-[0_12px_24px_rgba(11,31,58,0.35)] active:scale-[0.98] transition-all"
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

        </div>
      </div>
    </section>
  );
}
