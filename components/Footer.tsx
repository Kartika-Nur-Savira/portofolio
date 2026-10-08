'use client';

import { Mail, Linkedin, Github, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07162B] border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">Kartika Nur Savira</p>
            <p className="text-white/30 text-xs mt-0.5">Designed &amp; developed with intention.</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Kartika-Nur-Savira"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/30 hover:text-[#6FC7F1] transition-all duration-300 hover:-translate-y-1 hover-bounce"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/kartika-nur-savira-951b84383/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/30 hover:text-[#6FC7F1] transition-all duration-300 hover:-translate-y-1 hover-bounce"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:kartikasavirao6@gmail.com"
              aria-label="Email"
              className="text-white/30 hover:text-[#6FC7F1] transition-all duration-300 hover:-translate-y-1 hover-bounce"
            >
              <Mail size={16} />
            </a>

            <div className="w-px h-4 bg-white/10 mx-1" />

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white/30 hover:text-[#6FC7F1] transition-all duration-300 text-xs font-medium hover:-translate-y-0.5"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              Top
            </button>
          </div>

          <p className="text-white/20 text-xs">
            &copy; 2026 Kartika Nur Savira. Built with curiosity &amp; data.
          </p>
        </div>
      </div>
    </footer>
  );
}
