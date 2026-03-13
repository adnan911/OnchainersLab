import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "bloom",
    name: "Bloom",
    oneLiner: "Generative art that grows with your onchain activity.",
    description: "A generative art tool where your NFT 'blooms' based on your wallet's transaction history and age.",
    type: "tool",
    types: ["tool"],
    chains: ["base", "solana"],
    status: "live",
    tags: ["Art", "Generative", "Tool"],
    devSlugs: ["adnan"],
    links: {
      liveUrl: "https://bloom.art",
    },
    media: {
      coverUrl: "https://placehold.co/600x400/101010/f5c451?text=Bloom",
    },
    featured: true,
    createdAt: "2023-12-01T00:00:00Z",
    trendingScore: 88,
  },
  {
    slug: "pixel-mint",
    name: "PixelMint",
    oneLiner: "The lightweight pixel art editor with direct minting.",
    description: "Create 8-bit masterpieces and mint them to your favorite chain in seconds. Simple, fast, and powerful.",
    type: "tool",
    types: ["tool"],
    chains: ["solana", "base"],
    status: "live",
    tags: ["Art", "Tool", "NFT"],
    devSlugs: ["hotpunk"],
    links: {
      liveUrl: "https://pixelmint.app",
    },
    media: {
      coverUrl: "https://placehold.co/600x400/101010/f5c451?text=PixelMint",
    },
    createdAt: "2023-11-10T00:00:00Z",
    trendingScore: 90,
  },
  {
    slug: "crypto-spell",
    name: "Crypto Spell",
    oneLiner: "Master the elements and cast spells in this onchain magical battler.",
    description: "A fast-paced tactical card game where you weave spells using crypto-powered mana. Battle players worldwide and climb the leaderboard.",
    type: "game",
    types: ["game"],
    chains: ["base", "solana"],
    status: "live",
    tags: ["Gaming", "Tactical", "Cards"],
    devSlugs: ["adnan"],
    links: {
      liveUrl: "https://cryptospell.game",
    },
    media: {
      coverUrl: "/images/projects/crypto-spell-cover.png",
    },
    featured: true,
    createdAt: "2024-03-13T00:00:00Z",
    trendingScore: 95,
  },
];
