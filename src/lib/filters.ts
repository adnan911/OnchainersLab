import { Project, Developer } from "@/types";

export interface ProjectFilters {
  q?: string;
  type?: string;
  chain?: string;
  status?: string;
  devs?: string[];
  tags?: string[];
}

export function applyProjectFilters(projects: Project[], filters: ProjectFilters): Project[] {
  let result = [...projects];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.oneLiner.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.type) {
    result = result.filter((p) => p.types.includes(filters.type as any));
  }

  if (filters.chain) {
    result = result.filter((p) => p.chains.includes(filters.chain as any));
  }

  if (filters.status) {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.devs && filters.devs.length > 0) {
    result = result.filter((p) => {
      // Check if any of the project's devs are in the filtered list
      return p.devSlugs.some((slug) => filters.devs?.includes(slug));
    });
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((p) => {
      return p.tags.some((tag) => filters.tags?.includes(tag));
    });
  }

  return result;
}

export function sortProjects(projects: Project[], sortKey: "featured" | "newest" | "trending"): Project[] {
  const result = [...projects];

  switch (sortKey) {
    case "newest":
      return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "trending":
      return result.sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
    case "featured":
    default:
      // Sort featured first, then newest
      return result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }
}

export function applyDeveloperFilters(devs: Developer[], filters: { q?: string; chains?: string[]; skills?: string[] }): Developer[] {
  let result = [...devs];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.bio.toLowerCase().includes(q)
    );
  }

  if (filters.chains && filters.chains.length > 0) {
    result = result.filter((d) => d.chains.some((c) => filters.chains?.includes(c)));
  }

  if (filters.skills && filters.skills.length > 0) {
    result = result.filter((d) => d.skills.some((s) => filters.skills?.includes(s)));
  }

  return result;
}
