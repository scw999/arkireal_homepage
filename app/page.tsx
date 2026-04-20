import Link from 'next/link';
import Image from 'next/image';
import { ProjectCard } from '@/components/ProjectCard';
import { HeroRotator, type HeroSlide } from '@/components/HeroRotator';
import { CompareSlider } from '@/components/CompareSlider';
import { YouTubeShowcase } from '@/components/YouTubeShowcase';
import { CinematicFilms } from '@/components/CinematicFilms';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { company } from '@/lib/company';
import {
  projectSketches,
  processSketches,
  bandSketches,
  heroSketches,
} from '@/lib/sketches';

// Wide / landscape-first project titles (카페, 근린생활 등 가로 사진).
// Matches design_handoff direction-c — 세 개의 특정 카페/근린 프로젝트만 가로.
const WIDE_TITLES = new Set([
  '용인 베이커리 카페',
  '아산 아우름 근린생활시설(상가)',
  '오산 소이랜드 카페',
  '양평 아솔린채 하우스',
  '포천 담화재 스테이',
]);

// Featured 10 projects for homepage, in design_handoff direction-c order.
// 상가주택 3개 → 세컨하우스 → 단독주택 2개 → 상업공간 3개(2개 wide) → 단독주택 1개.
// 6-col grid with alternating wide-left / wide-right rhythm.
// narrow(2) × 3 = 6, wide(4) + narrow(2) = 6 — every row balanced, no gaps.
const FEATURED_SLUGS = [
  'hyangdong-archireal-mixed-use',    // narrow 상가
  'pocheon-pumit-mixed-use',          // narrow 상가
  'beondong-mixed-use',               // narrow 상가       → row 1: 2+2+2=6
  'wonju-banggok-aurora-house',       // narrow 단독
  'yeoju-jeombongdong-pum-house',     // narrow 단독
  'yeongjongdo-skycity-second-house', // narrow 세컨       → row 2: 2+2+2=6
  'yangpyeong-asolrinchae-house',     // wide  단독
  'icheon-bubbly-cafe',               // narrow 상업       → row 3: [W|n] 4+2=6
  'okcheon-maple-mixed-use',          // narrow 상가
  'pocheon-damhwajae-stay',           // wide  숙박        → row 4: [n|W] 2+4=6
  'yongin-bakery-cafe',               // wide  상업
  'wonju-poolstay',                   // narrow 숙박       → row 5: [W|n] 4+2=6
  'ulju-sereno-second-house',         // narrow 세컨
  'osan-soyland-cafe',                // wide  상업        → row 6: [n|W] 2+4=6
  'asan-aureum-complex',              // wide  상업
  'namyangju-maeumnongjang-pension',  // narrow 숙박       → row 7: [W|n] 4+2=6
];

const HERO_EYEBROW = '설계 · 시공 · 감리를 한 팀으로';
const HERO_TITLE_1 = '설계부터 시공까지,';
const HERO_TITLE_2 = '한 팀이 끝까지 맡습니다.';
const HERO_BODY =
  '부지 검토와 설계, 3D·VR 시뮬레이션, 시공, 디자인 감리까지 — 한 팀이 처음부터 끝까지 함께합니다.';

const BADGES = [
  'MBC·JTBC·KBS 방송 출연',
  '「집짓기 진실」 저자',
  '건축공사업 등록 면허',
];

const PROCESS = [
  {
    n: '01',
    title: '자금 계획부터 함께 잡습니다',
    body: '토지 담보 대출과 기성고 대출까지, 자금 흐름을 미리 설계해 무리 없이 진행하실 수 있도록 돕습니다.',
  },
  {
    n: '02',
    title: '조건에 맞는 부지를 함께 찾습니다',
    body: '건축법·용적률·건폐율·입지·가격을 함께 검토해 짓고 싶은 건물에 맞는 땅을 소개해 드립니다.',
  },
  {
    n: '03',
    title: '완성된 모습을 먼저 보여드립니다',
    body: 'BIM 설계와 3D 모델링·VR 투어·드론 합성으로 완성 후의 건물을 미리 걸어보실 수 있습니다.',
  },
  {
    n: '04',
    title: '자재와 마감은 견적 단계에서 정합니다',
    body: '인테리어 시트와 자재배치도를 먼저 만들고, 이를 기반으로 상세 견적을 내기에 추가금이 발생하지 않습니다.',
  },
  {
    n: '05',
    title: '설계자가 시공 현장까지 함께합니다',
    body: '법적 감리 외에 설계자가 직접 현장에서 디자인 감리를 하며, 시공 과정을 투명하게 공개합니다.',
  },
];

