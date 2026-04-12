'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Photo } from '@/lib/types';
import { Lightbox, type LightboxItem } from './Lightbox';

type Props = {
  photos: Photo[];
  title: string;
};

/**
 * 3-column masonry using CSS `column-count`. Each image keeps its natural
 * aspect ratio, so nothing gets cropped regardless of orientation mix.
 * Click a photo to open the shared lightbox.
 */
export function ProjectGallery({ photos, title }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!photos.length) return null;

  const items: LightboxItem[] = photos.map((p, i) => ({
    src: p.src,
    alt: `${title} ${i + 1}`,
    w: p.w,
    h: p.h,
    caption: `${title} · 사진 ${i + 1}/${photos.length}`,
  }));

  return (
    <>
      <div className="mx-auto w-full [column-fill:_balance] columns-1 gap-3 md:columns-2 md:gap-4 lg:columns-3">
        {photos.map((p, i) => (
          <figure key={p.src + i} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${title} ${i + 1} 확대 보기`}
              className="group block w-full cursor-zoom-in overflow-hidden bg-paper-card"
            >
              <Image
                src={p.src}
                width={p.w}
                height={p.h}
                alt={`${title} ${i + 1}`}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="block h-auto w-full transition duration-300 group-hover:opacity-90"
                loading={i < 3 ? 'eager' : 'lazy'}
              />
            </button>
          </figure>
        ))}
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}
