'use client';

import { useRef, useEffect, useState } from 'react';
import { experiences } from '@/data/experience';
import {
  Briefcase,
  Users,
  HeartHandshake,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';

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

  const workExp = experiences.find((e) => e.type === 'work');
  const orgExps = experiences.filter((e) => e.type !== 'work');

  return (
    <section
      id="experience"
      className="relative bg-gradient-to-b from-[#F4F9FE] via-[#F8FBFE] to-[#F4F9FE] py-28 overflow-hidden select-none"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Ambient background soft glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-sky-200/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-200/25 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* ─── Header ─── */}
        <div
          className={`mb-14 text-center max-w-2xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-xs font-bold text-[#0B1F3A] mb-4">
            <Sparkles size={13} className="text-[#168AC2]" />
            <span>Career &amp; Involvement</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.15] mb-4">
            Professional Experience &amp;{' '}
            <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">
              Leadership
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Data analytical practice at national statistical institutions combined with active student leadership and community service.
          </p>
        </div>

        {/* ─── 1. Featured Work Experience (BPS Kota Pekalongan) ─── */}
        {workExp && (
          <div
            className={`mb-8 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-9 shadow-[0_10px_35px_rgba(11,31,58,0.06)] hover:shadow-[0_16px_45px_rgba(11,31,58,0.1)] hover:border-[#168AC2]/40 transition-all duration-300">
              
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#2563EB] rounded-t-full" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white flex items-center justify-center p-3 shadow-md shrink-0">
                    <Briefcase size={22} className="text-[#38BDF8]" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200/70 text-[11px] font-bold text-[#0284C7] uppercase tracking-wider">
                        {workExp.typeLabel}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[11px] font-bold text-emerald-700">
                        Completed
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                      {workExp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 mt-1">
                      <span className="flex items-center gap-1.5 text-[#168AC2]">
                        <Building2 size={14} />
                        {workExp.organization}
                      </span>
                      {workExp.location && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin size={13} />
                          {workExp.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Period Badge */}
                <div className="self-start lg:self-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-[#0B1F3A]">
                    <Calendar size={13} className="text-[#168AC2]" />
                    <span>{workExp.period}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-7 pl-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Responsibilities &amp; Impact
                </p>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {workExp.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-sky-50/40 hover:border-sky-100 transition-colors"
                    >
                      <CheckCircle2 size={16} className="text-[#168AC2] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill / Domain Tags */}
              {workExp.tags && (
                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                    Domains:
                  </span>
                  {workExp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200/90 text-xs font-semibold text-[#0B1F3A] shadow-sm hover:border-[#168AC2]/60 hover:text-[#168AC2] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* ─── 2. Organization & Community Involvements (2 Columns) ─── */}
        <div className="grid md:grid-cols-2 gap-8">
          {orgExps.map((exp, idx) => {
            const isCommunity = exp.type === 'community';
            const Icon = isCommunity ? HeartHandshake : Users;
            const iconBg = isCommunity ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600';

            return (
              <div
                key={exp.id}
                className={`rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 shadow-[0_8px_30px_rgba(11,31,58,0.05)] hover:shadow-[0_14px_40px_rgba(11,31,58,0.09)] hover:border-[#168AC2]/40 transition-all duration-300 flex flex-col justify-between delay-${(idx + 2) * 100} ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div>
                  {/* Top Bar: Icon, Role & Period */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center p-2.5 shrink-0 shadow-sm`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          {exp.typeLabel}
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-[#0B1F3A] leading-snug">
                          {exp.role}
                        </h4>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-bold text-slate-700 whitespace-nowrap">
                      <Calendar size={12} className="text-[#168AC2]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Organization & Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 mb-5 pb-4 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-[#168AC2]">
                      <Building2 size={13} />
                      {exp.organization}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-3 mb-6">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#168AC2] shrink-0 mt-2" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                {exp.tags && (
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-semibold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
