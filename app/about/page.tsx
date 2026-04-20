import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/lib/company';

const ceoRoles = [
  '현) 건축·인테리어 설계 회사 밈스페이스 대표',
  '현) (주)아키리얼 종합건설 대표',
  '현) 빌드트리 강남 공인중개사무소 대표',
];

const ceoActivities: [string, string][] = [
  ['2014', '경기도 이천 200세대 전원주택단지 입주자협의회 대표'],
  ['2015', '독일·스위스·이탈리아·스페인·프랑스 명작 주택 순례'],
  ['2016', "판교 운중동 단독주택 개발 · 이천 고급주택단지 '파티앤타운' 타운 디렉터 (마스터플랜+CM)"],
  ['2017', '출판진흥원 우수출판콘텐츠 선정 및 베스트셀러 『건축주만이 알려줄 수 있는 집짓기 진실』 저자'],
  ['2022', '공주대학교 건축 강의'],
];

const ceoBroadcast: [string, string][] = [
  ['2017', 'tvN <이집사람들> 출연 · <서울경제> 인터뷰'],
  ['2018', '<조선일보 땅집고> 인터뷰'],
  ['2019', 'KBS2 <그녀들의 여유만만> 고정출연 · MBC <기분 좋은 날> 출연'],
  ['2020', 'JTBC <하우스> 고정 출연 · SBS <홈데렐라> 자문'],
  ['2021', 'MBC <구해줘 홈즈> 출연 및 자문'],
  ['2022', 'SBS <하우스 대역전> 출연'],
  ['2023', 'MBC <구해줘 홈즈> 아치리얼 건물 소개'],
  ['2023', '「전원속의 내 집」 1월·3월호 표지 — 아치리얼 상가주택 · 파란산책 주택단지'],
];

const ceoProfile = '/images/CEO/KakaoTalk_20260420_190729.jpg';
const ceoBookCover = '/images/CEO/건축주만이알려줄수있는집짓기진실.png';
const ceoMagazineCover = '/images/CEO/전원속의내집표지선정.png';

export const metadata: Metadata = {
  title: '회사소개 | 아키리얼 종합건설',
  description:
    '아키리얼 종합건설은 설계와 시공을 함께 책임지는 종합건설사입니다. 회사 정보와 일하는 방식을 확인하세요.',
};

