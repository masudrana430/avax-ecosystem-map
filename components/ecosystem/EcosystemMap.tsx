"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ecosystemNodes, type EcosystemNode } from "@/data/ecosystem";

const MAP_SIZE = 760;
const CENTER = MAP_SIZE / 2;

const ringRadius: Record<EcosystemNode["ring"], number> = {
  1: 105,
  2: 185,
  3: 270,
  4: 345,
};

type PositionedNode = EcosystemNode & {
  x: number;
  y: number;
  computedAngle: number;
};

function createCircularLayout(nodes: EcosystemNode[]): PositionedNode[] {
  const groups = {
    1: nodes.filter((node) => node.ring === 1),
    2: nodes.filter((node) => node.ring === 2),
    3: nodes.filter((node) => node.ring === 3),
    4: nodes.filter((node) => node.ring === 4),
  };

  return nodes.map((node) => {
    const radius = ringRadius[node.ring];

    let angle = node.angle;

    // Inner rings can keep custom placement.
    // Outer rings become true circular carousel rings.
    if (node.ring === 3 || node.ring === 4) {
      const ringNodes = groups[node.ring];
      const index = ringNodes.findIndex((item) => item.id === node.id);
      const count = ringNodes.length;

      const startAngle = node.ring === 3 ? -82 : -95;
      const offset = node.ring === 3 ? 360 / count / 2 : 0;

      angle = startAngle + offset + (360 / count) * index;
    }

    const radian = (angle * Math.PI) / 180;

    return {
      ...node,
      computedAngle: angle,
      x: CENTER + Math.cos(radian) * radius,
      y: CENTER + Math.sin(radian) * radius,
    };
  });
}

