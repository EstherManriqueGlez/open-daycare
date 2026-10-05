# Open Daycare

Spanish-language daycare management app for staff and family/parent flows. The real UI is implemented from the design references in `references/pantallas/` and rendered previews in `references/screenshots/`.

## Stack

- Next.js 16.3.8 App Router
- React 19.2.8
- TypeScript strict
- Tailwind CSS v4 via `@import "tailwindcss"` and `@theme` in `app/globals.css`

## Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Useful commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

There is no configured test runner yet.

## Design References

- Screen catalog: `references/pantallas/index.dc.html`
- Source screens: `references/pantallas/*.dc.html`
- Rendered previews: `references/screenshots/*.png`
- Visual direction: Fredoka headings, Nunito body, warm background `#f6ecdf`, accent `#d9583c`/`#f2937a`, staff blue `#2e89a6`, family purple `#7b5fc0`.

## Spec Workflow

- `/spec`: create or refine a spec in `specs/`.
- `/spec-impl`: implement an approved spec step by step.
- `/verify-spec`: verify acceptance criteria after implementation with the `spec-verifier` agent. It checks criteria, fixes issues when possible, updates spec checkboxes, and reports the final status.

Branch creation for `/spec-impl` is controlled by `specs/spec-config.yml`.

## Opencode Project Files

- Project instructions: `AGENTS.md`
- Spec verifier agent: `.opencode/agent/spec-verifier.md`
- Verify command: `.opencode/command/verify-spec.md`
- Spec skills: `.agents/skills/spec/` and `.agents/skills/spec-impl/`

After changing opencode config, agent, command, or skill files, restart opencode so the new configuration is loaded.
