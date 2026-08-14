"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
    {
        id: "request",
        title: "REQUEST",
        subtitle: "POST /v1/chat/completions",
    },
    {
        id: "auth",
        title: "AUTH",
        subtitle: "Clerk JWT",
    },
    {
        id: "intent",
        title: "INTENT ANALYSIS",
        subtitle: "Classify task complexity",
    },
    {
        id: "budget",
        title: "BUDGET",
        subtitle: "Token enforcement",
    },
    {
        id: "router",
        title: "MODEL ROUTER",
        subtitle: "Choose provider",
    },
];

export default function IntentScope() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".intent-project", {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            gsap.from(".landing-mockup-container", {
                opacity: 0,
                x: 60,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".landing-mockup-container",
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section id="projects" className="projects-section">
                <div className="section-heading">
                    <div>
                        <span>01 / SELECTED SYSTEMS</span>
                        <h2>WORK THAT<br />DOES SOMETHING.</h2>
                    </div>

                    <p>
                        Systems, infrastructure and intelligent
                        products built from the ground up.
                    </p>
                </div>
            </section>

            <section
                ref={sectionRef}
                className="intent-section"
            >
            <div className="intent-top">
                <span>01 / DISTRIBUTED AI SYSTEM</span>

                <span>2026</span>
            </div>

            <div className="intent-project">
                {/* LEFT */}
                <div className="intent-project-info">
                    <div className="intent-number">
                        01
                    </div>

                    <h2>INTENTSCOPE</h2>

                    <p className="intent-tagline">
                        Intent-driven adaptive scoping
                        for LLM APIs.
                    </p>

                    <p className="intent-description">
                        A smart API gateway that sits between
                        applications and multiple LLM providers.
                        It analyzes request intent, intelligently
                        routes models, enforces token budgets
                        and provides centralized observability.
                    </p>

                    <div className="intent-stack">
                        <span>PYTHON</span>
                        <span>GO</span>
                        <span>NEXT.JS</span>
                        <span>POSTGRES</span>
                        <span>DOCKER</span>
                        <span>LLM</span>
                    </div>

                    <div className="intent-actions">
                        <a
                            href="https://intent-scope.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-primary-button"
                        >
                            LIVE DEMO
                            <span>↗</span>
                        </a>

                        <a
                            href="https://github.com/yourusername/intent-scope"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-secondary-button"
                        >
                            GITHUB
                            <span>↗</span>
                        </a>
                    </div>
                </div>

                {/* RIGHT */}
                <IntentScopeMockup />
            </div>
        </section>
        </>
    );
}

function IntentScopeMockup() {
    return (
        <div className="landing-mockup-container">
            {/* Browser Header Bar */}
            <div className="mockup-header-bar">
                <div className="dots-row">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                </div>
                <div className="address-bar">intent-scope.vercel.app</div>
            </div>

            {/* Mock Page Content */}
            <div className="mockup-content">
                <div className="mockup-nav">
                    <div className="mockup-logo">
                        Intent<span>Scope</span>
                    </div>
                    <div className="mockup-nav-links">
                        <span>Features</span>
                        <span>Solutions</span>
                        <span>Docs</span>
                    </div>
                    <div className="mockup-nav-btn">DASHBOARD</div>
                </div>

                <div className="mockup-hero">
                    <div className="mockup-pill">
                        <span className="pill-dot" /> IN DEVELOPMENT
                    </div>
                    
                    <h3 className="mockup-title">
                        Intent<span>Scope</span>
                    </h3>

                    <p className="mockup-subtitle">
                        The intelligent LLM gateway that reads your prompts before routing them. Intent analysis · smart model selection · budget enforcement — all in one API.
                    </p>

                    <div className="mockup-tags">
                        <span className="tag tag-red">INTENT ANALYSIS</span>
                        <span className="tag tag-yellow">MODEL ROUTING</span>
                        <span className="tag tag-green">BUDGET CONTROL</span>
                        <span className="tag tag-red">API KEYS</span>
                        <span className="tag tag-yellow">ANALYTICS</span>
                    </div>

                    <div className="mockup-actions">
                        <span className="mockup-btn mockup-btn-red">OPEN DASHBOARD</span>
                        <span className="mockup-btn mockup-btn-outline">VIEW DOCS</span>
                    </div>
                </div>
            </div>
        </div>
    );
}