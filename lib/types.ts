export type Photo = {
  src: string;
  w: number;
  h: number;
  orientation: 'landscape' | 'portrait' | 'square';
};

export type Plan = {
  src: string;
  w: number;
  h: number;
  kind: 'table' | 'floor';
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  region: string;
  type: string;
  summary: string;
  description: string;
  featuredImage: string;
  featuredImageOrientation: 'landscape' | 'portrait';
  gallery: string[];
  photos: Photo[];
  plans: Plan[];
  matterportIds: string[];
  videoIds: string[];
  designVideoIds: string[];
  completionVideoIds: string[];
  keyPoints: string[];
  year: string;
  scope: string;
  status: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type HeroSection = {
  id: 'hero';
  type: 'hero';
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  notes?: string[];
};
