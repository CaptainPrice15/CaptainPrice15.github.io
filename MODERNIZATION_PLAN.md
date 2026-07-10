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
| 1 — Design System | ✅ Done | 100% |
| 2 — Global Background | ✅ Done | 100% |
| 3 — Hero Upgrade | ✅ Done | 100% |
| 4 — Skill Constellation | ✅ Done | 100% |
| 5 — 3D Project Cards | ✅ Done | 100% |
| 6 — Scroll Timeline | ✅ Done | 100% |
| 7 — Polish & Performance | ✅ Done | 100% |

**Build & lint state:** `npm run build` ✅ passes · `npm run lint` ✅ passes (0 warnings/errors).

## Recent Implementations

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
| 9 | Centralized glass shadow/blur into CSS custom properties (`--glass-shadow`, `--glass-hover-shadow`, `--glass-blur`) | `globals.css`, `design-system.ts` | ✅ Implemented |
| 10 | All card surfaces standardized to use shared `glassClasses` utility | `projects.tsx`, `contact.tsx`, `experience.tsx`, `utils.ts` | ✅ Implemented |
| 11 | Stats section with scroll-triggered CountUp + Card3D | `stats.tsx`, `page.tsx` | ✅ Implemented |
| 12 | Lazy-loaded sections via `next/dynamic` with loading fallbacks | `page.tsx` | ✅ Implemented |
| 13 | R3F WebGL `AmbientBackground` (full-screen fragment shader) | `ambient-canvas.tsx` | ✅ Implemented |
| 14 | HeroAvatar "liquid glass" R3F distortion shader | `hero-avatar-canvas.tsx` | ✅ Implemented |
| 15 | `SkillConstellation` → R3F 3D force-directed graph | `skill-graph-canvas.tsx`, `skill-data.ts` | ✅ Implemented |
| 16 | Lazy-load R3F canvases via `next/dynamic` (ssr:false, code-split three.js) | `ambient-canvas.tsx`, `hero-avatar-canvas.tsx`, `skill-graph-canvas.tsx` | ✅ Implemented |
| 17 | Data decoupling — per-section data files, named types, barrel re-export, component wiring | `src/lib/types.ts`, `src/data/*.ts`, consuming components | ✅ Implemented |

## In-Progress Items (Jul 2026)

No items currently in progress. All planned work is complete.

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
| 11 | HeroAvatar ref-during-render — `angleRef.current` read in JSX (no re-render, ESLint `react-hooks/refs` error) | `hero.tsx` | ✅ Fixed |
| 12 | Unused imports — `AnimatePresence` in `section-reveal.tsx`, `useMotionValue` in `experience.tsx` | `section-reveal.tsx`, `experience.tsx` | ✅ Fixed |
| 13 | R3F/React-Compiler conflict — `react-hooks/immutability`, `react-hooks/refs`, `react-hooks/set-state-in-effect` on R3F files | `eslint.config.mjs` | ✅ Resolved (compiler opt-out + rule override) |

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | Implemented / Fixed |
| ⏳ | Partially implemented / In progress |
| ⬜ | Not yet started |
| ❌ | Blocked or not planned |

---

## Pain Points — Resolution Status

| # | Pain Point | Status | Notes |
|---|------------|--------|-------|
| 1 | **Severe Fragmentation** — 56 isolated communities, sections feel like separate pages | ✅ Resolved | Design system (`design-system.ts`, `glassClasses`), `SectionReveal` transitions, consistent `motion-variants`, and global `AmbientBackground` unify the scroll experience |
| 2 | **Static Hero** — centered text, static profile, CSS-only glows | ✅ Resolved | Typewriter, 3D tilt, particle-network background, R3F liquid-glass avatar shader |
| 3 | **Skills text-heavy** — static list, no visual depth | ✅ Resolved | 3D force-directed graph (`skill-graph-canvas.tsx`), radar chart toggle, interactive hover |
| 4 | **Projects generic** — flat card grid, no hover depth | ✅ Resolved | 3D tilt cards (`card-3d.tsx`), per-project icons/gradients, expandable detail modal |
| 5 | **No living background** — CSS glows used locally | ✅ Resolved | Global full-screen R3F shader (`ambient-canvas.tsx`) mouse parallax + scroll-hue |
| 6 | **Data tightly coupled** — all content hardcoded in `portfolio.ts` | ✅ Resolved | Data fully decoupled into per-section files (`hero.ts`, `about.ts`, `skills.ts`, `projects.ts`, `experience.ts`, `contact.ts`). Named types exported from `types.ts`, `portfolio.ts` re-exports the barrel, and all 9 consuming components now import section-specific data directly |

---

## The Plan: 7-Phase Transformation

