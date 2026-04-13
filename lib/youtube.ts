const CHANNEL_ID = 'UCNE95Rbc9f_FvoGUMtZbIqA';
const API_KEY = process.env.YOUTUBE_API_KEY ?? '';

export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
};

/**
 * Fetch latest non-Shorts videos from the 밈건축가 YouTube channel
 * using YouTube Data API v3. videoDuration=medium excludes Shorts (<60s).
 * Next.js revalidates every 6 hours.
 */
export async function getLatestVideos(count = 6): Promise<YouTubeVideo[]> {
  if (!API_KEY) return [];

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('channelId', CHANNEL_ID);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('order', 'date');
    url.searchParams.set('maxResults', String(count));
    url.searchParams.set('type', 'video');
    url.searchParams.set('videoDuration', 'medium');

    const res = await fetch(url.toString(), { next: { revalidate: 21600 } });
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.items) return [];

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch {
    return [];
  }
}
