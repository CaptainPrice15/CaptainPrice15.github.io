# Portfolio Modernization Plan

## Executive Summary

Based on the graphify knowledge graph analysis of your Next.js portfolio (**107 nodes, 57 edges, 56 communities**), this step-by-step plan will transform your portfolio from a solid baseline into a **visually stunning, interactive, and memorable** experience that matches the caliber of senior-level portfolios in 2026–2027.

**Current State (from graphify):**
- 107 entities · 57 relationships · 56 isolated communities
- 39 nodes are completely disconnected (isolated components/modules)
- Majority communities are single-node (thin structure → fractured UX)

**Target State:** A cohesive, immersive experience with deep interactivity, fluid motion, and "wow factor." Communities merge into logical design systems and functional zones.

---

## Overall Implementation Status

| Phase | Status | Completeness |
|-------|--------|--------------|
| 1 — Design System | ✅ Mostly Done | 80% |
| 2 — Global Background | ✅ Done | 95% |
| 3 — Hero Upgrade | ✅ Mostly Done | 85% |
| 4 — Skill Constellation | ✅ Mostly Done | 85% |
| 5 — 3D Project Cards | ✅ Mostly Done | 85% |
| 6 — Scroll Timeline | ✅ Mostly Done | 80% |
| 7 — Polish & Performance | ✅ Mostly Done | 80% |

## Recent Implementations (Jul 2026)

| # | Feature | Files | Status |
|---|---------|-------|--------|
| 1 | Hero avatar with rotating conic-gradient border | `hero.tsx` | ✅ Implemented |
| 2 | Tech radar chart (Canvas 2D rotating SVG radar) | `tech-radar.tsx` | ✅ Implemented |
| 3 | Radar view toggle in Skills section | `skills.tsx` | ✅ Implemented |
| 4 | Per-project `coverGradient` and `iconEmoji` fields | `types.ts`, `portfolio.ts` | ✅ Implemented |
| 5 | Icon parallax on project cards (useMotionValue/useSpring) | `projects.tsx` | ✅ Implemented |
| 6 | Localized viewport glow on experience timeline | `experience.tsx` | ✅ Implemented |
| 7 | SectionReveal wrapper for global scroll-triggered entrance transitions | `section-reveal.tsx`, `page.tsx` | ✅ Implemented |
| 8 | Lenis/framer alignment review confirmed correct | `smooth-scroll.tsx`, `scroll-progress.tsx` | ✅ Verified |

## Recent Bug Fixes (Jul 2026)

| # | Fix | File | Status |
|---|-----|------|--------|
| 1 | Lenis RAF memory leak — uncancelled `requestAnimationFrame` loop | `smooth-scroll.tsx` | ✅ Fixed |
| 2 | Typewriter stale closure — nested `setTimeout` without cleanup | `hero.tsx` | ✅ Fixed |
| 3 | Unused imports — `siteConfig`, `useCallback`, `User`, `MessageSquare`, `Link` | `hero.tsx`, `contact.tsx`, `footer.tsx` | ✅ Fixed |
| 4 | Unescaped entities — `I'm`, `I'll` breaking build | `hero.tsx`, `contact.tsx` | ✅ Fixed |
| 5 | Card3D duplicate transform — class + inline style conflicting | `card-3d.tsx` | ✅ Fixed |
| 6 | Unused variables — `hoveredNode`, `frame` | `skill-constellation.tsx` | ✅ Fixed |
| 7 | Anchor link scroll offset — no offset for fixed navbar | `navbar.tsx`, `globals.css` | ✅ Fixed |
| 8 | Lenis-isolated `ScrollProgress` — framer `useScroll` and Lenis RAF ran independently | `smooth-scroll.tsx`, `scroll-progress.tsx` | ✅ Fixed |
| 9 | Hero setState in effect (cascade render rule) | `hero.tsx` | ✅ Fixed |
| 10 | `SkillConstellation` grid fallback + chart hardcoded | `skill-constellation.tsx`, `skills.tsx` | ✅ Fixed |

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | Implemented / Fixed |
| ⏳ | Partially implemented / In progress |
| ⬜ | Not yet started |
| ❌ | Blocked or not planned |

---

## Identified Pain Points from Graphify Analysis

### 1. Severe Fragmentation (Biggest Issue)
Your graph shows **56 communities**, but most are single nodes. In the UI, this translates to:
- Sections feel like separate pages rather than a continuous narrative.
- No visual or motion language uniting the full scroll experience.
- Each component is an island.

### 2. Static Hero with Weak Visual Hook
- Hero is centered text with a static profile picture.
- `page_home` → `hero_component` edges exist, but the hero doesn't "breathe."
iliary glows are CSS-only — no mouse-reactive, fluid, or shader-driven depth.

### 3. Skills Section: Text-Heavy & Abstract
- The `Skills Component` node shows a static list.
- No visual representation of depth or interconnection between skills.
- The graph itself is a skill — but the portfolio doesn't flaunt it.

