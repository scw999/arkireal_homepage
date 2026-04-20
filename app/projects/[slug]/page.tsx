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

  const allOthers = getAllProjects().filter((p) => p.slug !== project.slug);
  const sameType = allOthers.filter((p) => p.type === project.type);
  const diffType = allOthers.filter((p) => p.type !== project.type);
  const others = [...sameType, ...diffType].slice(0, 3);

  return (
    <>
      {/* Back link + eyebrow / title */}
      <section style={{ padding: '120px clamp(20px, 5vw, 60px) 40px' }}>
        <div className="mx-auto max-w-page">
          <Link
            href="/projects"
            className="font-mono text-[12px] tracking-mono text-fg-mute transition hover:text-fg"
          >
            ← 전체 프로젝트
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-mono text-accent">
            <span>— {project.type.toUpperCase()}</span>
            {project.year ? (
              <>
                <span className="h-3 w-px bg-line" aria-hidden />
                <span>{project.year}</span>
              </>
            ) : null}
          </div>

          <h1
            className="mt-5 max-w-[1000px]"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              fontSize: 'clamp(36px, 6vw, 80px)',
              textWrap: 'balance',
            }}
          >
            {project.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6 font-mono text-[12px] tracking-mono text-fg-mute">
            <span>LOCATION · {project.region}</span>
            {project.scope ? <span>SCOPE · {project.scope}</span> : null}
            {project.status ? <span>STATUS · {project.status}</span> : null}
          </div>
        </div>
      </section>

      {/* Hero image — full bleed */}
      <section style={{ padding: '0 clamp(20px, 5vw, 60px) clamp(48px, 7vw, 100px)' }}>
        <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-[6px] bg-bg-alt" style={{ aspectRatio: project.featuredImageOrientation === 'portrait' ? '3 / 4' : '16 / 9' }}>
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Description + spec sidebar */}
      <section className="pad-tight border-t border-line">
        <div className="mx-auto grid max-w-page gap-12 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="eyebrow mb-4">— 프로젝트 설명</div>
            <div className="body-copy space-y-5 text-fg">
              <p>{project.summary}</p>
              {project.description ? <p>{project.description}</p> : null}
            </div>

            {project.keyPoints.length > 0 ? (
              <ul className="mt-8 space-y-3 border-t border-line pt-8 text-[14.5px] text-fg-mute">
                {project.keyPoints.map((kp) => (
                  <li key={kp} className="flex gap-3">
                    <span
                      className="mt-[0.65rem] h-px w-4 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="md:sticky md:top-24 md:self-start">
            <div className="eyebrow mb-4">— Specs</div>
            <dl className="grid gap-px bg-line text-[13.5px]">
              {overview
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-start justify-between gap-4 bg-bg p-5"
                  >
                    <dt className="font-mono text-[11px] tracking-mono text-fg-mute">
                      {k}
                    </dt>
                    <dd className="text-right text-fg">{v}</dd>
                  </div>
                ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Plans */}
      {hasPlans ? (
        <section className="pad-tight border-t border-line bg-bg-alt">
          <div className="mx-auto max-w-page">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="eyebrow mb-3">— Plans &amp; Drawings</div>
                <h2 className="h2-serif">평면과 도면</h2>
                <p className="body-copy mt-4 max-w-[640px]">
                  설계 단계에서 함께 검토한 평면과 면적 구성입니다. 이미지를 누르면 크게 볼
                  수 있습니다.
                </p>
              </div>
              <p className="font-mono text-[11px] tracking-mono text-fg-mute">
                총 {project.plans.length}장
              </p>
            </div>
            <ProjectPlans plans={project.plans} title={project.title} />
          </div>
        </section>
      ) : null}

      {/* Photos */}
      {hasPhotos ? (
        <section className="pad-tight border-t border-line">
          <div className="mx-auto max-w-page">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="eyebrow mb-3">— Gallery</div>
                <h2 className="h2-serif">프로젝트 사진</h2>
                <p className="body-copy mt-4 max-w-[640px]">
                  사진을 누르면 크게 볼 수 있습니다.
                </p>
              </div>
              <p className="font-mono text-[11px] tracking-mono text-fg-mute">
                총 {project.photos.length}장
              </p>
            </div>
            <ProjectGallery photos={project.photos} title={project.title} />
          </div>
        </section>
      ) : null}

      {/* Matterport */}
      {hasMatterport ? (
        <section className="pad-tight border-t border-line">
          <div className="mx-auto max-w-page">
            <div className="mb-10">
              <div className="eyebrow mb-3">— 3D Tour</div>
              <h2 className="h2-serif">완공 후 공간을 직접 걸어볼 수 있습니다</h2>
              <p className="body-copy mt-4 max-w-[640px]">
                Matterport로 찍은 3D 가상 투어입니다. 마우스나 터치로 움직여 보시면 실제
                공간감과 마감, 동선까지 직접 확인하실 수 있습니다.
              </p>
            </div>

            <div className="space-y-6">
              {project.matterportIds.map((id, i) => (
                <figure key={id} className="space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden border border-line bg-bg-alt">
                    <iframe
                      title={`${project.title} 3D 투어 ${i + 1}`}
                      src={`https://my.matterport.com/show/?m=${id}&play=0`}
                      allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <figcaption className="font-mono text-[11px] tracking-mono text-fg-mute">
                    3D 투어 {i + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Design videos */}
      {hasDesignVideo ? (
        <section className="pad-tight border-t border-line">
          <div className="mx-auto max-w-page">
            <div className="mb-10">
              <div className="eyebrow mb-3">— Design Video</div>
              <h2 className="h2-serif">3D 설계 영상</h2>
              <p className="body-copy mt-4 max-w-[640px]">
                시공 전 3D 모델링으로 완성될 건물의 모습을 미리 확인한 영상입니다.
              </p>
            </div>

            <div className="space-y-6">
              {project.designVideoIds.map((id, i) => (
                <div
                  key={id}
                  className="relative aspect-video w-full overflow-hidden rounded-[8px] bg-black"
                >
                  <iframe
                    title={`${project.title} 설계 영상 ${i + 1}`}
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Completion videos */}
      {hasCompletionVideo ? (
        <section className="pad-tight border-t border-line">
          <div className="mx-auto max-w-page">
            <div className="mb-10">
              <div className="eyebrow mb-3">— Completion Video</div>
              <h2 className="h2-serif">완공 영상</h2>
              <p className="body-copy mt-4 max-w-[640px]">
                완공 후 실제 건물의 외관과 내부를 촬영한 영상입니다.
              </p>
            </div>

            <div className="space-y-6">
              {project.completionVideoIds.map((id, i) => (
                <div
                  key={id}
                  className="relative aspect-video w-full overflow-hidden rounded-[8px] bg-black"
                >
                  <iframe
                    title={`${project.title} 완공 영상 ${i + 1}`}
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related */}
      {others.length > 0 ? (
        <section className="pad-tight border-t border-line bg-bg-alt">
          <div className="mx-auto max-w-page">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <div className="eyebrow mb-3">— More Projects</div>
                <h2 className="h2-serif">다른 프로젝트</h2>
              </div>
              <Link
                href="/projects"
                className="hidden font-mono text-[12px] tracking-mono text-fg underline underline-offset-4 md:inline-flex"
              >
                전체 프로젝트 →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {others.map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-bg">
                    <Image
                      src={p.featuredImage}
                      alt={p.title}
                      fill
                      sizes="(min-width: 900px) 33vw, 100vw"
                      className="object-cover transition duration-[1300ms] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="mt-4 font-mono text-[11px] tracking-mono text-fg-mute">
                    {p.region} · {p.type}
                  </div>
                  <h3 className="h3-serif mt-1.5">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="dark-surface bg-bg-deep pad-section text-bg">
        <div className="mx-auto flex max-w-page flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <div
              className="eyebrow mb-3"
              style={{ color: '#5A7A63' }}
            >
              — Get in touch
            </div>
            <h2
              className="h2-serif"
              style={{ color: '#F5F2EC' }}
            >
              이 프로젝트가 마음에 드셨다면, <span className="em-serif" style={{ color: '#5A7A63' }}>편하게</span> 연락 주세요.
            </h2>
            <p
              className="body-copy mt-5"
              style={{ color: 'rgba(238,234,226,0.75)' }}
            >
              아직 구체적이지 않으셔도 괜찮습니다. 먼저 검토부터 같이 해드립니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3 text-[14px] font-semibold text-fg transition hover:opacity-90"
            >
              상담 문의하기 →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[14px] font-medium text-bg transition hover:bg-white/10"
            >
              다른 프로젝트 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
