"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ecosystemNodes, type EcosystemNode } from "@/data/ecosystem";

const MAP_SIZE = 760;
const CENTER = MAP_SIZE / 2;

const ringRadius: Record<EcosystemNode["ring"], number> = {
  1: 115,
  2: 205,
  3: 295,
  4: 355,
};

type PositionedNode = EcosystemNode & {
  x: number;
  y: number;
};

function getNodePosition(node: EcosystemNode): PositionedNode {
  const radius = ringRadius[node.ring];
  const radian = (node.angle * Math.PI) / 180;

  return {
    ...node,
    x: CENTER + Math.cos(radian) * radius,
    y: CENTER + Math.sin(radian) * radius,
  };
}

export default function EcosystemMap() {
  const [hoveredNode, setHoveredNode] = useState<EcosystemNode | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const positionedNodes = useMemo(
    () => ecosystemNodes.map(getNodePosition),
    []
  );

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.16),transparent_36%)]" />

      <div className="absolute left-6 top-6 z-30">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Ecosystem
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Avalanche Network Map
        </h1>
      </div>

      <div
        className="ecosystem-frame"
        data-paused={isPaused}
      >
        <div className="orbit-rotator">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
          >
            {positionedNodes
              .filter((node) => node.ring <= 2)
              .map((node) => (
                <line
                  key={node.id}
                  x1={CENTER}
                  y1={CENTER}
                  x2={node.x}
                  y2={node.y}
                  stroke={node.color}
                  strokeOpacity="0.22"
                  strokeWidth="1.3"
                />
              ))}

            {positionedNodes
              .filter((node) => node.ring <= 2)
              .map((node) => (
                <circle
                  key={`${node.id}-particle`}
                  cx={(CENTER + node.x) / 2}
                  cy={(CENTER + node.y) / 2}
                  r="4"
                  fill={node.color}
                  opacity="0.85"
                />
              ))}
          </svg>

          {positionedNodes.map((node) => {
            const style = {
              left: `${(node.x / MAP_SIZE) * 100}%`,
              top: `${(node.y / MAP_SIZE) * 100}%`,
              "--node-color": node.color,
              "--node-size": `${node.size}px`,
            } as CSSProperties;

            return (
              <button
                key={node.id}
                type="button"
                className="ecosystem-node"
                style={style}
                onMouseEnter={() => {
                  setHoveredNode(node);
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredNode(null);
                  setIsPaused(false);
                }}
              >
                <span className="node-counter">
                  <span className="node-glow" />
                  <span className="node-ring node-ring-one" />
                  <span className="node-ring node-ring-two" />

                  <span className="node-logo">
                    {node.logo ? (
                      <img
                        src={node.logo}
                        alt={node.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span>{node.name.charAt(0)}</span>
                    )}
                  </span>

                  <span className="node-label">{node.name}</span>

                  {hoveredNode?.id === node.id && (
                    <span className="node-tooltip">
                      <strong>{node.name}</strong>
                      <small>{node.category}</small>
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="center-node">
          <div className="center-glow" />
          <div className="center-ring center-ring-one" />
          <div className="center-ring center-ring-two" />
          <div className="center-ring center-ring-three" />

          <div className="center-logo">
            <span>A</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
        <button className="rounded-full bg-white px-5 py-2 text-xs font-medium text-black">
          View Stats
        </button>
        <button className="rounded-full border border-white/25 bg-black/30 px-5 py-2 text-xs font-medium text-white backdrop-blur">
          Explorer
        </button>
      </div>

      <style>{`
        .ecosystem-frame {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(92vmin, 760px);
          aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%);
          overflow: visible;
        }

        .orbit-rotator {
          position: absolute;
          inset: 0;
          transform-origin: center;
          animation: ecosystem-spin 58s linear infinite;
        }

        .ecosystem-frame[data-paused="true"] .orbit-rotator,
        .ecosystem-frame[data-paused="true"] .node-counter {
          animation-play-state: paused;
        }

        .ecosystem-node {
          position: absolute;
          z-index: 10;
          width: var(--node-size);
          height: var(--node-size);
          transform: translate(-50%, -50%);
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          overflow: visible;
        }

        .node-counter {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: center;
          animation: ecosystem-counter-spin 58s linear infinite;
        }

        .node-glow {
          position: absolute;
          inset: -22px;
          border-radius: 999px;
          background: var(--node-color);
          opacity: 0.26;
          filter: blur(18px);
        }

        .node-ring {
          position: absolute;
          border-radius: 999px;
          border: 2px solid var(--node-color);
          opacity: 0.52;
        }

        .node-ring-one {
          inset: -9px;
        }

        .node-ring-two {
          inset: -17px;
          opacity: 0.28;
        }

        .node-logo {
          position: relative;
          z-index: 2;
          display: grid;
          width: 100%;
          height: 100%;
          place-items: center;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.72);
          background: var(--node-color);
          box-shadow: 0 0 22px color-mix(in srgb, var(--node-color), transparent 30%);
          color: white;
          font-size: calc(var(--node-size) * 0.46);
          font-weight: 800;
          line-height: 1;
        }

        .node-label {
          position: absolute;
          left: 50%;
          top: calc(100% + 9px);
          width: max-content;
          max-width: 130px;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.9);
          font-size: 11px;
          line-height: 1.15;
          text-align: center;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.95);
          white-space: normal;
        }

        .node-tooltip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 16px);
          z-index: 50;
          display: grid;
          min-width: 150px;
          transform: translateX(-50%);
          gap: 3px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(24, 24, 27, 0.95);
          padding: 10px 12px;
          text-align: left;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(14px);
          pointer-events: none;
        }

        .node-tooltip strong {
          font-size: 13px;
          font-weight: 700;
          color: white;
        }

        .node-tooltip small {
          font-size: 11px;
          color: rgba(212, 212, 216, 0.78);
        }

        .center-node {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 20;
          width: 92px;
          height: 92px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
        }

        .center-glow {
          position: absolute;
          inset: -34px;
          border-radius: 999px;
          background: #ef4444;
          opacity: 0.34;
          filter: blur(24px);
        }

        .center-ring {
          position: absolute;
          border-radius: 999px;
          border: 2px solid #ef4444;
        }

        .center-ring-one {
          inset: -10px;
          opacity: 0.75;
        }

        .center-ring-two {
          inset: -20px;
          opacity: 0.45;
        }

        .center-ring-three {
          inset: -30px;
          opacity: 0.25;
        }

        .center-logo {
          position: relative;
          z-index: 2;
          display: grid;
          width: 100%;
          height: 100%;
          place-items: center;
          border-radius: 999px;
          background: #ef4444;
          box-shadow: 0 0 45px rgba(239, 68, 68, 0.6);
        }

        .center-logo span {
          color: white;
          font-size: 54px;
          font-weight: 900;
          line-height: 1;
        }

        @keyframes ecosystem-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ecosystem-counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @media (max-width: 640px) {
          .center-node {
            width: 74px;
            height: 74px;
          }

          .center-logo span {
            font-size: 42px;
          }

          .node-label {
            font-size: 9px;
          }
        }
      `}</style>
    </section>
  );
}