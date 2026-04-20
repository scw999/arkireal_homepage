import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/types';

type Props = {
  project: Project;
  /** Landscape aspect (cafes, commercial, stays). 5:3 pairs with 4:5 narrow at equal heights in 4+2 column grid. */
  wide?: boolean;
  /** Optional overriding index shown in the mono bottom-right. */
  index?: number;
  /** Optional sketch image shown on hover — photo fades out, sketch fades in. */
  sketchSrc?: string;
};

export function ProjectCard({ project, wide = false, index, sketchSrc }: Props) {
  const aspectClass = wide ? 'aspect-[5/3]' : 'aspect-[4/5]';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block"
    >
      <div
        className={`relative w-full overflow-hidden rounded-[6px] bg-bg-alt ${aspectClass}`}
      >
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          sizes={wide ? '(min-width: 900px) 66vw, 100vw' : '(min-width: 900px) 33vw, 100vw'}
          className={`object-cover transition duration-[1300ms] group-hover:scale-[1.05] ${
            sketchSrc ? 'group-hover:opacity-0' : ''
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.2,0.7,0.2,1)' }}
        />
        {sketchSrc ? (
          <Image
            src={sketchSrc}
            alt=""
            fill
            sizes={wide ? '(min-width: 900px) 66vw, 100vw' : '(min-width: 900px) 33vw, 100vw'}
            aria-hidden
            className="pointer-events-none absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}
        <div
          className="absolute left-3.5 top-3.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em]"
          style={{ background: 'rgba(255,255,255,0.94)', color: '#14130e' }}
        >
          {project.type}
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(180deg, transparent 55%, rgba(20,18,14,.55) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-4 bottom-3.5 flex items-center justify-between font-mono text-[11px] tracking-mono text-white opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ transform: 'translateY(6px)' }}
        >
          <span>{project.region.toUpperCase()}</span>
          <span>{project.year}</span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="h3-serif">{project.title}</h3>
        {index || project.year ? (
          <span className="whitespace-nowrap font-mono text-[12px] text-fg-mute">
            {index ? String(index).padStart(2, '0') : ''}
            {index && project.year ? ' · ' : ''}
            {project.year}
          </span>
        ) : null}
      </div>
      <div className="mt-1 text-[13px] text-fg-mute">{project.region}</div>
    </Link>
  );
}