### ✅ Phase 1: Foundation — Unify the Design System (100% complete)
**Goal:** Merge the fragmented `glass`, `card-shadow`, `gradient-text`, and `motion-variants` communities into a single cohesive design language.

**✅ Step 1.1 — Create a `design-system.ts` hub.**
- `src/lib/design-system.ts` exists with shared tokens, colors, spacing, and transitions.
- `motion-variants.ts` imports from `design-system.ts`.
- ✅ Completed: Hardcoded shadow/blur values in `.glass`, `.glass-hover`, `.card-shadow` replaced with CSS custom properties (`--glass-shadow`, `--glass-hover-shadow`, `--glass-blur`) sourced from `design-system.ts` tokens.

**✅ Step 1.2 — Introduce CSS custom properties for animation timing.**
- CSS variables `--ease-out-expo`, `--ease-spring`, `--ease-elastic` defined in `design-system.ts`.
- `motion-variants.ts` uses these uniformly.

**✅ Step 1.3 — Standardize card surfaces.**
- `utils.ts` exports: `buttonGradientClasses`, `glassClasses`, `cardHoverOverlay`, `sectionContainer`.
- ✅ All card surfaces now use shared `glassClasses`: `projects.tsx`, `contact.tsx`, `experience.tsx`, `about.tsx`.

---

### ✅ Phase 2: Atmosphere — Add a Global WebGL/Canvas Background (100% complete)
**Goal:** Turn the static `body::before` / `body::after` glows into a living, breathing ambient field.

**✅ Step 2.1 — Add a `AmbientBackground` component.**
- `src/components/ambient-background.tsx` renders a canvas with 3D depth layers, mouse-reactive parallax blobs.
   - DPR capped to 1.5. Uses `useReducedMotion`.
   - ✅ Upgraded to R3F/WebGL full-screen fragment shader (`ambient-background.tsx`) — mouse parallax + scroll-hue, reduced-motion returns `null`.

**✅ Step 2.2 — Connect it to the scroll progress.**
- ✅ Wired: `AmbientBackground` shifts hue/intensity from the shared Lenis progress value (falls back to native scroll when motion is reduced).

---

### ✅ Phase 3: Hero — Immersive & Interactive (100% complete)
**Goal:** Make the hero the most important "hook." The `hero_component` should be the God Node of the entire page.

**✅ Step 3.1 — Keep the Typewriter, but amplify it.**
- ✅ Typewriter with rotating phrases is implemented (`hero.tsx`).
- ✅ Stale closure bug fixed (refs-based implementation, Jul 2026).
- ✅ 3D tilt on text container on mouse move — landed.
- ✅ Micro-particle burst on phrase completion — landed.

**✅ Step 3.2 — Profile Picture Evolution.**
- ✅ `HeroAvatar` component renders initials with rotating conic-gradient border (animated via requestAnimationFrame).
- ✅ Rotating gradient border implemented — `conic-gradient(from ${angle}deg, #2563eb, #7c3aed, #ec4899, #2563eb)`.
   - ✅ Avatar placed in 2-column grid layout alongside text.
   - ✅ "Liquid glass" distortion implemented via R3F shader (`hero-avatar-webgl.tsx`).

**✅ Step 3.3 — Background Depth.**
- ✅ `ParticleNetwork` component renders a canvas with 50 particles connected by lines.
- ✅ Mouse-reactive; particles form a network echoing the knowledge graph theme.
- ✅ Respect `useReducedMotion`.
- **Note:** Phrase-completion bursts reuse the same canvas via a `burstSignal` prop.

---

### ✅ Phase 4: Skills — Interactive Knowledge Constellation (100% complete)
**Goal:** Visualize the skills as a miniature, interactive graph. This turns the abstract `Skills Component` into an engaging micro-experience.

**✅ Step 4.1 — Build a `SkillConstellation` component.**
- ✅ `src/components/sections/skill-constellation.tsx` renders a canvas-based force-directed graph.
- ✅ Nodes drift with center attraction and mouse repulsion.
- ✅ Hover detection, glow effects, tooltips, and connection drawing.
   - ✅ Respects `useReducedMotion` (falls back to a grid of badges).
   - ✅ Upgraded to R3F 3D force-directed graph (`skill-constellation.tsx`) — instanced nodes, per-frame 3D force sim, OrbitControls auto-rotate, `Html` hover tooltip.

**✅ Step 4.2 — Map the data structure from `portfolio.ts`.**
- ✅ Nodes/connections now derived from `portfolioData.skills`. Categories map to consistent colors.
- ✅ Cross-category relationships are defined next to the data map; unmatched labels are dropped silently.

**✅ Step 4.3 — Add a "tech radar" toggle.**
- ✅ `TechRadar` component renders a Canvas 2D rotating radar chart with category labels, concentric rings, and proficiency polygons.
- ✅ Three-mode toggle in `skills.tsx`: Constellation / Radar / Grid.
- ✅ Respects `useReducedMotion` (falls back to static percentage grid).

