import rawProjects from '@/data/projects.json';
import { mapProject } from './projectMapper';
import type { Project } from './types';

/**
 * Display order for project types. The first six are locked by editorial
 * direction; the remaining types trail in their natural order so nothing
 * gets silently hidden if a new type shows up.
 */
export const TYPE_ORDER = [
  '상가주택',
  '단독주택',
  '상업공간',
  '숙박시설',
  '세컨하우스',
  '전원 주택 단지',
  '반려동물 주택단지',
  '전원주택 타입',
  '오피스형 주택',
] as const;

function typeRank(type: string): number {
  const idx = (TYPE_ORDER as readonly string[]).indexOf(type);
  return idx === -1 ? TYPE_ORDER.length : idx;
}

function sortByTypeOrder(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const diff = typeRank(a.type) - typeRank(b.type);
    if (diff !== 0) return diff;
    // Tie-break: newer WordPress post_id first (matches current chronological order).
    return b.id - a.id;
  });
}

const projects: Project[] = sortByTypeOrder(
  (rawProjects as Project[]).map(mapProject),
);

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByIds(ids: number[]): Project[] {
  const byId = new Map(projects.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Project => Boolean(p));
}

/**
 * Types in the canonical editorial order — skipping any type that has no
 * projects so the filter bar doesn't render empty chips.
 */
export function getProjectTypes(): string[] {
  const present = new Set<string>();
  for (const p of projects) {
    if (p.type) present.add(p.type);
  }
  return (TYPE_ORDER as readonly string[]).filter((t) => present.has(t));
}
