/**
 * WordPress REST API loader (reserved for v2).
 * v1 ships with local JSON; this module provides a stable signature so UI
 * code stays source-agnostic when the CMS is wired in later.
 */
import type { Project } from './types';

export async function fetchProjectsFromWordPress(): Promise<Project[]> {
  return [];
}
