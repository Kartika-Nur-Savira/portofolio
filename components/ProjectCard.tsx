'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Github, Sparkles, ExternalLink, Zap } from 'lucide-react';
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
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
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
}

export default function ProjectCard({ project, onOpen }: Props) {
  const tilt = useLightTilt();

  const mainTools = project.tools.slice(0, 4);
  const remainingCount = project.tools.length - mainTools.length;

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={() => onOpen(project)}
      className="group bg-white/95 dark:bg-[#071638]/90 rounded-[24px] border border-blue-200/60 dark:border-blue-500/20 hover:border-cyan-400/80 dark:hover:border-cyan-400/60 shadow-lg shadow-blue-950/5 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden relative cursor-pointer select-none backdrop-blur-sm flex flex-col h-full"
      style={{
        transition: 'transform 300ms cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 300ms ease, border-color 300ms ease',
        willChange: 'transform',
      }}
    >
      {/* Top Ambient Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

      {/* ======================================================== */}
      {/* BAGIAN ATAS: OVERVIEW / VISUAL PROJECT                   */}
      {/* ======================================================== */}
      <div className="relative w-full h-52 sm:h-56 bg-[#050E23] overflow-hidden border-b border-blue-200/40 dark:border-blue-500/20 flex items-center justify-center p-3 shrink-0">
        {/* Subtle Radial Mesh inside the visual box */}
        <div className="absolute inset-0 bg-radial from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        {/* Scope Badge */}
        <span className="absolute top-3 left-3 bg-[#0B1E48]/90 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider shadow-md z-10 uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          {project.scope || 'PERSONAL'}
        </span>

        {/* Key Metric Highlight Badge (Top Right) */}
        {project.highlight && (
          <span className="absolute top-3 right-3 bg-blue-950/90 backdrop-blur-md border border-blue-400/30 text-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
            <Sparkles size={10} className="text-cyan-400" />
            <strong className="text-white font-mono">{project.highlight.value}</strong>
            <span className="text-white/70 hidden sm:inline">{project.highlight.label}</span>
          </span>
        )}

        {/* Visual Content: Custom Image (e.g. NTP.png) or Interactive Visual Component */}
        {project.imageSrc ? (
          <div className="w-full h-full relative overflow-hidden rounded-xl border border-blue-400/20 bg-slate-950 shadow-inner">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center scale-95 group-hover:scale-100 transition-transform duration-300">
            <VisualForProject type={project.visualType} />
          </div>
        )}

        {/* Hover Gradient Overlay with View Details Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050E23] via-[#050E23]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-full shadow-xl shadow-cyan-500/30 flex items-center gap-1.5 hover:scale-105 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 border border-cyan-300/40"
          >
            Lihat Detail Proyek <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BAGIAN BAWAH: PENJELASAN PROYEK                          */}
      {/* ======================================================== */}
      <div className="p-5 md:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Category & Date Range */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-500/30 text-[10px] font-bold text-blue-700 dark:text-cyan-300">
              {project.category}
            </span>

            <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              <Calendar size={11} className="text-slate-400 dark:text-slate-500" />
              {project.dateRange || '2026'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
            {project.title}
          </h3>

          {/* Penjelasan / Deskripsi */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
            {project.shortDescription}
          </p>
        </div>

        {/* Footer: Tools Tags + Quick Links */}
        <div className="pt-3 border-t border-blue-100 dark:border-blue-500/20 mt-auto flex items-center justify-between gap-2">
          {/* Main Tools Badges */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
            {mainTools.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#0E2046] border border-blue-200/80 dark:border-cyan-400/30 text-[10.5px] font-mono font-bold text-blue-900 dark:text-cyan-200 shadow-xs"
              >
                {t}
              </span>
            ))}

            {remainingCount > 0 && (
              <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-[#0E2046]/90 border border-slate-200 dark:border-blue-500/30 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                +{remainingCount}
              </span>
            )}
          </div>

          {/* Quick Actions (Demo & Repo) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors"
                title="Buka Live Web Dashboard"
              >
                <ExternalLink size={14} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-400 hover:text-slate-800 dark:hover:text-cyan-300 transition-colors"
                title="Buka Repositori GitHub"
              >
                <Github size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