---

### ✅ Phase 5: Projects — Cinematic 3D Cards (100% complete)
**Goal:** Transform `ProjectCard` from a flat card into a cinematic, 3D-interactive element.

**✅ Step 5.1 — Implement 3D Tilt Cards.**
- ✅ `src/components/card-3d.tsx` provides a reusable 3D tilt wrapper with mouse-driven rotateX/rotateY, shine overlay, and depth shadow.
- ✅ Uses `transform-style: preserve-3d`, spring transitions.
- ✅ Bug fix applied: duplicate `translateZ` class/style conflict resolved (Jul 2026).

**✅ Step 5.2 — Project Data Expansion.**
- ✅ `coverGradient` and `iconEmoji` fields added to `Project` type in `types.ts`.
- ✅ All 4 projects in `portfolio.ts` have per-project `coverGradient` and `iconEmoji` values.
- ✅ Icon parallax: project card icons use `useMotionValue`/`useSpring` tilt with mouse tracking.

**✅ Step 5.3 — Expandable Project View.**
- ✅ Animated detail modal/drawer landed (framer-motion scale/spring, backdrop blur).
- ✅ External links remain available alongside the expanded view.

---

### ✅ Phase 6: Timeline — Scroll-Driven Narrative (100% complete)
**Goal:** The `Experience Section` needs to tell a story. A scroll-driven baseline timeline is in place and is being enhanced.

**✅ Step 6.1 — Build a `ScrollTimeline` component.**
- ✅ The `Experience` section now renders a vertical timeline with a scroll-progress line and alternating entrance animations.
- ✅ `slideInLeft` / `slideInRight` variants are used for direction-aware reveals.

**✅ Step 6.2 — Add "milestone" markers.**
- ✅ Per-entry milestone chips (Current / Milestone / Start) live above each experience card.

**✅ Step 6.3 — Contextual Background Shift.**
- ✅ Background hue now evolves with scroll progress (Phase 2.2 connection).
- ✅ Localized section-level radial gradient glow added behind the timeline viewport (masked to fade at top/bottom).

---

### ✅ Phase 7: Polish & Performance (100% complete)
**Goal:** Tie everything together with smooth transitions and optimized rendering.

**✅ Step 7.1 — Smooth Scroll & Lenis.**
- ✅ `lenis` integrated in `smooth-scroll.tsx` with smooth easing and exposes shared progress.
- ✅ Bug fix applied: RAF loop now properly cancelled on cleanup (Jul 2026).
- ✅ `ScrollProgress` is now connected to the same Lenis progress (with native scroll fallback).
- ✅ Framer-motion scroll animations reviewed: all `whileInView` animations use IntersectionObserver (Lenis-safe pattern). `useScroll` with target refs works correctly with Lenis firing native scroll events.

**✅ Step 7.2 — Global Page Transitions.**
- ✅ `SectionReveal` component wraps each section with whileInView entrance transitions (opacity + y + scale).
- ✅ All 6 sections in `page.tsx` wrapped with staggered delays (0 to 0.25).
- ✅ Respects `useReducedMotion`.

**✅ Step 7.3 — Reduce Motion Respect.**
- ✅ `use-reduced-motion.ts` exists and is used in: `AmbientBackground`, `SmoothScroll`, `Hero/ParticleNetwork`, `SkillConstellation`, `Card3D`, `TechRadar`, `SectionReveal`.
- ✅ Fallback rendering when reduced motion is preferred: canvas animations are skipped, simple CSS renders instead.
- **Note:** This is well-implemented and matches best practices.

**✅ Step 7.4 — Graphify Easter Egg.**
- ✅ `GraphifyEasterEgg` mounted in the root layout. Type `graphify` anywhere to reveal the knowledge-graph stats modal.

---

## Implementation Priority Matrix

| Phase | Impact | Effort | Priority | Current Status |
|-------|--------|--------|----------|----------------|
| 1 (Design System Unify) | High | Low | **Week 1** | ✅ 100% done |
| 7.3 (Reduce Motion) | High | Low | **Week 1** | ✅ Done |
| 2 (Global Background) | Very High | Medium | **Week 1–2** | ✅ 100% done |
| 3 (Hero Upgrade) | Very High | Medium | **Week 2** | ✅ 100% done |
| 7.1 (Lenis Smooth Scroll) | High | Low | **Week 2** | ✅ Done (RAF fix applied) |
| 5 (3D Project Cards) | High | Medium | **Week 3** | ✅ 100% done |
| 4 (Skill Constellation) | Very High | High | **Week 3–4** | ✅ 100% done |
| 6 (Scroll Timeline) | High | Medium | **Week 4** | ✅ 100% done |
| 7.4 (Graphify Easter Egg) | Medium | Medium | **Week 4+** | ✅ Done |

