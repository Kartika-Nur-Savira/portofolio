'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Position tracking using refs to avoid re-renders on every mouse move
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined') return;
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    setIsMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // 1. Move inner dot with 0 latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }

      // 2. Detect hover over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const textElement = !!target.closest('input, textarea, [contenteditable="true"]');
        const interactive = !!target.closest(
          'a, button, [role="button"], label, select, summary, .cursor-pointer, [data-cursor="pointer"]'
        );

        setIsText(textElement);
        setIsHovered(interactive && !textElement);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // 3. Smooth Lerp Loop for follower ring (60-120fps physics)
    const animateRing = () => {
      // Lerp factor 0.18 gives snappy yet fluid trailing
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animateRing);
    };

    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ─── Outer Follower Ring / Circle ─── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          width: '36px',
          height: '36px',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div
          className={`w-full h-full rounded-full border border-cyan-400/80 dark:border-cyan-300/90 transition-all duration-200 ease-out flex items-center justify-center ${
            isText
              ? 'scale-75 opacity-30 border-blue-400 bg-transparent'
              : isHovered
              ? 'scale-[1.65] bg-cyan-400/20 dark:bg-cyan-400/25 border-cyan-300 dark:border-cyan-200 shadow-[0_0_25px_rgba(56,189,248,0.55)]'
              : isClicked
              ? 'scale-[0.85] bg-cyan-500/30 border-cyan-300'
              : 'scale-100 bg-cyan-500/10 dark:bg-cyan-400/10 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
          }`}
        />
      </div>

      {/* ─── Inner Center Dot ─── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          width: '8px',
          height: '8px',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div
          className={`w-full h-full rounded-full bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.9)] transition-all duration-150 ease-out ${
            isText
              ? 'opacity-0'
              : isHovered
              ? 'scale-50 opacity-40'
              : isClicked
              ? 'scale-125 opacity-100'
              : 'scale-100 opacity-100'
          }`}
        />
      </div>
    </div>
  );
}

