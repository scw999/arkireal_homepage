'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Plan } from '@/lib/types';
import { Lightbox, type LightboxItem } from './Lightbox';

type Props = {
  plans: Plan[];
  title: string;
};

/**
 * Plans split into two layouts:
 * - "table" (wide 면적내용 strip): rendered full-width, stacked at top
 * - "floor" (floor plans): rendered in a 2–3 column grid with object-contain on white
 *
 * Click any drawing to open a shared lightbox. Tables appear first in the
 * lightbox order so indices line up with the visual layout above.
 */
export function ProjectPlans({ plans, title }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!plans.length) return null;

  const tables = plans.filter((p) => p.kind === 'table');
  const floors = plans.filter((p) => p.kind === 'floor');
  const ordered = [...tables, ...floors];

  const items: LightboxItem[] = ordered.map((p, i) => {
    const isTable = p.kind === 'table';
    const label = isTable ? '면적 구성' : '평면도';
    const localIndex = isTable ? i + 1 : i - tables.length + 1;
    return {
      src: p.src,
      alt: `${title} ${label} ${localIndex}`,
      w: p.w,
      h: p.h,
      caption: `${title} · ${label} ${localIndex}`,
    };
  });

  return (
    <>
      <div className="flex flex-col gap-8 md:gap-10">
        {tables.length > 0 ? (
          <div className="flex flex-col gap-4">
            {tables.map((p, i) => (
              <figure
                key={p.src + i}
                className="w-full overflow-hidden border border-line bg-bg p-3 md:p-5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`면적 구성표 ${i + 1} 확대 보기`}
                  className="block w-full cursor-zoom-in"
                >
                  <Image
                    src={p.src}
                    width={p.w}
                    height={p.h}
                    alt={`${title} 면적 구성표 ${i + 1}`}
                    sizes="100vw"
                    className="block h-auto w-full"
                  />
                </button>
              </figure>
            ))}
          </div>
        ) : null}

        {floors.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {floors.map((p, i) => (
              <figure
                key={p.src + i}
                className="flex flex-col gap-3 border border-line bg-bg p-5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(tables.length + i)}
                  aria-label={`평면도 ${i + 1} 확대 보기`}
                  className="relative flex aspect-[4/3] cursor-zoom-in items-center justify-center"
                >
                  <Image
                    src={p.src}
                    width={p.w}
                    height={p.h}
                    alt={`${title} 평면도 ${i + 1}`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                </button>
                <figcaption className="font-mono text-[11px] tracking-mono text-fg-mute">
                  평면도 {String(i + 1).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
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