---

## Tech Stack Additions — Status

| Feature | Proposed Library | Why | Status |
|---------|-----------------|-----|--------| 
| Smooth Scroll | `lenis` | Industry standard, lightweight, native feel | ✅ Installed & integrated |
| 3D/WebGL | `three.js` / `react-three-fiber` + `drei` | Full control, declarative with R3F | ✅ Adopted (Jul 2026) — see below |
| Force Graph | R3F 3D force sim (custom) | Replaces the manual Canvas 2D graph; no `d3-force` dep | ✅ Adopted via R3F (Jul 2026) |
| Animation Orchestration | `framer-motion` (already present) | Layout animations, AnimatePresence | ✅ Already present and fully used |

### R3F Adoption Notes (Jul 2026)
`three@0.185`, `@react-three/fiber@9.6` (React 19 compatible), `@react-three/drei@10.7`, `@types/three` installed.

| # | Item | Phase | Implementation |
|---|------|-------|----------------|
| 1 | `AmbientBackground` → full-screen fragment shader (WebGL) | 2.1 | `ambient-canvas.tsx` — `BlobField` shader; mouse parallax + scroll-hue via Lenis progress; reduced-motion → `null`. Wrapper: `ambient-background.tsx` (dynamic ssr:false) |
| 2 | HeroAvatar "liquid glass" distortion | 3.2 | `hero-avatar-canvas.tsx` — initials + conic ring baked to texture, warped by flowing simplex-noise shader + mouse specular + tilt. Wrapper: `hero-avatar-webgl.tsx` (dynamic ssr:false, DOM fallback for reduced motion) |
| 3 | `SkillConstellation` → 3D force-directed graph | 4.1 | `skill-graph-canvas.tsx`, `skill-data.ts` — instanced nodes, per-frame 3D force sim (repulsion + spring + shell pull), `OrbitControls` auto-rotate, `Html` hover tooltip. Wrapper: `skill-constellation.tsx` (dynamic ssr:false, grid fallback for reduced motion) |

**SSR / compiler compatibility:** R3F is imperative and conflicts with React Compiler's strict `react-hooks` rules (`immutability`, `refs`, `set-state-in-effect`). The three R3F canvas modules are opted out of the compiler via `// @disable-react-compiler` and an ESLint override in `eslint.config.mjs`. Each canvas is mounted through a thin `next/dynamic({ ssr: false })` wrapper (`ambient-background.tsx`, `hero-avatar-webgl.tsx`, `skill-constellation.tsx`) so the heavy `three` bundle is code-split into a separate async chunk and never in the initial load. The wrappers import no `three` code.

---

## Remaining & In-Progress Work

All 7 phases and the data-decoupling follow-up are complete. Build & lint pass cleanly.

### ✅ Data Decoupling (pain point #6, completed Jul 2026)
- ✅ Created `src/data/contact.ts` in addition to existing per-section files (`hero.ts`, `about.ts`, `skills.ts`, `projects.ts`, `experience.ts`).
- ✅ Updated `src/lib/types.ts` with named section types (`HeroData`, `AboutData`, `SkillsData`, `ContactData`) and composed `PortfolioData` from them.
- ✅ Updated `src/data/portfolio.ts` to act as a barrel that re-exports data from per-section files while keeping the `portfolioData` aggregate object.
- ✅ Wired all 9 consumers to import section-specific data directly: `footer.tsx`, `hero.tsx`, `about.tsx`, `skills.tsx`, `projects.tsx`, `experience.tsx`, `contact.tsx`, `tech-radar.tsx`, `skill-data.ts`.
- Enables filtering, localization, and dynamic content updates without code changes.

### ✅ Visual enhancements (Jul 2026)
- ✅ Replaced custom simplex-noise shader with `MeshTransmissionMaterial` on the hero avatar — true refractive glass orb with env-map reflections, temporal distortion, and backside refraction.
- ✅ Added `drei` `<Environment>` (preset `studio`) to the 3D skill graph — nodes are now `meshStandardMaterial` with metalness/roughness, picking up PBR reflections from the HDRI environment.

### ✅ Completed future enhancements (Jul 2026)
- Lazy-load R3F chunks — canvases code-split into async chunks via `next/dynamic({ ssr:false })`; verified `three` isolated in its own chunk.

---

> **Summary:** All 7 modernization phases complete, all 6 original Graphify pain points resolved. Data decoupling fully implemented. Visual enhancements: refractive glass avatar (MeshTransmissionMaterial) and PBR environment on skill-graph nodes. Lint ✅, Build ✅. The portfolio is visually rich with WebGL ambient background, liquid-glass avatar, 3D skill graph, cinematic project cards, scroll timeline, and smooth Lenis scrolling — all code-split for performance.
