"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   Network topology — 7 fixed base nodes
───────────────────────────────────────── */
interface Node {
  x: number;
  y: number;
  phaseX: number;
  phaseY: number;
  isRed: boolean;
  radius: number;
}

const W = 108;
const H = 152;
const DRIFT = 2.2;      // max px drift per node
const SPEED = 0.00042;  // angular velocity

// Nodes positioned as a distributed-system topology:
//   API at top → two routing nodes → central router → two leaf nodes → output at bottom
const BASE_NODES: Node[] = [
  { x: 54,  y: 10,  phaseX: 0.0, phaseY: 1.4, isRed: false, radius: 2.5 }, // [0] API (top)
  { x: 18,  y: 44,  phaseX: 2.1, phaseY: 0.5, isRed: false, radius: 2.0 }, // [1] router-L
  { x: 90,  y: 44,  phaseX: 1.2, phaseY: 2.4, isRed: false, radius: 2.0 }, // [2] router-R
  { x: 54,  y: 62,  phaseX: 3.1, phaseY: 0.8, isRed: false, radius: 2.0 }, // [3] intent hub
  { x: 18,  y: 100, phaseX: 0.8, phaseY: 1.9, isRed: false, radius: 2.0 }, // [4] backend
  { x: 90,  y: 100, phaseX: 2.5, phaseY: 0.3, isRed: true,  radius: 2.8 }, // [5] LLM (red accent)
  { x: 54,  y: 138, phaseX: 1.6, phaseY: 2.2, isRed: false, radius: 2.5 }, // [6] output
];

// Edges (pairs of node indices)
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 3], [2, 3],
  [1, 4], [2, 5],
  [3, 4], [3, 5],
  [4, 6], [5, 6],
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface Props {
  /** Shared mouse position ref — normalized 0..1 */
  mousePosRef: React.RefObject<{ x: number; y: number }>;
}

export default function HeroSystemDiagram({ mousePosRef }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef      = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (prefersReducedMotion()) return;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      /* Apply mouse parallax to the container */
      if (mousePosRef.current) {
        const dx = (mousePosRef.current.x - 0.5) * -4;
        const dy = (mousePosRef.current.y - 0.5) * -3;
        container.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      /* Compute drifted node positions */
      const pos = BASE_NODES.map((n) => ({
        x:     n.x + Math.sin(t * SPEED + n.phaseX) * DRIFT,
        y:     n.y + Math.cos(t * SPEED + n.phaseY) * DRIFT,
        isRed: n.isRed,
        radius: n.radius,
      }));

      /* Draw edges */
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      for (const [a, b] of EDGES) {
        ctx.beginPath();
        ctx.moveTo(pos[a].x, pos[a].y);
        ctx.lineTo(pos[b].x, pos[b].y);
        ctx.stroke();
      }

      /* Draw nodes */
      for (const p of pos) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isRed
          ? "rgba(217,11,11,0.82)"
          : "rgba(255,255,255,0.52)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="hero-diagram-wrap" aria-hidden="true">
      <canvas ref={canvasRef} width={W} height={H} className="hero-diagram-canvas" />
      {/* Tiny system-flow labels */}
      <div className="hero-diagram-labels">
        <span>API</span>
        <span>INTENT</span>
        <span>MODEL</span>
      </div>
    </div>
  );
}
