import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden bg-white transition"
    >
      <div className={`relative w-full overflow-hidden bg-paper-card ${
        project.featuredImageOrientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[3/2]'
      }`}>
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-[600ms] motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 pt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-subtle">
          <span>{project.region}</span>
          <span className="h-3 w-px bg-paper-line" aria-hidden />
          <span>{project.type}</span>
          {project.year ? (
            <>
              <span className="h-3 w-px bg-paper-line" aria-hidden />
              <span>{project.year}</span>
            </>
          ) : null}
        </div>
        <h3 className="text-[1.15rem] font-semibold leading-snug text-ink md:text-[1.25rem]">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-[13.5px] leading-relaxed text-ink-muted">
          {project.summary}
        </p>
      </div>
    </Link>
  );
}
