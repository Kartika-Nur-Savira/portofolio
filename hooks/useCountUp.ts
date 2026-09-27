'use client';

import { useEffect, useState } from 'react';

export function useCountUp(target: number, inView: boolean, duration = 1200): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);

  return value;
}

