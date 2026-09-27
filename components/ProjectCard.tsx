'use client';

import { useRef, useCallback } from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { Project } from '@/data/projects';
import {
  ClassificationVisual,
  ETLVisual,
  ClusteringVisual,
  VisionVisual,
  TimeSeriesVisual,
  APIVisual,
} from './ProjectVisuals';

function VisualForProject({ type }: { type: Project['visualType'] }) {
  switch (type) {
    case 'classification': return <ClassificationVisual />;
    case 'etl': return <ETLVisual />;
    case 'clustering': return <ClusteringVisual />;
    case 'vision': return <VisionVisual />;
    case 'timeseries': return <TimeSeriesVisual />;
    case 'api': return <APIVisual />;
  }
}

function useLightTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

interface Props {
  project: Project;
  onOpen: (project: Project) => void;
  variant?: 'large' | 'small';
}

export default function ProjectCard({ project, onOpen }: Props) {
  const tilt = useLightTilt();

  const mainTools = project.tools.slice(0, 3);
  const remainingCount = project.tools.length - mainTools.length;

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={() => onOpen(project)}
      className="group bg-[#0A1325] rounded-[22px] border border-white/10 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col overflow-hidden h-full relative cursor-pointer select-none"
      style={{
        transition: 'transform 300ms cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 300ms ease, border-color 300ms ease',
        willChange: 'transform',
      }}
    >
      {/* Top Visual Preview Container with Personal Tag */}
      <div className="relative w-full h-48 sm:h-52 bg-[#060D1A] overflow-hidden border-b border-white/08 flex items-center justify-center p-3">
        {/* Scope Badge (e.g. PERSONAL / ACADEMIC) */}
        <span className="absolute top-3 left-3 bg-[#1F2937]/90 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-extrabold px-3 py-1 rounded-md tracking-wider shadow-md z-10 uppercase">
          {project.scope || 'PERSONAL'}
        </span>

        {/* Thumbnail Visual */}
        <div className="w-full h-full flex items-center justify-center scale-95 group-hover:scale-100 transition-transform duration-300">
          <VisualForProject type={project.visualType} />
        </div>

        {/* Hover Gradient Overlay with View Details Pill Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1325] via-[#0A1325]/85 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-xl shadow-purple-500/30 flex items-center gap-1.5 hover:scale-105 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
          >
            View Details <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Card Content (Bottom Half) */}
      <div className="p-5 md:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Title */}
          <h3 className="text-base md:text-lg font-black text-white leading-snug tracking-tight group-hover:text-purple-300 transition-colors line-clamp-2 mb-3">
            {project.title}
          </h3>

          {/* Category & Date Range Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-white/05 border border-white/10 text-[10px] font-bold text-white/80">
              {project.category}
            </span>

            <span className="flex items-center gap-1 text-[10px] font-semibold text-white/50">
              <Calendar size={12} className="text-white/40" />
              {project.dateRange || '2026'}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Badges (Footer) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/08 mt-auto">
          {mainTools.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-white/08 border border-white/10 text-[10px] font-semibold text-white/80"
            >
              {t}
            </span>
          ))}

          {remainingCount > 0 && (
            <span className="px-2 py-1 rounded-md bg-white/05 border border-white/10 text-[10px] font-extrabold text-white/60">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
