# Design System — Pritam / Systems Portfolio

## Overview

Dark-first, brutalist-minimalist developer portfolio. The aesthetic is inspired by terminal UIs and system dashboards — monospace labels, hard borders, neon accent pops, and mechanical interactions. Supports a light mode fallback with a warm off-white base.

---

## Color Tokens

### Dark Mode (default)

| Token         | Hex                        | Usage                              |
|---------------|----------------------------|------------------------------------|
| `--bg`        | `#08090b`                  | Page background                    |
| `--surface`   | `#111318`                  | Cards, panels, sections            |
| `--text`      | `#f4f4f0`                  | Primary body text                  |
| `--muted`     | `#96979c`                  | Secondary / caption text           |
| `--border`    | `#222222`                  | All borders and dividers           |
| `--header-bg` | `rgba(8, 9, 11, 0.82)`     | Frosted glass header               |

### Light Mode

| Token         | Hex                         | Usage                              |
|---------------|-----------------------------|------------------------------------|
| `--bg`        | `#f3f2ed`                   | Page background (warm off-white)   |
| `--surface`   | `#ffffff`                   | Cards, panels                      |
| `--text`      | `#101010`                   | Primary text                       |
| `--muted`     | `#6d6d68`                   | Secondary text                     |
| `--border`    | `#171717`                   | Borders                            |
| `--header-bg` | `rgba(243, 242, 237, 0.82)` | Frosted glass header               |

### Accent Colors (both modes)

| Token       | Hex       | Usage                                          |
|-------------|-----------|------------------------------------------------|
| `--violet`  | `#6246ff` | Primary CTA, terminal prompt $, cursors        |
| `--blue`    | `#00b8ff` | Secondary accent, project gradients (cyan)     |
| `--lime`    | `#d8ff00` | Status indicators, live/active dots            |

---

## Typography

### Fonts
- **Inter** — body, headings, descriptions (weights: 400, 500, 600, 700, 800)
- **DM Mono** — all labels, nav, terminal text, tags, metadata (weights: 400, 500)

### Type Scale

| Role              | Font      | Size                       | Weight | Notes                            |
|-------------------|-----------|----------------------------|--------|----------------------------------|
| Hero title        | Inter     | clamp(72px, 9vw, 150px)    | 800    | Line-height 0.82, tracking -0.075em, gradient fill |
| Section heading   | Inter     | clamp(50px, 5.8vw, 95px)   | 800    | Line-height 0.85, tracking -0.07em |
| Tagline           | Inter     | 21px                       | 600    | Line-height 1.2                  |
| Body / description| Inter     | 13–16px                    | 400    | Line-height 1.6–1.7, muted color |
| Nav links         | DM Mono   | 10px                       | 500    | ALL CAPS, letter-spacing 0.12em  |
| Labels / eyebrows | DM Mono   | 9–10px                     | 400    | ALL CAPS, letter-spacing 0.08–0.12em |
| Terminal / tags   | DM Mono   | 7–12px                     | 400    | Monospace, small caps labels     |
| Micro metadata    | DM Mono   | 8–9px                      | 400    | Footer captions, status rows     |

---

## Gradients