const TECH = [
  {
    tag: 'BIM',
    title: 'BIM 설계 검토',
    body: '2D 도면으로는 보이지 않는 간섭과 오류를 시공 전에 잡습니다.',
  },
  {
    tag: '3D/VR',
    title: '3D 모델링 · VR 투어',
    body: '스케치업으로 공간을 만들고, VR 시뮬레이션으로 지어질 건물에 미리 들어가 봅니다.',
  },
  {
    tag: 'DRONE',
    title: '드론 합성 · 3D 프린터',
    body: '드론 촬영에 건물을 합성해 보여드리고, 필요 시 3D 프린터 모형까지 제작합니다.',
  },
  {
    tag: 'MATERIAL',
    title: '자재 시뮬레이션 · 상세 견적',
    body: '인테리어 자재를 실제로 배치한 3D 영상을 기반으로 정확한 견적을 산출합니다.',
  },
  {
    tag: 'SUPERVISION',
    title: '디자인 감리 · 과정 공개',
    body: '설계자가 직접 현장 감리를 하고, 시공 과정을 남겨 투명하게 공개합니다.',
  },
  {
    tag: 'BRAND',
    title: '브랜딩 · 로고 디자인',
    body: '건물 이름, 로고, 캐릭터 디자인으로 브랜드 가치를 더합니다.',
  },
];

const CONCERNS = [
  {
    n: '01',
    title: '자금이 부담스러울 때',
    body: '토지 담보 대출과 기성고 대출로 자금 흐름부터 함께 설계합니다.',
    icon: 'fund' as const,
  },
  {
    n: '02',
    title: '좋은 땅을 찾기 어려울 때',
    body: '건축법·용적률·건폐율까지 검토해 목적에 맞는 땅을 함께 찾아드립니다.',
    icon: 'land' as const,
  },
  {
    n: '03',
    title: '도면만으로 상상이 어려울 때',
    body: '3D 모델링·VR 투어·드론 합성으로 완성된 공간을 미리 체험하실 수 있습니다.',
    icon: 'sim' as const,
  },
  {
    n: '04',
    title: '시공 맡기기 불안할 때',
    body: '이행보증서부터 하자이행보증서까지, 면허 업체로서 끝까지 책임집니다.',
    icon: 'lic' as const,
  },
];

const TESTIMONIALS = [
  {
    q: 'VR을 보니 실제로 건물을 미리 본 것 같아서, 빨리 들어가서 살고 싶었어요.',
    name: '김 O O',
    role: '전원주택 건축주',
  },
  {
    q: '건축 디자인할 때도 너무 예뻐서 놀랐는데, 다 지어지고 건물도 똑같이 예쁘게 나와서 너무 만족합니다.',
    name: '최 O O',
    role: '단독주택 건축주',
  },
  {
    q: '시공할 때 현황 사진도 보고 매주 현장에서 미팅을 해주시니 진행 과정도 투명하고, 중간에 필요한 부분이나 막상 생각지 못했던 것도 현장에서 얘기하고 조율할 수 있어서 좋았습니다.',
    name: '박 O O',
    role: '상가주택 건축주',
  },
  {
    q: '외관도 마음에 드는데 내부 마감이나 디자인, 가구들까지 신경써주셔서 저한테 맞는 완벽한 집이 나온 것 같아요.',
    name: '정 O O',
    role: '전원주택 건축주',
  },
  {
    q: '3D 영상을 보고 실제 지어진 집을 보니 똑같은데, 오히려 실제가 더 예뻐요.',
    name: '이 O O',
    role: '단독주택 건축주',
  },
  {
    q: '주말에 지인들을 불러서 파티를 하는데 집이 너무 예쁘다고 부러워하고, 저도 쉬고 즐길 수 있는 공간이 생겨서 너무 좋아요.',
    name: '한 O O',
    role: '세컨하우스 건축주',
  },
];

