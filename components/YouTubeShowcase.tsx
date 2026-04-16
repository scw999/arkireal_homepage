import { getLatestVideos } from '@/lib/youtube';

export async function YouTubeShowcase() {
  const videos = await getLatestVideos(6);

  if (videos.length === 0) return null;

  return (
    <section className="border-b border-paper-line">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">밈건축가 YouTube</p>
            <h2 className="mt-4 text-[1.95rem] font-semibold leading-[1.22] tracking-tightish text-ink md:text-[2.7rem]">
              건축 이야기를 영상으로 전합니다
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
              유튜브 채널 &lsquo;밈건축가&rsquo;에서 3D 디자인, 집짓기 과정,
              완공 영상을 꾸준히 공유하고 있습니다.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@spacememe"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start text-[13px] font-medium text-ink underline underline-offset-4 md:self-end"
          >
            채널 바로가기 →
          </a>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id}>
              <div className="aspect-video w-full overflow-hidden bg-paper-card">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
