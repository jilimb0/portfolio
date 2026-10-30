# ADR-0001: PWA Service Worker Caching, Immutable Edge Headers & PROJECTS.yaml Inventory Alignment

**Status:** Accepted  
**Date:** 2026-10-30  
**Deciders:** Core Engineering Team  
**Applies-To:** `src/**`, `public/**`  
**Supersedes:** None  
**Overrides-Global:** None (`GLOBAL-TS-01`, `GLOBAL-UI-01`, `GLOBAL-PRIV-02`)  

## Y-Summary
In the context of the macOS-style desktop portfolio showcase (`src/**`, `public/**`), facing LCP image latency, offline asset misses, and inventory drift across 18 ecosystem repositories, we decided for **a versioned PWA Service Worker (`public/sw.js` with Network-First HTML and Cache-First SWR assets), Netlify immutable Edge CDN headers (`netlify.toml`), LCP hero preloading, and strict alignment of `portfolio-db.json` with `project-audit/PROJECTS.yaml`**, to achieve instant repeat loads and 100% accurate ecosystem metrics, accepting explicit Service Worker cache-version rotation on major asset changes.

## Context and Problem Statement
`portfolio` presents the entire 18-project ecosystem inside an interactive macOS desktop GUI. Previously, `public/sw.js` cached only `/`, hashed Vite assets lacked immutable CDN headers, and showcase project metadata risked drifting from the canonical `PROJECTS.yaml` inventory.

## Decision Drivers
- Fast Largest Contentful Paint (LCP) via `<link rel="preload" href="/logo.webp">` and immutable WebP asset caching
- Offline resilience via `public/sw.js` (`portfolio-static-v2` / `portfolio-runtime-v2`)
- Single source of truth alignment with `project-audit/PROJECTS.yaml` and safe external links (`rel="noopener noreferrer"`)

## Imperative Constraints for AI Agents (MUST / MUST NOT)
- **MUST:** Keep project names, domains, live URLs, and descriptions in `src/` / `portfolio-db.json` aligned with `project-audit/PROJECTS.yaml`.
- **MUST:** Maintain `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` and `must-revalidate` for `/sw.js` and `/index.html` in `netlify.toml`.
- **MUST:** Guard `localStorage` and `window` window-manager persistence calls for test/SSR safety and include `rel="noopener noreferrer"` on all external preview links.
- **MUST NOT:** Never cache `/sw.js` or `/index.html` as `immutable` (breaks Service Worker updates).

## Considered Options & Rejected Alternatives
1. **Option 1 (Chosen): Single-Page Filter/Window Manager + PWA Service Worker (`public/sw.js`) + Immutable Asset Headers**
   - *Why chosen:* Delivers instant desktop-like window switching, offline availability, and 48/48 passing Vitest + RTL tests.
2. **Option 2 (Rejected — DO NOT PROPOSE): Multi-page client router with uncached external image CDNs**
   - *Why rejected:* Breaks the macOS desktop window state upon navigation and degrades LCP performance.

## Consequences & Trade-offs
- **Positive:** Sub-second repeat visits and verified inventory accuracy.
- **Negative / Cost:** Updating non-hashed public files in `public/` requires bumping the cache version in `public/sw.js`.

## Verification Gate
- **Check Command:** `pnpm validate`
- **Code Anchors:** `public/sw.js`, `netlify.toml`, `index.html`
