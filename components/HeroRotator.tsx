'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type HeroSlide = {
  img: string;
  label: string;
  type: string;
};

type Props = {
  slides: HeroSlide[];
  eyebrow: string;
  title1: string;
  title2: string;
  body: string;
  badges?: string[];
  phone?: string;
  /** When set, a muted looping YouTube iframe replaces the image rotator as
   *  the hero backdrop. Slide counter/label/pagination are hidden. */
  videoBackdropId?: string;
};

export function HeroRotator({ slides, eyebrow, title1, title2, body, badges, phone, videoBackdropId }: Props) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasVideo = Boolean(videoBackdropId);

  useEffect(() => {
    if (hasVideo || slides.length < 2 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [hasVideo, slides.length, paused]);

  return (
    <section
      className="dark-surface relative w-full"
      style={{ minHeight: '100vh', paddingTop: 72 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(100vh - 72px)', minHeight: 560 }}
      >
      {hasVideo ? (
        <iframe
          title="hero backdrop"
          src={`https://www.youtube.com/embed/${videoBackdropId}?autoplay=1&mute=1&loop=1&playlist=${videoBackdropId}&controls=0&modestbranding=1&showinfo=0&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 'max(100vw, calc(100vh * 16 / 9))',
            height: 'max(100vh, calc(100vw * 9 / 16))',
            border: 0,
          }}
          aria-hidden
        />
      ) : (
        slides.map((s, i) => (
          <Image
            key={s.img}
            src={s.img}
            alt={s.label}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 1.4s ease, transform 7s ease',
            }}
          />
        ))
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,18,14,.55) 0%, rgba(20,18,14,.25) 35%, rgba(20,18,14,.65) 70%, rgba(20,18,14,.85) 100%)',
        }}
      />

      <div
        className="absolute inset-0 grid text-white"
        style={{
          padding: 'clamp(28px, 5vw, 72px) clamp(20px, 5vw, 60px)',
          gridTemplateRows: 'auto 1fr auto',
          rowGap: 20,
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div
            className="font-mono font-medium uppercase text-white/90"
            style={{
              fontSize: 'clamp(13px, 1.1vw, 15.5px)',
              letterSpacing: '0.22em',
            }}
          >
            — {eyebrow}
          </div>
          <div className="flex flex-col items-end gap-2.5">
            {!hasVideo ? (
              <>
                <div
                  className="font-mono tracking-mono text-white/95"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}
                >
                  {String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
                <div
                  className="font-mono tracking-mono text-white/85"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}
                >
                  {slides[idx].label}
                </div>
              </>
            ) : (
              <div
                className="font-mono tracking-mono text-white/85"
                style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', letterSpacing: '0.18em' }}
              >
                CINEMATIC · 양평 아솔린채
              </div>
            )}
            {!hasVideo && slides.length > 1 ? (
              <div
                role="tablist"
                aria-label="히어로 슬라이드"
                className="mt-1 flex items-center gap-2"
              >
                {slides.map((s, i) => (
                  <button
                    key={s.img}
                    type="button"
                    role="tab"
                    aria-selected={i === idx}
                    aria-label={`${i + 1}번 슬라이드: ${s.label}`}
                    onClick={() => setIdx(i)}
                    className="inline-flex h-11 w-11 items-center justify-center"
                  >
                    <span
                      aria-hidden
                      className="block h-[6px] rounded-full transition-all"
                      style={{
                        width: i === idx ? 22 : 6,
                        background: i === idx ? '#fff' : 'rgba(255,255,255,0.45)',
                      }}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="max-w-[860px] self-end">
          <h1 className="h1-hero text-white">
            {title1}
            <br />
            {title2}
          </h1>
          <p
            className="mt-6 max-w-[620px] text-white/90 sm:mt-7"
            style={{
              fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.7,
            }}
          >
            {body}
          </p>
          <div className="mt-9 flex flex-wrap gap-2.5">
            <Link href="/contact" className="btn-sharp-light">
              상담 문의하기
            </Link>
            <Link href="/projects" className="btn-sharp-ghost">
              프로젝트 보기
            </Link>
          </div>
        </div>

        {badges && badges.length > 0 ? (
          <div
            className="flex flex-col gap-3.5 font-mono text-white sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6"
            style={{
              fontSize: 'clamp(14px, 1.15vw, 17px)',
              letterSpacing: '0.12em',
            }}
          >
            <div className="flex flex-wrap gap-x-7 gap-y-2.5 sm:gap-x-9 sm:gap-y-3">
              {badges.map((b) => (
                <span key={b} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-block h-[6px] w-[6px] bg-white"
                  />
                  {b}
                </span>
              ))}
            </div>
            {phone ? (
              <a
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="flex items-baseline gap-3 text-white sm:items-center sm:gap-4"
              >
                <span
                  className="opacity-75"
                  style={{ fontSize: 'clamp(13px, 1vw, 15px)', letterSpacing: '0.14em' }}
                >
                  상담 전화
                </span>
                <span
                  className="font-semibold tracking-tight"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 'clamp(28px, 2.6vw, 38px)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                  }}
                >
                  T. {phone}
                </span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      </div>
    </section>
  );
}
