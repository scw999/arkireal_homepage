import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { getAllProjects, getProjectTypes } from '@/lib/projects';

export const metadata: Metadata = {
  title: '프로젝트 | 아키리얼 종합건설',
  description:
    '상가주택·단독주택·카페·숙박시설까지, 아키리얼이 설계와 시공을 함께 맡은 작업들을 확인하세요.',
};

const WIDE_TYPES = new Set(['상업공간', '숙박시설']);

type Props = {
  searchParams?: Promise<{ type?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const all = getAllProjects();
  const types = getProjectTypes();
  const sp = (await searchParams) ?? {};
  const selected = sp.type ?? '전체';

  const filtered =
    selected === '전체' ? all : all.filter((p) => p.type === selected);

  return (
    <>
      {/* Hero — small, left-aligned */}
      <section
        className="border-b border-line"
        style={{ padding: '120px clamp(20px, 5vw, 60px) 56px' }}
      >
        <div className="mx-auto max-w-page">
          <div className="eyebrow mb-4">— Portfolio</div>
          <h1 className="h2-serif">
            {all.length}개의 <span className="em-serif">완성된</span> 공간
          </h1>
          <p className="body-copy mt-5 max-w-[640px]">
            상가주택·단독주택·카페·숙박시설·세컨하우스까지 — 아키리얼이 설계와 시공을 함께
            맡아 진행한 프로젝트들입니다.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="pad-section">
        <div className="mx-auto max-w-page">
          <nav className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-6">
            {['전체', ...types].map((t) => {
              const active = t === selected;
              const href =
                t === '전체'
                  ? '/projects'
                  : `/projects?type=${encodeURIComponent(t)}`;
              return (
                <Link
                  key={t}
                  href={href}
                  className={`inline-flex h-9 shrink-0 items-center rounded-full px-4 text-[12.5px] transition ${
                    active
                      ? 'bg-fg text-bg'
                      : 'border border-line text-fg-mute hover:border-fg hover:text-fg'
                  }`}
                >
                  {t}
                </Link>
              );
            })}
          </nav>

          <p className="mt-5 font-mono text-[11px] tracking-mono text-fg-mute">
            총 {filtered.length}개 프로젝트
          </p>

          <div
            className="mt-10 grid gap-y-10 gap-x-6"
            style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}
          >
            {filtered.map((p, i) => {
              const isWide = WIDE_TYPES.has(p.type);
              return (
                <div
                  key={p.id}
                  className="col-span-6 sm:col-span-3 md:col-span-2"
                  style={isWide ? { gridColumn: 'span 4' } : undefined}
                >
                  <ProjectCard project={p} wide={isWide} index={i + 1} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Close CTA */}
      <section className="border-t border-line pad-tight">
        <div className="mx-auto flex max-w-page flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="body-copy max-w-[600px]">
            상담은 검토에서 시작합니다. 프로젝트를 둘러보신 뒤 편하게 연락 주세요.
          </p>
          <Link href="/contact" className="btn-primary">
            상담 문의하기 →
          </Link>
        </div>
      </section>
    </>
  );
}
