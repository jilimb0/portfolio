# Architecture: portfolio

## 1. Identity & Domain
portfolio — Interactive desktop macOS-style portfolio showcase presenting production applications, architecture blueprints, and live demos.
- **Status:** active
- **Remote:** `git@github.com:jilimb0/portfolio.git`
- **Default Branch:** `master`

## 2. Stack & Runtime
- **Runtime:** TypeScript, React, Vite, UI-Library, Biome, Vitest.
- **Directories:** `src`, `public`

## 3. Structural Invariants
- All project metrics and URLs rendered in `src/` must align with `project-audit/PROJECTS.yaml`.
- Window manager state in `src/` must persist active application layout in localStorage.
- External preview links must open safely with `rel='noopener noreferrer'`.

## 4. Data Flows & External Boundaries
- Inbound requests are validated at perimeter boundaries using strict schemas.
- Outbound third-party calls must employ timeouts, retries with backoff, and circuit breakers.
- Zero secrets or unredacted customer PII in logs or storage snapshots.

## 5. Active ADRs
- **[ADR-0001](.ai/adr/0001-pwa-service-worker-cache-and-projects-yaml-alignment.md)** (`src/**`, `public/**`): PWA Service Worker (`public/sw.js` Network-First HTML + Cache-First SWR assets), Netlify immutable asset headers (`netlify.toml`), LCP preload, and strict alignment with `PROJECTS.yaml`.
- **[ADR-0002](.ai/adr/0002-security-headers-frame-ancestors-and-seo-baseline.md)** (`netlify.toml`, `index.html`, `public/**`): CSP headers restricting frame-ancestors to self and Telegram for TMA clickjacking defense, external link rel="noopener noreferrer" sanitization, and structured SEO metadata.
- **[ADR-0003](.ai/adr/0003-ecosystem-architecture-floorplan-and-sw-v3.md)** (`src/components/DesktopApp/**`, `public/ecosystem-floorplan.json`, `public/sw.js`): Interactive 22-project `EcosystemFloorplanView` showcase (`Plain`/`Architect` + cross-repo links) backed by `PROJECTS.yaml`-aligned `ecosystem-floorplan.json` and `portfolio-static-v3` precache rotation.
