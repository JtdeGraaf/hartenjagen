# Hartenjagen

Frontend-only Vite + React + TypeScript app, deployed to https://hartenjagen.graaf.dev (Cloudflare Workers; pushes to main deploy).

Follow the `house-style` and `react-slices` skills from the `graaf` marketplace (JtdeGraaf/agents) in full:
file-based routes, feature slices, Base UI wrappers with Tailwind tokens, all copy in i18n (en + nl, keys in
parity), Zod + react-hook-form, logic in `lib/` with tests. No backend beyond the unsafe sync Worker
(`worker/index.ts`, TinyBase on a Durable Object); only harmless data goes in it.
Verify with `npm run typecheck && npm run lint && npm run format:check && npm test && npm run build`.

The rules live in `src/lib/` (`cards.ts`, `deal.ts`, `hand.ts`, `scoring.ts`) and replay every play from the shared
space, skipping plays that break the rules, because anyone with the words can write to it. `npm run build && npx
wrangler dev` runs the site and the Worker together; open it on `localhost`, `127.0.0.1`, `a.localhost` and
`b.localhost` to play as four phones. The visual system is described in DESIGN.md.
