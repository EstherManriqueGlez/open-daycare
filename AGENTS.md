<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run lint` — runs `eslint` (flat config, ESLint 9). This is **not** `next lint`; don't run `next lint`.
- Typecheck: `npx tsc --noEmit` (there is no `typecheck` script).
- No test framework is configured — don't invent test commands.

## Stack notes

- Next.js 16.3.8 (App Router) + React 19.2.8. TypeScript strict, `noEmit`, `moduleResolution: bundler`.
- Path alias `@/*` maps to the repo root (`./*`), not `src/`.
- Tailwind CSS v4: configured inline via `@import "tailwindcss"` + `@theme` in `app/globals.css` and the `@tailwindcss/postcss` plugin. There is **no** `tailwind.config.ts`; do not create one.

## Project context

- `open-daycare`: a Spanish-language daycare management app (staff + family/parent flows). UI copy is in Spanish.
- `app/page.tsx` is still the default create-next-app scaffold — the real UI has not been built yet.
- `references/pantallas/*.dc.html` are the design source of truth for each screen; open `references/pantallas/index.dc.html` for the catalog of 15 screens. `references/screenshots/*.png` are rendered previews. Implement against these: fonts are Fredoka (headings) + Nunito (body) on a warm palette (background `#f6ecdf`, accent `#d9583c`/`#f2937a`, staff blue `#2e89a6`, family purple `#7b5fc0`).

## MCPs

- Playwright: screenshots and any Playwright output go in `.playwright-mcp/` (gitignored).
- Context7: use it to fetch current framework docs instead of relying on training data.

## Agents

- `spec-verifier` (`.opencode/agent/spec-verifier.md`): Verifies acceptance criteria of a spec file after implementation. Reviews each criterion, runs the relevant checks, fixes code/spec issues when possible, marks checkboxes in the spec, and reports pass/fail status. Uses Playwright MCP with vision for UI/reference screenshot comparisons and Context7 MCP for current Next.js best practices.

## Spec Driven Development - Skills and Commands

- `/spec`: use this skill to create or refine specs in `specs/` before writing code.
- `/spec-impl`: use this skill to implement an approved spec step by step. It validates that the spec status means `Approved`/`Aprobado`, creates or switches to the `spec-NN-slug` branch according to `specs/spec-config.yml`, and pauses between implementation steps.
- `/verify-spec` (`.opencode/command/verify-spec.md`): use this command after implementation to invoke `spec-verifier`. It accepts a spec number, slug, or path, verifies the acceptance criteria, fixes issues found during verification, updates the checkboxes, and reports the result.

## Reglas de código

- Usar código limpio, nombres, funciones, variables, etc. en inglés.
