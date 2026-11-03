# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern Bootstrap 5 Admin Dashboard Template (v3.7.0) using Vite, Alpine.js, Chart.js and SCSS.

| Directory | Purpose |
|-----------|---------|
| `src/` | Source files (Bootstrap 5.3.8, ES6+ modules) |
| `dist-modern/` | Production build output |
| `src/`, `dist/` | Legacy Bootstrap 3 code - **do not use** |

## Commands

```bash
npm run dev        # Dev server at http://localhost:3000
npm run build      # Production build
npm run preview     # Preview the production build (port 4173)
npm run lint        # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format      # Prettier format (write)
npm run format:check # Prettier check (no write)
npm run check        # lint + format:check
npm run test        # Smoke-test the already-built dist-modern/ (30 pages)
npm run test:auth    # Auth interaction suite against dist-modern/
npm run test:build   # Build, smoke-test all 30 pages, then run the auth interaction suite
npm run audit        # npm audit --audit-level=high
npm run verify       # lint + audit + test:build — run before shipping
npm run icons        # Regenerate the Bootstrap Icons subset (after adding bi-* icons)
npm run clean        # Remove dist and dist-modern
```

Prerequisites: Node.js 20.19+ (.nvmrc pins it). The smoke/auth tests need Playwright, which is
deliberately not a dependency:
`npx playwright install chromium && PLAYWRIGHT_PATH=playwright npm run test:build`.
Env knobs: `HEADED=1` (watch the browser), `PLAYWRIGHT_PATH=…` (resolve playwright elsewhere).
There is no per-page filter — both test scripts always run the whole suite.

## Key Files

| File | Purpose |
|------|---------|
| `src/scripts/main.js` | App entry point, initializes AdminApp class |
| `src/styles/scss/main.scss` | SCSS entry point |
| `vite.config.js` | Build config with multi-page entries |
| `eslint.config.js` | ESLint v10 flat config |
| `src/scripts/utils/search-component.js` | Factory for the navbar search Alpine component |
| `src/scripts/utils/constants.js` | Shared timing/breakpoint constants |
| `src/scripts/utils/charts.js` | Chart.js preset — registers only the chart types used, themes `Chart.defaults` from CSS tokens, re-themes live charts on light/dark switch, `createChart()` helper |
| `src/scripts/utils/prism.js` | Bundled syntax highlighting for the element showcase pages |
| `scripts/smoke-test.mjs` | Loads all 30 built pages in a browser; fails on errors or external requests |
| `src/styles/scss/components/_a11y.scss` | Skip-link, reduced-motion, sr-only helpers |
| `src/styles/scss/components/_bootstrap-icons-subset.scss` | **Generated** icon CSS — run `npm run icons`, never hand-edit |
| `scripts/generate-icon-subset.mjs` | Regenerates the icon subset by scanning source for `bi-*` |
| `src/scripts/auth.js` | Entry point for the 9 standalone pages (auth + errors) |
| `src/scripts/components/auth.js` | Alpine scopes for the auth forms |
| `src/scripts/utils/chart-palette.js` | Single source for every chart colour — validated, theme-aware |
| `src/scripts/utils/password-strength.js` | Shared password scorer (auth pages + forms showcase) |
| `scripts/auth-interaction-test.mjs` | Drives the auth flows in a browser; the smoke test can't see stuck widgets |

## Architecture Quick Reference

**Page Detection**: Each HTML page needs `data-page="pagename"` on `<body>` to load correct component.

**Component Loading**: Dynamic imports in `main.js` based on page:

```javascript
case 'users':
  await import('./components/users.js');
  break;
```

**Alpine.js Pattern**: Components register via `Alpine.data()`:

```javascript
Alpine.data('componentName', () => ({
  init() { /* setup */ },
  // methods and state
}));
```

## Adding a New Page

1. Create `src/newpage.html` with `data-page="newpage"` on body
2. Add entry to `vite.config.js` → `rollupOptions.input`
3. Create `src/scripts/components/newpage.js`
4. Add case to `initPageComponents()` in `main.js`
5. Optional: Create `src/styles/scss/pages/_newpage.scss` and import in `main.scss`

