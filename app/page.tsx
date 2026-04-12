import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { HeroShowcase } from '@/components/HeroShowcase';
import { ImageBand } from '@/components/ImageBand';
import { getAllProjects } from '@/lib/projects';
import { company } from '@/lib/company';

const painPoints = [
  {
    title: '이 땅에 정말 지을 수 있을까',
    body: '법규, 인허가, 지반, 진입로 — 시작 전에 확인할 게 생각보다 많습니다.',
  },
  {
    title: '도면만 봐서는 결과가 잘 안 그려집니다',
    body: '평면도와 입면도만으로 공간감이나 분위기를 상상하기는 쉽지 않습니다.',
  },
  {
    title: '공사 중에 금액이 바뀔까 불안합니다',
    body: '자재가 달라지거나 추가금이 생기는 건 건축주 입장에서 제일 속상한 부분입니다.',
  },
  {
    title: '설계한 대로 진짜 지어질까요',
    body: '도면과 현장 사이의 작은 차이가 결과를 크게 바꾸기도 합니다.',
  },
];

const solutions = [
  {
    step: '01',
    title: '부지부터 먼저 봅니다',
    body: '설계에 들어가기 전에 법적 조건, 인허가, 지반, 진입로까지 함께 살핍니다.',
  },
  {
    step: '02',
    title: '완성된 모습을 먼저 보여드립니다',
    body: '3D 모델과 Matterport 가상 투어로, 완성 후의 공간을 미리 걸어볼 수 있습니다.',
  },
  {
    step: '03',
    title: '자재와 마감은 견적 단계에서 정합니다',
    body: '나중에 바뀔 수 있는 부분을 처음부터 같이 정해두면, 추가금이 생길 일이 줄어듭니다.',
  },
  {
    step: '04',
    title: '설계자가 시공 현장까지 함께합니다',
    body: '도면을 그린 사람이 현장에 계속 있으니, 처음 설계한 의도가 끝까지 흐트러지지 않습니다.',
  },
  {
    step: '05',
    title: '회사 정보와 진행 과정을 숨기지 않습니다',
    body: '면허, 사업자 정보, 실제 사례까지 모두 열어둡니다. 말보다는 보여드리는 게 맞다고 생각합니다.',
  },
];

const capabilities = [
  {
    title: 'BIM 설계 검토',
    body: '2D 도면으로는 잘 보이지 않는 간섭과 오류를 시공 전에 미리 잡습니다.',
  },
  {
    title: '3D · VR · Matterport',
    body: '마감재, 채광, 동선을 시공 전에 눈으로 직접 확인할 수 있습니다.',
  },
  {
    title: '자재와 마감 사전 확정',
    body: '견적을 낼 때 자재와 마감까지 함께 정합니다. 덕분에 현장에서 바뀔 일이 줄어듭니다.',
  },
  {
    title: '설계 감리 동행',
    body: '설계자가 시공 현장까지 함께합니다. 처음 설계한 의도가 결과까지 그대로 전달됩니다.',
  },
];

