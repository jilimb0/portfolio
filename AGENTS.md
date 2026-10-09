# Portfolio

Personal portfolio site presented as a retro OS desktop GUI with draggable icons.

## Tech Stack
- **Framework:** Vite 6 + React 19 (TypeScript)
- **Styling:** CSS Modules
- **Lint/Format:** Biome (double quotes, asNeeded semicolons)
- **Tests:** React Testing Library + Vitest
- **Deploy:** Netlify

## Commands
- `pnpm dev` (or `pnpm start`) — Vite dev server
- `pnpm build` — production build (`tsc --noEmit && vite build`)
- `pnpm test` — Vitest + RTL
- `pnpm lint` — `biome check .`
- `pnpm lint:fix` — `biome check --write .`
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm check` — lint + typecheck
- `pnpm validate` — lint → typecheck → build

## Conventions
- CSS Modules (`.module.css`)
- Single-page, no routing — filter-based project gallery
- Projects loaded from `portfolio-db.json`
- Categories: Commercial, Featured, Client, Open Source, Tools, Pet
