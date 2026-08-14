"use client";

import ProjectCard from "./ProjectCard";
import { skills } from "../lib/data";

export default function Portfolio() {
    return (
        <main>


            <section id="engineering" className="engineering-section">
                <div className="section-heading">
                    <div>
                        <span>02 / ENGINEERING</span>
                        <h2>THE STACK<br />BEHIND IT.</h2>
                    </div>
                </div>

                <div className="engineering-grid">
                    <div>
                        <span>LANGUAGES</span>
                        {skills.languages.map((item) => (
                            <p key={item}>{item.toUpperCase()}</p>
                        ))}
                    </div>

                    <div>
                        <span>INTELLIGENCE</span>
                        {skills.ai.map((item) => (
                            <p key={item}>{item.toUpperCase()}</p>
                        ))}
                    </div>

                    <div>
                        <span>SYSTEMS / BACKEND</span>
                        {skills.backend.map((item) => (
                            <p key={item}>{item.toUpperCase()}</p>
                        ))}
                    </div>

                    <div>
                        <span>INFRASTRUCTURE / DEVOPS</span>
                        {skills.devops.map((item) => (
                            <p key={item}>{item.toUpperCase()}</p>
                        ))}
                    </div>
                </div>
            </section>

            <section id="experience" className="experience-section">
                <span>03 / EXPERIENCE</span>

                <div className="experience-item">
                    <div>2025</div>

                    <div>
                        <h3>SOFTWARE DEVELOPMENT INTERN</h3>
                        <p>SHREE JAGANNATH TECHNO SOLUTIONS</p>
                        <p>
                            Java / Spring Boot / Vaadin
                        </p>
                    </div>

                    <div>10 JUL — 10 AUG</div>
                </div>
            </section>

            <section id="certifications" className="certifications-section">
                <span>04 / CERTIFICATIONS</span>

                <div className="certifications-grid">
                    <div className="cert-item">
                        <span className="cert-provider">SAP</span>
                        <div className="cert-details">
                            <h3>SAP Certified Associate</h3>
                            <p>Generative AI Developer</p>
                        </div>
                    </div>

                    <div className="cert-item">
                        <span className="cert-provider">IBM</span>
                        <div className="cert-details">
                            <h3>Database and SQL for Data Science with Python</h3>
                            <p>Coursera Professional Credential</p>
                        </div>
                    </div>

                    <div className="cert-item">
                        <span className="cert-provider">UDEMY</span>
                        <div className="cert-details">
                            <h3>Hadoop Developer in Real World</h3>
                            <p>Big Data & Distributed Systems</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact-section">
                <span>05 / CONTACT</span>

                <h2>
                    LET&apos;S BUILD
                    <br />
                    SOMETHING
                    <br />
                    INTERESTING.
                </h2>

                <div className="contact-footer">
                    <a href="mailto:palaipritam62@gmail.com" className="email-button">
                        palaipritam62@gmail.com ↗
                    </a>

                    <div className="socials-list">
                        <a href="https://github.com/hg-ppp-2807-dev" target="_blank" rel="noopener noreferrer">GITHUB</a>
                        <a href="https://www.linkedin.com/in/pritam-priyabrata-palai-591664280/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                        <a href="https://leetcode.com/u/_pritam_p_palai_28_08/" target="_blank" rel="noopener noreferrer">LEETCODE</a>
                        <a href="https://www.hackerrank.com/profile/palaipritam62" target="_blank" rel="noopener noreferrer">HACKERRANK</a>
                        <a href="https://x.com/pritampalai28" target="_blank" rel="noopener noreferrer">X.COM</a>
                    </div>
                </div>
            </section>
        </main>
    );
}