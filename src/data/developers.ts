import { Developer } from "@/types";

export const developers: Developer[] = [
  {
    slug: "adnan",
    name: "Adnan",
    tagline: "Founder & Lead Architect at OnChainers Lab.",
    bio: "Visionary developer focused on scaling onchain gaming and creator tools.",
    roles: ["Founder", "Full Stack"],
    chains: ["solana", "base"],
    skills: ["Next.js", "Rust", "Solana"],
    links: {
      twitter: "https://twitter.com/adnan",
      github: "https://github.com/adnan",
    },
    avatarUrl: "https://github.com/shadcn.png",
    featuredProjectSlugs: ["bloom"],
  },
  {
    slug: "hotpunk",
    name: "Hotpunk",
    tagline: "High-performance frontend engineer and motion designer.",
    bio: "Specializing in immersive web experiences and interactive canvas tech.",
    roles: ["Frontend", "Creative Dev"],
    chains: ["solana"],
    skills: ["React", "Three.js", "Framer Motion"],
    links: {
      twitter: "https://twitter.com/hotpunk_dev",
      github: "https://github.com/hotpunk",
    },
    avatarUrl: "https://github.com/shadcn.png",
    featuredProjectSlugs: ["pixel-mint"],
  },
];
