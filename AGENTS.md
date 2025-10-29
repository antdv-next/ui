# Repository Guidelines

## External References
For easier referencing and consistency checks, include the upstream repositories:
- Ant Design (React) — https://github.com/ant-design/ant-design
- react-component (React component utilities) — https://github.com/react-component

## Project Structure & Module Organization
This repository is managed with **pnpm workspaces**.
The core source code lives in `packages/ui/src`, organized by component (`button/`, `tooltip/`, etc.), with shared utilities in `_utils/`.
Tests are located in `packages/ui/tests`, mirroring the feature folder structure (e.g. `button/`), with shared fixtures in `shared/`.
Use the `playground/` app for manual QA and demos, wired via the workspace.
Key configuration files (`eslint.config.ts`, `vitest.config.ts`, `tsconfig*.json`) are placed at the repository root for centralized management.

## Component Development Rules
- **Translation Principle**
    - Components are derived from **Ant Design**, and their usage and business logic must stay consistent with upstream.
    - Logic originally implemented inside `react-component` must be preserved.
    - **Do not modify styles** — all CSS/LESS or design-level styling has already been created. Focus exclusively on component business logic.

- **Vue 3 Implementation Conventions**
    - Use `<script setup lang="ts">` in Single-File Components (SFCs) with 2-space indentation.
    - Vue file names use `kebab-case` (e.g. `wave-effect.vue`); utility / TS helper names use `camelCase`.
    - Each component should be exported via a top-level `index.ts` entry file.

- **Props / Slots / Emits Conventions**
    - For Ant Design props that accept **node elements** (React’s `ReactNode`), provide **both a prop and a slot** in Vue. This ensures compatibility with both JSX usage and template-based usage.
    - For **event handlers**, do **not** define callback-style props. Instead, expose events using Vue’s `emit` mechanism (`defineEmits`).

## Build, Test, and Development Commands
- `pnpm install` → install workspace dependencies
- `pnpm dev` → launch the Vite-powered playground for interactive development
- `pnpm lint` → apply the shared `@antfu/eslint-config` ruleset
- Use workspace filters for package-specific tasks:
    - `pnpm --filter antdv-next test` → run Vitest for this package

## Testing Guidelines
- Use **Vitest + @vue/test-utils** for component tests.
- Place tests in `feature-name.test.ts` files under `packages/ui/tests`.
- Use a shared setup file in `tests/setup.ts`.
- Update snapshots with:
  ```bash
  pnpm --filter antdv-next test -- --update

	•	To run a single test file during development:

pnpm -F antdv-next test button/base.test.ts

	•	To run a single test case by name (pattern matching against it() descriptions):

pnpm -F antdv-next test -t "Button disabled"

	•	Cover new props, events, and visual states in tests.
	•	Assertions should be based on rendered output or emitted events, not internal implementation details.

## Commit & Pull Request Guidelines
*	Follow commit conventions: prefix with feat:, fix:, docs:, etc., followed by a concise summary.
*	Group related changes into a single commit, and ensure linting and tests pass before pushing.
*	Pull Requests should include:
1.	A clear description of the change
2.	Links to related issues or RFCs
3.	Test notes (including snapshot updates)
4.	Screenshots or recordings when UI output changes
5.	Explicit notice of breaking changes (if any)
6.	Follow-up tasks or TODO notes if applicable
