'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { achievements, Achievement } from '@/data/certifications';
import {
  Trophy,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
} from 'lucide-react';

function useInView(threshold = 0.15) {
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

// ─── Lightbox Modal Component ───
interface LightboxProps {
  isOpen: boolean;
  achievement: Achievement | null;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (idx: number) => void;
}

function Lightbox({
  isOpen,
  achievement,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Keyboard controls: Escape to close, Left/Right arrow to navigate
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !achievement || !achievement.images || achievement.images.length === 0) {
    return null;
  }

  const images = achievement.images;
  const total = images.length;
  const currentImage = images[currentIndex] || images[0];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45 && total > 1) onNext();
    if (distance < -45 && total > 1) onPrev();
  };

  return (
    <div
      className="fixed inset-0 z-[999999] bg-black/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Dokumentasi ${achievement.title}`}
      onClick={onClose}
    >
      {/* ─── Top Bar ─── */}
      <div
        className="relative z-10 flex items-center justify-between text-white pb-3 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
              {achievement.award}
            </span>
            <span className="text-xs font-semibold text-slate-400">{achievement.year}</span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-white mt-1 leading-tight line-clamp-1">
            {achievement.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {total > 1 && (
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/10">
              {currentIndex + 1} / {total}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup foto"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ─── Main Image Viewer with Swipe ─── */}
      <div
        className="relative flex-1 my-3 flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-w-5xl max-h-[78vh] flex items-center justify-center">
          <Image
            src={currentImage}
            alt={`${achievement.title} - Foto ${currentIndex + 1}`}
            fill
            unoptimized
            priority
            className="object-contain drop-shadow-2xl transition-all duration-300"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </div>

        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-cyan-500/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Foto berikutnya"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-cyan-500/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* ─── Bottom Thumbnail Strip & Description ─── */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 pt-2 border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {total > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2">
            {images.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => onSelectIndex(idx)}
                aria-label={`Pilih foto ${idx + 1}`}
                className={`relative w-14 h-9 sm:w-16 sm:h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  idx === currentIndex
                    ? 'border-cyan-400 scale-105 shadow-[0_0_12px_rgba(56,189,248,0.7)]'
                    : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                }`}
              >
                <Image src={img} alt="" fill unoptimized className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}

        <p className="text-[11px] sm:text-xs text-slate-300 text-center max-w-2xl px-2">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}

// ─── Horizontal Achievement Card with Slideshow ───
interface AchievementCardProps {
  achievement: Achievement;
  onOpenLightbox: (ach: Achievement, index: number) => void;
}

function AchievementCard({ achievement, onOpenLightbox }: AchievementCardProps) {
  const images = achievement.images || [];
  const total = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Touch Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || total <= 1) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) handleNext();
    if (distance < -45) handlePrev();
  };

  const hasImages = total > 0;
  const currentImage = hasImages ? images[currentIndex] || images[0] : null;

  return (
    <div className="group bg-white dark:bg-[#071638]/90 rounded-2xl sm:rounded-3xl border border-blue-100 dark:border-blue-500/20 shadow-[0_4px_20px_rgba(11,31,58,0.04)] dark:shadow-[0_8px_24px_rgba(2,7,24,0.7)] hover:shadow-[0_12px_32px_rgba(11,31,58,0.08)] hover:border-cyan-400/40 dark:hover:border-cyan-400/50 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch">
      {/* ─── LEFT: Documentation Photo Slideshow ─── */}
      {hasImages && currentImage ? (
        <div
          className="relative w-full sm:w-[320px] md:w-[360px] lg:w-[380px] shrink-0 min-h-[210px] sm:min-h-[240px] bg-slate-900 overflow-hidden group/photo cursor-pointer select-none border-b sm:border-b-0 sm:border-r border-blue-100 dark:border-blue-500/20"
          onClick={() => onOpenLightbox(achievement, currentIndex)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Photo */}
          <div className="relative w-full h-full min-h-[210px] sm:min-h-[240px]">
            <Image
              src={currentImage}
              alt={`${achievement.title} - Foto ${currentIndex + 1}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover/photo:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 380px"
            />
          </div>

          {/* Gradient Overlay for Controls Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Photo Counter Badge (only if multiple photos) */}
          {total > 1 && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white tracking-wider flex items-center gap-1 shadow-sm">
              <Camera size={11} className="text-cyan-400" />
              <span>
                {currentIndex + 1}/{total}
              </span>
            </div>
          )}

          {/* Lightbox Trigger Hint Button (Top Right) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(achievement, currentIndex);
            }}
            aria-label="Lihat foto penuh"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/65 hover:bg-cyan-500 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all opacity-85 group-hover/photo:opacity-100 hover:scale-110 shadow-sm"
          >
            <Maximize2 size={12} />
          </button>

          {/* Previous Button (Only if multiple photos) */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-cyan-500 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover/photo:opacity-100 hover:scale-110 active:scale-95 shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Next Button (Only if multiple photos) */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Foto berikutnya"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-cyan-500 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover/photo:opacity-100 hover:scale-110 active:scale-95 shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Indicator Dots (Only if multiple photos) */}
          {total > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Beralih ke foto ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-4 bg-cyan-400'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Fallback Graphic Placeholder for Achievements without Photos */
        <div className="relative w-full sm:w-[320px] md:w-[360px] lg:w-[380px] shrink-0 min-h-[180px] sm:min-h-[240px] bg-gradient-to-br from-[#0B2559] via-[#081C44] to-[#040D24] flex flex-col items-center justify-center p-6 text-center select-none border-b sm:border-b-0 sm:border-r border-blue-100 dark:border-blue-500/20 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-md mb-2.5">
            <Trophy size={28} className="text-amber-400" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            {achievement.award}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 mt-1">Official Award</span>
        </div>
      )}

      {/* ─── RIGHT: Achievement Information ─── */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Award Badge & Year */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-500/30 text-[10px] font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              {achievement.award}
            </span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">•</span>
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
              {achievement.year}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-extrabold text-[#0B2559] dark:text-white text-lg sm:text-xl leading-snug transition-colors">
            {achievement.title}
          </h4>

          {/* Event & Organizer */}
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 mb-3">
            {achievement.event} <span className="text-slate-300 dark:text-slate-600">|</span>{' '}
            {achievement.organizer}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {achievement.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
          {achievement.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-500/20 text-[10px] sm:text-xs font-medium text-blue-900 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const { ref, inView } = useInView();

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    achievement: Achievement | null;
    currentIndex: number;
  }>({
    isOpen: false,
    achievement: null,
    currentIndex: 0,
  });

  const handleOpenLightbox = (ach: Achievement, index: number) => {
    setLightbox({
      isOpen: true,
      achievement: ach,
      currentIndex: index,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLightboxPrev = () => {
    if (!lightbox.achievement || !lightbox.achievement.images) return;
    const total = lightbox.achievement.images.length;
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + total) % total,
    }));
  };

  const handleLightboxNext = () => {
    if (!lightbox.achievement || !lightbox.achievement.images) return;
    const total = lightbox.achievement.images.length;
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % total,
    }));
  };

  const handleLightboxSelect = (idx: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: idx }));
  };

  return (
    <section
      id="education"
      className="relative bg-[#F0F6FF] dark:bg-[#020718] py-24 sm:py-28 overflow-hidden select-none transition-colors duration-500"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* ─── Header ─── */}
        <div
          className={`mb-10 text-center max-w-2xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#071638] border border-blue-200/80 dark:border-blue-500/20 shadow-sm text-xs font-bold text-[#0B2559] dark:text-cyan-300 mb-3">
            <Sparkles size={12} className="text-cyan-500" />
            <span>Honors &amp; Recognition</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B2559] dark:text-white leading-tight tracking-tight transition-colors">
            Competition &amp;{' '}
            <span className="bg-gradient-to-r from-[#0B2559] via-[#1E3A8A] to-[#2563EB] dark:from-white dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-3">
            Pencapaian kompetisi sains data, inovasi edukasi, dan sertifikasi keahlian.
          </p>
        </div>

        {/* ─── Horizontal Achievement Cards with Slideshow & Lightbox ─── */}
        <div
          className={`space-y-6 transition-all duration-700 delay-150 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {achievements.map((ach) => (
            <AchievementCard
              key={ach.id}
              achievement={ach}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}

          
        </div>
      </div>

      {/* ─── Lightbox Fullscreen Modal ─── */}
      <Lightbox
        isOpen={lightbox.isOpen}
        achievement={lightbox.achievement}
        currentIndex={lightbox.currentIndex}
        onClose={handleCloseLightbox}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
        onSelectIndex={handleLightboxSelect}
      />
    </section>
  );
}
