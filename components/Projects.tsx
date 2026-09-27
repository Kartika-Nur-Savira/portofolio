'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';

function useInView(threshold = 0.1) {
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

const scopes = ['All Scopes', 'PERSONAL', 'ACADEMIC'];

const categories = [
  'All Categories',
  'Machine Learning',
  'Data Warehouse',
  'Data Mining',
  'Computer Vision',
  'Forecasting (Tabular)',
  'Web Application',
];

export default function Projects() {
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeScope, setActiveScope] = useState('All Scopes');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Filter by Scope
      if (activeScope !== 'All Scopes') {
        const pScope = (p.scope || 'PERSONAL').toUpperCase();
        if (pScope !== activeScope.toUpperCase()) return false;
      }

      // Filter by Category
      if (activeCategory !== 'All Categories') {
        if (!p.category.toLowerCase().includes(activeCategory.toLowerCase()) &&
            !activeCategory.toLowerCase().includes(p.category.toLowerCase())) {
          return false;
        }
      }

      // Filter by Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(query);
        const inCategory = p.category.toLowerCase().includes(query);
        const inDescription = p.shortDescription.toLowerCase().includes(query);
        const inTools = p.tools.some((t) => t.toLowerCase().includes(query));
        if (!inTitle && !inCategory && !inDescription && !inTools) return false;
      }

      return true;
    });
  }, [activeScope, activeCategory, searchQuery]);

  return (
    <>
      <section
        id="projects"
        className="bg-gradient-to-b from-[#F4F9FE] via-[#EBF4FC] to-[#F4F9FE] py-28 select-none relative overflow-hidden"
        ref={ref as React.RefObject<HTMLElement>}
      >
        {/* Soft Background Blue & Purple Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6FC7F1]/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-[#9333EA]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#0B1F3A] via-[#168AC2] to-[#7C3AED]">
              All Projects
            </h2>

            <p className="text-[#5C7591] text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
              Explore the complete portfolio of AI, Machine Learning, and Web Application projects.
            </p>

            {/* Centered Glowing Underline */}
            <div className="h-1 w-16 bg-gradient-to-r from-[#168AC2] to-[#7C3AED] rounded-full mx-auto mt-4" />
          </div>

          {/* Filter & Search Bar Controls (Styled for Light Background) */}
          <div
            className={`flex flex-col md:flex-row items-center justify-between gap-3 mb-10 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Left Filter Dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* All Scopes Dropdown */}
              <div className="relative w-1/2 md:w-44">
                <select
                  value={activeScope}
                  onChange={(e) => setActiveScope(e.target.value)}
                  className="w-full bg-white/90 backdrop-blur-md border border-[#0B1F3A]/15 hover:border-[#168AC2]/60 text-[#0B1F3A] text-xs font-semibold rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[#168AC2] cursor-pointer shadow-sm transition-all"
                >
                  {scopes.map((s) => (
                    <option key={s} value={s} className="bg-white text-[#0B1F3A]">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-[#5C7591] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* All Categories Dropdown */}
              <div className="relative w-1/2 md:w-48">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full bg-white/90 backdrop-blur-md border border-[#0B1F3A]/15 hover:border-[#168AC2]/60 text-[#0B1F3A] text-xs font-semibold rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[#168AC2] cursor-pointer shadow-sm transition-all"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-white text-[#0B1F3A]">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-[#5C7591] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Right Search Bar Input */}
            <div className="relative w-full md:flex-1 max-w-lg">
              <Search size={15} className="text-[#5C7591] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects by title, tech, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 backdrop-blur-md border border-[#0B1F3A]/15 hover:border-[#168AC2]/60 focus:border-[#168AC2] text-[#0B1F3A] text-xs font-medium rounded-xl pl-11 pr-4 py-3 focus:outline-none placeholder:text-[#5C7591]/60 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* 3-Column Projects Card Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <div
                  key={project.id}
                  className={`transition-all duration-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${120 + i * 70}ms` }}
                >
                  <ProjectCard project={project} onOpen={setSelected} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-2xl border border-[#0B1F3A]/10">
              <p className="text-[#5C7591] text-sm font-semibold mb-2">No matching projects found</p>
              <button
                onClick={() => {
                  setActiveScope('All Scopes');
                  setActiveCategory('All Categories');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#168AC2] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-16 text-center max-w-xl mx-auto">
            <p className="text-xs font-semibold text-[#5C7591] leading-relaxed">
              All projects completed between 2025 and 2026 at the State University of Surabaya. GitHub links are added progressively as repositories are made public.
            </p>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <ProjectDetail project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
