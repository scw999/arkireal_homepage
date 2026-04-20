'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cinematicFilms, type CinematicFilm } from '@/lib/cinematicFilms';

export function CinematicFilms() {
  return (
    <section className="dark-surface bg-bg-deep pad-section text-bg">
      <div className="mx-auto max-w-page">
        <div className="mb-12 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <div>
            <div
              className="eyebrow mb-4"
              style={{ color: '#5A7A63' }}
            >
              — Cinematic Films · 12 Works
            </div>
            <h2
              className="h2-serif"
              style={{ color: '#F5F2EC' }}
            >
              지어진 공간을 <span className="em-serif">영상</span>으로 만나보세요
            </h2>
          </div>
          <p
            className="body-copy md:max-w-[520px] md:justify-self-end"
            style={{ color: 'rgba(238,234,226,0.78)' }}
          >
            완공 후 실제로 지어진 건물을 드론·시네마틱 촬영으로 담았습니다. 도면이
            현장이 되는 과정의 결과물을 있는 그대로 확인하실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-2">
          {cinematicFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilmCard({ film }: { film: CinematicFilm }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="group flex flex-col gap-3">
      <div
        className="relative w-full overflow-hidden rounded-[6px] bg-black"
        style={{ aspectRatio: '16 / 9' }}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${film.id}?autoplay=1&rel=0&modestbranding=1`}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full text-left"
            aria-label={`${film.title} 영상 재생`}
          >
            {/* YouTube poster */}
            <img
              src={`https://img.youtube.com/vi/${film.id}/maxresdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)',
              }}
            />
            {/* Play glyph */}
            <div
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition group-hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.92)' }}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="#14130e" aria-hidden>
                <path d="M1 1v18l16-9L1 1z" />
              </svg>
            </div>
          </button>
        )}
      </div>
      <figcaption className="flex items-baseline justify-between gap-3">
        <div>
          <div
            className="font-mono text-[11px] tracking-[0.18em]"
            style={{ color: 'rgba(238,234,226,0.55)' }}
          >
            {film.subtitle}
          </div>
          <div
            className="mt-1"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontWeight: 500,
              fontSize: 'clamp(19px, 1.6vw, 23px)',
              letterSpacing: '-0.01em',
              color: '#F5F2EC',
            }}
          >
            {film.slug ? (
              <Link
                href={`/projects/${film.slug}`}
                className="hover:underline"
                style={{ textDecorationColor: 'rgba(238,234,226,0.4)' }}
              >
                {film.title}
              </Link>
            ) : (
              film.title
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
