'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Download, Sparkles } from 'lucide-react';
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

export default function About() {
  const { ref, inView } = useInView();
  const tiltProps = useTilt<HTMLDivElement>({ max: 5, scale: 1.01, speed: 400 });

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative bg-[#F8FAFD] py-20 md:py-24 overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ─── Left: Clean Photo Card ─── */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative mx-auto max-w-[320px]" {...tiltProps}>
              <div className="relative aspect-[4/5] rounded-[24px] bg-gradient-to-br from-[#168AC2] via-[#0E4B77] to-[#0B1F3A] overflow-hidden flex items-end justify-center shadow-xl border-[3px] border-white/90">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                <Image
                  src="/images/profile-nobg.png"
                  alt="Kartika Nur Savira"
                  fill
                  className="object-contain object-bottom drop-shadow-xl select-none pointer-events-none"
                  sizes="(max-width: 768px) 300px, 340px"
                />

                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] shadow-md z-10">
                  Data Science
                </div>
              </div>

              {/* Floating subtle badge */}
              <div className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-[#0B1F3A] px-3.5 py-1.5 shadow-lg border border-white/10 z-20">
                <Sparkles size={13} className="text-[#6FC7F1]" />
                <span className="text-white text-[11px] font-semibold">UNESA</span>
              </div>
            </div>
          </div>

          {/* ─── Right: Simple & Clean Content ─── */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-xs font-bold tracking-widest text-[#168AC2] uppercase mb-2">
              About Me
            </p>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] leading-tight mb-5">
              Turning data into <span className="text-[#168AC2]">practical insights.</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              <p>
                Saya mahasiswa Data Science di Universitas Negeri Surabaya yang tertarik pada machine learning, analisis data, dan visualisasi informasi.
              </p>
              <p>
                Fokus saya adalah mengubah kumpulan data mentah menjadi wawasan yang bermakna, akurat, dan dapat diterapkan untuk menyelesaikan permasalahan nyata.
              </p>
            </div>

            {/* Simple Core Pillars */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Machine Learning', 'Data Analysis', 'Python & SQL', 'Data Visualization'].map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1 rounded-full bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#168AC2] shadow-sm hover:shadow active:scale-[0.98]"
              >
                Lihat proyek <ArrowUpRight size={15} />
              </button>

              <a
                href="/cv-kartika-nur-savira.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 shadow-sm active:scale-[0.98]"
              >
                <Download size={15} /> Unduh CV
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