| Element          | Gradient                                                          |
|------------------|-------------------------------------------------------------------|
| Hero title text  | linear-gradient(135deg, #ffffff 40%, #b8a3ff 100%)               |
| IntentScope title| linear-gradient(135deg, #ffffff 40%, #64d2ff 100%)               |
| Hero background  | radial-gradient(circle at 75% 45%, rgba(98,70,255,0.12), transparent 35%) |
| Project section  | radial-gradient(circle at 80% 50%, rgba(0,184,255,0.07), transparent 35%) |

---

## Spacing & Layout

- **Max width:** 1500px
- **Section margin:** 32px auto, padding 60px 5%
- **Hero grid:** 1.2fr 0.8fr two-column, gap 8vw, padding 120px 6% 80px
- **Background grid overlay:** 56x56px subtle grid, faded with a mask gradient

---

## Components

### Header / Navigation
- Fixed, centered, floating pill bar (top: 16px)
- Frosted glass: backdrop-filter blur(18px) + semi-transparent bg
- 1px solid border
- Brand: DM Mono 12px — format "NAME / SYSTEMS"
- Nav: DM Mono 10px, ALL CAPS, hover → opacity: 0.45
- Light/dark toggle button: 30x30px, transparent, bordered

### Buttons (CTA)
- **Primary:** filled with --text color → hover fills --violet, text white
- **Secondary:** transparent, bordered → hover fills --bg
- Style: border 2px solid --border, box-shadow 4px 4px 0 --border (hard shadow, no blur)
- Hover: translate(2px, 2px) + shadow shrinks to 2px 2px
- Active: translate(4px, 4px) + shadow disappears
- Font: DM Mono 9–10px, ALL CAPS, gap 20–28px for arrow icon

### Stack / Tech Tags
- padding: 6px 8px
- border: 1px solid --border
- DM Mono 7px, letter-spacing 0.05em
- No background fill (transparent)

### System / Terminal Panel (hero right column)
- Card with border: 1px solid --border
- Hard drop shadow: 14px 14px 0 --text (uses text color, not accent)
- Slightly rotated: rotate(1.2deg) for brutalist feel
- Header & footer rows: DM Mono 9px, separated by 1px border
- Terminal prompt $ in --violet
- Blinking cursor: 5x11px block, background --violet, blink animation

### Status Indicator (live dot)
- 6x6px circle, background: --lime (#d8ff00)
- Outer ring: box-shadow 0 0 0 3px rgba(216, 255, 0, 0.12)
- Pulse animation: scale(1) → scale(1.25) over 2s, infinite

### Project / Section Cards
- border: 3px solid --border, box-shadow: 12px 12px 0 --border
- Hover: translateY(-2px), shadow grows to 16px 16px 0
- Radial gradient accent glow in top/side corner
- Internal 1px dividers

### Metrics Grid
- 3-column grid, 1px gap acting as border
- Each cell: padding 14px, label in DM Mono 8px muted, value in Inter 25px bold

---

## Motion & Animation

| Animation       | Trigger       | Details                                              |
|-----------------|---------------|------------------------------------------------------|
| Hero entrance   | Page load     | GSAP timeline: eyebrow → title lines (stagger 0.12s) → description → CTA → panel; power4.out ease |
| Button press    | Hover/Active  | CSS transform translate + box-shadow shrink          |
| Pulse dot       | Always on     | scale keyframe, 2s infinite                          |
| Cursor blink    | Always on     | opacity step, 1s infinite                            |
| Section hover   | Card hover    | translateY(-2px) lift                                |
| Nav fade        | Link hover    | opacity: 0.45 transition, 0.25s ease                 |

---

## Design Principles

1. **Terminal / system aesthetic** — UI reads like a developer dashboard or CLI output
2. **Hard shadows, no blur** — box shadows are opaque offset (not blurred), giving a print/stamp feel
3. **Neon on dark** — violet, cyan and lime only appear as small accent pops; never as backgrounds
4. **ALL CAPS labels everywhere** — navigation, tags, eyebrows, status rows
5. **Slight rotation** — key panels tilted 1.2deg for tension and personality
6. **Gradient text** — large headings use white-to-accent gradient fill instead of solid color
7. **Monospace for anything data/system** — any label that feels like metadata uses DM Mono
8. **Responsive** — collapses to single column at <900px, further simplified at <560px

---

## Page Sections (in order)

1. **Header** — floating frosted nav bar
2. **Hero** — full-viewport; title left, system status panel right; 3D neural brain background
3. **Work / Projects** — IntentScope (LLM API Gateway), OfferVault (ML Coach); each full-width card with architecture diagrams
4. **Stack / Engineering** — skill matrix across languages, backend, databases, frontend, DevOps, AI
5. **Experience** — internship timeline
6. **Certifications** — badge/card grid
7. **GitHub Activity** — live commit heatmap via GitHub REST API
8. **Contact** — links to LinkedIn, GitHub, LeetCode, email

---

## Stitch Usage Notes

- Use the **dark mode** token set as the primary design target
- The three accent colors (#6246ff, #00b8ff, #d8ff00) should appear **sparingly** — borders, small highlights, status dots, gradient endpoints
- All interactive elements follow the **hard shadow → shrink on hover → collapse on active** pattern
- Prefer DM Mono for anything that looks like a label, tag, or system output; Inter for everything else
- Sections should feel like **brutalist cards** with thick visible borders and hard drop shadows, not soft rounded containers
