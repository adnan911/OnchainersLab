export type Chain = "solana" | "base";
export type ProjectType = "game" | "tool";
export type ProjectStatus = "live" | "beta" | "coming_soon";

export interface SocialLinks {
  website?: string;
  github?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  docs?: string;
  liveUrl?: string; // Play/Open button
}

export interface Project {
  slug: string;
  name: string;
  oneLiner: string; // max 80 chars
  description: string; // max 600 chars
  type: ProjectType;
  chains: Chain[];
  types: ProjectType[];
  status: ProjectStatus;
  tags: string[];
  devSlugs: string[]; // references Developer.slug
  links: SocialLinks;
  media: {
    coverUrl: string; // 16:9 ratio preferred
    screenshots?: string[];
  };
  featured?: boolean;
  createdAt: string; // ISO date
  trendingScore?: number; // for sorting
}

export interface Developer {
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  roles: string[]; // e.g., "Frontend", "Solana Dev"
  chains: Chain[];
  skills: string[]; // e.g., "Rust", "React", "Unity"
  links: SocialLinks;
  avatarUrl: string;
  featuredProjectSlugs: string[]; // projects to show on profile rail
}

export interface SubmissionStore {
  projects: Project[];
  developers: Developer[];
}
