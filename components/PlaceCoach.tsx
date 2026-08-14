"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PlaceCoach() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".coach-info", {
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
        <section
            ref={sectionRef}
            className="coach-section"
        >
            <div className="coach-top">
                <span>02 / AI PRODUCT</span>
                <span>2026</span>
            </div>

            <div className="coach-project">

                {/* LEFT */}
                <div className="coach-info">

                    <div className="coach-number">
                        02
                    </div>

                    <h2>OFFERVAULT</h2>

                    <p className="coach-tagline">
                        PREPARE WITH
                        <br />
                        DIRECTION.
                    </p>

                    <p className="coach-description">
                        An AI placement coach designed to
                        make preparation structured, measurable
                        and personalized.
                    </p>

                    <div className="coach-stack">
                        <span>NEXT.JS</span>
                        <span>OLLAMA</span>
                        <span>LLAMA 3.2</span>
                        <span>MONGODB</span>
                        <span>TAILWIND</span>
                    </div>

                    <div className="coach-actions">
                        <a
                            href="https://placecoach.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-primary-button"
                        >
                            LIVE DEMO
                            <span>↗</span>
                        </a>

                        <a
                            href="https://github.com/yourusername/placecoach"
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
                <PlaceCoachMockup />

            </div>
        </section>
    );
}

function PlaceCoachMockup() {
    return (
        <div className="landing-mockup-container">
            {/* Browser Header Bar */}
            <div className="mockup-header-bar">
                <div className="dots-row">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                </div>
                <div className="address-bar">placecoach.vercel.app</div>
            </div>

            {/* Mock Page Content */}
            <div className="mockup-content">
                <div className="mockup-nav">
                    <div className="mockup-logo violet">
                        Place<span>Coach</span>
                    </div>
                    <div className="mockup-nav-links">
                        <span>Features</span>
                        <span>Modules</span>
                        <span>Reviews</span>
                    </div>
                    <div className="mockup-nav-btn violet">DASHBOARD</div>
                </div>

                <div className="mockup-hero">
                    <div className="mockup-pill violet">
                        <span className="pill-dot" /> ACTIVE READY
                    </div>

                    <h3 className="mockup-title mockup-title-violet">
                        Place<span>Coach</span>
                    </h3>

                    <p className="mockup-subtitle">
                        An AI placement coach designed to make preparation structured, measurable and personalized.
                    </p>

                    <div className="mockup-tags">
                        <span className="tag tag-violet">RESUME SCORING</span>
                        <span className="tag tag-violet">MOCK INTERVIEW</span>
                        <span className="tag tag-violet">ROADMAP GENERATOR</span>
                        <span className="tag tag-violet">SKILL TRACKING</span>
                        <span className="tag tag-violet">EVALUATION</span>
                    </div>

                    <div className="mockup-actions">
                        <span className="mockup-btn mockup-btn-violet">GET STARTED</span>
                        <span className="mockup-btn mockup-btn-outline">LEARN MORE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}