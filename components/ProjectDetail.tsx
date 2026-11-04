'use client';

import {
  X,
  Github,
  ChevronUp,
  AlertCircle,
  Target,
  GitBranch,
  Cpu,
  CheckCircle2,
  BarChart3,
  ExternalLink,
  Globe,
  Database,
  Layers,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const defaultWorkflow = [
    { step: 1, title: 'Data Cleaning & Preprocessing', description: 'Pembersihan nilai hilang, penanganan pencilan, normalisasi, dan encoding fitur.' },
    { step: 2, title: 'Exploratory Data Analysis', description: 'Analisis korelasi, visualisasi distribusi fitur, dan validasi domain data.' },
    { step: 3, title: 'Modeling & Hyperparameter Tuning', description: 'Pelatihan model baseline dan evaluasi komparatif model tingkat lanjut.' },
    { step: 4, title: 'Validation & Deployment', description: 'Kalkulasi metrik evaluasi, analisis signifikansi, dan deployment visualizer.' },
  ];

  const workflow = project.workflow || defaultWorkflow;
  const languages = project.languages || ['Python', 'SQL'];
  const libraries = project.libraries || project.tools;
  const algorithms = project.algorithms || project.keyInsights?.slice(0, 4) || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Dark Glass Overlay */}
      <div
        className="absolute inset-0 bg-[#020718]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Container */}
      <div className="relative bg-white dark:bg-[#071638] rounded-[28px] border border-blue-200/80 dark:border-blue-500/30 shadow-[0_25px_70px_rgba(2,7,24,0.5)] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-white transition-all select-none">
        
        {/* ======================================================== */}
        {/* HEADER BAR                                               */}
        {/* ======================================================== */}
        <div className="flex items-start justify-between p-6 md:p-8 border-b border-blue-100 dark:border-blue-500/20 shrink-0 bg-white/90 dark:bg-[#05112F]/90 backdrop-blur-sm">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold tracking-[0.16em] text-blue-600 dark:text-cyan-400 uppercase">
                {project.category}
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-xs">•</span>
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                {project.dateRange || '2026'}
              </span>
              {project.scope && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-cyan-500/10 text-[9px] font-extrabold text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-400/20 uppercase">
                  {project.scope}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#071744] dark:text-white leading-tight tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 ml-2 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all hover:rotate-90 duration-300 border border-transparent dark:border-white/10"
            aria-label="Tutup Detail"
          >
            <X size={18} />
          </button>
        </div>

        {/* ======================================================== */}
        {/* MODAL BODY (STRUCTURED FLOW)                            */}
        {/* Flow: Problem -> Goals -> Workflow -> Tech -> Actions   */}
        {/* ======================================================== */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-7 custom-scrollbar">
          
          {/* Featured Image Banner (e.g. for NTP.png) */}
          {project.imageSrc && (
            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-blue-200/80 dark:border-blue-500/30 shadow-lg bg-slate-950">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 850px"
                className="object-cover object-top"
                priority
              />
            </div>
          )}

          {/* Quick Action Pills if demo or github exists */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-blue-50/70 dark:bg-[#05112F]/80 border border-blue-200/60 dark:border-blue-500/20">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mr-1 flex items-center gap-1">
                <Sparkles size={13} className="text-cyan-500" /> Tautan Proyek:
              </span>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                >
                  <Globe size={13} />
                  Kunjungi Live Web Deployment
                  <ExternalLink size={11} className="opacity-80" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-blue-600 dark:bg-white/10 dark:hover:bg-cyan-500/20 text-white font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10 transition-all hover:scale-105"
                >
                  <Github size={13} />
                  Buka Repositori GitHub
                  <ExternalLink size={11} className="opacity-80" />
                </a>
              )}
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* 1. PROBLEM STATEMENT                                  */}
          {/* ---------------------------------------------------- */}
          <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-amber-500/10 via-amber-500/05 to-transparent border border-amber-500/25 dark:border-amber-400/25">
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-amber-700 dark:text-amber-400 uppercase mb-2">
              <AlertCircle size={14} className="text-amber-600 dark:text-amber-400" />
              1. PROBLEM / MASALAH
            </div>
            <p className="text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
              {project.problem}
            </p>
          </div>

          {/* ---------------------------------------------------- */}
          {/* 2. GOALS / TARGET OBJECTIVES                          */}
          {/* ---------------------------------------------------- */}
          <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-blue-500/10 via-cyan-500/05 to-transparent border border-blue-400/30 dark:border-cyan-400/25">
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-blue-700 dark:text-cyan-400 uppercase mb-2">
              <Target size={14} className="text-blue-600 dark:text-cyan-400" />
              2. GOALS / TUJUAN PROYEK
            </div>
            <p className="text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
              {project.goals}
            </p>
          </div>

          {/* ---------------------------------------------------- */}
          {/* 3. WORKFLOW / PIPELINE TAHAPAN PENGERJAAN            */}
          {/* ---------------------------------------------------- */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-blue-600 dark:text-cyan-400 uppercase mb-3">
              <GitBranch size={14} />
              3. WORKFLOW & ALUR PENGERJAAN
            </div>

            <div className="bg-slate-50/80 dark:bg-[#05112F] rounded-2xl p-6 border border-blue-100 dark:border-blue-500/20 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {workflow.map((w, idx) => (
                  <div key={w.step} className="flex flex-col items-center text-center relative group">
                    {/* Step Number Circle */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-black text-sm shadow-md shadow-blue-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {w.step}
                    </div>

                    <h4 className="text-xs font-bold text-[#071744] dark:text-white leading-tight mb-1.5">
                      {w.title}
                    </h4>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                      {w.description}
                    </p>

                    {/* Connecting line for desktop view */}
                    {idx < workflow.length - 1 && (
                      <div className="hidden lg:block absolute top-5 -right-3 w-6 h-[1.5px] bg-gradient-to-r from-blue-500/40 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* 4. APA SAJA YANG ADA DI SITU (TECH, DATASET, HASIL)  */}
          {/* ---------------------------------------------------- */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-blue-600 dark:text-cyan-400 uppercase">
              <Cpu size={14} />
              4. APA SAJA YANG ADA DI SITU (KOMPONEN & TEKNOLOGI)
            </div>

            {/* Tools Badges */}
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="bg-blue-50 dark:bg-[#0E2046] text-blue-900 dark:text-cyan-200 border border-blue-200 dark:border-cyan-400/30 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-xs"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Technical Architecture Breakdown: Languages, Libraries, Algorithms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/80 dark:bg-[#05112F] rounded-2xl p-5 border border-blue-100 dark:border-blue-500/20 shadow-sm">
              {/* Languages */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest text-blue-600 dark:text-cyan-400 uppercase mb-2">
                  BAHASA PEMROGRAMAN
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-[#0E2046] border border-blue-200/80 dark:border-cyan-400/25 text-[#071744] dark:text-cyan-200 shadow-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Libraries */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest text-blue-600 dark:text-cyan-400 uppercase mb-2">
                  LIBRARIES & FRAMEWORKS
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {libraries.map((lib) => (
                    <span
                      key={lib}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-[#0E2046] border border-blue-200/80 dark:border-cyan-400/25 text-[#071744] dark:text-cyan-200 shadow-xs"
                    >
                      {lib}
                    </span>
                  ))}
                </div>
              </div>

              {/* Algorithms */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest text-blue-600 dark:text-cyan-400 uppercase mb-2">
                  ALGORITMA & METODE
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {algorithms.map((alg) => (
                    <span
                      key={alg}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-[#0E2046] border border-blue-200/80 dark:border-cyan-400/25 text-[#071744] dark:text-cyan-200 shadow-xs"
                    >
                      {alg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dataset Information */}
            {project.dataset && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#05112F]/70 border border-blue-100 dark:border-blue-500/20 flex items-start gap-3">
                <Database size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 dark:text-cyan-400 block mb-0.5">
                    DATASET YANG DIGUNAKAN
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.dataset}
                  </p>
                </div>
              </div>
            )}

            {/* Key Insights & Results */}
            {project.keyInsights && project.keyInsights.length > 0 && (
              <div>
                <div className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 dark:text-cyan-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  TEMUAN UTAMA & HASIL (KEY INSIGHTS)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.keyInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#05112F]/70 border border-blue-100 dark:border-blue-500/20 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-1.5" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Metrics Benchmarks (if available) */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="pt-2">
                <div className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 dark:text-cyan-400 mb-2.5 flex items-center gap-1.5">
                  <BarChart3 size={13} />
                  METRIK PERFORMA & BENCHMARK
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-blue-50/70 dark:bg-[#05112F] border border-blue-200/60 dark:border-blue-500/20 text-center"
                    >
                      <div className="text-base sm:text-lg font-mono font-extrabold text-blue-700 dark:text-cyan-300">
                        {m.value}
                      </div>
                      <div className="text-[11px] font-bold text-[#071744] dark:text-white mt-0.5">
                        {m.label}
                      </div>
                      {m.subtext && (
                        <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {m.subtext}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ======================================================== */}
        {/* FOOTER ACTION BAR: URL REPO & WEB DEPLOYMENT            */}
        {/* ======================================================== */}
        <div className="border-t border-blue-100 dark:border-blue-500/20 p-5 md:p-6 bg-slate-50 dark:bg-[#05112F] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Web Demo Button (e.g. for TaniTrend NTP) */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all hover:scale-105 border border-teal-300/30"
              >
                <Globe size={14} />
                Kunjungi Live Web Dashboard
                <ExternalLink size={12} className="opacity-80" />
              </a>
            )}

            {/* GitHub Repo Button */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md shadow-blue-500/25 hover:shadow-lg transition-all hover:scale-105 border border-cyan-300/30"
              >
                <Github size={14} />
                Buka Repositori GitHub
                <ExternalLink size={12} className="opacity-80" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
          >
            <ChevronUp size={15} />
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
