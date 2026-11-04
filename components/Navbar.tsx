'use client';

import { useEffect, useState, useMemo } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ACHIEVEMENTS', href: '#education' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (theme === 'dark' || resolvedTheme === 'dark') : true;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const sectionIds = useMemo(() => navLinks.map((l) => l.href.replace('#', '')), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3.5 sm:pt-4 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto max-w-6xl mx-auto h-14 sm:h-15 rounded-full border transition-all duration-300 flex items-center justify-between px-4 sm:px-6 shadow-2xl ${
            isDark
              ? scrolled
                ? 'bg-[#051133]/92 border-blue-500/30 backdrop-blur-xl shadow-[0_10px_35px_rgba(2,7,24,0.9)]'
                : 'bg-[#051133]/80 border-blue-500/20 backdrop-blur-md shadow-[0_8px_30px_rgba(2,7,24,0.7)]'
              : scrolled
              ? 'bg-white/92 border-blue-100 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
              : 'bg-white/80 border-blue-100/80 backdrop-blur-md shadow-[0_6px_25px_rgba(15,23,42,0.05)]'
          }`}
        >
          {/* Left: Brand Monogram & Name */}
          <button
            onClick={() => handleNav('#hero')}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Go to home"
          >
            <span
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-serif italic font-black text-sm sm:text-base flex items-center justify-center shadow-md group-hover:scale-105 transition-transform ${
                isDark ? 'bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-[#0B2559] text-white'
              }`}
            >
              K
            </span>
            <span
              className={`font-extrabold tracking-[0.2em] text-[11px] sm:text-xs uppercase font-sans transition-colors ${
                isDark ? 'text-white' : 'text-[#0B2559]'
              }`}
            >
              KARTIKA
            </span>
          </button>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '') || (href === '#hero' && !activeSection);
              return (
                <button
                  key={`${label}-${href}`}
                  onClick={() => handleNav(href)}
                  className={`relative py-1 text-[11px] xl:text-xs font-semibold tracking-wider transition-colors uppercase ${
                    isActive
                      ? isDark
                        ? 'text-cyan-300'
                        : 'text-[#0B2559]'
                      : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                        isDark
                          ? 'bg-cyan-400 shadow-[0_0_10px_#38BDF8]'
                          : 'bg-[#0B2559] shadow-[0_0_8px_rgba(11,37,89,0.4)]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Theme Toggle & Hire Me Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme (dark/light)"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isDark
                  ? 'text-amber-400 hover:text-amber-300 hover:bg-white/10'
                  : 'text-indigo-600 hover:text-indigo-700 hover:bg-slate-100'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={17} className="stroke-[2.2]" /> : <Moon size={16} className="stroke-[2.2]" />}
            </button>

            <button
              onClick={() => handleNav('#contact')}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide transition-all active:scale-95 shadow-sm ${
                isDark
                  ? 'border border-blue-400/40 bg-blue-600/20 hover:bg-blue-600/40 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'border border-slate-300 bg-[#0B2559] hover:bg-[#1E3A8A] text-white shadow-sm'
              }`}
            >
              Contact Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'text-amber-400' : 'text-indigo-600'
              }`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className={`p-1.5 transition-colors ${isDark ? 'text-white hover:text-slate-300' : 'text-slate-800 hover:text-slate-600'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Top scroll progress indicator line */}
          <div
            className={`absolute bottom-0 left-6 right-6 h-[1px] transition-all ${
              isDark
                ? 'bg-gradient-to-r from-transparent via-white/25 to-transparent'
                : 'bg-gradient-to-r from-transparent via-[#0B1F3A]/20 to-transparent'
            }`}
            style={{ opacity: scrolled ? 1 : 0 }}
          />
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          className="absolute inset-0 bg-black/70 backdrop-blur-sm w-full h-full cursor-default"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
        <div
          className={`absolute inset-x-4 top-20 rounded-3xl border p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            isDark
              ? 'bg-[#0e0f15]/95 border-white/15 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
          } ${mobileOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'}`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '') || (href === '#hero' && !activeSection);
              return (
                <button
                  key={`${label}-mobile`}
                  onClick={() => handleNav(href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? isDark
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'bg-slate-100 text-[#0B1F3A] border border-slate-200 font-bold'
                      : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{label}</span>
                  {isActive && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDark ? 'bg-white shadow-[0_0_6px_#fff]' : 'bg-[#0B1F3A]'
                      }`}
                    />
                  )}
                </button>
              );
            })}

            <div className={`pt-3 border-t mt-2 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <button
                onClick={() => handleNav('#contact')}
                className={`w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isDark
                    ? 'border border-white/30 text-white hover:bg-white/10'
                    : 'bg-[#0B1F3A] text-white hover:bg-[#1E3A8A]'
                }`}
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
