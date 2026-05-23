export type EcosystemNode = {
  id: string;
  name: string;
  category: string;
  color: string;
  ring: 1 | 2 | 3 | 4;
  angle: number;
  size: number;
  logo?: string;
};

export const ecosystemNodes: EcosystemNode[] = [
  { id: "dexalot", name: "Dexalot", category: "Finance", color: "#ec4899", ring: 1, angle: 235, size: 52 },
  { id: "cx", name: "CX", category: "Exchange", color: "#f59e0b", ring: 1, angle: 190, size: 44 },
  { id: "stratix", name: "Stratix", category: "DeFi", color: "#22c55e", ring: 1, angle: 315, size: 52 },
  { id: "sk-planet", name: "SK Planet", category: "Commerce", color: "#6366f1", ring: 1, angle: 345, size: 48 },
  { id: "heneasys", name: "Henesys", category: "Infrastructure", color: "#a855f7", ring: 1, angle: 145, size: 48 },
  { id: "nunit", name: "Nunit", category: "Network", color: "#eab308", ring: 1, angle: 25, size: 42 },

  { id: "beam", name: "Beam", category: "Gaming", color: "#22c55e", ring: 2, angle: 95, size: 68 },
  { id: "fifa", name: "FIFA", category: "Gaming", color: "#3b82f6", ring: 2, angle: 120, size: 46 },
  { id: "gunzilla", name: "Gunzilla", category: "Gaming", color: "#8b5cf6", ring: 2, angle: 175, size: 48 },
  { id: "space", name: "Space", category: "Gaming", color: "#7c3aed", ring: 2, angle: 205, size: 48 },
  { id: "playa3ull", name: "Playa3ull", category: "Gaming", color: "#10b981", ring: 2, angle: 260, size: 50 },
  { id: "tomatochain", name: "tomatochain", category: "L1", color: "#06b6d4", ring: 2, angle: 300, size: 48 },
  { id: "lamina1", name: "Lamina1", category: "Identity L1", color: "#a855f7", ring: 2, angle: 35, size: 44 },
  { id: "defi-kingdoms", name: "DeFi Kingdoms", category: "Gaming", color: "#84cc16", ring: 2, angle: 75, size: 48 },

  { id: "loyal", name: "Loyal", category: "Consumer", color: "#2563eb", ring: 3, angle: 325, size: 42 },
  { id: "zerone", name: "Zeroone", category: "NFT", color: "#ef4444", ring: 3, angle: 355, size: 42 },
  { id: "hashfire", name: "Hashfire", category: "Gaming", color: "#f97316", ring: 3, angle: 25, size: 42 },
  { id: "andromeda", name: "Andromeda", category: "Infrastructure", color: "#2563eb", ring: 3, angle: 55, size: 42 },
  { id: "kula", name: "Kula", category: "Network", color: "#2563eb", ring: 3, angle: 80, size: 42 },
  { id: "ugtpnet", name: "UGTPNet", category: "Network", color: "#2563eb", ring: 3, angle: 110, size: 42 },
  { id: "orange", name: "Orange", category: "Infrastructure", color: "#f97316", ring: 3, angle: 140, size: 46 },
  { id: "even", name: "Even", category: "Network", color: "#2563eb", ring: 3, angle: 160, size: 42 },
  { id: "blaze", name: "Blaze", category: "Bitcoin L1", color: "#f97316", ring: 3, angle: 215, size: 46 },
  { id: "innovo", name: "Innovo Markets Mainnet L1", category: "RWA", color: "#f97316", ring: 3, angle: 235, size: 34 },
  { id: "lynty", name: "Lyty", category: "Consumer", color: "#ef4444", ring: 3, angle: 285, size: 42 },
  { id: "pandasea", name: "PandaSea", category: "NFT", color: "#a855f7", ring: 3, angle: 300, size: 42 },

  { id: "feature", name: "Feature", category: "Media", color: "#111111", ring: 4, angle: 205, size: 38 },
  { id: "watr", name: "Watr", category: "RWA", color: "#111111", ring: 4, angle: 105, size: 38 },
  { id: "dcomm", name: "DComm", category: "Communication", color: "#4338ca", ring: 4, angle: 95, size: 38 },
  { id: "binary", name: "Binary Holdings", category: "Infrastructure", color: "#111111", ring: 4, angle: 75, size: 38 },
  { id: "north", name: "north-investments", category: "Finance", color: "#2563eb", ring: 4, angle: 125, size: 42 },
  { id: "warp", name: "WARP Gaming", category: "Gaming", color: "#2563eb", ring: 4, angle: 55, size: 42 },
  { id: "ulalo", name: "Ulalo", category: "Green Tech", color: "#22c55e", ring: 4, angle: 35, size: 42 },
  { id: "tixchain", name: "Tixchain", category: "Ticketing", color: "#f8fafc", ring: 4, angle: 20, size: 38 },
  { id: "tgp", name: "TGP", category: "Gaming", color: "#111111", ring: 4, angle: 345, size: 36 },
  { id: "qubid", name: "Quboid Chain", category: "L1", color: "#2563eb", ring: 4, angle: 320, size: 38 },
];