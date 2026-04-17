import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { HeroShowcase } from '@/components/HeroShowcase';
import { ImageBand } from '@/components/ImageBand';
import { DesignToReality } from '@/components/DesignToReality';
import { YouTubeShowcase } from '@/components/YouTubeShowcase';
import { getAllProjects } from '@/lib/projects';
import { company } from '@/lib/company';

// Monochrome line icons — single-stroke, ink color only. Keeps the tone
// simple and trustworthy rather than decorative.
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const IconWallet = () => (
  <Icon>
    <path d="M3 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    <path d="M3 7V6a2 2 0 0 1 2-2h11" />
    <circle cx={16} cy={13} r={1.2} />
  </Icon>
);

const IconMapPin = () => (
  <Icon>
    <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
    <circle cx={12} cy={10} r={2.4} />
  </Icon>
);

const IconCube = () => (
  <Icon>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
    <path d="M12 12l8-4.5" />
    <path d="M12 12v9" />
    <path d="M12 12L4 7.5" />
  </Icon>
);

const IconShield = () => (
  <Icon>
    <path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

const IconLayers = () => (
  <Icon>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
    <path d="M3 17l9 5 9-5" />
  </Icon>
);

const IconVR = () => (
  <Icon>
    <rect x={3} y={8.5} width={18} height={8} rx={3.5} />
    <circle cx={8} cy={12.5} r={1.3} />
    <circle cx={16} cy={12.5} r={1.3} />
    <path d="M12 10.5v4" />
  </Icon>
);

const IconDrone = () => (
  <Icon>
    <rect x={10} y={10} width={4} height={4} rx={0.5} />
    <circle cx={5} cy={5} r={1.8} />
    <circle cx={19} cy={5} r={1.8} />
    <circle cx={5} cy={19} r={1.8} />
    <circle cx={19} cy={19} r={1.8} />
    <path d="M10 10L6.5 6.5M14 10l3.5-3.5M10 14l-3.5 3.5M14 14l3.5 3.5" />
  </Icon>
);

const IconClipboard = () => (
  <Icon>
    <rect x={6} y={4.5} width={12} height={16} rx={1.5} />
    <path d="M9.5 3.5h5v3h-5z" />
    <path d="M9 11h6M9 14h6M9 17h4" />
  </Icon>
);

const IconEye = () => (
  <Icon>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx={12} cy={12} r={2.5} />
  </Icon>
);

const IconSparkle = () => (
  <Icon>
    <path d="M12 3l2.2 6.6L21 12l-6.8 2.4L12 21l-2.2-6.6L3 12l6.8-2.4L12 3z" />
  </Icon>
);

// 'em' helper: consistent bold accent — no color, just weight shift.
const Em = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-ink">{children}</strong>
);

const painPoints: Array<{
  icon: ReactNode;
  title: string;
  body: ReactNode;
}> = [
  {
    icon: <IconWallet />,
    title: '자금이 부담스러울 때',
    body: (
      <>
        <Em>토지 담보 대출</Em>과 <Em>기성고 대출</Em>로 자금 흐름부터 함께
        설계합니다.
      </>
    ),
  },
  {
    icon: <IconMapPin />,
    title: '좋은 땅을 찾기 어려울 때',
    body: (
      <>
        <Em>건축법·용적률·건폐율</Em>까지 검토해 목적에 맞는 땅을 함께
        찾아드립니다.
      </>
    ),
  },
  {
    icon: <IconCube />,
    title: '도면만으로 상상이 어려울 때',
    body: (
      <>
        <Em>3D 모델링·VR 투어·드론 합성</Em>으로 완성된 공간을 미리 체험하실 수
        있습니다.
      </>
    ),
  },
  {
    icon: <IconShield />,
    title: '시공 맡기기 불안할 때',
    body: (
      <>
        <Em>이행보증서</Em>부터 <Em>하자이행보증서</Em>까지, 면허 업체로서 끝까지
        책임집니다.
      </>
    ),
  },
];

