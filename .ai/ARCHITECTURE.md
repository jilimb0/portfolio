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
