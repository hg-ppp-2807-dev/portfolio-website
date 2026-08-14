"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Project = {
    number: string;
    category: string;
    title: string;
    description: string;
    stack: string[];
    gradient: string;
    visual: "gateway" | "matching";
};

function GatewayVisual() {
    return (
        <div className="project-visual gateway-visual">
            <div className="gateway-node gateway-user">
                USER
            </div>

            <div className="gateway-line" />

            <div className="gateway-node gateway-router">
                ROUTER
            </div>

            <div className="gateway-branches">
                <span />
                <span />
                <span />
            </div>

            <div className="gateway-providers">
                <div>LLM 01</div>
                <div>LLM 02</div>
                <div>LLM 03</div>
            </div>
        </div>
    );
}

function MatchingVisual() {
    return (
        <div className="project-visual matching-visual">
            <div className="match-box">RESUME</div>

            <div className="match-arrow">↓</div>

            <div className="match-box">NLP</div>

            <div className="match-arrow">↓</div>

            <div className="match-box match-highlight">
                MATCH
            </div>

            <div className="match-arrow">↓</div>

            <div className="match-box">RECOMMEND</div>
        </div>
    );
}

export default function ProjectCard({
    project,
}: {
    project: Project;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const card = cardRef.current;

            if (!card) return;

            const move = (event: MouseEvent) => {
                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) / rect.height - 0.5;

                gsap.to(card, {
                    rotateY: x * 4,
                    rotateX: -y * 4,
                    duration: 0.45,
                    ease: "power3.out",
                });
            };

            const reset = () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.45)",
                });
            };

            card.addEventListener("mousemove", move);
            card.addEventListener("mouseleave", reset);

            return () => {
                card.removeEventListener("mousemove", move);
                card.removeEventListener("mouseleave", reset);
            };
        },
        { scope: cardRef }
    );

    return (
        <article
            ref={cardRef}
            className="project-card"
            style={
                {
                    "--project-gradient": project.gradient,
                } as React.CSSProperties
            }
        >
            <div className="project-card-top">
                <span>
                    {project.number} / {project.category}
                </span>

                <span>v1.0.0</span>
            </div>

            <div className="project-content">
                <div className="project-copy">
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="stack">
                        {project.stack.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>

                    <a href="#">
                        VIEW CASE STUDY <span>↗</span>
                    </a>
                </div>

                <div className="project-art">
                    {project.visual === "gateway" ? (
                        <GatewayVisual />
                    ) : (
                        <MatchingVisual />
                    )}
                </div>
            </div>
        </article>
    );
}