## Dependencies

- **UI**: Bootstrap 5.3.8, Bootstrap Icons 1.13.1 (subset, see below)
- **Reactive**: Alpine.js 3.17
- **Charts**: Chart.js 4.5 (MIT) + `chartjs-chart-treemap` (MIT, dashboard treemap) + `chartjs-plugin-zoom` (MIT, reports page only). Colours come from `utils/chart-palette.js`, never inline hexes
- **Notifications**: SweetAlert2 11.26.25
- **Highlighting**: Prism 1.30 (bundled, showcase pages only)
- **Fonts**: Inter via `@fontsource-variable/inter` (self-hosted)
- **Build**: Vite 8.2 (rolldown), Sass 1.104

## Conventions

- **One charting library.** Use Chart.js through `createChart(container, config, { height })` from `utils/charts.js`. Page markup keeps a plain `<div>` placeholder; the helper adds the sized wrapper and `<canvas>`.
- **Import from `utils/charts.js`, never from `'chart.js'`.** That module registers only the chart types this template renders and applies the shared theme preset. A new chart type must be registered there, or Chart.js throws `"xyz" is not a registered controller`.
- **Palette colours go in as functions** (`borderColor: () => accent()`), so the light/dark re-theme in `utils/charts.js` re-resolves them. **Keep chart instances out of Alpine reactive state** — use a `const charts = {}` in the `Alpine.data()` factory closure; a reactive proxy around a Chart.js instance stalls updates.
- **No third-party runtime requests.** No CDN `<script>`/`<link>`, no remote fonts or images. `npm run test:build` fails the build if a page requests anything off-origin.
- **No inline `<script>` or `onclick`.** Use a delegated listener in the page's component keyed off a `data-*` attribute. This keeps the template CSP-compatible and the code lintable — six pages once shipped a silent SyntaxError precisely because the logic sat in inline scripts nobody linted.
- **Nothing is a global.** Alpine, Chart.js, Swal and Bootstrap are all ES module imports. ESLint declares no library globals, so a missing import fails `npm run lint`.
- **Register Alpine components under the name the markup calls.** `x-data="contactForm()"` needs `Alpine.data('contactForm', …)`. A mismatch throws on every binding in that scope and is invisible until the page is opened.
- **Guard `DOMContentLoaded` in page components.** They are dynamically imported and usually resolve after the event has fired — check `document.readyState` first.
- **No `innerHTML` with interpolation.** Use `createElement` + `textContent`. Toast `action` callbacks must be functions, not strings.
- **Search inputs** use the shared factory: `Alpine.data('searchComponent', createSearchComponent({ getResults }))`. Don't paste fresh definitions per page.
- **Component cleanup.** Anything that calls `setInterval` / `setTimeout` / `addEventListener` should track the IDs and clean up in `destroy()` (called via `pagehide`).
- **Chart colours come from `utils/chart-palette.js`.** Never inline a hex in a chart config. The categorical sequences are validated for colour-blind separation and contrast in both themes; a hand-picked substitute silently breaks that. Status colours (`STATUS.*`) are reserved for actual states and are never "series 4".
- **Standalone pages use `scripts/auth.js`, not `main.js`.** Login, register, forgot/reset password, two-factor, lock screen and the three error pages render outside the admin shell, so they must not pull in the sidebar, notification or dashboard managers.
- **Don't spread a mixin that exposes a getter.** `{...mixin()}` copies the getter's *value*, evaluated immediately. Use the `compose()` helper in `components/auth.js`, which merges property descriptors.
- **Bootstrap Icons subset.** After adding any `bi-*` icon to markup, run `npm run icons`. The subset partial is generated; if you skip this the class exists, the markup looks right, and the glyph renders as nothing. The script exits non-zero on a typo'd icon name, so it is safe in CI.

## Documentation

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed architecture, patterns, and styling guide.
