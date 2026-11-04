'use client';

import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface StatItem {
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

const stats: StatItem[] = [
  { value: 'Data Science', label: 'Area of Study', sublabel: 'Undergraduate' },
  { value: '10+', numericValue: 10, suffix: '+', label: 'Projects & Coursework', sublabel: 'Academic & Personal' },
  { value: 'Python', label: 'Primary Tool', sublabel: 'Also R & SQL' },
  { value: 'UNESA', label: 'Universitas Negeri Surabaya', sublabel: 'Surabaya, Indonesia' },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedStat({ stat, inView, index }: { stat: StatItem; inView: boolean; index: number }) {
  const count = useCountUp(stat.numericValue ?? 0, inView);

  return (
    <div
      className={`group rounded-2xl glass dark:bg-[#071638]/85 dark:border-blue-500/20 px-6 py-8 transition-all duration-500 hover:border-[#38BDF8]/40 hover:bg-white/[0.08] dark:hover:bg-blue-600/10 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#38BDF8]/10 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
        {stat.sublabel}
      </p>
      <p className="text-white font-bold text-xl md:text-2xl leading-tight mb-1">
        {stat.numericValue !== undefined ? `${count}${stat.suffix || ''}` : stat.value}
      </p>
      <p className="text-white/60 group-hover:text-white/90 transition-colors text-sm">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView();

  return (
    <section className="bg-[#0B2559] dark:bg-[#030718] py-20 transition-colors duration-500 border-y border-blue-900/30 dark:border-blue-500/20">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
