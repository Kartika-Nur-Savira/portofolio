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
    href: 'https://www.linkedin.com/in/kartika-nur-savira-951b84383/',
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
      className="relative bg-[#0B2559] dark:bg-[#020718] py-28 overflow-hidden transition-colors duration-500 border-t border-blue-900/40 dark:border-blue-500/20"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-6">
            Contact
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Let&apos;s build something <em className="text-cyan-400 not-italic">with data.</em>
          </h2>
          <p className="text-blue-100/70 text-lg leading-relaxed max-w-md">
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
                className={`group rounded-2xl glass dark:bg-[#071638]/90 dark:border-blue-500/20 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-400/10 hover:border-cyan-400/40 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 dark:bg-blue-600/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-blue-950 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
                    <Icon size={20} />
                  </div>
                  <ArrowUpRight size={18} className="text-white/40 group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-white font-bold text-lg mb-1">{card.label}</p>
                <p className="text-blue-100/60 text-sm group-hover:text-white transition-colors">
                  {card.display}
                </p>
                {card.placeholder && (
                  <p className="mt-3 text-[10px] text-cyan-300/80 font-semibold uppercase tracking-wider">Update link</p>
                )}
              </a>
            );
          })}
        </div>

        {/* Location note */}
        <div className="mt-10 flex items-center gap-2 text-blue-200/50 text-sm">
          <MapPin size={15} className="text-cyan-400" />
          <span>Surabaya, Indonesia</span>
        </div>
      </div>
    </section>
  );
}