export default function EcosystemMap() {
  const [hoveredNode, setHoveredNode] = useState<EcosystemNode | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const positionedNodes = useMemo(
    () => createCircularLayout(ecosystemNodes),
    []
  );

  const innerNodes = positionedNodes.filter((node) => node.ring <= 2);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.16),transparent_36%)]" />

      <div className="ecosystem-frame" data-paused={isPaused}>
        <div className="orbit-rotator">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
          >
            {/* Real circular orbit tracks */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ringRadius[1]}
              className="orbit-track orbit-track-one"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ringRadius[2]}
              className="orbit-track orbit-track-two"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ringRadius[3]}
              className="orbit-track orbit-track-three"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ringRadius[4]}
              className="orbit-track orbit-track-four"
            />

            {/* Center connection lines */}
            {innerNodes.map((node) => (
              <line
                key={`${node.id}-line`}
                x1={CENTER}
                y1={CENTER}
                x2={node.x}
                y2={node.y}
                stroke={node.color}
                strokeOpacity="0.22"
                strokeWidth="1.3"
              />
            ))}

            {/* Moving colorful dots */}
            {innerNodes.map((node, index) => (
              <g key={`${node.id}-particles`}>
                <circle r="4" fill={node.color} opacity="0.95">
                  <animate
                    attributeName="cx"
                    values={`${CENTER};${node.x};${CENTER}`}
                    dur={`${3.4 + (index % 4) * 0.35}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${CENTER};${node.y};${CENTER}`}
                    dur={`${3.4 + (index % 4) * 0.35}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur={`${3.4 + (index % 4) * 0.35}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                <circle r="2.6" fill={node.color} opacity="0.75">
                  <animate
                    attributeName="cx"
                    values={`${node.x};${CENTER};${node.x}`}
                    dur={`${4.2 + (index % 5) * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${node.y};${CENTER};${node.y}`}
                    dur={`${4.2 + (index % 5) * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    dur={`${4.2 + (index % 5) * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
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
                className={`ecosystem-node ring-${node.ring}`}
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
                  <span className="node-ripple node-ripple-one" />
                  <span className="node-ripple node-ripple-two" />
                  <span className="node-ripple node-ripple-three" />

                  <span className="node-glow" />
                  <span className="node-ring node-ring-one" />
                  <span className="node-ring node-ring-two" />
                  <span className="node-ring node-ring-three" />

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

        <button
          type="button"
          className="center-node"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="center-glow" />

          <span className="center-ripple center-ripple-one" />
          <span className="center-ripple center-ripple-two" />
          <span className="center-ripple center-ripple-three" />

          <span className="center-ring center-ring-one" />
          <span className="center-ring center-ring-two" />
          <span className="center-ring center-ring-three" />

          <span className="center-logo">
            <span>A</span>
          </span>
        </button>
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
          animation: ecosystem-spin 64s linear infinite;
        }

        .ecosystem-frame[data-paused="true"] .orbit-rotator,
        .ecosystem-frame[data-paused="true"] .node-counter {
          animation-play-state: paused;
        }

        .orbit-track {
          fill: none;
          stroke: rgba(255, 255, 255, 0.06);
          stroke-width: 1;
          stroke-dasharray: 2 10;
        }

        .orbit-track-one {
          stroke: rgba(239, 68, 68, 0.16);
        }

        .orbit-track-two {
          stroke: rgba(255, 255, 255, 0.08);
        }

        .orbit-track-three {
          stroke: rgba(255, 255, 255, 0.065);
        }

        .orbit-track-four {
          stroke: rgba(255, 255, 255, 0.055);
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

        .ring-4 {
          z-index: 7;
        }

        .ring-3 {
          z-index: 8;
        }

        .ring-2 {
          z-index: 12;
        }

        .ring-1 {
          z-index: 14;
        }

        .node-counter {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: center;
          animation: ecosystem-counter-spin 64s linear infinite;
        }

        .node-glow {
          position: absolute;
          inset: -20px;
          border-radius: 999px;
          background: var(--node-color);
          opacity: 0.2;
          filter: blur(17px);
        }

        .node-ripple {
          position: absolute;
          inset: -8px;
          border-radius: 999px;
          border: 2px solid var(--node-color);
          opacity: 0;
          transform: scale(0.82);
          animation: node-water-wave 2.8s ease-out infinite;
        }

        .node-ripple-two {
          animation-delay: 0.75s;
        }

        .node-ripple-three {
          animation-delay: 1.5s;
        }

        .node-ring {
          position: absolute;
          border-radius: 999px;
          border: 2px solid var(--node-color);
        }

        .node-ring-one {
          inset: -8px;
          opacity: 0.55;
        }

        .node-ring-two {
          inset: -15px;
          opacity: 0.34;
        }

        .node-ring-three {
          inset: -22px;
          opacity: 0.16;
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
          box-shadow: 0 0 22px color-mix(in srgb, var(--node-color), transparent 45%);
          color: white;
          font-size: calc(var(--node-size) * 0.46);
          font-weight: 800;
          line-height: 1;
        }

        .ring-4 .node-logo,
        .ring-4 .node-ring,
        .ring-4 .node-ripple {
          transform: scale(0.92);
        }

        .node-label {
          position: absolute;
          left: 50%;
          top: calc(100% + 9px);
          width: max-content;
          max-width: 135px;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.9);
          font-size: 10.5px;
          line-height: 1.15;
          text-align: center;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.95);
          white-space: normal;
        }

        .ring-4 .node-label {
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.82);
        }

        .node-tooltip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 18px);
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
          z-index: 30;
          width: 92px;
          height: 92px;
          transform: translate(-50%, -50%);
          border: 0;
          border-radius: 999px;
          background: transparent;
          padding: 0;
          cursor: pointer;
        }

        .center-glow {
          position: absolute;
          inset: -36px;
          border-radius: 999px;
          background: #ef4444;
          opacity: 0.34;
          filter: blur(24px);
        }

        .center-ripple {
          position: absolute;
          inset: -12px;
          border-radius: 999px;
          border: 2px solid #ef4444;
          opacity: 0;
          animation: center-water-wave 2.4s ease-out infinite;
        }

        .center-ripple-two {
          animation-delay: 0.7s;
        }

        .center-ripple-three {
          animation-delay: 1.4s;
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
          animation: center-heartbeat 1.25s ease-in-out infinite;
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

        @keyframes node-water-wave {
          0% {
            opacity: 0.58;
            transform: scale(0.72);
          }
          70% {
            opacity: 0.16;
          }
          100% {
            opacity: 0;
            transform: scale(1.88);
          }
        }

        @keyframes center-water-wave {
          0% {
            opacity: 0.75;
            transform: scale(0.82);
          }
          72% {
            opacity: 0.18;
          }
          100% {
            opacity: 0;
            transform: scale(1.95);
          }
        }

        @keyframes center-heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.12);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.08);
          }
          70% {
            transform: scale(1);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 640px) {
          .ecosystem-frame {
            width: 96vmin;
          }

          .center-node {
            width: 74px;
            height: 74px;
          }

          .center-logo span {
            font-size: 42px;
          }

          .node-label {
            font-size: 8.5px;
          }
        }
      `}</style>
    </section>
  );
}