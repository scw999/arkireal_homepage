import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { getAllProjects, getProjectTypes } from '@/lib/projects';

export const metadata: Metadata = {
  title: '프로젝트 | 아키리얼 종합건설',
  description:
    '전원주택, 주택단지, 숙박시설, 상업공간. 아키리얼이 준비하고 진행한 프로젝트를 확인하세요.',
};

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
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-24">
          <h1 className="max-w-3xl text-[2rem] font-semibold leading-[1.3] tracking-tightish text-ink md:text-[2.6rem]">
            진행한 프로젝트
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
            상가주택과 단독주택, 상업공간, 숙박시설, 세컨하우스, 전원주택 단지까지 —
            아키리얼이 설계와 시공을 함께 맡아 진행한 프로젝트들입니다.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page py-14 md:py-20">
          <nav className="flex items-center gap-2 overflow-x-auto border-b border-paper-line pb-6 scrollbar-none">
            {['전체', ...types].map((t) => {
              const active = t === selected;
              const href = t === '전체' ? '/projects' : `/projects?type=${encodeURIComponent(t)}`;
              return (
                <Link
                  key={t}
                  href={href}
                  className={`inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-[12.5px] transition ${
                    active
                      ? 'border-ink bg-ink text-white'
                      : 'border-paper-line text-ink-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {t}
                </Link>
              );
            })}
          </nav>

          <p className="mt-6 text-[13px] text-ink-subtle">총 {filtered.length}개 프로젝트</p>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-paper-line">
        <div className="container-page flex flex-col items-start gap-5 py-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-[15px] leading-[1.9] text-ink-muted">
            상담은 검토에서 시작합니다. 프로젝트를 둘러보신 뒤 편하게 연락 주세요.
          </p>
          <Link href="/contact" className="btn-primary">
            상담 문의하기
          </Link>
        </div>
      </section>
    </>
  );
}