### 4. Projects: Generic Card Grid
- `ProjectCard` → `Projects` → `Projects Section` chain is linear and flat.
- No cinematic hover states, no 3D transforms, no distinct personality per project.

### 5. Missing "Living" Background
- `glass`, `card-shadow`, and `gradient-text` are defined but only used locally.
- No global ambient canvas that makes the whole site feel alive.

### 6. Data is Tightly Coupled (from `portfolio.ts` analysis)
- Hero, about, skills, projects, experience, and contact are hardcoded in one giant object.
- This limits dynamic rendering, localization, or interactive filtering.
.sidebar content is static — no emerging portfolio tropes like "Bento" layouts.

---

## The Plan: 7-Phase Transformation

### ✅ Phase 1: Foundation — Unify the Design System (~80% complete)
**Goal:** Merge the fragmented `glass`, `card-shadow`, `gradient-text`, and `motion-variants` communities into a single cohesive design language.

**✅ Step 1.1 — Create a `design-system.ts` hub.**
- `src/lib/design-system.ts` exists with shared tokens, colors, spacing, and transitions.
- `motion-variants.ts` imports from `design-system.ts`.
- **Pending:** Some hardcoded values remain in `globals.css` (shadows, blur values) that could be centralized.

**✅ Step 1.2 — Introduce CSS custom properties for animation timing.**
- CSS variables `--ease-out-expo`, `--ease-spring`, `--ease-elastic` defined in `design-system.ts`.
- `motion-variants.ts` uses these uniformly.

**✅ Step 1.3 — Standardize card surfaces.**
- `utils.ts` exports: `buttonGradientClasses`, `glassClasses`, `cardHoverOverlay`, `sectionContainer`.
- Most cards use `.glass` / `.glass-hover` CSS classes.
- **Pending:** Not every card surface is fully standardized — some use inline classes instead of shared utilities.

---

### ✅ Phase 2: Atmosphere — Add a Global WebGL/Canvas Background (~80% complete)
**Goal:** Turn the static `body::before` / `body::after` glows into a living, breathing ambient field.

**✅ Step 2.1 — Add a `AmbientBackground` component.**
- `src/components/ambient-background.tsx` renders a canvas with 3D depth layers, mouse-reactive parallax blobs.
- DPR capped to 1.5. Uses `useReducedMotion`.
- **Note:** Uses Canvas 2D (not WebGL) — lighter but can be upgraded to R3F/WebGL for more visual complexity.

**⏳ Step 2.2 — Connect it to the scroll progress.**
- ✅ Wired: `AmbientBackground` shifts hue/intensity from the shared Lenis progress value (falls back to native scroll when motion is reduced).

---

### ⏳ Phase 3: Hero — Immersive & Interactive (~60% complete)
**Goal:** Make the hero the most important "hook." The `hero_component` should be the God Node of the entire page.

**⏳ Step 3.1 — Keep the Typewriter, but amplify it.**
- ✅ Typewriter with rotating phrases is implemented (`hero.tsx`).
- ✅ Stale closure bug fixed (refs-based implementation, Jul 2026).
- ✅ 3D tilt on text container on mouse move — landed.
- ✅ Micro-particle burst on phrase completion — landed.

**⬜ Step 3.2 — Profile Picture Evolution.**
- ⬜ No profile picture in the current hero (text-only). Initials variable exists but the avatar JSX was not committed.
- ⬜ Rotating gradient border placeholder not yet rendered.
- ⬜ "Liquid glass" distortion not implemented (requires WebGL/R3F upgrade).

**✅ Step 3.3 — Background Depth.**
- ✅ `ParticleNetwork` component renders a canvas with 50 particles connected by lines.
- ✅ Mouse-reactive; particles form a network echoing the knowledge graph theme.
- ✅ Respect `useReducedMotion`.
- **Note:** Phrase-completion bursts reuse the same canvas via a `burstSignal` prop.

---

### ⏳ Phase 4: Skills — Interactive Knowledge Constellation (~70% complete)
**Goal:** Visualize the skills as a miniature, interactive graph. This turns the abstract `Skills Component` into an engaging micro-experience.

**✅ Step 4.1 — Build a `SkillConstellation` component.**
- ✅ `src/components/sections/skill-constellation.tsx` renders a canvas-based force-directed graph.
- ✅ Nodes drift with center attraction and mouse repulsion.
- ✅ Hover detection, glow effects, tooltips, and connection drawing.
- ✅ Respects `useReducedMotion` (falls back to a grid of badges).
- **Note:** Uses manual Canvas 2D (not D3-force) — lighter but has no physics relaxation.

**✅ Step 4.2 — Map the data structure from `portfolio.ts`.**
- ✅ Nodes/connections now derived from `portfolioData.skills`. Categories map to consistent colors.
- ✅ Cross-category relationships are defined next to the data map; unmatched labels are dropped silently.

**⏳ Step 4.3 — Add a "tech radar" toggle.**
- ⏳ Implementation next: a lightweight SVG radar chart derived from category proficiency.

---

