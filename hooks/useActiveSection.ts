'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }

          // Pick the section with the highest visibility
          let best = '';
          let bestRatio = 0;
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              best = sectionId;
              bestRatio = ratio;
            }
          });
          if (best) setActive(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}

