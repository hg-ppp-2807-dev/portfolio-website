"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

// Monochrome palette — only white/gray nodes, ~1-in-8 chance of red accent
const RED_ACCENT = "rgba(217,11,11,0.75)";
const NODE_COLORS = [
  "rgba(255,255,255,0.55)",
  "rgba(255,255,255,0.35)",
  "rgba(255,255,255,0.45)",
  "rgba(255,255,255,0.28)",
  "rgba(255,255,255,0.55)",
  "rgba(255,255,255,0.35)",
  "rgba(255,255,255,0.45)",
  RED_ACCENT,
];

const MAX_DIST = 110;
const BASE_COUNT = 25;

function getParticleCount() {
  if (typeof window === "undefined") return BASE_COUNT;
  if (window.innerWidth < 560) return 12;
  if (window.innerWidth < 900) return 18;
  return BASE_COUNT;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) return;

    /* --- resize -------------------------------------------- */
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* --- init particles ------------------------------------ */
    const count = getParticleCount();
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.4 + 0.7,
      color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
    }));

    /* --- mouse tracking ------------------------------------ */
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    /* --- draw loop ----------------------------------------- */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;

      for (const p of pts) {
        // mouse repulsion — gentle push
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90 && d > 0) {
          p.vx += (dx / d) * 0.04;
          p.vy += (dy / d) * 0.04;
        }

        // speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.9) {
          p.vx *= 0.97;
          p.vy *= 0.97;
        }

        // move
        p.x += p.vx;
        p.y += p.vy;

        // bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // draw connections — only near cursor for a system-topology feel
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            // fade based on distance
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            // use source node color but cap at very low opacity
            ctx.strokeStyle = "rgba(255,255,255,1)";
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "auto",
      }}
    />
  );
}
