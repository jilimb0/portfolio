# Common Development Tasks: portfolio

## 1. Standard Commands
- **Start dev:** `pnpm dev` — Starts Vite development server.
- **Typecheck:** `pnpm typecheck` — Executes TypeScript verification.
- **Run tests:** `pnpm test` — Executes UI component tests.
- **Lint code:** `pnpm lint` — Checks Biome lint rules.

## 2. Recipe: Adding a New Feature
1. Review requirements against invariants in `.ai/ARCHITECTURE.md`.
2. Write a failing test in test directory verifying expected behavior.
3. Implement minimal clean code to satisfy the test.
4. Run `pnpm typecheck` and `pnpm test`.
5. Run `pnpm lint` to ensure code style compliance.

## 3. Recipe: Fixing a Bug
1. Reproduce defect with an automated regression test.
2. Verify test failure matches reported symptoms.
3. Apply targeted fix without modifying unrelated code.
4. Verify all tests pass with `pnpm test`.