export default function HomePage() {
  const all = getAllProjects();
  const bySlug = (slug: string) => all.find((p) => p.slug === slug);
  const pick = (slugs: string[]) =>
    slugs
      .map(bySlug)
      .filter((p): p is NonNullable<ReturnType<typeof bySlug>> => Boolean(p));

  // Featured 6 — drawn from the director-curated pool of 8 (mojeonri, yeongjongdo,
  // hyangdong, pocheon-pumit, yeoju-jeombongdong, beondong, wonju-banggok, yangpyeong).
  const featured = pick([
    'mojeonri-siot-house',
    'yeongjongdo-skycity-second-house',
    'hyangdong-archireal-mixed-use',
    'pocheon-pumit-mixed-use',
    'yeoju-jeombongdong-pum-house',
    'beondong-mixed-use',
  ]);

  // Video poster — shown before the YouTube iframe is ready.
  const heroPoster =
    bySlug('mojeonri-siot-house')?.gallery[0] ||
    featured[0]?.featuredImage ||
    '';

  // Positioning collage — 4 photos across 4 projects in the curated pool.
  const collage = [
    bySlug('yeongjongdo-skycity-second-house')?.gallery[2],
    bySlug('hyangdong-archireal-mixed-use')?.gallery[1],
    bySlug('yeoju-jeombongdong-pum-house')?.gallery[0],
    bySlug('pocheon-pumit-mixed-use')?.gallery[3],
  ].filter(Boolean) as string[];

  // Full-bleed band — keeps the narrative breathing between pain points and solutions.
  const band1 = bySlug('wonju-banggok-aurora-house')?.gallery[0] || '';

  // Side photos + second band for the solutions / capabilities stretch — all
  // 상가주택 or 상가(상업공간) exteriors, per the director's direction that the
  // mid-page imagery should read as commercial exteriors rather than interiors.
  const solutionsPhoto =
    bySlug('okcheon-maple-mixed-use')?.gallery[0] || '';
  const band2 = bySlug('asan-aureum-complex')?.gallery[0] || '';
  const capabilitiesPhoto =
    bySlug('pocheon-damhwajae-cafe')?.gallery[0] || '';

  return (
    <>
      <HeroShowcase videoId="6VyuYGZ7h7w" posterImage={heroPoster} />

      {/* 1. 대표 프로젝트 — first section after hero. ARCO/Haskell pattern:
          prove it with work before any narrative. Cards are 2-column on md+ so
          each featured photo reads at full thumbnail weight. */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
                대표 프로젝트
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
                아키리얼이 설계와 시공을 함께 맡아 진행한 대표 작업들입니다.
                단독주택부터 상가주택, 세컨하우스까지 골고루 담았습니다.
              </p>
            </div>
            <Link
              href="/projects"
              className="self-start text-[13px] font-medium text-ink underline underline-offset-4 md:self-end"
            >
              전체 {all.length}개 프로젝트 보기 →
            </Link>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. 회사 포지셔닝 — narrative comes after the work */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
                설계대로 지어지도록,
                <br />
                한 팀이 끝까지 맡습니다.
              </h2>
              <div className="mt-8 space-y-5 text-[15px] leading-[1.95] text-ink-soft md:text-[1.0625rem]">
                <p>
                  설계팀과 시공팀이 같은 팀입니다. 단계마다 회사가 바뀌지 않으니, 처음 잡은
                  설계 의도가 시공 현장까지 그대로 이어집니다.
                </p>
                <p>
                  짓기 전에 한 번 더 꼼꼼히 확인하고, 짓는 동안 한 번 더 들여다봅니다.
                  아키리얼이 가장 힘을 쏟는 부분입니다.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-paper-line pt-8 text-[13px] text-ink-muted">
                <div>
                  <p className="text-[2rem] font-semibold text-ink">{all.length}</p>
                  <p className="mt-1">진행·설계 프로젝트</p>
                </div>
                <div>
                  <p className="text-[2rem] font-semibold text-ink">9</p>
                  <p className="mt-1">건축 유형</p>
                </div>
                <div>
                  <p className="text-[2rem] font-semibold text-ink">1팀</p>
                  <p className="mt-1">끝까지 동행</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {collage.slice(0, 4).map((src, i) => (
                <div
                  key={src + i}
                  className={`bg-paper-card bg-cover bg-center ${
                    i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                  style={{ backgroundImage: `url(${src})` }}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Palette-cleanser band 1 */}
      {band1 ? <ImageBand image={band1} heightClass="h-64 md:h-[30rem]" /> : null}

      {/* 3. 건축주의 고민 */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
              건축주가 가장 먼저 꺼내는 걱정
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              큰 결정을 앞두면 누구나 같은 걱정을 하십니다. 아키리얼은 그 걱정부터 같이
              풀어가려 합니다.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((p, i) => (
              <li
                key={p.title}
                className="flex flex-col gap-3 border-t-2 border-ink bg-white p-7"
              >
                <span className="text-[11px] font-medium tracking-[0.14em] text-ink-subtle">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[1.02rem] font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="text-[13.5px] leading-[1.8] text-ink-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. 아키리얼의 방식 — split layout with side photo as visual anchor */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
            <div>
              <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
                아키리얼은 이렇게 풀어갑니다
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
                앞에서 이야기한 걱정에 대한 다섯 가지 답입니다. 말뿐인 약속이 아니라,
                모든 프로젝트에서 실제로 진행하는 순서입니다.
              </p>

              <ol className="mt-12 space-y-8">
                {solutions.map((s, i) => (
                  <li
                    key={s.step}
                    className={`flex gap-6 ${
                      i > 0 ? 'border-t border-paper-line pt-8' : ''
                    }`}
                  >
                    <span className="w-10 shrink-0 text-[13px] font-semibold tracking-[0.08em] text-ink-subtle">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] font-semibold leading-snug text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.9] text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div
              className="aspect-[3/4] w-full bg-paper-card bg-cover bg-center md:sticky md:top-24 md:self-start"
              style={{ backgroundImage: `url(${solutionsPhoto})` }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* Palette-cleanser band 2 */}
      {band2 ? <ImageBand image={band2} heightClass="h-64 md:h-[30rem]" /> : null}

      {/* 5. 시공 전 준비 — split layout, photo on the left */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <div
              className="aspect-[4/5] w-full bg-paper-card bg-cover bg-center md:sticky md:top-24 md:self-start"
              style={{ backgroundImage: `url(${capabilitiesPhoto})` }}
              aria-hidden
            />

            <div>
              <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
                시공 전에 여기까지 확인합니다
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
                좋은 건축은 감각만으로 되지 않습니다. 여기에 쓰는 도구들은 자랑하려는 게
                아니라, 건축주께서 안심하실 수 있도록 남기는 근거입니다.
              </p>

              <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {capabilities.map((c) => (
                  <div key={c.title} className="border-t border-paper-line pt-5">
                    <h3 className="text-[1rem] font-semibold leading-snug text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.85] text-ink-muted">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 회사 정보 */}
      <section className="border-b border-paper-line">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
              회사 정보는 모두 공개합니다
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              면허, 사업자, 주소, 연락처까지 — 확인하실 수 있어야 믿고 맡기실 수 있다고
              생각합니다.
            </p>
          </div>

          <dl className="grid gap-px bg-paper-line text-[13.5px] md:grid-cols-2">
            {[
              ['회사명', company.legalName],
              [company.licenseLabel, company.licenseNumber],
              [company.businessRegLabel, company.businessRegNumber],
              ['대표자', company.representative],
              ['본사 주소', company.address],
              ['대표 연락처', `T. ${company.phone}`],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-6">
                <dt className="text-[11px] font-medium tracking-[0.04em] text-ink-subtle">
                  {k}
                </dt>
                <dd className="mt-2 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="bg-ink text-white">
        <div className="container-page flex flex-col gap-8 py-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[1.95rem] font-semibold leading-[1.25] tracking-tightish md:text-[2.7rem]">
              어디부터 시작해야 할지
              <br />
              몰라도 괜찮습니다.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-white/75 md:text-[1.0625rem]">
              부지가 있으신 분도, 설계를 받으신 분도, 아직 아무것도 정하지 못하신 분도 —
              어느 단계든 편하게 연락 주세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-sm bg-white px-9 text-[14px] font-semibold text-ink transition hover:bg-paper-warm"
            >
              상담 문의하기
            </Link>
            <a
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex h-14 items-center justify-center rounded-sm border border-white/70 px-9 text-[14px] font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              전화로 문의하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
