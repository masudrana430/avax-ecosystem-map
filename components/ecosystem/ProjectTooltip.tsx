import type { EcosystemNode } from "@/data/ecosystem";

type ProjectTooltipProps = {
  node: EcosystemNode | null;
};

export default function ProjectTooltip({ node }: ProjectTooltipProps) {
  if (!node) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-8 z-30 -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
      <p className="text-sm font-semibold">{node.name}</p>
      <p className="mt-1 text-xs text-zinc-400">{node.category}</p>
    </div>
  );
}