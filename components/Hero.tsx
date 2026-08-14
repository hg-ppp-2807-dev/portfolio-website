"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const HeroBackground = dynamic(() => import("./HeroBackground"), { ssr: false });

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            tl.from(".hero-eyebrow", {
                opacity: 0,
                y: 20,
                duration: 0.7,
            })
                .from(
                    ".hero-line",
                    {
                        opacity: 0,
                        y: 70,
                        duration: 0.9,
                        stagger: 0.12,
                    },
                    "-=0.35"
                )
                .from(
                    ".hero-description",
                    {
                        opacity: 0,
                        y: 25,
                        duration: 0.7,
                    },
                    "-=0.45"
                )
                .from(
                    ".hero-button",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                    },
                    "-=0.35"
                )
                .from(
                    ".system-panel",
                    {
                        opacity: 0,
                        x: 80,
                        scale: 0.96,
                        duration: 1,
                    },
                    "-=0.7"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero">
            <HeroBackground />
            <div className="hero-grid" />

            <div className="hero-content">
                <div className="hero-copy">
                    <div className="hero-eyebrow">
                        PRITAM / SYSTEMS / 2026
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-line">SOFTWARE</span>
                        <span className="hero-line">ENGINEER</span>
                    </h1>

                    <p className="hero-description">
                        I build intelligent backend systems,
                        distributed architectures and
                        AI-powered products.
                    </p>

                    <a href="#projects" className="hero-button">
                        VIEW WORK
                        <span>↗</span>
                    </a>
                </div>

                <div className="system-panel">
                    <div className="system-panel-header">
                        <span>PRITAM / SYSTEMS</span>
                        <span>01</span>
                    </div>

                    <div className="system-panel-body">
                        <div className="terminal-line">
                            <span className="terminal-prompt">$</span>
                            system.status()
                        </div>

                        <div className="system-status">
                            <Status label="API GATEWAY" />
                            <Status label="AI ENGINE" />
                            <Status label="DATABASE" />
                            <Status label="DOCKER" />
                        </div>

                        <div className="system-divider" />

                        <div className="system-metrics">
                            <div>
                                <span>PROJECTS</span>
                                <strong>02</strong>
                            </div>

                            <div>
                                <span>SYSTEMS</span>
                                <strong>04</strong>
                            </div>

                            <div>
                                <span>STACK</span>
                                <strong>12+</strong>
                            </div>
                        </div>

                        <div className="terminal-output">
                            <span>&gt;</span>
                            building intelligent systems...
                            <span className="cursor" />
                        </div>
                    </div>

                    <div className="system-panel-footer">
                        <span>AI / BACKEND / SYSTEMS</span>
                        <span>● ACTIVE</span>
                    </div>
                </div>
            </div>

            <div className="hero-footer">
                <span>BENGALURU / INDIA</span>
                <span>SCROLL TO EXPLORE ↓</span>
                <span>AI / BACKEND / DISTRIBUTED SYSTEMS</span>
            </div>
        </section>
    );
}

function Status({ label }: { label: string }) {
    return (
        <div className="status-row">
            <span>{label}</span>

            <span className="status-active">
                <i />
                ONLINE
            </span>
        </div>
    );
}