'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
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

  return (
    <section id="about" className="bg-[#F4F9FE] py-28" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — photo card with 3D tilt */}
          <div
            className={`relative transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative mx-auto max-w-sm" {...tiltProps}>
              {/* Photo placeholder */}
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden flex items-center justify-center shadow-2xl border-4 border-[#168AC2]/30 bg-slate-900">
                <Image
                  src="/images/profile-crop-half.jpg"
                  alt="Kartika Nur Savira"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 300px, 400px"
                />

                {/* Sticker */}
                <div className="absolute bottom-5 left-5 rounded-full bg-white/95 backdrop-blur-md px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#0B1F3A] shadow-lg z-10">
                  Data Science
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-2xl bg-[#0B1F3A] px-4 py-3 shadow-xl animate-float-slow">
                <Sparkles size={16} className="text-[#6FC7F1]" />
                <div>
                  <p className="text-white text-xs font-bold leading-tight">Curious</p>
                  <p className="text-white/50 text-[10px] leading-tight">by nature</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — text + timeline */}
          <div
            className={`transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-[#2483C5] uppercase mb-4">
              About
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#153B66] leading-[1.05] tracking-tight mb-8">
              A little about <em className="text-[#168AC2] not-italic">me</em>
            </h2>

            <div className="space-y-5 text-[#153B66] leading-relaxed">
              <p>
                I&apos;m a Data Science student who enjoys working at the intersection of data,
                technology, and visual storytelling.
              </p>
              <p>
                My academic and project experience has exposed me to data analysis, machine
                learning, clustering, predictive modeling, data visualization, database systems,
                computer vision, and cloud technologies.
              </p>
              <p className="text-[#5C7591]">
                I enjoy the process of turning raw datasets into patterns, insights, and practical
                solutions — transforming complexity into clarity.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Analytical', 'Curious', 'Detail-oriented', 'Project builder', 'Data-driven'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#2483C5]/10 text-[#2483C5] border border-[#2483C5]/25 hover:bg-[#2483C5]/20 hover:scale-105 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Mini timeline with pulse dots */}
            <div className="mt-10 space-y-4">
              {journey.map((step, i) => (
                <div
                  key={step.year}
                  className={`flex gap-4 transition-all duration-500 ${
                    inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <span className="flex-shrink-0 w-16 text-[10px] font-bold text-[#2483C5] tracking-wide uppercase pt-0.5">
                    {step.year}
                  </span>
                  <div className="relative flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[#2483C5] bg-white mt-1.5" />
                    {inView && (
                      <div
                        className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#2483C5]/40 mt-1.5 animate-pulse-dot"
                        style={{ animationDelay: `${i * 300}ms` }}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#153B66] text-sm">{step.title}</p>
                    <p className="text-[#5C7591] text-sm leading-relaxed">{step.desc}</p>
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
