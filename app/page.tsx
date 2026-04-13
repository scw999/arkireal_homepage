import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { HeroShowcase } from '@/components/HeroShowcase';
import { ImageBand } from '@/components/ImageBand';
import { DesignToReality } from '@/components/DesignToReality';
import { YouTubeShowcase } from '@/components/YouTubeShowcase';
import { getAllProjects } from '@/lib/projects';
import { company } from '@/lib/company';

const painPoints = [
  {
    title: '건축 자금이 부족합니다',
    body: '땅을 사고 건물까지 올리려면 현금이 많이 필요합니다. 토지 담보 대출과 건축자금 대출(기성고 대출)로 해결할 수 있도록 안내해 드립니다.',
  },
  {
    title: '좋은 땅을 찾기 어렵습니다',
    body: '짓고 싶은 건물에 맞는 땅인지, 건축법·용적률·건폐율은 괜찮은지 — 입지와 가격 조건에 맞는 토지를 함께 찾아드립니다.',
  },
  {
    title: '도면만 봐서는 결과가 잘 안 그려집니다',
    body: '평면도와 입면도만으로 공간감을 상상하기 어렵습니다. 3D 모델링, VR 투어, 드론 합성으로 미리 지어진 건물을 체험할 수 있습니다.',
  },
  {
    title: '큰돈 들여 시공 맡기기 불안합니다',
    body: '이행보증서 발행, 설계 단계의 상세 견적으로 추가금 방지, 하자이행보증서까지 — 면허 업체로서 끝까지 책임집니다.',
  },
];

const solutions = [
  {
    step: '01',
    title: '자금 계획부터 함께 잡습니다',
    body: '토지 담보 대출, 건축자금 대출(기성고 대출)까지 자금 흐름을 미리 설계하여 무리 없이 진행할 수 있도록 도와드립니다.',
  },
  {
    step: '02',
    title: '조건에 맞는 부지를 함께 찾습니다',
    body: '건축법, 용적률, 건폐율, 입지, 가격 — 짓고 싶은 건물에 맞는 땅을 함께 검토하고 소개해 드립니다.',
  },
  {
    step: '03',
    title: '완성된 모습을 먼저 보여드립니다',
    body: 'BIM 설계와 3D 모델링, VR 시뮬레이션 투어, 드론 합성으로 완성 후의 건물을 미리 걸어보실 수 있습니다.',
  },
  {
    step: '04',
    title: '자재와 마감은 견적 단계에서 정합니다',
    body: '인테리어 시트와 자재배치도를 만들고, 이를 기반으로 상세 견적을 내기 때문에 추가금이 발생할 수 없습니다.',
  },
  {
    step: '05',
    title: '설계자가 시공 현장까지 함께합니다',
    body: '법적 감리 외에 설계자가 직접 현장에서 디자인 감리를 하며, 시공 과정을 공개하여 투명하게 진행합니다.',
  },
];

const capabilities = [
  {
    title: 'BIM 설계 검토',
    body: '2D 도면으로는 잘 보이지 않는 간섭과 오류를 시공 전에 미리 잡습니다.',
  },
  {
    title: '3D 모델링 · VR 투어',
    body: '스케치업으로 공간을 만들고, VR 시뮬레이션으로 미리 지어질 건물에서 살아볼 수 있습니다.',
  },
  {
    title: '드론 합성 · 3D 프린터',
    body: '토지를 드론으로 촬영해 건물을 합성하고, 필요시 3D 프린터로 건물 모형을 제작합니다.',
  },
  {
    title: '자재 시뮬레이션 · 상세 견적',
    body: '인테리어 자재를 실제로 배치한 3D 영상을 만들고, 이를 기반으로 정확한 견적을 냅니다.',
  },
  {
    title: '디자인 감리 · 과정 공개',
    body: '설계자가 현장에서 직접 감리하고, 시공 과정을 남기고 공개하여 투명하게 진행합니다.',
  },
  {
    title: '브랜딩 · 로고 디자인',
    body: '건물에 맞는 이름, 로고, 캐릭터 디자인을 통해 건물의 브랜드 가치를 높여드립니다.',
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
                자금·토지·설계·시공까지,
                <br />
                한 팀이 끝까지 맡습니다.
              </h2>
              <div className="mt-8 space-y-5 text-[15px] leading-[1.95] text-ink-soft md:text-[1.0625rem]">
                <p>
                  상가, 주택, 펜션 등 목적에 정확히 부합하는 건물을 짓기 위해 입지 분석부터
                  자금 계획, BIM 설계, 3D·VR 시뮬레이션, 시공, 디자인 감리, 브랜딩까지
                  한 흐름으로 진행합니다.
                </p>
                <p>
                  단계마다 회사가 바뀌지 않으니, 처음 잡은 설계 의도가 시공 현장까지
                  그대로 이어집니다. 아키리얼이 가장 힘을 쏟는 부분입니다.
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
              건물주가 되고 싶은데, 이런 걱정이 있습니다
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              자금부터 토지, 설계, 시공까지 — 큰 결정을 앞두면 누구나 같은 걱정을 합니다.
              아키리얼은 그 걱정을 하나씩 풀어드립니다.
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
                우리는 이렇게 건축의 문제를 해결합니다
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
                자금 계획부터 토지 소개, 3D 설계, 상세 견적, 디자인 감리까지 — 말뿐인
                약속이 아니라 모든 프로젝트에서 실제로 진행하는 순서입니다.
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

      {/* 5. 시공 전 준비 — full-width grid for 6 capabilities */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
              시공 전에 여기까지 확인합니다
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              좋은 건축은 감각만으로 되지 않습니다. BIM, 3D, VR, 드론, 3D 프린터까지 —
              건축주께서 안심하실 수 있도록 결과를 미리 보여드리는 근거입니다.
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* 6. 3D → 실제 시공 쇼케이스 */}
      <DesignToReality />

      {/* 7. 밈건축가 유튜브 */}
      <YouTubeShowcase />

      {/* 8. 회사 정보 */}
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

      {/* 9. CTA */}
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
