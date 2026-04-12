import Link from 'next/link';
import { company } from '@/lib/company';

type Props = {
  videoId: string;
  posterImage: string;
};

const trustChips = [
  '종합건설업 등록',
  '설계와 시공 모두 직접',
  '부지 검토부터 감리까지',
];

export function HeroShowcase({ videoId, posterImage }: Props) {
  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
    `&controls=0&modestbranding=1&playsinline=1&rel=0` +
    `&iv_load_policy=3&disablekb=1&cc_load_policy=0&fs=0`;

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-ink text-white">
      {/* Poster fallback — visible before the video loads and on low-power devices */}
      <div
        className="absolute inset-0 scale-[1.02] bg-cover bg-center"
        style={{ backgroundImage: `url(${posterImage})` }}
        aria-hidden
      />

      {/* YouTube background — cover-fit via 16:9 math so there are no letterbox bars */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={embedSrc}
          title="아키리얼 종합건설 쇼케이스"
          allow="autoplay; encrypted-media; picture-in-picture"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        />
      </div>

      {/* Readability overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent md:from-black/70"
        aria-hidden
      />

      {/* Content — SiteHeader sits above this and carries the color logo,
          so the hero intentionally skips its own logo to avoid duplication. */}
      <div className="relative z-10 flex min-h-[92vh] flex-col">
        {/* Headline */}
        <div className="container-page flex flex-1 flex-col justify-center pt-10 md:pt-0">
          <h1 className="max-w-[20ch] text-[2.5rem] font-semibold leading-[1.14] tracking-tightish text-white md:text-[4.3rem] lg:text-[4.8rem]">
            설계부터 시공까지,
            <br />한 팀이 끝까지 맡습니다.
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-[1.95] text-white/85 md:text-[1.0625rem]">
            부지 검토와 설계, 시뮬레이션, 시공, 감리까지
            <br className="hidden md:block" />한 팀이 처음부터 끝까지 함께합니다.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-sm bg-white px-9 text-[14px] font-semibold text-ink transition hover:bg-paper-warm"
            >
              상담 문의하기
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-14 items-center justify-center rounded-sm border border-white/70 px-9 text-[14px] font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              프로젝트 보기
            </Link>
          </div>
        </div>

        {/* Trust strip — sits on top of the video, replaces the old thumbnail carousel */}
        <div className="container-page pb-10 md:pb-14">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/20 pt-5 text-[12px] font-medium text-white/75 md:text-[13px]">
            {trustChips.map((chip) => (
              <span key={chip} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden />
                {chip}
              </span>
            ))}
            <a
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              className="ml-auto inline-flex items-center gap-2 text-white"
            >
              <span className="hidden text-white/60 md:inline">상담 전화</span>
              <span className="font-semibold tracking-wide">T. {company.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
