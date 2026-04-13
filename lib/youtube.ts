const CHANNEL_ID = 'UCNE95Rbc9f_FvoGUMtZbIqA';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
};

/**
 * Check if a video is a YouTube Short by hitting the /shorts/ URL.
 * Shorts return 200; regular videos return 303 redirect.
 */
async function isShort(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      method: 'HEAD',
      redirect: 'manual',
      next: { revalidate: 86400 },
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

/**
 * Fetch latest videos from the 밈건축가 YouTube channel via RSS feed.
 * Filters out Shorts by checking the /shorts/ URL for each candidate.
 * Next.js revalidates every 6 hours.
 */
export async function getLatestVideos(count = 6): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 21600 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g);
    if (!entries) return [];

    // Parse all candidates from RSS
    const candidates: YouTubeVideo[] = [];
    for (const entry of entries) {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '';
      const title = entry.match(/<media:title>([^<]+)<\/media:title>/)?.[1] ?? '';
      const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? '';
      if (id) candidates.push({ id, title, publishedAt });
    }

    // Check Shorts status in parallel for all candidates
    const shortFlags = await Promise.all(candidates.map((v) => isShort(v.id)));

    return candidates.filter((_, i) => !shortFlags[i]).slice(0, count);
  } catch {
    return [];
  }
}
