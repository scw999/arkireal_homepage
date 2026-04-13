import type { Project } from './types';

type RawProject = Partial<Project> & { id: number; slug: string; title: string };

export function mapProject(raw: RawProject): Project {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    region: raw.region ?? '',
    type: raw.type ?? '',
    summary: raw.summary ?? '',
    description: raw.description ?? '',
    featuredImage: raw.featuredImage ?? '',
    featuredImageOrientation: raw.featuredImageOrientation ?? 'landscape',
    gallery: raw.gallery ?? [],
    photos: raw.photos ?? [],
    plans: raw.plans ?? [],
    matterportIds: raw.matterportIds ?? [],
    videoIds: raw.videoIds ?? [],
    designVideoIds: raw.designVideoIds ?? [],
    completionVideoIds: raw.completionVideoIds ?? [],
    keyPoints: raw.keyPoints ?? [],
    year: raw.year ?? '',
    scope: raw.scope ?? '',
    status: raw.status ?? '',
  };
}
