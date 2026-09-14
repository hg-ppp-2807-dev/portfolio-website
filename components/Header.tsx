"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 80);
    check(); // run immediately on mount
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      {/* The header is ALWAYS position:fixed with transparent background.
          On scroll, we add the .scrolled class which adds the dark blur. */}
      <header className={`site-header ${scrolled ? "site-header--scrolled" : "site-header--transparent"}`}>
        <a href="/" className="brand">PRITAM / SYSTEMS</a>

        <nav className="desktop-nav">
          <a href="#projects">WORK</a>
          <a href="#engineering">STACK</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#certifications">CERTIFICATIONS</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="header-actions">
          <button className="theme-button" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "light" ? "◑" : "◐"}
          </button>
          <button
            className={`hamburger-button${isMenuOpen ? " open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-menu-overlay${isMenuOpen ? " open" : ""}`}>
        <nav className="mobile-nav">
          <a href="#projects"       onClick={() => setIsMenuOpen(false)}>WORK          <span>↗</span></a>
          <a href="#engineering"    onClick={() => setIsMenuOpen(false)}>STACK         <span>↗</span></a>
          <a href="#experience"     onClick={() => setIsMenuOpen(false)}>EXPERIENCE    <span>↗</span></a>
          <a href="#certifications" onClick={() => setIsMenuOpen(false)}>CERTIFICATIONS <span>↗</span></a>
          <a href="#contact"        onClick={() => setIsMenuOpen(false)}>CONTACT       <span>↗</span></a>
        </nav>
      </div>
    </>
  );
}
