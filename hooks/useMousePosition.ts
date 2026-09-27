'use client';

import { useEffect, useState } from 'react';

interface MousePosition {
  x: number; // -1 to 1 (left to right)
  y: number; // -1 to 1 (top to bottom)
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setPos({ x: currentX, y: currentY });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return pos;
}

