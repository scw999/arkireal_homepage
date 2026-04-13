'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';

export type LightboxItem = {
  src: string;
  alt: string;
  w?: number;
  h?: number;
  caption?: string;
};

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

export function Lightbox({ items, index, onClose, onChange }: Props) {
  const isOpen = index !== null && index >= 0 && index < items.length;

  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % items.length);
  }, [index, items.length, onChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, next, prev]);

  if (!isOpen) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 확대 보기"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="닫기"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white transition hover:bg-white/15 md:right-6 md:top-6"
      >
        ✕
      </button>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="이전"
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/5 text-[22px] text-white transition hover:bg-white/15 md:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="다음"
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/5 text-[22px] text-white transition hover:bg-white/15 md:right-6"
          >
            ›
          </button>
        </>
      ) : null}

      <figure
        className="relative flex max-h-full max-w-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={item.w ?? 1600}
          height={item.h ?? 1200}
          sizes="100vw"
          priority
          className="h-auto max-h-[84vh] w-auto max-w-full object-contain"
        />
        {item.caption ? (
          <figcaption className="mt-4 max-w-2xl px-4 text-center text-[13px] leading-relaxed text-white/85">
            {item.caption}
          </figcaption>
        ) : null}
        <div className="mt-2 text-center text-[11px] tracking-[0.12em] text-white/50">
          {index + 1} / {items.length}
        </div>
      </figure>
    </div>
  );
}