const principles = [
  {
    n: '01',
    title: '한 번 더 검토하고 시작합니다',
    body: '도면이 끝나도 바로 시공에 들어가지 않습니다. 시공 단계에서 발견될 수 있는 변수를 사전에 검토합니다.',
  },
  {
    n: '02',
    title: '결과를 미리 보여드립니다',
    body: '3D 모델과 시뮬레이션으로 완성 후의 공간을 먼저 확인하실 수 있습니다. 도면만 보고 결정하실 일을 줄입니다.',
  },
  {
    n: '03',
    title: '설계와 시공이 단절되지 않게 합니다',
    body: '설계 단계의 의도가 현장까지 이어질 수 있도록 같은 흐름 안에서 관리합니다.',
  },
  {
    n: '04',
    title: '회사 정보를 공개합니다',
    body: '면허, 진행 방식, 사례를 공개합니다. 신뢰는 말이 아니라 자료로 만들어진다고 생각합니다.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        className="border-b border-line bg-bg-alt"
        style={{ padding: '120px clamp(20px, 5vw, 60px) 56px' }}
      >
        <div className="mx-auto max-w-page">
          <div className="eyebrow mb-4">— About</div>
          <h1 className="h2-serif max-w-[900px]">
            설계와 시공을 함께 <span className="em-serif">책임지는</span> 종합건설사
          </h1>
          <p className="body-copy mt-6 max-w-[680px]">
            아키리얼 종합건설은 부지 검토부터 설계, 시뮬레이션, 시공, 감리까지 한 흐름 안에서
            진행하는 회사입니다. 단계마다 회사가 바뀌지 않기 때문에, 설계 의도가 시공 결과까지
            더 일관되게 이어집니다.
          </p>
        </div>
      </section>

      <section className="pad-tight">
        <div className="mx-auto grid max-w-page gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="eyebrow mb-4">— Principles</div>
            <h2 className="h2-serif">우리가 일하는 방식</h2>
            <p className="body-copy mt-5 max-w-md">
              네 가지 원칙은 아키리얼이 프로젝트를 진행하는 동안 지키는 기본 기준입니다.
            </p>
          </div>

          <ol className="grid gap-px bg-line">
            {principles.map((p) => (
              <li key={p.n} className="bg-bg p-7 md:p-8">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-[13px] tracking-mono text-accent">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="h3-serif">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.9] text-fg-mute">
                      {p.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CEO — representative introduction */}
      <section className="pad-tight border-t border-line">
        <div className="mx-auto max-w-page">
          <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16 md:items-start">
            <div>
              <div className="eyebrow mb-4">— Representative</div>
              <h2 className="h2-serif">
                대표 건축가 <span className="em-serif">손창완</span>
              </h2>
              <p className="mt-5 font-mono text-[13px] tracking-mono text-fg-mute">
                성균관대학교 공학 학사 · 공학 석사
              </p>

              <ul className="mt-8 space-y-2 border-t border-line pt-7 text-[14.5px] leading-[1.8] text-fg">
                {ceoRoles.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-[0.75rem] h-px w-3 shrink-0 bg-accent" aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <p className="body-copy mt-8 max-w-[520px] text-fg-mute">
                2017년 <strong className="font-semibold text-fg">『건축주만이 알려줄 수
                있는 집짓기 진실』</strong>의 저자이자 출판진흥원 우수출판콘텐츠 선정·베스트셀러
                작가입니다. MBC·KBS·JTBC·SBS·tvN 등 주요 방송의 건축 전문가로{' '}
                <span className="em-hl">고정 출연·자문</span>하며, 현재는 밈스페이스 설계와
                아키리얼 종합건설 시공, 빌드트리 공인중개를 한 흐름으로 운영합니다.
              </p>
            </div>

            {/* Collage: profile + book cover + magazine cover */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <figure className="m-0">
                  <div
                    className="relative overflow-hidden rounded-[6px] bg-bg-alt"
                    style={{ aspectRatio: '3 / 4' }}
                  >
                    <Image
                      src={ceoProfile}
                      alt="손창완 대표 프로필 사진"
                      fill
                      sizes="(min-width: 768px) 28vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-[11px] tracking-mono text-fg-mute">
                    — 대표 건축가 손창완
                  </figcaption>
                </figure>
                <figure className="m-0">
                  <div
                    className="relative overflow-hidden rounded-[6px] bg-bg-alt"
                    style={{ aspectRatio: '3 / 4' }}
                  >
                    <Image
                      src={ceoBookCover}
                      alt="저서 『건축주만이 알려줄 수 있는 집짓기 진실』 표지"
                      fill
                      sizes="(min-width: 768px) 28vw, 100vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-[11px] tracking-mono text-fg-mute">
                    — 2017 저서 · 「건축주만이 알려줄 수 있는 집짓기 진실」
                  </figcaption>
                </figure>
              </div>
              <figure className="m-0">
                <div
                  className="relative overflow-hidden rounded-[6px] bg-bg-alt"
                  style={{ aspectRatio: '5 / 3' }}
                >
                  <Image
                    src={ceoMagazineCover}
                    alt="「전원속의 내 집」 1월·3월호 커버 선정"
                    fill
                    sizes="(min-width: 768px) 56vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 font-mono text-[11px] tracking-mono text-fg-mute">
                  — 2023 「전원속의 내 집」 1월·3월호 커버 · 아치리얼 상가주택 / 파란산책 주택단지
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Activity + broadcast timelines */}
          <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
            <div>
              <div className="eyebrow mb-5">— 활동 · 저서</div>
              <ol className="space-y-4 text-[14px] leading-[1.75] text-fg-mute">
                {ceoActivities.map(([year, label]) => (
                  <li key={year + label} className="flex gap-5">
                    <span className="w-12 shrink-0 font-mono text-[12.5px] tracking-mono text-accent">
                      {year}
                    </span>
                    <span className="flex-1 text-fg">{label}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <div className="eyebrow mb-5">— 방송 출연</div>
              <ol className="space-y-4 text-[14px] leading-[1.75] text-fg-mute">
                {ceoBroadcast.map(([year, label]) => (
                  <li key={year + label} className="flex gap-5">
                    <span className="w-12 shrink-0 font-mono text-[12.5px] tracking-mono text-accent">
                      {year}
                    </span>
                    <span className="flex-1 text-fg">{label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="pad-tight border-t border-line bg-bg-alt">
        <div className="mx-auto max-w-page">
          <div className="eyebrow mb-4">— Company Info</div>
          <h2 className="h2-serif">회사 정보</h2>
          <p className="body-copy mt-5 max-w-[680px]">
            건축주가 가장 먼저 확인하는 정보들입니다. 아키리얼은 모든 항목을 공개합니다.
          </p>

          <dl className="mt-12 grid gap-px bg-line md:grid-cols-2">
            {[
              ['회사명', company.legalName],
              [company.licenseLabel, company.licenseNumber],
              ['대표자', company.representative],
              ['본사 주소', company.address],
              ['대표 연락처', `T. ${company.phone}`],
              ['상담 시간', '평일 09:00 – 18:00'],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg p-6 md:p-7">
                <dt className="font-mono text-[11px] tracking-mono text-fg-mute">
                  {k}
                </dt>
                <dd className="mt-3 text-[14.5px] text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-bg-deep pad-tight text-bg">
        <div className="mx-auto flex max-w-page flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p
            className="max-w-[620px] body-copy"
            style={{ color: 'rgba(238,234,226,0.82)' }}
          >
            회사와 일하는 방식을 확인하셨다면, 이제 편하게 한 번 이야기 나눠보세요.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3 text-[14px] font-semibold text-fg transition hover:opacity-90"
          >
            상담 문의하기 →
          </Link>
        </div>
      </section>
    </>
  );
}
