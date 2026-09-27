'use client';

import { useEffect, useRef, useState } from 'react';
import { experiences, activities } from '@/data/experience';

function useInView(threshold = 0.15) {
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

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      className="bg-[#F4F9FE] py-28"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold tracking-widest text-[#2483C5] uppercase mb-4">
            Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#153B66] leading-tight tracking-tight">
            Involvement & Activities
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Organization experience */}
          <div
            className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[11px] font-bold tracking-widest text-[#5C7591] uppercase mb-6">
              Organization
            </p>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-[#2483C5]/30 pl-6">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-bold text-[#153B66] text-base">{exp.organization}</h3>
                      <p className="text-sm text-[#2483C5] font-medium mt-0.5">{exp.role}</p>
                    </div>
                    <span className="text-xs text-[#5C7591] bg-white px-3 py-1 rounded-full border border-[#153B66]/10 whitespace-nowrap ml-4">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="text-sm text-[#5C7591] leading-relaxed flex gap-2">
                        <span className="flex-shrink-0 mt-2 w-1 h-1 rounded-full bg-[#2483C5]/50" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  {exp.events && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.events.map((ev) => (
                        <span
                          key={ev}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-[#2483C5]/8 text-[#2483C5] border border-[#2483C5]/20"
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div
            className={`transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[11px] font-bold tracking-widest text-[#5C7591] uppercase mb-6">
              Activities & Programs
            </p>
            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#153B66]/8 hover:border-[#2483C5]/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-[#153B66] text-sm">{act.title}</h3>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-white border border-[#153B66]/10 text-[#5C7591]">
                        {act.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C7591] leading-relaxed">{act.description}</p>
                  </div>
                  <span className="text-[10px] text-[#5C7591] whitespace-nowrap mt-0.5">
                    {act.year}
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
