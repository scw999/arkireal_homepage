import type { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/lib/company';

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
      <section className="border-b border-paper-line bg-paper-warm">
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">ABOUT</span>
          <h1 className="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.3] tracking-tightish text-ink md:text-[2.6rem]">
            설계와 시공을 함께 책임지는 종합건설사
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
            아키리얼 종합건설은 부지 검토부터 설계, 시뮬레이션, 시공, 감리까지 한 흐름 안에서
            진행하는 회사입니다. 단계마다 회사가 바뀌지 않기 때문에, 설계 의도가 시공 결과까지 더
            일관되게 이어집니다.
          </p>
        </div>
      </section>

      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow">PRINCIPLES</span>
              <h2 className="mt-4 text-[1.6rem] font-semibold leading-snug text-ink md:text-[1.9rem]">
                우리가 일하는 방식
              </h2>
              <p className="mt-5 max-w-md text-[14.5px] leading-[1.9] text-ink-muted">
                네 가지 원칙은 아키리얼이 프로젝트를 진행하는 동안 지키는 기본 기준입니다.
              </p>
            </div>

            <ol className="grid gap-px bg-paper-line">
              {principles.map((p) => (
                <li key={p.n} className="bg-white p-7 md:p-8">
                  <div className="flex items-start gap-6">
                    <span className="text-[13px] font-semibold tracking-[0.1em] text-ink-subtle">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="text-[1.02rem] font-semibold leading-snug text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.9] text-ink-muted">{p.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-paper-line bg-paper-warm">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <span className="eyebrow">REPRESENTATIVE</span>
              <h2 className="mt-4 text-[1.6rem] font-semibold leading-snug text-ink md:text-[1.9rem]">
                대표 건축가 손창완
              </h2>
              <p className="mt-5 text-[14.5px] leading-[1.9] text-ink-muted">
                디자인과 설계 분야의 전문성에 IT·시공 기술을 결합하여, 주택 단지·병원·풀빌라·고급
                주택 분야에서 다수의 매체와 건축주로부터 인정받아 왔습니다.
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.9] text-ink-muted">
                프롭테크, VR, 3D 스캔, BIM 등 첨단 기술을 건축 현장에 직접 적용하고 있으며,
                설계 회사 밈스페이스와 함께 아키리얼 종합건설의 모든 프로젝트를 이끌고 있습니다.
              </p>

              <div className="mt-8 space-y-3 border-t border-paper-line pt-6">
                <p className="text-[13px] text-ink-muted">
                  <span className="font-semibold text-ink">저서</span>
                  <span className="ml-3">「건축주만이 알려줄 수 없는 집짓기 진실」</span>
                </p>
                <p className="text-[13px] text-ink-muted">
                  <span className="font-semibold text-ink">잡지</span>
                  <span className="ml-3">「전원속의 내 집」 커버스토리 (2023)</span>
                </p>
                <p className="text-[13px] text-ink-muted">
                  <span className="font-semibold text-ink">유튜브</span>
                  <span className="ml-3">밈건축가 채널 운영</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                방송 출연
              </h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-[1.8] text-ink-muted">
                {[
                  ['MBC', '「구해줘 홈즈」 출연 및 자문 건축가', '2020–2023'],
                  ['JTBC', '「하우스」 건축 전문가 고정 출연', '2020'],
                  ['KBS2', '「그녀들의 여유만만」 건축 전문가 고정 출연', '2019'],
                  ['SBS', '「홈데렐라」 자문 건축가', '2020'],
                  ['SBS', '「하우스 대역전」 건축가 출연', '2022'],
                  ['tvN', '「이집사람들」 출연', '2017'],
                  ['MBC', '「기분좋은날」 전문가 출연', '2019'],
                  ['EBS', '「건축 탐구 집」 출연', '2023'],
                ].map(([ch, title, year]) => (
                  <li key={title} className="flex items-baseline gap-3">
                    <span className="w-12 shrink-0 text-[12px] font-semibold text-ink">{ch}</span>
                    <span className="flex-1">{title}</span>
                    <span className="shrink-0 text-[12px] text-ink-subtle">{year}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                인증 및 등록
              </h3>
              <ul className="mt-5 space-y-2 text-[13.5px] leading-[1.8] text-ink-muted">
                <li>건축공사업 등록 (등록번호 제 01-4813호)</li>
                <li>건설공제조합 출자 · 대한건설협회 회원</li>
                <li>공인중개업 등록 (서초구청)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-paper-line">
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">COMPANY INFO</span>
          <h2 className="mt-4 text-[1.6rem] font-semibold leading-snug text-ink md:text-[1.9rem]">
            회사 정보
          </h2>
          <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.9] text-ink-muted">
            건축주가 가장 먼저 확인하는 정보들입니다. 아키리얼은 모든 항목을 공개합니다.
          </p>

          <dl className="mt-12 grid gap-px bg-paper-line md:grid-cols-2">
            {[
              ['회사명', company.legalName],
              [company.licenseLabel, company.licenseNumber],
              [company.businessRegLabel, company.businessRegNumber],
              ['대표자', company.representative],
              ['본사 주소', company.address],
              ['대표 연락처', `T. ${company.phone}`],
              ['상담 시간', '평일 09:00 – 18:00'],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-6 md:p-7">
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
                  {k}
                </dt>
                <dd className="mt-3 text-[14.5px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="container-page flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <p className="max-w-xl text-[15px] leading-[1.9] text-white/80 md:text-[1.0625rem]">
            회사와 일하는 방식을 확인하셨다면, 이제 편하게 한 번 이야기 나눠보세요.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-7 text-sm font-medium text-ink transition hover:bg-paper-warm"
          >
            상담 문의하기
          </Link>
        </div>
      </section>
    </>
  );
}
