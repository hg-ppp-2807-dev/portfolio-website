"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;

        // Set initial states manually so there's no flash of invisible text
        const top   = el.querySelector<HTMLElement>(".hero-fb-top");
        const lines = el.querySelectorAll<HTMLElement>(".hero-line");
        const skills= el.querySelectorAll<HTMLElement>(".hero-fb-skill");
        const cta   = el.querySelector<HTMLElement>(".hero-fb-cta");

        gsap.set([top, lines, skills, cta], { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(top,    { opacity: 1, y: 0, duration: 0.7, delay: 0.1 })
          .to(lines,  { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.35")
          .to(skills, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
          .to(cta,    { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

        return () => { tl.kill(); };
    }, []);

    return (
        <section ref={heroRef} className="hero-fb-section">

            {/* ── MAIN CONTENT (always on top) ── */}
            <div className="hero-fb-inner">

                {/* TOP ROW */}
                <div className="hero-fb-top">
                    <div className="hero-fb-eyebrow">HEY, I&apos;M A</div>
                    <div className="hero-fb-tagline">
                        <p className="hero-fb-tagline-title">Great systems should feel invisible.</p>
                        <p className="hero-fb-tagline-sub">
                            From APIs to AI pipelines, I build backends
                            that connect and scale.
                        </p>
                    </div>
                </div>

                {/* BIG TITLE */}
                <h1 className="hero-fb-title">
                    <span className="hero-line">SOFTWARE</span>
                    <span className="hero-line">ENGINEER</span>
                </h1>

                {/* SKILLS ROW */}
                <div className="hero-fb-skills">
                    {[
                        ["01", "Backend Architecture"],
                        ["02", "AI / LLM Gateway"],
                        ["03", "Distributed Systems"],
                        ["04", "ML Pipelines"],
                    ].map(([num, label]) => (
                        <div key={num} className="hero-fb-skill">
                            <span className="hero-fb-skill-num">#{num}</span>
                            <span className="hero-fb-skill-label">{label}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <a href="#projects" className="hero-fb-cta">
                    VIEW WORK <span>↗</span>
                </a>

            </div>
        </section>
    );
}
