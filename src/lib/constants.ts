export const CHAINS = [
  { label: "Solana", value: "solana" },
  { label: "Base", value: "base" },
] as const;

export const PROJECT_TYPES = [
  { label: "Game", value: "game" },
  { label: "Tool", value: "tool" },
] as const;

export const PROJECT_STATUS = [
  { label: "Live", value: "live" },
  { label: "Beta", value: "beta" },
  { label: "Coming Soon", value: "coming_soon" },
] as const;

export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Trending", value: "trending" },
] as const;

export const INITIAL_TAGS = [
  "DeFi",
  "NFT",
  "DAO",
  "Social",
  "Infrastructure",
  "Wallet",
  "Analytics",
  "Marketplace",
  "Gaming",
  "Utility",
];
