'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Sparkles, Download, ArrowUpRight } from 'lucide-react';
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

const typewriterTexts = [
  'data visualization',
  'machine learning',
  'thoughtful problem solving',
  'data engineering',
];

const journey = [
  {
    year: '2023',
    title: 'Started university journey',
    desc: 'Enrolled in Data Science at Universitas Negeri Surabaya',
  },
  {
    year: 'Foundation',
    title: 'Built core knowledge',
    desc: 'Statistics, programming, databases, analytics, and data visualization',
  },
  {
    year: 'Projects',
    title: 'Applied skills in practice',
    desc: 'Machine learning, computer vision, forecasting, and data engineering projects',
  },
  {
    year: 'Now',
    title: 'Growing professionally',
    desc: 'Building stronger real-world data skills and exploring professional opportunities',
  },
];

export default function About() {
  const { ref, inView } = useInView();
  const tiltProps = useTilt<HTMLDivElement>({ max: 6, scale: 1.01, speed: 500 });

  // Typewriter effect
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterTexts[typeIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTypeIndex((prev) => (prev + 1) % typewriterTexts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, typeIndex]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative bg-[#F8FAFD] py-24 md:py-32 overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      {/* Background ambient accents */}
      <div className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Section Header: Available Badge + Main Heading */}
        <div
          className={`mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#A8E6FF] shadow-sm">
            <Sparkles size={13} /> Available for internships &amp; projects
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#2483C5] uppercase mb-2">
                About Me
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F3A] leading-[1.08] tracking-tight">
                Hi, I&apos;m <em className="text-[#168AC2] not-italic">Kartika Nur Savira.</em>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-bold text-[#0B1F3A]">
              <span className="rounded-full border border-[#0B1F3A]/20 bg-white/70 px-4 py-1.5 shadow-sm">
                Data Science Undergraduate
              </span>
              <span className="rounded-full border border-[#0B1F3A]/20 bg-white/70 px-4 py-1.5 shadow-sm">
                AI &amp; ML Enthusiast
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Unified Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ─── Left Column: 3D Interactive Card + Action Buttons ─── */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative mx-auto max-w-sm" {...tiltProps}>
              {/* Photo Card with Transparent Cutout and Dot Grid */}
              <div className="relative aspect-[4/5] rounded-[28px] bg-gradient-to-br from-[#168AC2] via-[#0E4B77] to-[#0B1F3A] overflow-hidden flex items-end justify-center shadow-2xl border-[3.5px] border-white/90">
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                <Image
                  src="/images/profile-nobg.png"
                  alt="Kartika Nur Savira"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] select-none pointer-events-none"
                  sizes="(max-width: 768px) 320px, 420px"
                />

                {/* Bottom Left Sticker: Data Science */}
                <div className="absolute bottom-5 left-5 rounded-full bg-white/95 backdrop-blur-md px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0B1F3A] shadow-lg z-10">
                  Data Science
                </div>

                {/* Bottom Right Sticker: ANALYZE · BUILD · SHARE */}
                <div className="absolute bottom-5 right-5 rounded-full bg-[#0B1F3A]/90 border border-white/30 backdrop-blur-md px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[#A8E6FF] shadow-lg z-10">
                  UNESA
                </div>
              </div>

              {/* Top Floating badge */}
              <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-2xl bg-[#0B1F3A] px-4 py-2.5 shadow-xl border border-white/10 animate-float-slow z-20">
                <Sparkles size={16} className="text-[#6FC7F1]" />
                <div>
                  <p className="text-white text-xs font-bold leading-tight">Curious</p>
                  <p className="text-white/60 text-[10px] leading-tight">by nature</p>
                </div>
              </div>

              {/* Decorative Sticker: ANALYZE · BUILD · SHARE */}
              <div className="absolute -bottom-3.5 -left-3 rounded-full bg-[#168AC2] border-2 border-white px-3.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg rotate-[-4deg] z-20">
                ANALYZE · BUILD · SHARE
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#168AC2] hover:shadow-lg hover:shadow-[#168AC2]/25 active:scale-[0.98]"
              >
                View work{' '}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="/cv-kartika-nur-savira.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0B1F3A] bg-white/70 px-6 py-3 text-sm font-bold text-[#0B1F3A] transition hover:bg-white hover:shadow-lg active:scale-[0.98]"
              >
                <Download size={15} /> Download CV
              </a>
            </div>
          </div>

          {/* ─── Right Column: Story, Typewriter, Traits & Timeline ─── */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Dynamic Typewriter Insight Statement */}
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm mb-6">
              <p className="text-base sm:text-lg font-bold text-[#0B1F3A] leading-relaxed">
                Turning curiosity into practical insights through{' '}
                <span className="text-[#168AC2] underline decoration-wavy decoration-[#168AC2]/40">
                  {displayed}
                </span>
                <span className="inline-block w-2 h-5 bg-[#168AC2] ml-1.5 rounded-[1px] animate-pulse align-middle" />
              </p>
            </div>

            {/* In-depth Story */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                I&apos;m a Data Science student at Universitas Negeri Surabaya who enjoys working at the intersection of data,
                technology, and visual storytelling.
              </p>
              <p>
                My academic and project experience has exposed me to data analysis, machine
                learning, clustering, predictive modeling, data visualization, database systems,
                computer vision, and cloud technologies.
              </p>
              <p className="text-slate-600">
                I enjoy the process of turning raw datasets into patterns, insights, and practical
                solutions — transforming complexity into clarity.
              </p>
            </div>

            {/* Personality / Approach Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Analytical', 'Curious', 'Detail-oriented', 'Project builder', 'Data-driven'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#168AC2]/10 text-[#168AC2] border border-[#168AC2]/20 hover:bg-[#168AC2]/20 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Mini Timeline Journey */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-4">
              {journey.map((step, i) => (
                <div
                  key={step.year}
                  className={`flex gap-4 transition-all duration-500 ${
                    inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <span className="flex-shrink-0 w-20 text-[10px] font-bold text-[#168AC2] tracking-wider uppercase pt-0.5">
                    {step.year}
                  </span>
                  <div className="relative flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[#168AC2] bg-white mt-1.5" />
                    {inView && (
                      <div
                        className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#168AC2]/40 mt-1.5 animate-pulse-dot"
                        style={{ animationDelay: `${i * 300}ms` }}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#0B1F3A] text-sm">{step.title}</p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
