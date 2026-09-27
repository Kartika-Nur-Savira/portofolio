'use client';

import { useEffect, useState, useMemo } from 'react';
import { BarChart3, Box, GraduationCap, Menu, Send, Settings2, Sparkles, UserRound, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
  { label: 'Home', href: '#hero', icon: Sparkles },
  { label: 'About', href: '#about', icon: UserRound },
  { label: 'Skills', href: '#skills', icon: Settings2 },
  { label: 'Projects', href: '#projects', icon: Box },
  { label: 'Experience', href: '#experience', icon: BarChart3 },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Contact', href: '#contact', icon: Send },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionIds = useMemo(() => navLinks.map((l) => l.href.replace('#', '')), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-all duration-300 ${scrolled ? 'pt-2' : ''}`}>
        <nav className={`relative max-w-7xl mx-auto h-14 rounded-full border flex items-center justify-between px-4 md:px-5 transition-all duration-300 ${scrolled ? 'bg-[#0B1F3A]/95 border-white/10 shadow-xl backdrop-blur-md' : 'bg-[#0B1F3A] border-white/10 shadow-lg'}`}>
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-2 text-white font-semibold text-sm tracking-tight shrink-0" aria-label="Go to home">
            <span className="w-7 h-7 rounded-full bg-[#6FC7F1] text-[#0B1F3A] flex items-center justify-center text-xs font-black">K</span>
            <span className="hidden sm:inline">Kartika Nur Savira</span>
          </button>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <button
                  key={`${label}-${href}`}
                  onClick={() => handleNav(href)}
                  className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] transition-colors font-medium ${
                    isActive ? 'text-[#6FC7F1] bg-white/10' : 'text-white hover:text-[#6FC7F1] hover:bg-white/10'
                  }`}
                >
                  <Icon size={13} className={`transition-colors ${isActive ? 'text-[#6FC7F1]' : 'text-white/80 group-hover:text-[#6FC7F1]'}`} />
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6FC7F1]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-[#6FC7F1]/30 bg-[#6FC7F1]/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#6FC7F1] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FC7F1] animate-pulse" /> Available
            </span>
            <button onClick={() => handleNav('#contact')} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0B1F3A] hover:bg-[#6FC7F1] transition-colors">
              Let&apos;s talk <span className="ml-1">↗</span>
            </button>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          {/* Scroll progress bar */}
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        </nav>
      </header>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button className="absolute inset-0 bg-[#0B1F3A]/60 backdrop-blur-sm w-full h-full" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
        <div className={`absolute right-3 top-20 w-[calc(100%-24px)] rounded-2xl bg-[#F4F9FE] p-4 shadow-2xl transition-transform duration-300 ${mobileOpen ? 'translate-y-0' : '-translate-y-4'}`}>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <button
                  key={`${label}-mobile`}
                  onClick={() => handleNav(href)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-[#2483C5]/30 bg-[#2483C5]/10 text-[#2483C5]'
                      : 'border-[#0B1F3A]/10 text-[#0B1F3A] hover:bg-[#6FC7F1]/30'
                  }`}
                >
                  <Icon size={15} className="text-[#2483C5]" /> {label}
                </button>
              );
            })}
          </div>
          <button onClick={() => handleNav('#contact')} className="mt-3 w-full rounded-xl bg-[#0B1F3A] py-3 text-sm font-semibold text-white">Let&apos;s talk</button>
        </div>
      </div>
    </>
  );
}
