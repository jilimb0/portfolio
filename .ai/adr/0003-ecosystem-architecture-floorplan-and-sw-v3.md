# ADR-0003: Ecosystem Architecture Floorplan & Service Worker v3 Rotation

**Status:** Accepted  
**Date:** 2026-11-24  
**Deciders:** Core Engineering Team  
**Applies-To:** `src/components/DesktopApp/**`, `public/ecosystem-floorplan.json`, `public/sw.js`  
**Supersedes:** None  
**Overrides-Global:** None  

## Y-Summary
In the context of Portfolio's interactive desktop showcase, facing the need to present all 22 ecosystem projects and their cross-repo connections offline without violating design-system or Service Worker invariants, we decided for a static `public/ecosystem-floorplan.json` artifact aligned 1:1 with `project-audit/PROJECTS.yaml`, `EcosystemFloorplanView` inside `AppWindow`, and `portfolio-static-v3` Service Worker precache rotation, neglecting raw third-party HTML canvas embeds, to achieve offline-first Plain/Architect exploration with `rel="noopener noreferrer"` link hygiene, accepting manual/scripted regeneration when `PROJECTS.yaml` changes.

## Context and Problem Statement
Portfolio previously presented projects only as flat tiles (`portfolio-db.json`). Adding an interactive topology view across all 22 projects (including `[20] GateBar` and `[21] ReadMD`) requires alignment with `PROJECTS.yaml` (ADR-0001), safe external link attributes (ADR-0002), and Service Worker cache busting (`sw.js`).

## Decision Drivers
- **ADR-0001:** Every displayed node and URL must match `project-audit/PROJECTS.yaml`; static assets in `public/` require `portfolio-static-v*` cache rotation.
- **ADR-0002:** All external links must carry `rel="noopener noreferrer"`.
- **Axis 2 (Offline-First) & Axis 6 (SSR/A11y):** Precache `/ecosystem-floorplan.json`, guard `window`, and provide WAI-ARIA landmarks/roles.

## Imperative Constraints for AI Agents (MUST / MUST NOT)
- **MUST:** Keep `public/ecosystem-floorplan.json` synchronized with `project-audit/PROJECTS.yaml` and bump `portfolio-static-v*` on updates.
- **MUST:** Render external URLs with `target="_blank" rel="noopener noreferrer"`.
- **MUST NOT:** Embed external unverified CDN scripts or bypass `@ui-construction-library/core` primitives.
- **DO NOT RE-INTRODUCE:** Stale `portfolio-static-v2` cache keys or flat unlinked project lists without `PROJECTS.yaml` parity.

## Considered Options & Rejected Alternatives
1. **Option 1 (Chosen): Static `ecosystem-floorplan.json` + `EcosystemFloorplanView` + `sw.js` v3**
   - *Why chosen:* Zero runtime backend dependency, offline-ready, and compliant with ADR-0001/ADR-0002.
2. **Option 2 (Rejected — DO NOT PROPOSE): Embedding standalone `floorplan/index.html`**
   - *Why rejected:* Violates CSP/UI-Library styling and cannot stay in sync with `PROJECTS.yaml`.

## Consequences & Trade-offs
- **Positive:** Interactive 22-project topology map with Plain/Architect mode and cross-repo edge inspection.
- **Negative / Cost:** Requires regenerating `public/ecosystem-floorplan.json` when new projects are added.

## Verification Gate
- **Check Command:** `pnpm test && pnpm validate`
- **Code Anchors:** `src/components/DesktopApp/components/EcosystemFloorplanView.tsx`, `public/ecosystem-floorplan.json`, `public/sw.js`.
