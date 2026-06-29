# Portfolio

Personal portfolio site presented as a retro OS desktop GUI with draggable icons.

## Tech Stack
- **Framework:** Create React App (React 18, TypeScript)
- **Styling:** CSS Modules
- **Lint/Format:** Biome (double quotes, asNeeded semicolons)
- **Tests:** React Testing Library + Jest
- **Deploy:** Netlify

## Commands
- `pnpm start` — CRA dev server
- `pnpm build` — production build
- `pnpm test` — Jest + RTL
- `pnpm lint` — `biome check .`
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm format` — `biome format --write .`
- `pnpm validate` — lint → typecheck → build

## Conventions
- CSS Modules (`.module.css`)
- Single-page, no routing — filter-based project gallery
- Projects loaded from `portfolio-db.json`
- Categories: Commercial, Featured, Client, Open Source, Tools, Pet
