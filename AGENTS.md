# AGENTS.md

Portfolio site: React 18 + TypeScript + Vite + Tailwind + shadcn/ui + framer-motion, deployed to GitHub Pages via CI. Package manager is npm (CI uses `npm ci`; a stale `bun.lockb` also exists — don't introduce changes via bun).

## Commands

- `npm run dev` — dev server on **port 8080** (`vite.config.ts` sets `port: 8080`, host `::`). The README says 5173; it's wrong, use 8080.
- `npm run build` — typecheck is **not** part of build (Vite only bundles). To check types, run `npx tsc --noEmit`.
- `npm run build:dev` — `vite build --mode development` (enables `componentTagger`).
- `npm run lint` — ESLint. Note: `@typescript-eslint/no-unused-vars` is off.
- `npm run preview` — preview the production `dist/`.
- No test framework or test script exists.

## Build & routing

- `base: "./"` matches GitHub Pages deployment. Routing uses **HashRouter** (`src/App.tsx`) so asset/section paths work with the relative base. Do not switch to BrowserRouter.
- Routes `/skills`, `/projects`, `/experience`, `/contact` all render `<Index />` and are just scroll-to-section anchors (see `routeToSectionMap` in `App.tsx`).
- Blog routes `/blog` and `/blog/:slug` render real pages. Posts live as markdown files in `src/posts/*.md` (frontmatter: `title`, `description`, `date`, `tags`) and are bundled via `import.meta.glob` in `src/lib/posts.ts`; drop a file in `src/posts/` and it auto-appears after rebuild. Do not move these to `public/` — Vite can't glob `public/`.
- `src/lib/utils.ts` exports `cn` (Tailwind merge). Use the `@/` alias for `src/` imports, configured in both `vite.config.ts` and `tsconfig.app.json`.
- `main.tsx` imports files with explicit `.tsx` extension (allowed via `allowImportingTsExtensions`). Mixed style exists, but keep extensions on relative imports in entrypoints.

## Deploy / infra

- Push to `main` triggers `.github/workflows/deploy.yml`: `npm ci` → `npm run build` → upload `dist/` to GitHub Pages. Node 20.
- Cloudflare config lives in `wrangler.toml` and `package.json.cloudflare`; they are secondary to the GH Pages path.
- `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `docs/deployment/*` exist for alternative VPS hosting.

## Auth / gating (client-side only, not real security)

- `src/context/AuthContext.tsx`: `VITE_AUTH_KEY` / `VITE_AUTH_PASSWORD` env (defaults `hareesh2025` / `2025`). No backend; do not treat as security.
- Auth state is UI-gated only; persisted in `sessionStorage` (`portfolio_auth`), and a URL `?auth=<key>` param auto-authorizes then cleans the URL.
- `src/components/ProtectedData.tsx` masks sensitive text until password verified.

## First-visit flow

- `src/lib/visit-flow.ts` uses **cookies** (`portfolio_intro_visited`, `is_first_visit_Cardshown`) with 30-day max-age to decide whether to show the intro/card-reveal screens (`IntroScreen`, `WelcomeScreen`, `CardRevealScreen`, `PortfolioLanding`).
- Intro/card reveal flow is intentional: `src/pages/Index.tsx` orchestrates these; don't strip them when editing the landing page.