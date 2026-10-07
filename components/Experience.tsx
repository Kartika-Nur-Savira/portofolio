'use client';

import { useRef, useEffect, useState } from 'react';
import { experiences } from '@/data/experience';
import { Sparkles, Briefcase, Users, HeartHandshake, Calendar } from 'lucide-react';

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

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      className="relative bg-gradient-to-b from-[#F4F9FE] via-[#F8FBFE] to-[#F4F9FE] py-20 sm:py-24 overflow-hidden select-none"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* ─── Compact Section Header ─── */}
        <div
          className={`mb-10 text-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-bold text-[#0B1F3A] mb-3">
            <Sparkles size={12} className="text-[#168AC2]" />
            <span>Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Work &amp;{' '}
            <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">
              Involvement
            </span>
          </h2>
        </div>

        {/* ─── Concise Experience Cards List ─── */}
        <div className="space-y-4">
          {experiences.map((exp, idx) => {
            const Icon =
              exp.type === 'work'
                ? Briefcase
                : exp.type === 'community'
                ? HeartHandshake
                : Users;

            return (
              <div
                key={exp.id}
                className={`p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/85 shadow-[0_4px_16px_rgba(11,31,58,0.04)] hover:shadow-[0_8px_24px_rgba(11,31,58,0.08)] hover:border-[#168AC2]/40 transition-all duration-300 delay-${
                  idx * 100
                } ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {/* Header: Title, Org, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0B1F3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={17} className="text-[#168AC2]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] leading-snug">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-0.5">
                        <span className="text-[#168AC2]">{exp.organization}</span>
                        <span>•</span>
                        <span className="text-slate-400">{exp.typeLabel}</span>
                      </div>
                    </div>
                  </div>

                  <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-bold text-slate-600 whitespace-nowrap">
                    <Calendar size={11} className="text-[#168AC2]" />
                    {exp.period}
                  </span>
                </div>

                {/* Concise Bullets */}
                <ul className="space-y-1.5 pl-12 mb-3.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-xs sm:text-sm text-slate-600 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#168AC2] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="pl-12 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200/70 text-[10px] sm:text-[11px] font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