const solutions: Array<{ step: string; title: string; body: ReactNode }> = [
  {
    step: '01',
    title: '자금 계획부터 함께 잡습니다',
    body: (
      <>
        <Em>토지 담보 대출</Em>과 <Em>기성고 대출</Em>까지, 자금 흐름을 미리
        설계해 무리 없이 진행하실 수 있도록 돕습니다.
      </>
    ),
  },
  {
    step: '02',
    title: '조건에 맞는 부지를 함께 찾습니다',
    body: (
      <>
        건축법·용적률·건폐율·입지·가격을 함께 검토해, 짓고 싶은 건물에 맞는 땅을
        소개해 드립니다.
      </>
    ),
  },
  {
    step: '03',
    title: '완성된 모습을 먼저 보여드립니다',
    body: (
      <>
        <Em>BIM 설계</Em>와 <Em>3D 모델링·VR 투어·드론 합성</Em>으로 완성 후의
        건물을 미리 걸어보실 수 있습니다.
      </>
    ),
  },
  {
    step: '04',
    title: '자재와 마감은 견적 단계에서 정합니다',
    body: (
      <>
        인테리어 시트와 자재배치도를 먼저 만들고, 이를 기반으로 <Em>상세
        견적</Em>을 내기에 <Em>추가금이 발생하지 않습니다</Em>.
      </>
    ),
  },
  {
    step: '05',
    title: '설계자가 시공 현장까지 함께합니다',
    body: (
      <>
        법적 감리 외에 <Em>설계자가 직접</Em> 현장에서 디자인 감리를 하며, 시공
        과정을 투명하게 공개합니다.
      </>
    ),
  },
];

const capabilities: Array<{
  icon: ReactNode;
  title: string;
  body: ReactNode;
}> = [
  {
    icon: <IconLayers />,
    title: 'BIM 설계 검토',
    body: (
      <>
        2D 도면으로는 보이지 않는 <Em>간섭과 오류</Em>를 시공 전에 잡습니다.
      </>
    ),
  },
  {
    icon: <IconVR />,
    title: '3D 모델링 · VR 투어',
    body: (
      <>
        스케치업으로 공간을 만들고, <Em>VR 시뮬레이션</Em>으로 지어질 건물에
        미리 들어가 봅니다.
      </>
    ),
  },
  {
    icon: <IconDrone />,
    title: '드론 합성 · 3D 프린터',
    body: (
      <>
        <Em>드론 촬영</Em>에 건물을 합성해 보여드리고, 필요 시 <Em>3D 프린터
        모형</Em>까지 제작합니다.
      </>
    ),
  },
  {
    icon: <IconClipboard />,
    title: '자재 시뮬레이션 · 상세 견적',
    body: (
      <>
        인테리어 자재를 실제로 배치한 3D 영상을 기반으로 <Em>정확한 견적</Em>을
        산출합니다.
      </>
    ),
  },
  {
    icon: <IconEye />,
    title: '디자인 감리 · 과정 공개',
    body: (
      <>
        <Em>설계자가 직접</Em> 현장 감리를 하고, 시공 과정을 남겨 투명하게
        공개합니다.
      </>
    ),
  },
  {
    icon: <IconSparkle />,
    title: '브랜딩 · 로고 디자인',
    body: (
      <>
        건물 이름, 로고, 캐릭터 디자인으로 <Em>브랜드 가치</Em>를 더합니다.
      </>
    ),
  },
];

