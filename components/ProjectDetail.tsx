'use client';

import { X, Github, ChevronUp, Layers, TrendingUp, Cpu } from 'lucide-react';
import { useEffect } from 'react';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const defaultWorkflow = [
    { step: 1, title: 'Data Imputation', description: 'Handled missing values with median/mode & correlation filtering.' },
    { step: 2, title: 'Class Balancing', description: 'Applied SMOTE oversampling for minority health categories.' },
    { step: 3, title: 'Model Comparison', description: 'Evaluated Logistic Regression, Random Forest, XGBoost & CatBoost.' },
    { step: 4, title: 'Predictive Scoring', description: 'Extracted key risk drivers (physical health days, BMI, mobility).' },
  ];

  const workflow = project.workflow || defaultWorkflow;
  const languages = project.languages || ['Python', 'SQL'];
  const libraries = project.libraries || project.tools;
  const algorithms = project.algorithms || project.keyInsights.slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Dark Glass Overlay */}
      <div
        className="absolute inset-0 bg-[#0B1F3A]/70 backdrop-blur-md modal-backdrop-enter"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Container (Blue & White Theme) */}
      <div className="relative bg-[#F4F9FE] rounded-[28px] border border-[#0B1F3A]/15 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-[#0B1F3A] modal-enter select-none">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 md:p-8 border-b border-[#0B1F3A]/10 shrink-0 bg-white/70 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-extrabold tracking-[0.16em] text-[#168AC2] uppercase">
              {project.category.toUpperCase()} • 2026
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0B1F3A] mt-1 leading-tight tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 w-9 h-9 rounded-full bg-[#0B1F3A]/05 hover:bg-[#0B1F3A]/12 text-[#5C7591] hover:text-[#0B1F3A] flex items-center justify-center transition-all hover:rotate-90 duration-300"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8 custom-scrollbar">
          
          {/* Section 1: Project Overview */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-[#2483C5] uppercase mb-2">
              <Layers size={13} className="text-[#168AC2]" />
              PROJECT OVERVIEW
            </div>
            <p className="text-[#153B66] text-sm md:text-base leading-relaxed font-medium">
              {project.overview}
            </p>
          </div>

          {/* Section 2: Workflow 4-Step Process Box (Blue & White Theme) */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-[#2483C5] uppercase mb-3">
              <TrendingUp size={13} className="text-[#168AC2]" />
              WORKFLOW
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#0B1F3A]/10 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {workflow.map((w, idx) => (
                  <div key={w.step} className="flex flex-col items-center text-center relative group">
                    {/* Step Number Circle */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#168AC2] to-[#6FC7F1] text-[#0B1F3A] font-black text-base shadow-md shadow-[#168AC2]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {w.step}
                    </div>

                    <h4 className="text-xs font-black text-[#0B1F3A] leading-tight mb-1.5">
                      {w.title}
                    </h4>

                    <p className="text-[11px] text-[#5C7591] leading-normal">
                      {w.description}
                    </p>

                    {/* Connecting line for desktop view */}
                    {idx < workflow.length - 1 && (
                      <div className="hidden lg:block absolute top-5 -right-3 w-6 h-[1.5px] bg-gradient-to-r from-[#168AC2]/40 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Skills Demonstrated */}
          <div>
            <div className="text-[10px] font-extrabold tracking-[0.16em] text-[#2483C5] uppercase mb-3">
              SKILLS DEMONSTRATED
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="bg-[#6FC7F1]/15 text-[#168AC2] border border-[#168AC2]/30 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: Full Tech Stack Breakdown */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-[#2483C5] uppercase mb-3">
              <Cpu size={13} className="text-[#168AC2]" />
              FULL TECH STACK
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl p-5 border border-[#0B1F3A]/10 shadow-sm">
              {/* Languages */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest text-[#2483C5] uppercase mb-2.5">
                  LANGUAGES
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#F4F9FE] border border-[#0B1F3A]/12 text-[#0B1F3A]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Libraries */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest text-[#2483C5] uppercase mb-2.5">
                  LIBRARIES &amp; FRAMEWORKS
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {libraries.map((lib) => (
                    <span
                      key={lib}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#F4F9FE] border border-[#0B1F3A]/12 text-[#0B1F3A]"
                    >
                      {lib}
                    </span>
                  ))}
                </div>
              </div>

              {/* Algorithms */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest text-[#2483C5] uppercase mb-2.5">
                  ALGORITHMS &amp; METHODS
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {algorithms.map((alg) => (
                    <span
                      key={alg}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#F4F9FE] border border-[#0B1F3A]/12 text-[#0B1F3A]"
                    >
                      {alg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="border-t border-[#0B1F3A]/10 p-5 md:p-6 bg-[#EAF5FF] flex items-center justify-between shrink-0">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B1F3A] hover:bg-[#168AC2] text-white font-extrabold text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Github size={15} />
              View on GitHub
            </a>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="text-xs font-bold text-[#5C7591] hover:text-[#0B1F3A] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronUp size={15} />
            Collapse
          </button>
        </div>
      </div>
    </div>
  );
}
