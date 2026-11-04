'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const scopes = [
  { id: 'All Scopes', label: 'All Projects' },
  { id: 'PERSONAL', label: 'Personal' },
  { id: 'ACADEMIC', label: 'Academic' },
];

export default function Projects() {
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeScope, setActiveScope] = useState('All Scopes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Filter by Scope
      if (activeScope !== 'All Scopes') {
        const pScope = (p.scope || 'PERSONAL').toUpperCase();
        if (pScope !== activeScope.toUpperCase()) return false;
      }

      // Filter by Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(query);
        const inCategory = p.category.toLowerCase().includes(query);
        const inDescription = p.shortDescription.toLowerCase().includes(query);
        const inProblem = p.problem?.toLowerCase().includes(query);
        const inGoals = p.goals?.toLowerCase().includes(query);
        const inTools = p.tools.some((t) => t.toLowerCase().includes(query));
        if (!inTitle && !inCategory && !inDescription && !inProblem && !inGoals && !inTools) return false;
      }

      return true;
    });
  }, [activeScope, searchQuery]);

  const hasActiveFilters = activeScope !== 'All Scopes' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setActiveScope('All Scopes');
    setSearchQuery('');
  };

  return (
    <>
      <section
        id="projects"
        className="bg-gradient-to-b from-[#F0F6FF] via-[#E4EFFF] to-[#F0F6FF] dark:from-[#020718] dark:via-[#051133] dark:to-[#020718] py-20 sm:py-24 select-none relative overflow-hidden transition-colors duration-500"
        ref={ref as React.RefObject<HTMLElement>}
      >
        {/* Soft Background Blue Ambient Glows & Blueprint Circuit Traces */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-20 dark:opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-blue-500/15 dark:bg-blue-600/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[360px] bg-cyan-500/10 dark:bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Top Micro Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-400/20 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles size={13} className="text-cyan-500 animate-pulse" />
              <span>Selected Works & Case Studies</span>
            </div>

            {/* Title with Serif Hybrid */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-normal text-[#071744] dark:text-white leading-tight tracking-tight mb-3">
              Featured{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#0B2559] via-[#1E3A8A] to-[#2563EB] dark:from-white dark:via-blue-100 dark:to-cyan-200 bg-clip-text text-transparent">
                Projects & Systems
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed transition-colors">
              Eksplorasi proyek data science, machine learning, computer vision, time series forecasting (NTP Jawa Tengah), data wrangling, NLP, dan graf analitik yang dikembangkan dari riset akademik dan repositori GitHub resmi.
            </p>

            {/* Glowing Accent Scrubber */}
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-full mx-auto mt-5 shadow-[0_0_12px_#38BDF8]" />
          </div>

          {/* Simple & Clean Controls Bar: Scope Switcher + Search Bar */}
          <div
            className={`mb-10 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl bg-white/70 dark:bg-[#071638]/70 backdrop-blur-md border border-blue-200/60 dark:border-blue-500/20 shadow-sm">
              {/* Scope Segmented Control */}
              <div className="inline-flex p-1 rounded-xl bg-blue-50/80 dark:bg-[#040C20]/80 border border-blue-200/50 dark:border-blue-500/20 w-full sm:w-auto">
                {scopes.map((s) => {
                  const isActive = activeScope === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveScope(s.id)}
                      className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar Input */}
              <div className="relative w-full sm:w-80">
                <Search
                  size={15}
                  className="text-slate-400 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Cari judul, tools, model, algoritma..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#040C20] border border-blue-200/70 dark:border-blue-500/20 hover:border-cyan-400/50 focus:border-cyan-400 text-[#071744] dark:text-white text-xs font-medium rounded-xl pl-10 pr-9 py-2 focus:outline-none placeholder:text-slate-400 shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Status Feedback */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 px-2">
                <span>
                  Menampilkan <strong className="text-blue-600 dark:text-cyan-400">{filteredProjects.length}</strong> dari{' '}
                  {projects.length} proyek
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <X size={12} /> Reset filter
                </button>
              </div>
            )}
          </div>

          {/* Standard Balanced 3-Column Grid (Layout bagi 2: Atas Overview, Bawah Penjelasan) */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
              {filteredProjects.map((project, i) => (
                <div
                  key={project.id}
                  className={`transition-all duration-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${100 + i * 40}ms` }}
                >
                  <ProjectCard project={project} onOpen={setSelected} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/70 dark:bg-[#071638]/70 backdrop-blur-md rounded-3xl border border-blue-200/60 dark:border-blue-500/20 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-cyan-400">
                <Filter size={20} />
              </div>
              <p className="text-[#071744] dark:text-white text-base font-bold mb-1">Tidak ada proyek yang sesuai</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">
                Coba sesuaikan kata kunci pencarian atau ganti filter scope.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Section Footer / Academic Affiliation Note */}
          <div className="mt-16 text-center max-w-xl mx-auto">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
              Seluruh proyek bersumber dari studi akademik dan riset mandiri di Program Studi S1 Sains Data, Universitas Negeri Surabaya (UNESA). Kode sumber dan dokumentasi lengkap dapat diakses secara publik di GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* Structured Case Study Detail Modal (Problem -> Goals -> Workflow -> Tech -> Repo/Demo) */}
      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
