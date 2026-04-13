import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectPlans } from '@/components/ProjectPlans';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: '프로젝트 | 아키리얼 종합건설' };
  return {
    title: `${project.title} | 아키리얼 종합건설`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const overview: [string, string][] = [
    ['위치', project.region],
    ['용도', project.type],
    ['진행 범위', project.scope],
    ['상태', project.status],
    ['연도', project.year],
  ];

  const hasMatterport = project.matterportIds.length > 0;
  const hasDesignVideo = project.designVideoIds.length > 0;
  const hasCompletionVideo = project.completionVideoIds.length > 0;
  const hasPlans = project.plans.length > 0;
  const hasPhotos = project.photos.length > 0;

  // Find other projects for "related"
  const others = getAllProjects()
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-paper-line bg-ink text-white">
        <div className="relative min-h-[72vh] w-full overflow-hidden md:min-h-[82vh]">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" aria-hidden />

          <div className="relative flex h-full min-h-[72vh] flex-col justify-end md:min-h-[82vh]">
            <div className="container-page pb-14 pt-14 md:pb-20 md:pt-20">
              <Link
                href="/projects"
                className="text-[12px] font-medium tracking-[0.04em] text-white/70 hover:text-white"
              >
                ← 전체 프로젝트
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-[0.04em] text-white/70">
                <span>{project.region}</span>
                <span className="h-3 w-px bg-white/40" aria-hidden />
                <span>{project.type}</span>
                {project.year ? (
                  <>
                    <span className="h-3 w-px bg-white/40" aria-hidden />
                    <span>{project.year}</span>
                  </>
                ) : null}
              </div>
              <h1 className="mt-4 max-w-4xl text-[2.1rem] font-semibold leading-[1.18] tracking-tightish md:text-[3.4rem]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-white/85 md:text-[1.0625rem]">
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + description */}
      <section className="border-b border-paper-line">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:py-20">
          <div className="space-y-5 text-[15px] leading-[1.95] text-ink-soft md:text-[1.0625rem]">
            <h2 className="text-[1.5rem] font-semibold leading-snug text-ink md:text-[1.85rem]">
              프로젝트 설명
            </h2>
            <p>{project.description}</p>
            {project.keyPoints.length > 0 ? (
              <ul className="mt-6 space-y-3 border-t border-paper-line pt-6 text-[14px] text-ink-muted">
                {project.keyPoints.map((kp) => (
                  <li key={kp} className="flex gap-3">
                    <span className="mt-[0.6rem] h-px w-4 shrink-0 bg-ink-subtle" aria-hidden />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <dl className="grid h-fit gap-px bg-paper-line text-[13.5px]">
            {overview
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="flex items-center justify-between bg-white p-5">
                  <dt className="text-[11px] font-medium tracking-[0.04em] text-ink-subtle">
                    {k}
                  </dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
          </dl>
        </div>
      </section>

      {/* Floor plans — moved up so drawings read as part of the project body,
          not a footnote. Especially important for drawing-heavy projects like
          양평 아솔린채 (4 photos, 10 plans) and 밀양 그린델발트 (3 photos). */}
      {hasPlans ? (
        <section className="border-b border-paper-line">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[1.5rem] font-semibold leading-snug text-ink md:text-[1.85rem]">
                  평면과 도면
                </h2>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.9] text-ink-muted">
                  설계 단계에서 함께 검토한 평면과 면적 구성입니다. 이미지를 누르면 크게
                  볼 수 있습니다.
                </p>
              </div>
              <p className="text-[13px] text-ink-subtle">총 {project.plans.length}장</p>
            </div>
            <ProjectPlans plans={project.plans} title={project.title} />
          </div>
        </section>
      ) : null}

      {/* Photo gallery — masonry columns, natural aspect ratios */}
      {hasPhotos ? (
        <section className="border-b border-paper-line">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[1.5rem] font-semibold leading-snug text-ink md:text-[1.85rem]">
                  프로젝트 사진
                </h2>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.9] text-ink-muted">
                  사진을 누르면 크게 볼 수 있습니다.
                </p>
              </div>
              <p className="text-[13px] text-ink-subtle">총 {project.photos.length}장</p>
            </div>
            <ProjectGallery photos={project.photos} title={project.title} />
          </div>
        </section>
      ) : null}

      {/* Matterport 3D tour */}
      {hasMatterport ? (
        <section className="border-b border-paper-line">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[1.5rem] font-semibold leading-snug text-ink md:text-[1.85rem]">
                  완공 후 공간을 직접 걸어볼 수 있습니다
                </h2>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.9] text-ink-muted">
                  Matterport로 찍은 3D 가상 투어입니다. 마우스나 터치로 움직여 보시면,
                  실제 공간감과 마감, 동선까지 직접 확인하실 수 있습니다.
                </p>
              </div>
              <p className="text-[13px] text-ink-subtle">
                투어 {project.matterportIds.length}개
              </p>
            </div>

            <div className="space-y-6">
              {project.matterportIds.map((id, i) => (
                <figure key={id} className="space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden border border-paper-line bg-paper-card">
                    <iframe
                      title={`${project.title} 3D 투어 ${i + 1}`}
                      src={`https://my.matterport.com/show/?m=${id}&play=0`}
                      allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <figcaption className="text-[11px] font-medium tracking-[0.04em] text-ink-subtle">
                    3D 투어 {i + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3D 설계 영상 */}
      {hasDesignVideo ? (
        <section className="border-b border-paper-line">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10">
              <h2 className="text-[1.5rem] font-semibold leading-snug text-ink md:text-[1.85rem]">
                3D 설계 영상
              </h2>
            </div>

            <div className="space-y-6">
              {project.designVideoIds.map((id, i) => (
                <figure key={id} className="space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      title={`${project.title} 설계 영상 ${i + 1}`}
                      src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 완공 영상 */}
      {hasCompletionVideo ? (
        <section className="border-b border-paper-line">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10">
              <h2 className="text-[1.5rem] font-semibold leading-snug text-ink md:text-[1.85rem]">
                완공 영상
              </h2>
            </div>

            <div className="space-y-6">
              {project.completionVideoIds.map((id, i) => (
                <figure key={id} className="space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      title={`${project.title} 완공 영상 ${i + 1}`}
                      src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related */}
      {others.length > 0 ? (
        <section className="border-b border-paper-line">
          <div className="container-page py-16 md:py-20">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="text-[1.4rem] font-semibold leading-snug text-ink md:text-[1.7rem]">
                다른 프로젝트
              </h2>
              <Link
                href="/projects"
                className="text-[13px] font-medium text-ink underline underline-offset-4"
              >
                전체 프로젝트 →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-paper-line bg-paper-card">
                    <Image
                      src={p.featuredImage}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-[500ms] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.04em] text-ink-subtle">
                      {p.region} · {p.type}
                    </p>
                    <p className="mt-1 text-[14.5px] font-semibold text-ink">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="container-page flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="max-w-xl">
            <h2 className="text-[1.5rem] font-semibold leading-[1.35] tracking-tightish md:text-[2rem]">
              이 프로젝트가 마음에 드셨다면, 편하게 연락 주세요.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.9] text-white/75">
              아직 구체적이지 않으셔도 괜찮습니다. 먼저 검토부터 같이 해드립니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-7 text-sm font-medium text-ink transition hover:bg-paper-warm"
            >
              상담 문의하기
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-white/70 px-7 text-sm font-medium text-white transition hover:bg-white hover:text-ink"
            >
              다른 프로젝트 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
