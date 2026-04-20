import { getLatestVideos } from '@/lib/youtube';

export async function YouTubeShowcase() {
  const videos = await getLatestVideos(6);

  if (videos.length === 0) return null;

  return (
    <section className="pad-section">
      <div className="mx-auto max-w-page">
        <div className="mb-10 grid gap-10 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <div className="eyebrow mb-4">— 밈건축가 · YouTube</div>
            <h2 className="h2-serif">
              건축 이야기를 <span className="em-serif">영상</span>으로 전합니다
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="body-copy md:max-w-[440px]">
              유튜브{' '}
              <strong className="font-semibold text-fg">&lsquo;밈건축가&rsquo;</strong>{' '}
              채널에서{' '}
              <span className="em-hl">3D 디자인, 집짓기 과정, 완공 영상</span>을 꾸준히
              공유하고 있습니다.
            </p>
            <a
              href="https://www.youtube.com/@spacememe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-5"
            >
              채널 바로가기 →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="relative w-full overflow-hidden rounded-[8px] bg-black" style={{ aspectRatio: '16 / 9' }}>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
