# Repository Guidelines

## External References
For easier referencing and consistency checks, include the upstream repositories:
- Ant Design (React) — https://github.com/ant-design/ant-design  [oai_citation:0‡GitHub](https://github.com/ant-design/ant-design?utm_source=chatgpt.com)
- react-component (React component utilities) — https://github.com/react-component  [oai_citation:1‡GitHub](https://github.com/react-component?utm_source=chatgpt.com)

## Project Structure & Module Organization
This repository is managed with **pnpm workspaces**.  
The core source code lives in `packages/ui/src`, organized by component (`button/`, `tooltip/`, etc.), with shared utilities in `_utils/`.  
Tests mirror component structure under `packages/ui/tests`, shared fixtures in `shared/`.  
Use the `playground/` app for manual QA and demos, wired via the workspace.  
Key config files (`eslint.config.ts`, `vitest.config.ts`, `tsconfig*.json`) sit at the repository root for central control.

## Component Development Rules
- **Translation Principle**
    - Components are derived from **Ant Design**, and their usage and business logic must stay consistent with upstream.
    - When Ant Design internally depends on `react-component`, preserve corresponding logic paths so the behavior matches.
    - **Do not modify styles** — all CSS/LESS or design-level styling is pre-established. Focus strictly on component behavior and logic.

- **Vue 3 Implementation Conventions**
    - Use `<script setup lang="ts">` in Single-File Components (SFCs) with 2-space indentation.
    - Vue file names use `kebab-case` (e.g. `wave-effect.vue`); utility / TS helper names use `camelCase`.
    - Each component should be exported via a top-level `index.ts` entry for consistency.

- **Props / Slots / Emits Convention**
    - For Ant Design props that accept *node elements* (React’s `ReactNode` or JSX children), offer **both a prop and a slot** in Vue, so consumers may choose either prop-based or slot-based insertion.
    - For *event handlers*, **do not** declare callback-type props. Instead, use Vue’s `emit` mechanism (via `defineEmits`) to expose events in the Vue style.

## Build, Test, and Development Commands
- `pnpm install` — install workspace dependencies
- `pnpm dev` — launch Vite-powered playground for interactive development
- `pnpm lint` — apply the shared `@antfu/eslint-config` ruleset
- Use workspace filters for package-specific tasks:
    - `pnpm --filter antdv-next test` — run Vitest for this package
    - `pnpm --filter antdv-next gen:less` — regenerate bundled Less themes

## Testing Guidelines
- Use **Vitest + @vue/test-utils**
- Place tests in `feature-name.test.ts` files under `packages/ui/tests`
- Use a shared setup file in `tests/setup.ts`
- Update snapshots with `pnpm --filter antdv-next test -- --update`
- Test new props, events, visual states; assertions should rely on rendered output or emitted events, *not* internal implementation details

## Commit & Pull Request Guidelines
- Use conventional commit prefixes: `feat:`, `fix:`, `docs:`, etc. + concise summary
- Keep related changes grouped; ensure lint and test pass before pushing
- PRs should include:
    1. Clear change description
    2. Links to any related issue or RFC
    3. Testing notes (including snapshot updates)
    4. Screenshots or video when UI changes
    5. Explicit marking of breaking changes (if any)
    6. Follow-up tasks or TODO notes when required  
