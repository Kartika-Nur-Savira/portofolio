'use client';

import { useEffect, useRef, useState } from 'react';
import { achievements, certifications, coursework } from '@/data/certifications';
import { Trophy, Award, GraduationCap, Sparkles, Download, CheckCircle2 } from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Education() {
  const { ref, inView } = useInView();

  return (
    <section
      id="education"
      className="relative bg-[#F4F9FE] py-24 sm:py-28 overflow-hidden select-none"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* ─── Header ─── */}
        <div
          className={`mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-bold text-[#0B1F3A] mb-3">
            <Sparkles size={12} className="text-[#168AC2]" />
            <span>Academic &amp; Honors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] leading-tight tracking-tight">
            Education &amp;{' '}
            <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ─── LEFT: Formal University Education ─── */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="bg-white rounded-3xl p-7 border border-slate-200/85 shadow-[0_8px_30px_rgba(11,31,58,0.04)] h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] flex items-center justify-center text-white shrink-0 shadow-md">
                  <GraduationCap size={22} className="text-[#38BDF8]" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-50 text-[10px] font-bold text-[#0284C7] uppercase tracking-wider mb-1">
                    Formal Degree
                  </span>
                  <h3 className="font-extrabold text-[#0B1F3A] text-lg sm:text-xl leading-tight">
                    Universitas Negeri Surabaya
                  </h3>
                  <p className="text-[#168AC2] font-semibold text-sm mt-0.5">
                    Bachelor&apos;s in Data Science
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Surabaya, Indonesia · 2023 – Present</p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3">
                  Key Coursework
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {coursework.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* CV Download CTA Card */}
              <div className="mt-8 bg-gradient-to-br from-[#0B1F3A] via-[#102A4C] to-[#1E3A8A] rounded-2xl p-6 text-white shadow-lg">
                <h4 className="font-bold text-base mb-1.5">Curriculum Vitae</h4>
                <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                  Download my full CV for a complete record of projects, credentials, and achievements.
                </p>
                <a
                  href="/cv-kartika-nur-savira.pdf"
                  download
                  className="inline-flex items-center gap-2 text-xs font-semibold bg-white text-[#0B1F3A] hover:bg-sky-50 px-5 py-2.5 rounded-full transition-colors shadow-sm"
                >
                  <Download size={14} /> Download CV
                </a>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Competitions & Achievements ─── */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                Competition Achievements &amp; Awards
              </p>
              <span className="text-xs font-bold text-[#168AC2]">2026</span>
            </div>

            <div className="space-y-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/85 shadow-[0_4px_20px_rgba(11,31,58,0.04)] hover:shadow-[0_10px_30px_rgba(11,31,58,0.08)] hover:border-[#168AC2]/40 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {ach.id === 'data-craft-league' ? (
                          <Trophy size={19} className="text-amber-500" />
                        ) : (
                          <Award size={19} className="text-blue-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">
                            {ach.award}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">•</span>
                          <span className="text-xs font-bold text-[#168AC2]">{ach.year}</span>
                        </div>
                        <h4 className="font-extrabold text-[#0B1F3A] text-base sm:text-lg leading-snug">
                          {ach.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 mb-2.5 pl-13">
                    {ach.event} <span className="text-slate-300">|</span> {ach.organizer}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13 mb-3.5">
                    {ach.description}
                  </p>

                  <div className="pl-13 flex flex-wrap gap-1.5">
                    {ach.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200/70 text-[10px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Cohort Certification Card */}
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 flex items-center justify-between gap-3 shadow-sm hover:border-[#168AC2]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0">
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-[#0B1F3A] text-sm">{cert.name}</p>
                      <p className="text-xs text-slate-500">{cert.issuer}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 whitespace-nowrap">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