function Icon({ name }: { name: 'fund' | 'land' | 'sim' | 'lic' }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: '#2F4A38',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (name === 'fund') {
    return (
      <svg {...common}>
        <path d="M4 24h24M6 24V14M12 24V10M18 24V16M24 24V8M20 6l4-2 2 4" />
      </svg>
    );
  }
  if (name === 'land') {
    return (
      <svg {...common}>
        <path d="M4 22l8-8 4 4 4-6 8 10M6 8h4M22 6h4" />
        <circle cx="8" cy="8" r="2" />
      </svg>
    );
  }
  if (name === 'sim') {
    return (
      <svg {...common}>
        <rect x="4" y="6" width="24" height="18" rx="1.5" />
        <path d="M4 12h24M10 6v18" />
        <circle cx="21" cy="17" r="3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M16 3l11 5v8c0 7-5 11-11 13C5 27 5 23 5 16V8l11-5z" />
      <path d="M11 16l4 4 7-8" />
    </svg>
  );
}

export default function HomePage() {
  const all = getAllProjects();

  // Hero slides — alternate photo / sketch across different projects so a
  // sketch never sits next to the photo it was generated from.
  // Order: photo A → sketch B → photo C → sketch D → photo E → sketch F → ...
  const heroPhotoSlugs = [
    'wonju-banggok-aurora-house',
    'yangpyeong-asolrinchae-house',
    'pocheon-damhwajae-stay',
    'yeongjongdo-skycity-second-house',
  ];
  const heroPhotoSlides: HeroSlide[] = heroPhotoSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getProjectBySlug>> => Boolean(p))
    .map((p) => ({
      img: p.gallery[0] || p.featuredImage,
      label: p.title,
      type: p.type,
    }));
  const heroSketchSlides: HeroSlide[] = heroSketches.map((src) => ({
    img: src,
    label: '설계 스케치',
    type: 'Sketch',
  }));
  // Interleave: photo[0], sketch[0], photo[1], sketch[1], ...
  const heroSlides: HeroSlide[] = [];
  const maxLen = Math.max(heroPhotoSlides.length, heroSketchSlides.length);
  for (let i = 0; i < maxLen; i++) {
    if (heroPhotoSlides[i]) heroSlides.push(heroPhotoSlides[i]);
    if (heroSketchSlides[i]) heroSlides.push(heroSketchSlides[i]);
  }

  // Featured 10 projects for home grid — handoff-matched order.
  const featured = FEATURED_SLUGS.map((slug) => getProjectBySlug(slug)).filter(
    (p): p is NonNullable<ReturnType<typeof getProjectBySlug>> => Boolean(p),
  );

  // Interior showcase — handoff direction-c 그대로 6장, int-*.jpg 고정 파일 사용.
  const interiors: { img: string; caption: string }[] = [
    { img: '/images/interior/int-yangpyeong-living.jpg',  caption: '양평 아솔린채 · 거실' },
    { img: '/images/interior/int-damhwajae-bed.jpg',      caption: '포천 담화재 · 한옥 침실' },
    { img: '/images/interior/int-aurora-stair.jpg',       caption: '오로라 하우스 · 계단실' },
    { img: '/images/interior/int-yeoju-terrace.jpg',      caption: '점봉동 하우스 · 테라스' },
    { img: '/images/interior/int-tiara.jpg',              caption: '아산 티아라 카페 · 내부' },
    { img: '/images/interior/int-yangpyeong-kitchen.jpg', caption: '양평 아솔린채 · 주방' },
  ];

  // BIM compare slider photos
  const compareLeft = '/images/3D_real/3d.png';
  const compareRight = '/images/3D_real/real.png';

  return (
    <>
      <HeroRotator
        slides={heroSlides}
        eyebrow={HERO_EYEBROW}
        title1={HERO_TITLE_1}
        title2={HERO_TITLE_2}
        body={HERO_BODY}
        badges={BADGES}
        phone={company.phone}
      />

      {/* PROJECTS */}
      <section id="projects" className="pad-section">
        <div className="mx-auto max-w-page">
          <div className="mb-10 grid gap-10 md:grid-cols-2 md:items-end md:gap-12">
            <div>
              <div className="eyebrow mb-4">— Selected Works · 2022–2025</div>
              <h2 className="h2-serif">
                대표 <span className="em-serif">프로젝트</span>
              </h2>
            </div>
            <p className="body-copy md:justify-self-end md:max-w-[520px]">
              <strong className="font-semibold text-fg">
                상가주택·단독주택·카페·숙박시설
              </strong>
              까지, 아키리얼이 <span className="em-hl">설계와 시공을 함께</span> 맡은
              작업들입니다.
            </p>
          </div>

          <div
            className="grid gap-y-7 gap-x-6"
            style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}
          >
            {featured.map((p, i) => {
              const isWide = WIDE_TITLES.has(p.title);
              return (
                <div
                  key={p.id}
                  className={
                    isWide
                      ? 'col-span-6 md:col-span-4'
                      : 'col-span-6 sm:col-span-3 md:col-span-2'
                  }
                >
                  <ProjectCard
                    project={p}
                    wide={isWide}
                    index={i + 1}
                    sketchSrc={projectSketches[p.slug]}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link href="/projects" className="btn-outline">
              전체 {all.length}개 프로젝트 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* INTERIOR & EXTERIOR */}
      <section className="pad-section bg-bg-alt">
        <div className="mx-auto max-w-page">
          <div className="mb-10 grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-12">
            <div>
              <div className="eyebrow mb-4">— Interior &amp; Exterior</div>
              <h2 className="h2-serif md:whitespace-nowrap">
                외관만큼 <span className="em-serif">아름다운</span> 내부
              </h2>
            </div>
            <p className="body-copy md:max-w-[560px]">
              설계부터 인테리어 마감까지{' '}
              <strong className="font-semibold text-fg">한 팀이 책임</strong>지기에, 외관의
              설계 의도가 실내 공간까지 이어집니다.{' '}
              <span className="em-hl">창호의 비율, 마감재의 질감, 빛의 방향</span>까지 —
              설계 단계에서 약속한 것을 현장에서 그대로 구현합니다.
            </p>
          </div>

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}
          >
            {interiors.map((it, i) => {
              // 핸드오프 direction-c 그대로: 3+3 / 2+2+2 / 6wide 패턴
              const spans = [
                { col: 'span 3', r: '4 / 3' },
                { col: 'span 3', r: '4 / 3' },
                { col: 'span 2', r: '1 / 1' },
                { col: 'span 2', r: '1 / 1' },
                { col: 'span 2', r: '1 / 1' },
                { col: 'span 6', r: '21 / 9' },
              ];
              const s = spans[i] ?? spans[0];
              return (
                <figure
                  key={i}
                  className="col-span-6 sm:col-span-3 md:col-auto"
                  style={{ gridColumn: s.col, margin: 0 }}
                >
                  <div
                    className="w-full overflow-hidden rounded-[4px] bg-bg"
                    style={{ aspectRatio: s.r }}
                  >
                    <Image
                      src={it.img}
                      alt={it.caption}
                      width={1600}
                      height={1200}
                      sizes="(min-width: 900px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 font-mono text-[11px] tracking-mono text-fg-mute">
                    — {it.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* PALETTE CLEANSER BAND 1 — between interior mosaic and PROCESS */}
      <div
        className="relative w-full overflow-hidden bg-bg-alt"
        style={{ aspectRatio: '21 / 9' }}
        aria-hidden
      >
        <Image
          src={bandSketches.afterInterior}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* PROCESS */}
      <section id="process" className="pad-section">
        <div className="mx-auto max-w-page">
          <div className="mb-16 max-w-[820px]">
            <div className="eyebrow mb-4">— Process · 01 → 05</div>
            <h2 className="h2-serif">
              자금·토지·설계·시공까지,
              <br />
              <span className="em-serif">단절 없이</span> 이어갑니다.
            </h2>
            <p className="body-copy mt-5">
              단계마다{' '}
              <strong className="font-semibold text-fg">회사가 바뀌지 않기에</strong>, 처음
              잡은 설계 의도가 시공 현장까지 그대로 이어집니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => {
              const sketch = processSketches[i];
              return (
                <div
                  key={p.n}
                  className="border-t-2 border-fg pt-[18px]"
                >
                  {sketch ? (
                    <div
                      className="relative mb-5 w-full overflow-hidden rounded-[4px] bg-bg-alt"
                      style={{ aspectRatio: '3 / 2' }}
                    >
                      <Image
                        src={sketch}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                        aria-hidden
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div
                    className="text-accent"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
                      fontStyle: 'italic',
                      fontWeight: 500,
                      fontSize: 'clamp(44px, 5vw, 64px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {p.n}
                  </div>
                  <h3 className="h3-serif mb-2.5 mt-5">{p.title}</h3>
                  <p className="text-[13.5px] leading-[1.7] text-fg-mute">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESIGN TO REALITY — dark */}
      <section id="tech" className="dark-surface pad-section bg-bg-deep text-bg">
        <div className="mb-6">
          <CompareSlider bim={compareLeft} photo={compareRight} labelA="3D 시뮬레이션" labelB="실제 완성" />
          <div
            className="mt-3.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-mono"
            style={{ color: 'rgba(238,234,226,0.5)' }}
          >
            <span>← DRAG TO COMPARE</span>
            <span>3D 렌더링 → 실제 시공 완성</span>
          </div>
        </div>

        <div className="mx-auto max-w-page">
          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 1, background: 'rgba(238,234,226,0.12)' }}
          >
            {TECH.map((t, i) => (
              <div
                key={t.tag}
                className="relative bg-bg-deep"
                style={{
                  padding: 'clamp(28px, 4vw, 40px) clamp(24px, 3vw, 32px)',
                  minHeight: 260,
                }}
              >
                <div
                  className="mb-11 flex items-center justify-between font-mono text-[11px]"
                  style={{ letterSpacing: '0.2em', color: '#5A7A63' }}
                >
                  <span>{t.tag}</span>
                  <span style={{ color: 'rgba(238,234,226,0.45)' }}>
                    {String(i + 1).padStart(2, '0')} / {String(TECH.length).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="mb-3.5"
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontWeight: 500,
                    fontSize: 'clamp(20px, 2vw, 24px)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.75]"
                  style={{ color: 'rgba(238,234,226,0.68)' }}
                >
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WE HEAR YOU — concerns */}
      <section className="pad-section">
        <div className="mx-auto max-w-page">
          <div className="mx-auto mb-12 max-w-[880px] text-center">
            <div className="eyebrow mb-4">— We Hear You</div>
            <h2 className="h2-serif">
              건물주가 되고 싶은데, <span className="em-serif">이런 걱정</span>이 있습니다
            </h2>
            <p className="body-copy mx-auto mt-5 max-w-[640px]">
              자금, 부지, 설계, 시공 — 단계마다 생기는 막막함. 아키리얼이{' '}
              <strong className="font-semibold text-fg">단계별로 함께 풀어갑니다</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONCERNS.map((c) => (
              <div
                key={c.n}
                className="relative rounded-[10px] border-t-[3px] border-accent bg-bg-alt"
                style={{ padding: '36px 28px 32px' }}
              >
                <div className="mb-5 flex items-start justify-between">
                  <Icon name={c.icon} />
                  <span className="font-mono text-[11px] tracking-[0.16em] text-fg-mute">
                    {c.n}
                  </span>
                </div>
                <h4
                  className="mb-3"
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontWeight: 500,
                    fontSize: 19,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.35,
                  }}
                >
                  {c.title}
                </h4>
                <p className="text-[14px] leading-[1.75] text-fg-mute">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PALETTE CLEANSER BAND 2 — between concerns and testimonials */}
      <div
        className="relative w-full overflow-hidden bg-bg-alt"
        style={{ aspectRatio: '21 / 9' }}
        aria-hidden
      >
        <Image
          src={bandSketches.afterConcerns}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* TESTIMONIALS */}
      <section className="pad-section bg-bg-alt">
        <div className="mx-auto max-w-page">
          <div className="mb-12 text-center">
            <div className="eyebrow mb-4">— Testimonials</div>
            <h2 className="h2-serif">
              건축주가 <span className="em-serif">직접</span> 전한 이야기
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-[10px] border-t-2 border-accent bg-bg"
                style={{ margin: 0, padding: '32px 28px 28px' }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
                    fontStyle: 'italic',
                    fontSize: 56,
                    color: '#2F4A38',
                    lineHeight: 0.6,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  &ldquo;
                </span>
                <blockquote
                  className="text-fg"
                  style={{
                    margin: 0,
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: 'clamp(15px, 1.3vw, 17px)',
                    lineHeight: 1.75,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.q}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-[13px] text-fg-mute">
                  <strong className="font-semibold text-fg">{t.name}</strong> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CINEMATIC FILMS — curated drone / cinematic completion films */}
      <CinematicFilms />

      {/* YOUTUBE — reuse existing component fetching from YT Data API */}
      <YouTubeShowcase />

      {/* DARK CTA */}
      <section
        id="contact"
        className="dark-surface relative overflow-hidden bg-bg-deep text-bg pad-section"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            right: -40,
            top: -40,
            fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(180px, 28vw, 420px)',
            lineHeight: 1,
            color: 'rgba(238,234,226,0.04)',
            letterSpacing: '-0.04em',
          }}
        >
          Build.
        </div>

        <div className="relative mx-auto max-w-[1200px]">
          <div
            className="eyebrow mb-6"
            style={{ color: '#5A7A63' }}
          >
            — 지금 바로 시작
          </div>

          <h2
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
              fontSize: 'clamp(44px, 7.5vw, 132px)',
              margin: 0,
              textWrap: 'balance',
            }}
          >
            <span style={{ display: 'block' }}>당신의 땅 위에,</span>
            <span style={{ display: 'block' }}>
              아키리얼이{' '}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
                  fontStyle: 'italic',
                  color: '#5A7A63',
                }}
              >
                짓습니다
              </span>
              .
            </span>
          </h2>

          <div
            className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
            style={{ marginTop: 'clamp(32px, 5vw, 56px)' }}
          >
            <p
              className="max-w-[620px]"
              style={{
                margin: 0,
                fontFamily: "'Noto Serif KR', serif",
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                lineHeight: 1.6,
                color: 'rgba(238,234,226,0.82)',
              }}
            >
              부지가 있으신 분도, 설계를 받으신 분도,{' '}
              <span
                style={{
                  color: '#5A7A63',
                  fontStyle: 'italic',
                  fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
                }}
              >
                아직 아무것도 정하지 못하신 분
              </span>
              도 — 어느 단계든 편하게 연락 주세요.
            </p>

            <div className="flex flex-col gap-3.5">
              <Link
                href="/contact"
                className="flex items-center justify-between gap-5"
                style={{
                  padding: '22px 28px',
                  background: '#2F4A38',
                  color: '#fff',
                  fontSize: 17,
                  fontWeight: 600,
                  borderRadius: 0,
                  borderRight: '4px solid #5A7A63',
                }}
              >
                <span>상담 문의하기</span>
                <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
                  <path d="M1 9h25M19 1l8 8-8 8" stroke="#fff" strokeWidth="1.8" />
                </svg>
              </Link>
              <a
                href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-between gap-5"
                style={{
                  padding: '22px 28px',
                  border: '1px solid rgba(238,234,226,0.25)',
                  color: '#F5F2EC',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 16,
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    color: 'rgba(238,234,226,0.6)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                  }}
                >
                  DIRECT LINE
                </span>
                <span>T. {company.phone}</span>
              </a>
              <div
                className="mt-1 font-mono text-[11px]"
                style={{
                  letterSpacing: '0.14em',
                  color: 'rgba(238,234,226,0.45)',
                }}
              >
                평일 09:00 – 18:00 · 1~2영업일 내 답신
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
            style={{
              marginTop: 'clamp(40px, 5vw, 64px)',
              paddingTop: 32,
              borderTop: '1px solid rgba(238,234,226,0.15)',
            }}
          >
            {[
              ['면허 등록', '건축공사업 01-4813'],
              ['이행 보증', '하자이행보증서 발급'],
              ['투명 공개', '시공 과정 전 구간 공개'],
              ['설계자 감리', '설계자 직접 현장 감리'],
            ].map(([a, b], i) => (
              <div key={a}>
                <div
                  className="mb-2 font-mono text-[11px]"
                  style={{ letterSpacing: '0.2em', color: '#5A7A63' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#F5F2EC',
                  }}
                >
                  {a}
                </div>
                <div
                  className="mt-1 text-[13px]"
                  style={{ color: 'rgba(238,234,226,0.6)' }}
                >
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
