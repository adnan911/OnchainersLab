import { Developer } from "@/types";

export const developers: Developer[] = [
  {
    slug: "adnan",
    name: "Adnan",
    tagline: "Building the future of onchain gaming.",
    bio: "Full-stack developer with a passion for Solana and high-performance web apps.",
    roles: ["Founder", "Full Stack"],
    chains: ["solana"],
    skills: ["Next.js", "Rust", "Solana"],
    links: {
      twitter: "https://twitter.com/adnan",
      github: "https://github.com/adnan",
      website: "https://adnan.dev",
    },
    avatarUrl: "https://github.com/shadcn.png",
    featuredProjectSlugs: ["draw-perfect", "pixel-canvas"],
  },
  {
    slug: "pixel-master",
    name: "PixelMaster",
    tagline: "Pixel art enthusiast and tool builder.",
    bio: "Creating tools for digital artists on the blockchain.",
    roles: ["Frontend", "Designer"],
    chains: ["base", "solana"],
    skills: ["React", "Canvas", "WebGL"],
    links: {
      twitter: "https://twitter.com/pixelmaster",
    },
    avatarUrl: "https://github.com/shadcn.png",
    featuredProjectSlugs: ["pixel-canvas"],
  },
  {
    slug: "chain-wizard",
    name: "ChainWizard",
    tagline: "Smart contract auditor and security researcher.",
    bio: "Ensuring the safety of onchain assets.",
    roles: ["Smart Contract Engineer", "Auditor"],
    chains: ["solana"],
    skills: ["Rust", "Anchor", "Security"],
    links: {
      github: "https://github.com/chainwizard",
    },
    avatarUrl: "https://github.com/shadcn.png",
    featuredProjectSlugs: [],
  },
];