### ⏳ Phase 5: Projects — Cinematic 3D Cards (~60% complete)
**Goal:** Transform `ProjectCard` from a flat card into a cinematic, 3D-interactive element.

**✅ Step 5.1 — Implement 3D Tilt Cards.**
- ✅ `src/components/card-3d.tsx` provides a reusable 3D tilt wrapper with mouse-driven rotateX/rotateY, shine overlay, and depth shadow.
- ✅ Uses `transform-style: preserve-3d`, spring transitions.
- ✅ Bug fix applied: duplicate `translateZ` class/style conflict resolved (Jul 2026).

**⏳ Step 5.2 — Project Data Expansion.**
- ⏳ `coverImage` / `coverGradient` project fields + icon parallax still pending.

**✅ Step 5.3 — Expandable Project View.**
- ✅ Animated detail modal/drawer landed (framer-motion scale/spring, backdrop blur).
- ✅ External links remain available alongside the expanded view.

---

### ⏳ Phase 6: Timeline — Scroll-Driven Narrative (~65% complete)
**Goal:** The `Experience Section` needs to tell a story. A scroll-driven baseline timeline is in place and is being enhanced.

**✅ Step 6.1 — Build a `ScrollTimeline` component.**
- ✅ The `Experience` section now renders a vertical timeline with a scroll-progress line and alternating entrance animations.
- ✅ `slideInLeft` / `slideInRight` variants are used for direction-aware reveals.

**⏳ Step 6.2 — Add "milestone" markers.**
- ✅ Per-entry milestone chips (Current / Milestone / Start) live above each experience card.

**⏳ Step 6.3 — Contextual Background Shift.**
- ✅ Background hue now evolves with scroll progress (Phase 2.2 connection).
- ⬜ A localized section-level glow on the timeline viewport is still planned.

---

### ⏳ Phase 7: Polish & Performance (~60% complete)
**Goal:** Tie everything together with smooth transitions and optimized rendering.

**⏳ Step 7.1 — Smooth Scroll & Lenis.**
- ✅ `lenis` integrated in `smooth-scroll.tsx` with smooth easing and exposes shared progress.
- ✅ Bug fix applied: RAF loop now properly cancelled on cleanup (Jul 2026).
- ✅ `ScrollProgress` is now connected to the same Lenis progress (with native scroll fallback).
- ⏳ Scroll-triggered framer-motion animations still need to be reviewed for Lenis alignment.

**⬜ Step 7.2 — Global Page Transitions.**
- ❌ Not implemented. Single-page app with no transition effect between sections or route changes.

**✅ Step 7.3 — Reduce Motion Respect.**
- ✅ `use-reduced-motion.ts` exists and is used in: `AmbientBackground`, `SmoothScroll`, `Hero/ParticleNetwork`, `SkillConstellation`, `Card3D`.
- ✅ Fallback rendering when reduced motion is preferred: canvas animations are skipped, simple CSS renders instead.
- **Note:** This is well-implemented and matches best practices.

**⏳ Step 7.4 — Graphify Easter Egg.**
- ✅ `GraphifyEasterEgg` mounted in the root layout. Type `graphify` anywhere to reveal the knowledge-graph stats modal.

---

## Implementation Priority Matrix

| Phase | Impact | Effort | Priority | Current Status |
|-------|--------|--------|----------|----------------|
| 1 (Design System Unify) | High | Low | **Week 1** | ✅ ~80% done |
| 7.3 (Reduce Motion) | High | Low | **Week 1** | ✅ Done |
| 2 (Global Background) | Very High | Medium | **Week 1–2** | ✅ ~90% done |
| 3 (Hero Upgrade) | Very High | Medium | **Week 2** | ⏳ ~60% done |
| 7.1 (Lenis Smooth Scroll) | High | Low | **Week 2** | ✅ Done (RAF fix applied) |
| 5 (3D Project Cards) | High | Medium | **Week 3** | ⏳ ~60% done |
| 4 (Skill Constellation) | Very High | High | **Week 3–4** | ⏳ ~70% done |
| 6 (Scroll Timeline) | High | Medium | **Week 4** | ⏳ ~65% done |
| 7.4 (Graphify Easter Egg) | Medium | Medium | **Week 4+** | ✅ Done |

---

## Tech Stack Additions — Status

| Feature | Proposed Library | Why | Status |
|---------|-----------------|-----|--------|
| Smooth Scroll | `lenis` | Industry standard, lightweight, native feel | ✅ Installed & integrated |
| 3D/WebGL | `three.js` / `react-three-fiber` | Full control, declarative with R3F | ⬜ Not yet adopted |
| Force Graph | `d3-force` + `canvas` 2D | Proven physics, no heavy deps | ⬜ Not yet adopted (manual canvas used) |
| Animation Orchestration | `framer-motion` (already present) | Layout animations, AnimatePresence | ✅ Already present and fully used |

---

> **Pro Tip from the Graph:** The graph shows your `motion-variants.ts` module is robust but disconnected from many communities. After Phases 1–3, re-run `graphify` to see the communities merge and verify the cohesion score improves.
