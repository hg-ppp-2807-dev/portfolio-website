"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import HeroBackground from "./HeroBackground";
import HeroSystemDiagram from "./HeroSystemDiagram";

/* ─────────────────────────────────────────
   ROLES
───────────────────────────────────────── */
const ROLES = [
  "SOFTWARE ENGINEER",
  "BACKEND ENGINEER",
  "AI / ML ENGINEER",
  "SYSTEMS ARCHITECT",
  "LLM ENGINEER",
  "DISTRIBUTED SYSTEMS",
  "API ARCHITECT",
];

const TYPE_SPEED       = 72;
const ERASE_SPEED      = 38;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_ERASE = 380;

function splitRole(role: string): [string, string] {
  const idx = role.lastIndexOf(" ");
  if (idx === -1) return ["", role];
  return [role.slice(0, idx), role.slice(idx + 1)];
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type StatusPhase = "init" | "online";

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  /* Shared normalized mouse position — read by HeroSystemDiagram via RAF */
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  // Typewriter
  const [displayText, setDisplayText] = useState("");
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [phase,       setPhase]       = useState<"typing" | "erasing">("typing");
  const prevRoleIndex = useRef(0);

  // Status indicator
  const [statusPhase, setStatusPhase] = useState<StatusPhase>("init");

  // Scroll indicator
  const [scrolled, setScrolled] = useState(false);

  /* ── Status: INITIALIZING → SYSTEMS ONLINE ── */
  useEffect(() => {
    const t = setTimeout(() => setStatusPhase("online"), 1300);
    return () => clearTimeout(t);
  }, []);

  /* ── Scroll indicator fade ── */
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setScrolled(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Parallax + shared mouse ref ── */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = heroRef.current;
    const bg = bgRef.current;
    if (!el || !bg) return;

    let raf = 0;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top)  / rect.height;
      // Update shared ref for HeroSystemDiagram (no re-render needed)
      mousePosRef.current = { x: nx, y: ny };
      // bg parallax targets
      targetX = -(nx - 0.5) * 8;
      targetY = -(ny - 0.5) * 8;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      bg.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.04)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Typewriter loop ── */
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    if (phase === "typing") {
      if (displayText.length < currentRole.length) {
        const t = setTimeout(
          () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
          TYPE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("erasing"), PAUSE_AFTER_TYPE);
        return () => clearTimeout(t);
      }
    }
    if (phase === "erasing") {
      if (displayText.length > 0) {
        const t = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          ERASE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, PAUSE_AFTER_ERASE);
        return () => clearTimeout(t);
      }
    }
  }, [displayText, phase, roleIndex]);

  /* ── Glitch on role change ── */
  const triggerGlitch = useCallback(() => {
    if (prefersReducedMotion()) return;
    const title = titleRef.current;
    if (!title) return;
    title.classList.add("hero-title--glitch");
    const t = setTimeout(() => title.classList.remove("hero-title--glitch"), 130);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (roleIndex !== prevRoleIndex.current) {
      triggerGlitch();
      prevRoleIndex.current = roleIndex;
    }
  }, [roleIndex, triggerGlitch]);

  /* ── GSAP entrance — 8-step sequence ── */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const status   = el.querySelector<HTMLElement>(".hero-status");
    const location = el.querySelector<HTMLElement>(".hero-location");
    const tagline  = el.querySelector<HTMLElement>(".hero-tagline-block");
    const diagram  = el.querySelector<HTMLElement>(".hero-diagram-wrap");
    const eyebrow  = el.querySelector<HTMLElement>(".hero-eyebrow");
    const title    = el.querySelector<HTMLElement>(".hero-fb-title");
    const index    = el.querySelectorAll<HTMLElement>(".hero-index-item");
    const focus    = el.querySelector<HTMLElement>(".hero-focus");
    const cta      = el.querySelector<HTMLElement>(".hero-fb-cta");
    const scroll   = el.querySelector<HTMLElement>(".hero-scroll-indicator");

    gsap.set(
      [status, location, tagline, diagram, eyebrow, title, index, focus, cta, scroll],
      { opacity: 0, y: 16 }
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(status,   { opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
      .to(location, { opacity: 1, y: 0, duration: 0.5 },            "-=0.3")
      .to(tagline,  { opacity: 1, y: 0, duration: 0.65 },           "-=0.25")
      .to(diagram,  { opacity: 1, y: 0, duration: 0.5 },            "-=0.4")
      .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5 },            "-=0.2")
      .to(title,    { opacity: 1, y: 0, duration: 0.8 },            "-=0.3")
      .to(index,    { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, "-=0.4")
      .to(focus,    { opacity: 1, y: 0, duration: 0.4 },            "-=0.2")
      .to(cta,      { opacity: 1, y: 0, duration: 0.4 },            "-=0.25")
      .to(scroll,   { opacity: 1, y: 0, duration: 0.5 },            "-=0.2");

    return () => { tl.kill(); };
  }, []);

  const [line1, line2] = splitRole(displayText);

  return (
    <section ref={heroRef} className="hero-fb-section" aria-label="Hero">

      {/* ── PARALLAX PHOTO ── */}
      <div ref={bgRef} className="hero-fb-bg" aria-hidden="true" />

      {/* ── PARTICLE NETWORK ── */}
      <HeroBackground />

      {/* ── CONTENT CANVAS ── */}
      <div className="hero-canvas">

        {/* ════ ABSOLUTE ANNOTATIONS ════ */}

        {/* TOP-LEFT: status */}
        <div
          className={`hero-annotation hero-annotation--tl hero-status ${
            statusPhase === "online" ? "hero-status--online" : "hero-status--init"
          }`}
          aria-label="System status"
        >
          {statusPhase === "init" ? "INITIALIZING..." : "SYSTEMS ONLINE"}
        </div>

        {/* TOP-RIGHT: context label */}
        <div className="hero-annotation hero-annotation--tr hero-location">
          SOFTWARE ENGINEER&nbsp;/&nbsp;AI SYSTEMS
        </div>

        {/* UPPER-RIGHT: editorial tagline */}
        <div className="hero-tagline-block" aria-label="Tagline">
          <p className="hero-tagline-headline">
            GREAT SYSTEMS<br />
            SHOULD FEEL<br />
            INVISIBLE.
          </p>
          <p className="hero-tagline-sub">
            From APIs to AI pipelines, I build<br />
            backends that connect and scale.
          </p>
        </div>

        {/* UPPER-RIGHT: tiny system diagram */}
        <HeroSystemDiagram mousePosRef={mousePosRef} />

        {/* BOTTOM-RIGHT: scroll indicator */}
        <div
          className={`hero-scroll-indicator ${scrolled ? "hero-scroll-indicator--hidden" : ""}`}
          aria-hidden="true"
        >
          <span className="hero-scroll-label">SCROLL</span>
          <span className="hero-scroll-line" />
        </div>

        {/* ════ BOTTOM CONTENT (natural flow) ════ */}
        <div className="hero-bottom">

          <div className="hero-eyebrow">HEY, I&apos;M A</div>

          {/* Big typewriter title */}
          <h1 ref={titleRef} className="hero-fb-title">
            <span className="hero-line hero-typewriter-line">
              {line1 || <>&nbsp;</>}
            </span>
            <span className="hero-line hero-typewriter-line hero-typewriter-line2">
              {line2}
              <span className="hero-dot" aria-hidden="true" />
            </span>
          </h1>

          {/* Capabilities index */}
          <div className="hero-index" role="list">
            {[
              ["01", "BACKEND ARCHITECTURE", "APIs · SERVICES · DATABASES"],
              ["02", "AI / LLM GATEWAY",     "LLMs · INFERENCE · ROUTING"],
              ["03", "DISTRIBUTED SYSTEMS",  "QUEUES · MESH · CONSENSUS"],
              ["04", "ML PIPELINES",         "TRAINING · SERVING · EVAL"],
            ].map(([num, label, desc]) => (
              <div key={num} className="hero-index-item" role="listitem">
                <span className="hero-index-num">#{num}</span>
                <span className="hero-index-label">{label}</span>
                <span className="hero-index-desc">{desc}</span>
              </div>
            ))}
          </div>

          {/* Current focus */}
          <div className="hero-focus" aria-label="Currently building">
            <span className="hero-focus-label">CURRENTLY BUILDING</span>
            <span className="hero-focus-value">
              AI SYSTEMS × BACKEND INFRASTRUCTURE
            </span>
          </div>

          {/* CTA */}
          <a href="#projects" className="hero-fb-cta">
            VIEW WORK{" "}
            <span className="hero-cta-arrow" aria-hidden="true">→</span>
          </a>

        </div>
      </div>
    </section>
  );
}
