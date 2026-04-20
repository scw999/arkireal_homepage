'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  bim: string;
  photo: string;
  labelA?: string;
  labelB?: string;
};

export function CompareSlider({
  bim,
  photo,
  labelA = 'BIM · 3D',
  labelB = 'COMPLETED',
}: Props) {
  const [x, setX] = useState(50);
  const ref = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(false);

  const setFromClientX = (clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setX(Math.max(0, Math.min(100, next)));
  };

  useEffect(() => {
    const mm = (e: MouseEvent) => {
      if (dragRef.current) setFromClientX(e.clientX);
    };
    const tm = (e: TouchEvent) => {
      if (dragRef.current && e.touches[0]) setFromClientX(e.touches[0].clientX);
    };
    const up = () => {
      dragRef.current = false;
    };
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', tm, { passive: true });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', tm);
      window.removeEventListener('touchend', up);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full select-none overflow-hidden bg-black"
      style={{ aspectRatio: '5 / 3', cursor: 'ew-resize' }}
      onMouseDown={(e) => {
        dragRef.current = true;
        setFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragRef.current = true;
        if (e.touches[0]) setFromClientX(e.touches[0].clientX);
      }}
    >
      {/* Right side — completed photo (full frame, revealed as slider moves left) */}
      <img
        src={photo}
        alt="completed"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Left side — 3D rendering, clipped to slider width.
          The inner image keeps a full-frame size so it doesn't warp as the clip changes. */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${x}%` }}
      >
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${(100 / (x / 100 || 1))}%`,
            maxWidth: 'none',
          }}
        >
          <img
            src={bim}
            alt="3d rendering"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      {/* Handle */}
      <div
        className="absolute bottom-0 top-0 bg-white"
        style={{
          left: `${x}%`,
          width: 2,
          transform: 'translateX(-1px)',
          boxShadow: '0 0 0 1px rgba(0,0,0,.2), 0 0 20px rgba(0,0,0,.3)',
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
          style={{ boxShadow: '0 6px 18px rgba(0,0,0,.25)' }}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path
              d="M7 1L1 7l6 6M13 1l6 6-6 6"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span
        className="absolute left-4 top-4 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-mono"
        style={{ background: 'rgba(255,255,255,.88)', color: '#111' }}
      >
        {labelA}
      </span>
      <span
        className="absolute right-4 top-4 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-mono"
        style={{ background: 'rgba(255,255,255,.88)', color: '#111' }}
      >
        {labelB}
      </span>
    </div>
  );
}
