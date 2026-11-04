'use client';

import { useEffect, useRef, useState } from 'react';
import { skillGroups, SkillItem } from '@/data/skills';
import { Code2 } from 'lucide-react';

function SkillBadge({ name, iconUrl }: SkillItem) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-shrink-0 bg-white/95 dark:bg-[#071638]/90 backdrop-blur-sm rounded-2xl px-5 py-3 md:px-6 md:py-3.5 shadow-[0_4px_18px_rgba(11,31,58,0.06)] dark:shadow-[0_8px_25px_rgba(2,7,24,0.7)] border border-blue-100 dark:border-blue-500/20 flex items-center gap-3.5 transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:border-cyan-400/40 dark:hover:border-cyan-400/50 cursor-default group">
      {/* App Icon Container */}
      <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {!imgError && iconUrl ? (
          <img
            src={iconUrl}
            alt={`${name} logo`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <Code2 size={18} className="text-[#168AC2]" />
        )}
      </div>

      {/* App Name */}
      <span className="text-sm md:text-base font-extrabold text-[#0B2559] dark:text-white tracking-tight whitespace-nowrap transition-colors">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const row1 = skillGroups[0].skills;
  const row2 = skillGroups[1].skills;

  return (
    <section id="skills" ref={ref} className="relative overflow-hidden bg-[#F0F6FF] dark:bg-[#020718] py-28 md:py-36 select-none transition-colors duration-500">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300/30 dark:bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-300/20 dark:bg-cyan-500/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 z-10">
        {/* Section Header */}
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-cyan-400">The Toolkit</p>
          <h2 className="text-4xl font-black tracking-[-0.05em] text-[#0B2559] dark:text-white sm:text-5xl md:text-6xl transition-colors">
            Tech <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 dark:from-sky-300 dark:via-blue-300 dark:to-cyan-200 bg-clip-text text-transparent">Skills.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm md:text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
            Tools, languages, and ecosystems that I use to gather, model, and visualize data.
          </p>
        </div>

        {/* Marquee Skill Rows */}
        <div className={`mt-16 space-y-6 transition-all delay-150 duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          {/* Row 1 — Forward Scrolling */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-4 py-2" style={{ animation: 'toolkit-forward 32s linear infinite' }}>
              {row1.map((item, i) => (
                <SkillBadge key={`${item.name}-${i}`} {...item} />
              ))}
              {row1.map((item, i) => (
                <SkillBadge key={`${item.name}-dup-${i}`} {...item} />
              ))}
              {row1.map((item, i) => (
                <SkillBadge key={`${item.name}-dup2-${i}`} {...item} />
              ))}
            </div>
          </div>

          {/* Row 2 — Reverse Scrolling */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-4 py-2" style={{ animation: 'toolkit-reverse 36s linear infinite' }}>
              {row2.map((item, i) => (
                <SkillBadge key={`${item.name}-${i}`} {...item} />
              ))}
              {row2.map((item, i) => (
                <SkillBadge key={`${item.name}-dup-${i}`} {...item} />
              ))}
              {row2.map((item, i) => (
                <SkillBadge key={`${item.name}-dup2-${i}`} {...item} />
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7591]">
          <span className="h-px w-8 bg-[#94C8EB]" /> Hover a skill to pause the flow <span className="h-px w-8 bg-[#94C8EB]" />
        </div>
      </div>
    </section>
  );
}