export default function HomePage() {
  const all = getAllProjects();
  const bySlug = (slug: string) => all.find((p) => p.slug === slug);
  const pick = (slugs: string[]) =>
    slugs
      .map(bySlug)
      .filter((p): p is NonNullable<ReturnType<typeof bySlug>> => Boolean(p));

  // Showcase grid — 13개 프로젝트. 상가주택·단독주택·상업공간·숙박시설 다양성.
  // 향동(사옥, portrait)을 첫 번째로, 이후 유형별로 배치.
  const showcase = pick([
    'hyangdong-archireal-mixed-use',
    'pocheon-pumit-mixed-use',
    'beondong-mixed-use',
    'wonju-banggok-aurora-house',
    'yeongjongdo-skycity-second-house',
    'icheon-bubbly-cafe',
    'yeoju-jeombongdong-pum-house',
    'yangpyeong-asolrinchae-house',
    'yongin-bakery-cafe',
    'osan-soyland-cafe',
    'asan-aureum-complex',
    'pocheon-damhwajae-stay',
    'wonju-poolstay',
  ]);

  // Grid span config — 향동(portrait row-span-2), 이천 버블리(col-span-2)
  const gridSpan: Record<string, string> = {
    'hyangdong-archireal-mixed-use': 'lg:row-span-2',
    'icheon-bubbly-cafe': 'sm:col-span-2 lg:col-span-2',
  };
  const gridAspect: Record<string, string> = {
    'hyangdong-archireal-mixed-use': 'aspect-[3/4]',
  };

  // Video poster — shown before the YouTube iframe is ready.
  const heroPoster =
    bySlug('hyangdong-archireal-mixed-use')?.gallery[0] ||
    showcase[0]?.featuredImage ||
    '';

  // Positioning collage — 상가주택·단독주택 외관 중심.
  const collage = [
    bySlug('hyangdong-archireal-mixed-use')?.gallery[1],
    bySlug('pocheon-pumit-mixed-use')?.gallery[0],
    bySlug('wonju-banggok-aurora-house')?.gallery[0],
    bySlug('osan-soyland-cafe')?.gallery[0],
  ].filter(Boolean) as string[];

  // Full-bleed band images.
  const band1 = bySlug('yeongjongdo-skycity-second-house')?.gallery[0] || '';
  const solutionsPhoto = bySlug('pocheon-damhwajae-stay')?.gallery[0] || '';
  const band2 = bySlug('yangpyeong-asolrinchae-house')?.gallery[0] || '';

  return (
    <>
      <HeroShowcase videoId="6VyuYGZ7h7w" posterImage={heroPoster} />

      {/* 1. 대표 프로젝트 — image-overlay grid, 13개 */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
                대표 프로젝트
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
                상가주택·단독주택·카페·숙박시설까지, 아키리얼이 설계와 시공을 함께 맡은 작업들입니다.
              </p>
            </div>
            <Link
              href="/projects"
              className="self-start text-[13px] font-medium text-ink underline underline-offset-4 md:self-end"
            >
              전체 {all.length}개 프로젝트 보기 →
            </Link>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className={`group relative overflow-hidden bg-paper-card ${
                  gridSpan[p.slug] ?? ''
                } ${gridAspect[p.slug] ?? 'aspect-[4/3]'}`}
              >
                <Image
                  src={p.featuredImage}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <span className="text-[11px] font-medium tracking-[0.06em] text-white/70">
                    {p.type}
                  </span>
                  <h3 className="mt-1 text-[1rem] font-semibold leading-snug text-white md:text-[1.1rem]">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 회사 포지셔닝 — persuasive narrative after the work. */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
                자금·토지·설계·시공까지,
                <br />
                단절 없이 이어갑니다.
              </h2>
              <div className="mt-8 space-y-5 text-[15px] leading-[1.95] text-ink-soft md:text-[1.0625rem]">
                <p>
                  상가·주택·펜션 등 목적에 맞는 건물을 짓기 위해 입지 분석, 자금
                  계획, <Em>BIM 설계</Em>, <Em>3D·VR 시뮬레이션</Em>, 시공, 디자인
                  감리, 브랜딩까지 한 흐름으로 진행합니다.
                </p>
                <p>
                  단계마다 <Em>회사가 바뀌지 않기에</Em>, 처음 잡은 설계 의도가
                  시공 현장까지 그대로 이어집니다.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-paper-line pt-8 text-[13px] text-ink-muted sm:gap-6">
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
              건물주가 되고 싶은데,
              <br />
              이런 걱정이 있습니다
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              자금부터 토지, 설계, 시공까지 — 큰 결정 앞에서는 누구나 같은 걱정을
              합니다. 아키리얼은 그 걱정을 하나씩 풀어드립니다.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((p, i) => (
              <li
                key={p.title}
                className="flex flex-col gap-4 border-t-2 border-ink bg-white p-7"
              >
                <div className="flex items-center justify-between text-ink">
                  <span>{p.icon}</span>
                  <span className="text-[11px] font-medium tracking-[0.14em] text-ink-subtle">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-[1.02rem] font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="text-[13.5px] leading-[1.8] text-ink-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. 아키리얼의 방식 — split layout with side photo as visual anchor. */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
            <div>
              <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
                이 순서로 풀어갑니다
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
                자금 계획부터 토지 소개, 3D 설계, 상세 견적, 디자인 감리까지 —
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
                      <p className="mt-3 text-[14px] leading-[1.9] text-ink-muted">
                        {s.body}
                      </p>
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

      {/* 5. 시공 전 준비 */}
      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
              시공 전에 미리 보여드립니다
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              좋은 건축은 감각만으로 되지 않습니다. BIM, 3D, VR, 드론, 3D
              프린터까지 — 결과를 근거로 먼저 확인하실 수 있게 합니다.
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="border-t border-paper-line pt-6">
                <span className="text-ink">{c.icon}</span>
                <h3 className="mt-4 text-[1rem] font-semibold leading-snug text-ink">
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

      {/* 8. 건축주 후기 */}
      <section className="border-b border-paper-line bg-paper-warm">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow">TESTIMONIALS</span>
            <h2 className="mt-4 text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
              건축주가 직접 전한 이야기
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              {
                quote:
                  'VR을 보니 실제로 건물을 미리 본 것 같아서, 빨리 들어가서 살고 싶었어요.',
                name: '김 O O 님',
                project: '전원주택 건축주',
              },
              {
                quote:
                  '건축 디자인할 때도 너무 예뻐서 놀랐는데, 다 지어지고 건물도 똑같이 예쁘게 나와서 너무 만족합니다.',
                name: '최 O O 님',
                project: '단독주택 건축주',
              },
              {
                quote:
                  '시공할 때 현황 사진도 보고 매주 현장에서 미팅을 해주시니 진행 과정도 투명하고, 중간에 필요한 부분이나 막상 생각지 못했던 것도 현장에서 얘기하고 조율할 수 있어서 좋았습니다.',
                name: '박 O O 님',
                project: '상가주택 건축주',
              },
              {
                quote:
                  '외관도 마음에 드는데 내부 마감이나 디자인, 가구들까지 신경써주셔서 저한테 맞는 완벽한 집이 나온 것 같아요.',
                name: '정 O O 님',
                project: '전원주택 건축주',
              },
              {
                quote:
                  '3D 영상을 보고 실제 지어진 집을 보니 똑같은데, 오히려 실제가 더 예뻐요.',
                name: '이 O O 님',
                project: '단독주택 건축주',
              },
              {
                quote:
                  '주말에 지인들을 불러서 파티를 하는데 집이 너무 예쁘다고 부러워하고, 저도 쉬고 즐길 수 있는 공간이 생겨서 너무 좋아요.',
                name: '한 O O 님',
                project: '세컨하우스 건축주',
              },
            ].map((t) => (
              <blockquote
                key={t.name}
                className="flex flex-col justify-between border-t-2 border-ink bg-white p-7"
              >
                <p className="text-[15px] leading-[1.9] text-ink-soft md:text-[1.0625rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 text-[13px] text-ink-muted">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="ml-2">{t.project}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA — Design to Reality(다크) 다음에 다크가 한 번 더 오지 않도록
          화이트 카드로 마무리. 포커스는 섹션 전체가 아니라 다크 버튼이 담당.
          YouTubeShowcase가 null일 때도 다크→화이트 전환이 자연스럽게 살아남음. */}
      <section className="border-t border-paper-line bg-white">
        <div className="container-page grid gap-14 py-24 md:grid-cols-[1fr_1fr] md:items-end md:gap-20 md:py-28">
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-subtle">
              Contact
            </span>
            <h2 className="mt-5 text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
              어디부터 시작해야 할지
              <br />
              몰라도 괜찮습니다.
            </h2>
            <p className="mt-6 text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              부지가 있으신 분도, 설계를 받으신 분도, 아직 아무것도 정하지 못하신
              분도 — 어느 단계든 편하게 연락 주세요.
            </p>
          </div>

          <div>
            <Link
              href="/contact"
              className="group flex h-16 w-full items-center justify-between rounded-sm bg-ink px-7 text-white transition hover:bg-ink-soft"
            >
              <span className="text-[15px] font-semibold">상담 문의하기</span>
              <span
                aria-hidden="true"
                className="text-[18px] transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <a
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              className="mt-3 flex h-16 w-full items-center justify-between rounded-sm border border-paper-line px-7 text-ink transition hover:border-ink"
            >
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
                Call
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                {company.phone}
              </span>
            </a>

            <p className="mt-6 text-[12.5px] leading-[1.8] text-ink-subtle">
              평일 09:00 – 18:00 상담 · 폼 문의는 1~2영업일 내 답신 드립니다
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
