'use client';

import { useRef, useCallback } from 'react';

interface TiltOptions {
  max?: number; // max tilt in degrees, default 8
  scale?: number; // scale on hover, default 1.02
  speed?: number; // transition speed ms, default 400
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const { max = 8, scale = 1.02, speed = 400 } = options;
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [max, scale]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  const tiltProps = {
    ref,
    onMouseMove,
    onMouseLeave,
    style: {
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      transformStyle: 'preserve-3d' as const,
      willChange: 'transform' as const,
    },
  };

  return tiltProps;
}

