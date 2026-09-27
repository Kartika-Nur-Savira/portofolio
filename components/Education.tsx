'use client';

import { useEffect, useRef, useState } from 'react';
import { certifications, coursework } from '@/data/certifications';
import { ExternalLink } from 'lucide-react';

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

export default function Education() {
  const { ref, inView } = useInView();

  return (
    <section
      id="education"
      className="bg-[#F4F9FE] py-28"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold tracking-widest text-[#2483C5] uppercase mb-4">
            Education
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#153B66] leading-tight tracking-tight">
            Academic background
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* University */}
          <div
            className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="bg-white rounded-2xl p-7 border border-[#153B66]/10 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#153B66] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#153B66] text-lg leading-tight">
                    Universitas Negeri Surabaya
                  </h3>
                  <p className="text-[#2483C5] font-medium text-sm mt-0.5">
                    Bachelor's — Data Science
                  </p>
                  <p className="text-[#5C7591] text-xs mt-0.5">Surabaya, Indonesia · 2023 – Present</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#5C7591] uppercase mb-3">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F4F9FE] border border-[#153B66]/10 text-[#17201C]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-[11px] font-bold tracking-widest text-[#5C7591] uppercase mb-6">
              Certifications
            </p>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl p-4 border border-[#153B66]/10 flex items-start justify-between gap-3 hover:border-[#2483C5]/30 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-[#153B66] text-sm truncate">{cert.name}</p>
                    <p className="text-xs text-[#5C7591] mt-0.5">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-[10px] text-[#5C7591]/60 font-mono mt-1">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs text-[#5C7591]">{cert.year}</span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2483C5] hover:text-[#153B66] transition-colors"
                        aria-label="View credential"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-[#5C7591] italic">
              Certification details can be updated when official credentials are available.
            </p>

            {/* CV CTA */}
            <div className="mt-8 bg-[#153B66] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Want the full picture?</h3>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Download my CV to explore my academic background, technical skills, projects, and
                experience.
              </p>
              <a
                href="/cv-kartika-nur-savira.pdf"
                download
                className="inline-flex items-center gap-2 text-sm font-semibold bg-[#2483C5] text-white px-5 py-2.5 rounded-full hover:bg-[#6FC7F1] transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
