import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/types';

type Props = {
  project: Project;
  forceLandscape?: boolean;
  featured?: boolean;
};

const statusColors: Record<string, string> = {
  완공: 'bg-ink text-white',
  시공중: 'bg-paper-warm text-ink border border-paper-line',
  설계중: 'bg-paper-warm text-ink border border-paper-line',
};

export function ProjectCard({ project, forceLandscape = false, featured = false }: Props) {
  const isPortrait = !forceLandscape && project.featuredImageOrientation === 'portrait';

  if (featured) {
    const isFeaturedPortrait = project.featuredImageOrientation === 'portrait';

    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`group grid overflow-hidden bg-white transition ${
          isFeaturedPortrait
            ? 'md:grid-cols-[0.7fr_1.3fr] md:gap-10'
            : 'md:grid-cols-[1.2fr_0.8fr] md:gap-8'
        }`}
      >
        <div className={`relative w-full overflow-hidden bg-paper-card ${
          isFeaturedPortrait ? 'aspect-[3/4]' : 'aspect-[16/9] md:aspect-[3/2]'
        }`}>
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover transition duration-[600ms] motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 pt-6 md:py-4">
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
            {project.status ? (
              <span className={`ml-1 rounded-sm px-2 py-0.5 text-[11px] font-medium ${statusColors[project.status] ?? statusColors['완공']}`}>
                {project.status}
              </span>
            ) : null}
          </div>
          <h3 className="text-[1.4rem] font-semibold leading-snug text-ink md:text-[1.7rem]">
            {project.title}
          </h3>
          <p className="text-[14.5px] leading-relaxed text-ink-muted">
            {project.summary}
          </p>
          <span className="mt-2 text-[13px] font-medium text-ink underline underline-offset-4">
            자세히 보기 →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden bg-white transition"
    >
      <div className={`relative w-full overflow-hidden bg-paper-card ${
        isPortrait ? 'aspect-[3/4]' : 'aspect-[3/2]'
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
          {project.status ? (
            <span className={`ml-1 rounded-sm px-2 py-0.5 text-[11px] font-medium ${statusColors[project.status] ?? statusColors['완공']}`}>
              {project.status}
            </span>
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
