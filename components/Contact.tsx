'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, MapPin } from 'lucide-react';

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

const contactCards = [
  {
    label: 'Email',
    href: 'mailto:kartikasavirao6@gmail.com',
    icon: Mail,
    display: 'kartikasavirao6@gmail.com',
    placeholder: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kartika-nur-savira',
    icon: Linkedin,
    display: 'Connect professionally',
    placeholder: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Kartika-Nur-Savira',
    icon: Github,
    display: '@Kartika-Nur-Savira',
    placeholder: false,
  },
];

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section
      id="contact"
      className="relative bg-[#0B1F3A] py-28 overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-[#6FC7F1]/5 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 rounded-full bg-[#2483C5]/5 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold tracking-widest text-[#6FC7F1] uppercase mb-6">
            Contact
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Let&apos;s build something <em className="text-[#6FC7F1] not-italic">with data.</em>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-md">
            Whether it&apos;s a data project, collaboration, internship opportunity, or simply a
            conversation about data, feel free to reach out.
          </p>
        </div>

        {/* Contact cards grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.placeholder ? '#contact' : card.href}
                {...(!card.placeholder && { target: '_blank', rel: 'noopener noreferrer' })}
                className={`group rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#6FC7F1]/10 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#6FC7F1]/15 flex items-center justify-center text-[#6FC7F1] group-hover:bg-[#6FC7F1] group-hover:text-[#0B1F3A] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#6FC7F1]/30">
                    <Icon size={20} />
                  </div>
                  <ArrowUpRight size={18} className="text-white/30 group-hover:text-[#6FC7F1] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-white font-bold text-lg mb-1">{card.label}</p>
                <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors">
                  {card.display}
                </p>
                {card.placeholder && (
                  <p className="mt-3 text-[10px] text-[#6FC7F1]/60 font-semibold uppercase tracking-wider">Update link</p>
                )}
              </a>
            );
          })}
        </div>

        {/* Location note */}
        <div className="mt-10 flex items-center gap-2 text-white/30 text-sm">
          <MapPin size={15} className="text-[#6FC7F1]/60" />
          <span>Surabaya, Indonesia</span>
        </div>
      </div>
    </section>
  );
}

